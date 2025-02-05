import React, { useState } from 'react';
import { Mail, Users, Calendar, BarChart } from 'lucide-react';
import EmailEditor from './components/EmailEditor';
import RecipientList from './components/RecipientList';
import Schedule from './components/Schedule';
import Analytics from './components/Analytics';

function App() {
  const [activeTab, setActiveTab] = useState('compose');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-blue-600">Lavans Email Manager</h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <button
                  onClick={() => setActiveTab('compose')}
                  className={`${
                    activeTab === 'compose'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Compose
                </button>
                <button
                  onClick={() => setActiveTab('recipients')}
                  className={`${
                    activeTab === 'recipients'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Recipients
                </button>
                <button
                  onClick={() => setActiveTab('schedule')}
                  className={`${
                    activeTab === 'schedule'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`${
                    activeTab === 'analytics'
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                >
                  <BarChart className="w-4 h-4 mr-2" />
                  Analytics
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'compose' && <EmailEditor />}
        {activeTab === 'recipients' && <RecipientList />}
        {activeTab === 'schedule' && <Schedule />}
        {activeTab === 'analytics' && <Analytics />}
      </main>
    </div>
  );
}

export default App;