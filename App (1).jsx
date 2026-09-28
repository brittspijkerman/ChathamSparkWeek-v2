import React, { useState } from 'react';

export default function App() {
  const [selected, setSelected] = useState(false);
  return <main className="max-w-3xl mx-auto p-8 text-slate-900">
    <p className="text-sm text-slate-600">Local prototype · synthetic example · resets on reload</p>
    <h1 className="text-3xl font-semibold mt-6 mb-4">Your team's experiment</h1>
    <p className="mb-6">Ask Codex to replace this preview with your own React approach to the assigned project.</p>
    <button className="px-4 py-2 border border-slate-500 rounded focus-visible:outline focus-visible:outline-2" aria-pressed={selected} onClick={() => setSelected(v => !v)}>Try an interaction</button>
    <p role="status" className="mt-4">{selected ? 'Selected. Click again to reset.' : 'Ready to explore.'}</p>
  </main>;
}
