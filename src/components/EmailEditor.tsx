import React, { useState, useRef } from 'react';
import { Send, Upload, Save } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

export default function EmailEditor() {
  const [onderwerp, setOnderwerp] = useState('');
  const [htmlInhoud, setHtmlInhoud] = useState('');
  const bestandInputRef = useRef<HTMLInputElement>(null);
  const [voorbeeldModus, setVoorbeeldModus] = useState(false);

  const handleBestandUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const bestand = e.target.files?.[0];
    if (bestand) {
      const lezer = new FileReader();
      lezer.onload = (e) => {
        const inhoud = e.target?.result as string;
        setHtmlInhoud(inhoud);
      };
      lezer.readAsText(bestand);
    }
  };

  const handleOpslaan = async () => {
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .insert([
          {
            name: onderwerp,
            html_content: htmlInhoud,
            subject: onderwerp,
            status: 'concept'
          }
        ])
        .select();

      if (error) throw error;
      
      console.log('Campagne opgeslagen:', data);
      alert('Campagne succesvol opgeslagen!');
    } catch (error) {
      console.error('Fout bij opslaan campagne:', error);
      alert('Fout bij opslaan campagne');
    }
  };

  const handleVerzenden = async () => {
    try {
      // Eerst de campagne opslaan
      const { data: campagne, error: campagneError } = await supabase
        .from('campaigns')
        .insert([
          {
            name: onderwerp,
            html_content: htmlInhoud,
            subject: onderwerp,
            status: 'wordt verzonden',
            sent_at: new Date().toISOString()
          }
        ])
        .select();

      if (campagneError) throw campagneError;

      // Alle ontvangers ophalen
      const { data: ontvangers, error: ontvangersError } = await supabase
        .from('recipients')
        .select('*');

      if (ontvangersError) throw ontvangersError;

      // Tracking events aanmaken voor elke ontvanger
      const gebeurtenissen = ontvangers.map((ontvanger) => ({
        campaign_id: campagne[0].id,
        recipient_id: ontvanger.id,
        event_type: 'verzonden'
      }));

      const { error: gebeurtenissenError } = await supabase
        .from('email_events')
        .insert(gebeurtenissen);

      if (gebeurtenissenError) throw gebeurtenissenError;

      alert('Campagne succesvol verzonden!');
    } catch (error) {
      console.error('Fout bij verzenden campagne:', error);
      alert('Fout bij verzenden campagne');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
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
  );
}