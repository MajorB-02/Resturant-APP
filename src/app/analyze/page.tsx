'use client';

import { useEffect, useState } from 'react';

interface WebsiteStructure {
  pages: Array<{
    path: string;
    content: string;
  }>;
  components: Array<{
    name: string;
    content: string;
  }>;
  context: Array<{
    name: string;
    content: string;
  }>;
  public: string[];
}

export default function AnalyzePage() {
  const [structure, setStructure] = useState<WebsiteStructure | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStructure = async () => {
      try {
        const response = await fetch('/api/analyze');
        if (!response.ok) {
          throw new Error('Failed to fetch website structure');
        }
        const data = await response.json();
        setStructure(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    };

    fetchStructure();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen p-8">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!structure) {
    return (
      <div className="min-h-screen p-8">
        <h1 className="text-2xl font-bold mb-4">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Website Structure Analysis</h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Pages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {structure.pages.map((page) => (
              <div key={page.path} className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold mb-2">/{page.path || 'home'}</h3>
                <div className="text-sm text-gray-600">
                  {page.content.length} characters
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {structure.components.map((component) => (
              <div key={component.name} className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold mb-2">{component.name}</h3>
                <div className="text-sm text-gray-600">
                  {component.content.length} characters
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Context</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {structure.context.map((context) => (
              <div key={context.name} className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold mb-2">{context.name}</h3>
                <div className="text-sm text-gray-600">
                  {context.content.length} characters
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Public Files</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {structure.public.map((file) => (
              <div key={file} className="bg-white p-4 rounded-lg shadow">
                <div className="text-sm font-mono">{file}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
} 