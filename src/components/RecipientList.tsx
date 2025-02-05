import React, { useState } from 'react';
import { UserPlus, Trash2 } from 'lucide-react';

export default function RecipientList() {
  const [recipients, setRecipients] = useState([
    { id: 1, name: 'John Doe', email: 'john@lavans.nl', department: 'IT' },
    { id: 2, name: 'Jane Smith', email: 'jane@lavans.nl', department: 'HR' },
  ]);

  const [newRecipient, setNewRecipient] = useState({
    name: '',
    email: '',
    department: '',
  });

  const handleAddRecipient = () => {
    if (newRecipient.name && newRecipient.email && newRecipient.department) {
      setRecipients([
        ...recipients,
        { id: recipients.length + 1, ...newRecipient },
      ]);
      setNewRecipient({ name: '', email: '', department: '' });
    }
  };

  const handleRemoveRecipient = (id: number) => {
    setRecipients(recipients.filter((recipient) => recipient.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Recipient Management</h2>

      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Recipient</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <input
            type="text"
            value={newRecipient.name}
            onChange={(e) => setNewRecipient({ ...newRecipient, name: e.target.value })}
            placeholder="Name"
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <input
            type="email"
            value={newRecipient.email}
            onChange={(e) => setNewRecipient({ ...newRecipient, email: e.target.value })}
            placeholder="Email"
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <input
            type="text"
            value={newRecipient.department}
            onChange={(e) => setNewRecipient({ ...newRecipient, department: e.target.value })}
            placeholder="Department"
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleAddRecipient}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Add Recipient
        </button>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recipients List</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recipients.map((recipient) => (
                <tr key={recipient.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {recipient.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {recipient.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {recipient.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleRemoveRecipient(recipient.id)}
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