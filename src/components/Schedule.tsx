import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';

export default function Schedule() {
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: 'Welcome Email',
      scheduledDate: '2024-03-15',
      scheduledTime: '09:00',
      status: 'scheduled',
    },
  ]);

  const [newCampaign, setNewCampaign] = useState({
    name: '',
    scheduledDate: '',
    scheduledTime: '',
  });

  const handleScheduleCampaign = () => {
    if (newCampaign.name && newCampaign.scheduledDate && newCampaign.scheduledTime) {
      setCampaigns([
        ...campaigns,
        {
          id: campaigns.length + 1,
          ...newCampaign,
          status: 'scheduled',
        },
      ]);
      setNewCampaign({ name: '', scheduledDate: '', scheduledTime: '' });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Campaign Schedule</h2>

      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Schedule New Campaign</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <input
            type="text"
            value={newCampaign.name}
            onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
            placeholder="Campaign Name"
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <div className="relative">
            <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="date"
              value={newCampaign.scheduledDate}
              onChange={(e) => setNewCampaign({ ...newCampaign, scheduledDate: e.target.value })}
              className="pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 w-full"
            />
          </div>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="time"
              value={newCampaign.scheduledTime}
              onChange={(e) => setNewCampaign({ ...newCampaign, scheduledTime: e.target.value })}
              className="pl-10 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 w-full"
            />
          </div>
        </div>
        <button
          onClick={handleScheduleCampaign}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Schedule Campaign
        </button>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Scheduled Campaigns</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Campaign Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {campaigns.map((campaign) => (
                <tr key={campaign.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {campaign.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {campaign.scheduledDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {campaign.scheduledTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {campaign.status}
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