import React, { useEffect, useState } from 'react';
import { BarChart2, PieChart, TrendingUp, Users } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

export default function Analytics() {
  const [stats, setStats] = useState({
    totalSent: 0,
    openRate: '0%',
    clickRate: '0%',
    totalRecipients: 0
  });

  const [recentClicks, setRecentClicks] = useState([]);

  useEffect(() => {
    fetchStats();
    fetchRecentClicks();
  }, []);

  const fetchStats = async () => {
    try {
      // Get total sent emails
      const { count: sentCount } = await supabase
        .from('email_events')
        .select('*', { count: 'exact' })
        .eq('event_type', 'sent');

      // Get total clicks
      const { count: clickCount } = await supabase
        .from('email_events')
        .select('*', { count: 'exact' })
        .eq('event_type', 'clicked');

      // Get total recipients
      const { count: recipientCount } = await supabase
        .from('recipients')
        .select('*', { count: 'exact' });

      const clickRate = sentCount ? Math.round((clickCount / sentCount) * 100) : 0;

      setStats({
        totalSent: sentCount || 0,
        openRate: '0%', // Implement if you add open tracking
        clickRate: `${clickRate}%`,
        totalRecipients: recipientCount || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchRecentClicks = async () => {
    try {
      const { data, error } = await supabase
        .from('email_events')
        .select(`
          *,
          campaigns (subject),
          recipients (name, email)
        `)
        .eq('event_type', 'clicked')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setRecentClicks(data);
    } catch (error) {
      console.error('Error fetching recent clicks:', error);
    }
  };

  const displayStats = [
    { name: 'Total Sent', value: stats.totalSent.toString(), icon: BarChart2 },
    { name: 'Open Rate', value: stats.openRate, icon: PieChart },
    { name: 'Click Rate', value: stats.clickRate, icon: TrendingUp },
    { name: 'Recipients', value: stats.totalRecipients.toString(), icon: Users },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Campaign Analytics</h2>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {displayStats.map((stat) => (
          <div
            key={stat.name}
            className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
          >
            <dt>
              <div className="absolute bg-blue-500 rounded-md p-3">
                <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 text-sm font-medium text-gray-500 truncate">{stat.name}</p>
            </dt>
            <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            </dd>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Link Clicks</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recipient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Campaign
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Link Clicked
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentClicks.map((click: any) => (
                <tr key={click.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {click.recipients?.name} ({click.recipients?.email})
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {click.campaigns?.subject}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {click.link_clicked}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(click.created_at).toLocaleString()}
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