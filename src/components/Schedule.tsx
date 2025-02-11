import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';

export default function Planning() {
  const [campagnes, setCampagnes] = useState([
    {
      id: 1,
      naam: 'Welkom E-mail',
      geplandeDatum: '2024-03-15',
      geplandeTijd: '09:00',
      status: 'gepland',
    },
  ]);

  const [nieuweCampagne, setNieuweCampagne] = useState({
    naam: '',
    geplandeDatum: '',
    geplandeTijd: '',
  });

  const handleCampagnePlannen = () => {
    if (nieuweCampagne.naam && nieuweCampagne.geplandeDatum && nieuweCampagne.geplandeTijd) {
      setCampagnes([
        ...campagnes,
        {
          id: campagnes.length + 1,
          ...nieuweCampagne,
          status: 'gepland',
        },
      ]);
      setNieuweCampagne({ naam: '', geplandeDatum: '', geplandeTijd: '' });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Campagne Planning</h2>

      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Nieuwe Campagne Inplannen</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <input
            type="text"
            value={nieuweCampagne.naam}
            onChange={(e) => setNieuweCampagne({ ...nieuweCampagne, naam: e.target.value })}
            placeholder="Campagne Naam"
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <div className="relative">
            <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="date"
              value={nieuweCampagne.geplandeDatum}
              onChange={(e) => setNieuweCampagne({ ...nieuweCampagne, geplandeDatum: e.target.value })}
              className="pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 w-full"
            />
          </div>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="time"
              value={nieuweCampagne.geplandeTijd}
              onChange={(e) => setNieuweCampagne({ ...nieuweCampagne, geplandeTijd: e.target.value })}
              className="pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 w-full"
            />
          </div>
        </div>
        <button
          onClick={handleCampagnePlannen}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Campagne Inplannen
        </button>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Geplande Campagnes</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Campagne Naam
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Datum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tijd
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {campagnes.map((campagne) => (
                <tr key={campagne.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {campagne.naam}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {campagne.geplandeDatum}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {campagne.geplandeTijd}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {campagne.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}