import React, { useState, useRef } from 'react';
import { Send, Upload, Save, File, ChevronRight, ChevronLeft } from 'lucide-react';

export default function EmailEditor() {
  const [onderwerp, setOnderwerp] = useState('');
  const [htmlInhoud, setHtmlInhoud] = useState('');
  const bestandInputRef = useRef(null);
  const [voorbeeldModus, setVoorbeeldModus] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Mock drafts data - replace with actual API call
  const [drafts] = useState([
    { id: 1, name: 'Welcome Email', subject: 'Welcome to Our Platform', content: '<h1>Welcome!</h1><p>We are glad to have you...</p>' },
    { id: 2, name: 'Newsletter', subject: 'Monthly Newsletter', content: '<h1>Newsletter</h1><p>Here are the latest updates...</p>' },
    { id: 3, name: 'Product Update', subject: 'New Features Available', content: '<h1>New Features</h1><p>Check out our latest features...</p>' }
  ]);

  const handleBestandUpload = (e) => {
    const bestand = e.target.files?.[0];
    if (bestand) {
      const lezer = new FileReader();
      lezer.onload = (e) => {
        const inhoud = e.target?.result;
        setHtmlInhoud(inhoud);
      };
      lezer.readAsText(bestand);
    }
  };

  const handleLoadDraft = (draft) => {
    setOnderwerp(draft.subject);
    setHtmlInhoud(draft.content);
  };

  const handleOpslaan = async () => {
    try {
      // Replace with actual API call
      console.log('Saving draft:', { onderwerp, htmlInhoud });
      alert('Draft saved successfully!');
    } catch (error) {
      console.error('Error saving draft:', error);
      alert('Error saving draft');
    }
  };

  const handleVerzenden = async () => {
    try {
      // Replace with actual API call
      console.log('Sending email:', { onderwerp, htmlInhoud });
      alert('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error sending email');
    }
  };

  return (
    <div className="flex h-full bg-white rounded-lg shadow">
      {/* Drafts Sidebar */}
      <div className={`relative ${isSidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 ease-in-out border-r border-gray-200`}>
        <div className={`absolute top-0 right-0 ${isSidebarOpen ? 'translate-x-full' : '-translate-x-6'}`}>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="flex items-center justify-center w-6 h-24 bg-blue-600 text-white rounded-r"
          >
            {isSidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
        
        {isSidebarOpen && (
          <div className="h-full p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Drafts</h3>
            <div className="space-y-2">
              {drafts.map((draft) => (
                <button
                  key={draft.id}
                  onClick={() => handleLoadDraft(draft)}
                  className="w-full flex items-center p-2 text-left rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <File className="w-4 h-4 mr-2 text-gray-500" />
                  <div className="truncate">
                    <div className="text-sm font-medium text-gray-900">{draft.name}</div>
                    <div className="text-xs text-gray-500 truncate">{draft.subject}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Nieuwe E-mail Maken</h2>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="onderwerp" className="block text-sm font-medium text-gray-700">
              Onderwerpregel
            </label>
            <input
              type="text"
              id="onderwerp"
              value={onderwerp}
              onChange={(e) => setOnderwerp(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Voer e-mail onderwerp in"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                E-mail Inhoud
              </label>
              <div className="flex space-x-2">
                <button
                  onClick={() => bestandInputRef.current?.click()}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  HTML Uploaden
                </button>
                <button
                  onClick={() => setVoorbeeldModus(!voorbeeldModus)}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {voorbeeldModus ? 'HTML Bewerken' : 'Voorbeeld'}
                </button>
              </div>
            </div>
            <input
              type="file"
              ref={bestandInputRef}
              onChange={handleBestandUpload}
              accept=".html"
              className="hidden"
            />
            {voorbeeldModus ? (
              <div
                className="mt-1 border rounded-md p-4 min-h-[300px]"
                dangerouslySetInnerHTML={{ __html: htmlInhoud }}
              />
            ) : (
              <textarea
                value={htmlInhoud}
                onChange={(e) => setHtmlInhoud(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 font-mono"
                rows={12}
                placeholder="Plak of schrijf hier uw HTML inhoud..."
              />
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={handleOpslaan}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Save className="w-4 h-4 mr-2" />
              Concept Opslaan
            </button>
            <button
              onClick={handleVerzenden}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Send className="w-4 h-4 mr-2" />
              Verzenden naar Allen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}