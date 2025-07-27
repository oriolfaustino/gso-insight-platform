'use client';

import { useState } from 'react';

export default function SimplePage() {
  const [domain, setDomain] = useState('');
  
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          GSO Insight Platform
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <input
            type="text"
            placeholder="Enter domain"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg">
            Analyze
          </button>
        </div>
      </div>
    </div>
  );
}