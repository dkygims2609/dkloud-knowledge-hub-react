import { useState, useEffect } from 'react';

export interface PoetryEntry {
  title: string;
  content: string;
  date?: string;
}

const POETRY_API_URL = 'https://script.google.com/macros/s/AKfycbw4PvCj4kfRAx2tO0w8s4L4weAqElJkJgabgW1creQnVTmOnTNSJcv3ZSrB_97zjd50Ag/exec';

export function usePoetryAPI() {
  const [poetry, setPoetry] = useState<PoetryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPoetry = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try to fetch from the Google Apps Script endpoint with proper CORS handling
      const response = await fetch(POETRY_API_URL, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch poetry: ${response.status} ${response.statusText}`);
      }
      
      const textData = await response.text();
      console.log('Raw response:', textData);
      
      let data;
      try {
        data = JSON.parse(textData);
      } catch (parseError) {
        console.error('Failed to parse JSON:', parseError);
        throw new Error('Invalid JSON response from server');
      }
      
      // Handle different response formats
      let dataArray;
      if (Array.isArray(data)) {
        dataArray = data;
      } else if (data.data && Array.isArray(data.data)) {
        dataArray = data.data;
      } else if (data.result && Array.isArray(data.result)) {
        dataArray = data.result;
      } else if (typeof data === 'string') {
        // If it's a string, try to parse it as poetry entries
        dataArray = parsePoetryText(data);
      } else {
        console.warn('Unexpected data format:', data);
        dataArray = [];
      }
      
      // Transform to our format
      const transformedPoetry: PoetryEntry[] = dataArray.map((item: any, index: number) => {
        if (typeof item === 'string') {
          return {
            title: `Poetry ${index + 1}`,
            content: item,
            date: new Date().toISOString().split('T')[0]
          };
        }
        return {
          title: item.title || item.heading || `Poetry ${index + 1}`,
          content: item.content || item.text || item.body || '',
          date: item.date || item.created_at || new Date().toISOString().split('T')[0]
        };
      }).filter(entry => entry.content.trim() !== '');
      
      if (transformedPoetry.length > 0) {
        setPoetry(transformedPoetry);
      } else {
        throw new Error('No valid poetry entries found in response');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch poetry';
      setError(errorMessage);
      console.error('Error fetching poetry:', err);
      
      // Enhanced fallback poetry
      const fallbackPoetry: PoetryEntry[] = [
        {
          title: "1. मेरी Peace",
          content: "मुझे लोग दस बीस नही चाहिए..\nतुझसे दूरी हरगिज नहीं चाहिए..\nतेरी बाहों में आके मिलती है जो मुझे..\nहां हां मुझे पीस वही चाहिए....",
          date: "2024-01-15"
        },
        {
          title: "2. प्यार के बारे में",
          content: "मेरे पास वक्त कितना है, नहीं जानता हूं।।\nतुम्हारे साथ जीना है मुझे, बस यही जानता हूं।।\nऔर तुमने प्यार में सिखाया है जो भी आजतक।\nप्यार के बारे में मैं बस वही जानता हूं।।",
          date: "2024-01-14"
        },
        {
          title: "3. सपनों का राजा",
          content: "सपनों का राजा हूं मैं,\nहकीकत से दूर।\nख्वाबों में जीता हूं,\nजिंदगी अधूरी।",
          date: "2024-01-13"
        }
      ];
      setPoetry(fallbackPoetry);
    } finally {
      setLoading(false);
    }
  };

  const parsePoetryText = (text: string): PoetryEntry[] => {
    const entries: PoetryEntry[] = [];
    const lines = text.split('\n').filter(line => line.trim() !== '');
    
    let currentEntry: PoetryEntry | null = null;
    let contentLines: string[] = [];
    
    for (const line of lines) {
      if (line.includes('Shayari') || line.match(/^\d+\./) || line.match(/^Title:/i)) {
        // Save previous entry if exists
        if (currentEntry && contentLines.length > 0) {
          currentEntry.content = contentLines.join('\n');
          entries.push(currentEntry);
        }
        
        // Start new entry
        currentEntry = {
          title: line.replace(/^Title:\s*/i, '').trim(),
          content: ""
        };
        contentLines = [];
      } else if (line.trim() !== '') {
        // Add to content
        contentLines.push(line.trim());
      }
    }
    
    // Don't forget the last entry
    if (currentEntry && contentLines.length > 0) {
      currentEntry.content = contentLines.join('\n');
      entries.push(currentEntry);
    }
    
    return entries;
  };

  const refreshPoetry = async () => {
    await fetchPoetry();
  };

  useEffect(() => {
    fetchPoetry();
  }, []);

  return {
    poetry,
    loading,
    error,
    refreshPoetry
  };
}