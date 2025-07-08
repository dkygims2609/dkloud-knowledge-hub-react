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
      
      const response = await fetch(POETRY_API_URL);
      if (!response.ok) {
        throw new Error(`Failed to fetch poetry: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Ensure data is an array before mapping
      const dataArray = Array.isArray(data) ? data : data.data || [];
      
      // Transform Google Docs API response to our format
      const transformedPoetry: PoetryEntry[] = dataArray.map((item: any, index: number) => ({
        title: item.title || `Poetry ${index + 1}`,
        content: item.content || item.text || '',
        date: item.date || new Date().toISOString().split('T')[0]
      }));
      
      setPoetry(transformedPoetry);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch poetry');
      console.error('Error fetching poetry:', err);
      
      // Fallback to hardcoded data on error
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
        }
      ];
      setPoetry(fallbackPoetry);
    } finally {
      setLoading(false);
    }
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