'use client';

import { useState } from 'react';
import { generateChart, ChartData } from '@/services/geminiService';
import ChartCard from '@/components/ChartCard';

export default function Home() {
  const [charts, setCharts] = useState<(ChartData & { id: string })[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState('');

  const handleGenerateChart = async (userPrompt: string) => {
    setIsLoading(true);
    try {
      const chartData = await generateChart(userPrompt);
      const newChart = {
        ...chartData,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
      };
      setCharts(prev => [newChart, ...prev]);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate chart. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      handleGenerateChart(prompt.trim());
      setPrompt('');
    }
  };

  const removeChart = (id: string) => {
    setCharts(prev => prev.filter(chart => chart.id !== id));
  };

  const samplePrompts = [
    "Show me monthly sales data for 2024",
    "Create a pie chart of market share by region", 
    "Display quarterly revenue growth trends",
    "Generate a bar chart comparing product categories",
    "Show customer satisfaction scores over time"
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header with Prompt Input */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-6 shadow-sm">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            🤖 AI Data Visualization Dashboard
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the chart you want to create... (e.g., 'Show me sales data for Q4')"
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!prompt.trim() || isLoading}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors duration-200 min-w-[120px]"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  </div>
                ) : (
                  'Generate Chart'
                )}
              </button>
            </div>
          </form>

          {/* Sample Prompts */}
          <div className="mt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">💡 Try these examples:</p>
            <div className="flex flex-wrap gap-2">
              {samplePrompts.map((sample, index) => (
                <button
                  key={index}
                  onClick={() => setPrompt(sample)}
                  disabled={isLoading}
                  className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full transition-colors duration-200 disabled:opacity-50"
                >
                  {sample}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Charts Container */}
      <div className="max-w-6xl mx-auto p-6">
        {charts.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📊</div>
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              No charts yet
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Enter a prompt above to generate your first AI-powered visualization
            </p>
          </div>
        )}

        {/* Loading indicator */}
        {isLoading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Generating chart...</p>
          </div>
        )}

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {charts.map((chart) => (
            <ChartCard
              key={chart.id}
              chartData={chart}
              onClose={() => removeChart(chart.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
