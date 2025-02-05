import React, { useState, useRef } from 'react';
import { Send, Upload, Save } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

export default function EmailEditor() {
  const [subject, setSubject] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewMode, setPreviewMode] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setHtmlContent(content);
      };
      reader.readAsText(file);
    }
  };

  const handleSave = async () => {
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .insert([
          {
            name: subject,
            html_content: htmlContent,
            subject: subject,
            status: 'draft'
          }
        ])
        .select();

      if (error) throw error;
      
      console.log('Campaign saved:', data);
      alert('Campaign saved successfully!');
    } catch (error) {
      console.error('Error saving campaign:', error);
      alert('Error saving campaign');
    }
  };

  const handleSend = async () => {
    try {
      // First save the campaign
      const { data: campaign, error: campaignError } = await supabase
        .from('campaigns')
        .insert([
          {
            name: subject,
            html_content: htmlContent,
            subject: subject,
            status: 'sending',
            sent_at: new Date().toISOString()
          }
        ])
        .select();

      if (campaignError) throw campaignError;

      // Get all recipients
      const { data: recipients, error: recipientsError } = await supabase
        .from('recipients')
        .select('*');

      if (recipientsError) throw recipientsError;

      // Create tracking events for each recipient
      const events = recipients.map((recipient) => ({
        campaign_id: campaign[0].id,
        recipient_id: recipient.id,
        event_type: 'sent'
      }));

      const { error: eventsError } = await supabase
        .from('email_events')
        .insert(events);

      if (eventsError) throw eventsError;

      alert('Campaign sent successfully!');
    } catch (error) {
      console.error('Error sending campaign:', error);
      alert('Error sending campaign');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Email</h2>
      
      <div className="space-y-6">
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
            Subject Line
          </label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter email subject"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Email Content
            </label>
            <div className="flex space-x-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload HTML
              </button>
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {previewMode ? 'Edit HTML' : 'Preview'}
              </button>
            </div>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".html"
            className="hidden"
          />
          {previewMode ? (
            <div
              className="mt-1 border rounded-md p-4 min-h-[300px]"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          ) : (
            <textarea
              value={htmlContent}
              onChange={(e) => setHtmlContent(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 font-mono"
              rows={12}
              placeholder="Paste or write your HTML content here..."
            />
          )}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={handleSave}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </button>
          <button
            onClick={handleSend}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Send className="w-4 h-4 mr-2" />
            Send to All
          </button>
        </div>
      </div>
    </div>
  );
}