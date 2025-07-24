import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

export interface ChartData {
  title: string;
  chartType: 'line' | 'bar' | 'pie' | 'scatter';
  data: {
    categories?: string[] | null;
    series: Array<{
      name: string;
      data: number[] | Array<{ name: string; value: number }>;
    }>;
  };
  insights: string;
}

export async function generateChart(prompt: string): Promise<ChartData> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const enhancedPrompt = `
      You are a data visualization expert. Based on the user's request: "${prompt}"
      
      Please generate a response in the following JSON format only (no other text):
      {
        "title": "Chart title",
        "chartType": "line|bar|pie|scatter",
        "data": {
          "categories": ["label1", "label2", ...] or null for non-categorical data,
          "series": [
            {
              "name": "Series name",
              "data": [numbers...] or [{"name": "label", "value": number}...] for pie charts
            }
          ]
        },
        "insights": "Brief insight about the data"
      }
      
      Generate realistic sample data that matches the request. For time series, use appropriate date ranges. For business data, use realistic numbers.
      Make sure the response is valid JSON format.
    `;

    const result = await model.generateContent(enhancedPrompt);
    const response = await result.response;
    const text = response.text();

    // Log the raw AI response for debugging
    console.log('🤖 Raw AI Response:', text);
    console.log('📊 Response length:', text.length);

    // Clean and parse the JSON response
    const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim();
    console.log('🧹 Cleaned text:', cleanedText);
    
    const chartData = JSON.parse(cleanedText);
    console.log('✅ Parsed chart data:', chartData);

    return chartData;
  } catch (error) {
    console.error('Error generating chart:', error);
    throw new Error('Failed to generate chart. Please try again.');
  }
}
