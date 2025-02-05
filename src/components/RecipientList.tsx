import React, { useState } from 'react';
import { UserPlus, Trash2 } from 'lucide-react';

export default function OntvangerLijst() {
  const [ontvangers, setOntvangers] = useState([
    { id: 1, naam: 'John Doe', email: 'john@lavans.nl', afdeling: 'IT' },
    { id: 2, naam: 'Jane Smith', email: 'jane@lavans.nl', afdeling: 'HR' },
  ]);

  const [nieuweOntvanger, setNieuweOntvanger] = useState({
    naam: '',
    email: '',
    afdeling: '',
  });

  const handleOntvangerToevoegen = () => {
    if (nieuweOntvanger.naam && nieuweOntvanger.email && nieuweOntvanger.afdeling) {
      setOntvangers([
        ...ontvangers,
        { id: ontvangers.length + 1, ...nieuweOntvanger },
      ]);
      setNieuweOntvanger({ naam: '', email: '', afdeling: '' });
    }
  };

  const handleOntvangerVerwijderen = (id: number) => {
    setOntvangers(ontvangers.filter((ontvanger) => ontvanger.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Ontvanger Beheer</h2>

      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Nieuwe Ontvanger Toevoegen</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <input
            type="text"
            value={nieuweOntvanger.naam}
            onChange={(e) => setNieuweOntvanger({ ...nieuweOntvanger, naam: e.target.value })}
            placeholder="Naam"
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <input
            type="email"
            value={nieuweOntvanger.email}
            onChange={(e) => setNieuweOntvanger({ ...nieuweOntvanger, email: e.target.value })}
            placeholder="E-mail"
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <input
            type="text"
            value={nieuweOntvanger.afdeling}
            onChange={(e) => setNieuweOntvanger({ ...nieuweOntvanger, afdeling: e.target.value })}
            placeholder="Afdeling"
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleOntvangerToevoegen}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Ontvanger Toevoegen
        </button>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Ontvangers Lijst</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Naam
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  E-mail
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Afdeling
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acties
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {ontvangers.map((ontvanger) => (
                <tr key={ontvanger.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {ontvanger.naam}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {ontvanger.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {ontvanger.afdeling}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleOntvangerVerwijderen(ontvanger.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
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