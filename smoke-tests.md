# Setup check — Meeting and Trip Itinerary Planner

Read `trip-planning-pack.json.verification_cases`. Send each case’s `stops` to `calculate_itinerary`; compare expected conflict counts. Exercise the documented optimizer for a few meetings and retain timezone offsets. Missing travel routes must fail, not become zero minutes. The team owns geography/schedule UI and editable order.

Verify that the map shows the selected trip's meeting locations and remains consistent with the itinerary. Preserve map-data attribution and distinguish real geography from synthetic travel estimates. A successful map render does not validate road routes or traffic.

These are tool checks and suggested product verification, not a prescribed interface. Keep the setup receipt honest: distinguish a local fixture from a live service check and a tool response from a completed product. No optional feature is required to pass setup. For transient errors show a retry action; do not automatically repeat exports, uploads or other uncertain writes.
