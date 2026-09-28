function requireArray(value, message) {
  if (!Array.isArray(value) || value.length === 0) throw new Error(message);
}

function evaluateItinerary(pack, stops) {
  requireArray(stops, "At least one itinerary stop is required");
  if (stops.length > 20) throw new Error("At most twenty itinerary stops are supported");
  if (new Set(stops.map(stop => stop.meeting_id)).size !== stops.length) throw new Error("Meeting IDs must be unique");
  const meetings = new Map(pack.meetings.map((meeting) => [meeting.id, meeting]));
  const travelTimes = new Map(pack.travel_times.map((row) => [`${row.from_location_id}:${row.to_location_id}`, row]));
  const normalized = stops.map((stop) => {
    const meeting = meetings.get(stop.meeting_id);
    if (!meeting) throw new Error(`Unknown meeting ${stop.meeting_id}`);
    const startMs = Date.parse(stop.start_at);
    if (!Number.isFinite(startMs)) throw new Error(`Invalid start_at for ${stop.meeting_id}`);
    return { ...stop, meeting, start_ms: startMs, end_ms: startMs + meeting.duration_minutes * 60000 };
  }).sort((left, right) => left.start_ms - right.start_ms || left.meeting.id.localeCompare(right.meeting.id));

  const segments = [];
  const conflicts = [];
  for (const stop of normalized) {
    const windows = (pack.availability_windows || []).filter(window => window.meeting_id === stop.meeting.id);
    const fits = windows.some(window => stop.start_ms >= Date.parse(window.start_at) && stop.end_ms <= Date.parse(window.end_at));
    if (!fits) conflicts.push({ type: windows.length ? "outside_availability" : "availability_missing", meeting_id: stop.meeting.id });
  }
  for (let index = 1; index < normalized.length; index += 1) {
    const previous = normalized[index - 1];
    const current = normalized[index];
    const key = `${previous.meeting.location_id}:${current.meeting.location_id}`;
    const travel = previous.meeting.location_id === current.meeting.location_id
      ? { minutes: 0, mode: "same location" }
      : travelTimes.get(key);
    if (!travel) throw new Error(`No travel time is available for ${key}`);
    const requiredArrivalMs = previous.end_ms + travel.minutes * 60000;
    const availableMinutes = Math.floor((current.start_ms - previous.end_ms) / 60000);
    const segment = {
      from_meeting_id: previous.meeting.id,
      to_meeting_id: current.meeting.id,
      travel_minutes: travel.minutes,
      available_minutes: availableMinutes,
      feasible: current.start_ms >= requiredArrivalMs
    };
    segments.push(segment);
    if (!segment.feasible) {
      conflicts.push({
        type: current.start_ms < previous.end_ms ? "meeting_overlap" : "insufficient_travel_time",
        from_meeting_id: previous.meeting.id,
        to_meeting_id: current.meeting.id,
        shortfall_minutes: Math.ceil((requiredArrivalMs - current.start_ms) / 60000)
      });
    }
  }
  return {
    feasible: conflicts.length === 0,
    stops: normalized.map((stop) => ({ meeting_id: stop.meeting.id, start_at: stop.start_at, end_at: new Date(stop.end_ms).toISOString() })),
    segments,
    conflicts
  };
}

function optimizeItinerary(pack, request) {
  const meetingIds = request && request.meeting_ids;
  requireArray(meetingIds, "At least one meeting is required for optimization");
  if (meetingIds.length > 8) throw new Error("Optimization supports at most eight meetings");
  if (new Set(meetingIds).size !== meetingIds.length) throw new Error("Meeting IDs must be unique");
  const startLocationId = request.start_location_id;
  const startMs = Date.parse(request.start_at);
  if (typeof startLocationId !== "string" || !startLocationId) throw new Error("A start_location_id is required");
  if (!Number.isFinite(startMs)) throw new Error("A valid start_at is required");
  const meetings = new Map(pack.meetings.map((meeting) => [meeting.id, meeting]));
  const windowsByMeeting = new Map();
  for (const window of pack.availability_windows || []) {
    if (!windowsByMeeting.has(window.meeting_id)) windowsByMeeting.set(window.meeting_id, []);
    windowsByMeeting.get(window.meeting_id).push(window);
  }
  const travelTimes = new Map(pack.travel_times.map((row) => [`${row.from_location_id}:${row.to_location_id}`, row.minutes]));
  for (const meetingId of meetingIds) {
    if (!meetings.has(meetingId)) throw new Error(`Unknown meeting ${meetingId}`);
    if (!windowsByMeeting.has(meetingId)) throw new Error(`No availability is available for ${meetingId}`);
  }

  function travelMinutes(fromId, toId) {
    if (fromId === toId) return 0;
    const minutes = travelTimes.get(`${fromId}:${toId}`);
    if (!Number.isFinite(minutes)) throw new Error(`No travel time is available for ${fromId}:${toId}`);
    return minutes;
  }

  function schedule(order) {
    let currentMs = startMs;
    let currentLocationId = startLocationId;
    let totalTravel = 0;
    const stops = [];
    for (const meetingId of order) {
      const meeting = meetings.get(meetingId);
      const travel = travelMinutes(currentLocationId, meeting.location_id);
      const arrivalMs = currentMs + travel * 60000;
      const windows = windowsByMeeting.get(meetingId)
        .map((window) => ({ start: Date.parse(window.start_at), end: Date.parse(window.end_at) }))
        .filter((window) => Number.isFinite(window.start) && Number.isFinite(window.end))
        .sort((left, right) => left.start - right.start);
      let selectedStart = null;
      for (const window of windows) {
        const candidate = Math.max(arrivalMs, window.start);
        if (candidate + meeting.duration_minutes * 60000 <= window.end) {
          selectedStart = candidate;
          break;
        }
      }
      if (selectedStart === null) return null;
      const endMs = selectedStart + meeting.duration_minutes * 60000;
      stops.push({ meeting_id: meetingId, start_at: new Date(selectedStart).toISOString(), end_at: new Date(endMs).toISOString(), travel_minutes_from_previous: travel });
      totalTravel += travel;
      currentMs = endMs;
      currentLocationId = meeting.location_id;
    }
    if (request.end_location_id) {
      const finalTravel = travelMinutes(currentLocationId, request.end_location_id);
      totalTravel += finalTravel;
      currentMs += finalTravel * 60000;
    }
    const endByMs = request.end_by ? Date.parse(request.end_by) : null;
    if (request.end_by && !Number.isFinite(endByMs)) throw new Error("A valid end_by is required");
    if (Number.isFinite(endByMs) && currentMs > endByMs) return null;
    return { feasible: true, stops, total_travel_minutes: totalTravel, finished_at: new Date(currentMs).toISOString() };
  }

  let best = null;
  function visit(prefix, remaining) {
    if (remaining.length === 0) {
      const candidate = schedule(prefix);
      if (!candidate) return;
      const candidateKey = prefix.join("|");
      const bestKey = best ? best.stops.map((stop) => stop.meeting_id).join("|") : "";
      if (!best || candidate.total_travel_minutes < best.total_travel_minutes ||
        (candidate.total_travel_minutes === best.total_travel_minutes && Date.parse(candidate.finished_at) < Date.parse(best.finished_at)) ||
        (candidate.total_travel_minutes === best.total_travel_minutes && candidate.finished_at === best.finished_at && candidateKey < bestKey)) {
        best = candidate;
      }
      return;
    }
    for (let index = 0; index < remaining.length; index += 1) {
      visit(prefix.concat(remaining[index]), remaining.slice(0, index).concat(remaining.slice(index + 1)));
    }
  }
  visit([], meetingIds.slice().sort());
  if (!best) throw new Error("No feasible itinerary was found for the selected meetings and constraints");
  return { ...best, optimization_method: "bounded_exhaustive_search", alternatives_evaluated: meetingIds.reduce((value, _, index) => value * (index + 1), 1) };
}

module.exports = { evaluateItinerary, optimizeItinerary };
