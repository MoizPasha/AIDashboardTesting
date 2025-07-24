# 🤖 AI Data Visualization Dashboard

An intelligent dashboard that generates interactive charts and visualizations using AI. Simply describe what you want to see, and the AI will create beautiful charts with realistic data using ECharts and Google's Gemini AI.

## ✨ Features

- **🎯 Natural Language to Charts**: Describe your visualization needs in plain English
- **📊 Multiple Chart Types**: Automatically generates line charts, bar charts, pie charts, and scatter plots
- **🤖 AI-Powered**: Uses Google Gemini 1.5 Flash (free tier) for intelligent chart generation
- **🎨 Interactive Visualizations**: Built with ECharts for smooth, interactive charts
- **📱 Responsive Design**: Works beautifully on desktop and mobile
- **🌙 Dark Mode Ready**: Professional dark theme with white text for better visibility
- **💡 AI Insights**: Each chart includes AI-generated insights about the data
- **🗂️ Multi-Chart Dashboard**: Generate multiple charts and manage them in a floating layout

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS 4
- **Charts**: ECharts with React wrapper
- **AI**: Google Gemini 1.5 Flash API
- **Development**: React 19, Modern ES6+

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- A Google AI Studio account (free)
- Gemini API key

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd ai-dash-testing
npm install
```

### 2. Get Your Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Create a free account
3. Generate an API key
4. Copy the API key

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the dashboard.

## 🎯 How to Use

1. **Enter a Prompt**: Describe the chart you want in the input field
2. **AI Generation**: The AI analyzes your request and generates appropriate data and chart configuration
3. **Interactive Charts**: View your generated charts with hover effects, legends, and insights
4. **Multiple Charts**: Generate multiple charts and manage them on the same page
5. **Close Charts**: Remove charts you no longer need with the × button

### 📝 Example Prompts

Try these sample prompts to see the AI in action:

```
"Show me monthly sales data for 2024"
"Create a pie chart of market share by region"
"Display quarterly revenue growth trends"
"Generate a bar chart comparing product categories"
"Show customer satisfaction scores over time"
"Create a line chart showing quarterly revenue, profit, and expenses for a tech company from 2020 to 2024"
```

## 🏗️ Project Structure

```
src/
├── app/
│   ├── page.tsx              # Main dashboard page
│   ├── layout.tsx            # App layout
│   └── globals.css           # Global styles
├── components/
│   └── ChartCard.tsx         # Individual chart component
└── services/
    └── geminiService.ts      # AI API integration
```

## 🎨 Key Components

### ChartCard Component
- Renders ECharts with multiple chart types
- Handles data transformation from AI response
- Provides interactive features and styling
- White text theme for dark mode compatibility

### Gemini Service
- Manages AI API calls to Google Gemini
- Handles prompt engineering for chart generation
- Parses AI responses into chart-ready data
- Error handling and logging

### Dashboard Page
- Main UI with prompt input
- Chart management and state handling
- Responsive grid layout
- Sample prompts and loading states

## 🔧 Customization

### Adding New Chart Types
1. Update the `ChartData` interface in `geminiService.ts`
2. Add new case in `generateEChartsOption()` in `ChartCard.tsx`
3. Update the AI prompt to include the new chart type

### Styling Charts
Modify the chart styling in `ChartCard.tsx`:
- Colors: Update `baseOption` and series configurations
- Fonts: Modify `textStyle` properties
- Layout: Adjust sizing and positioning

### AI Prompt Engineering
Enhance the AI prompts in `geminiService.ts` to:
- Support more chart types
- Generate more realistic data
- Include additional metadata

## 🐛 Troubleshooting

### Common Issues

1. **API Key Error**: Make sure your Gemini API key is correctly set in `.env.local`
2. **Charts Not Rendering**: Check browser console for ECharts errors
3. **AI Response Issues**: Check console logs for AI response debugging info
4. **Build Errors**: Ensure all dependencies are installed with `npm install`

## 🙏 Acknowledgments

- **Google Gemini AI** for powerful natural language processing
- **Apache ECharts** for beautiful, interactive visualizations
- **Next.js Team** for the amazing React framework
- **Tailwind CSS** for utility-first styling

---

**Built with ❤️ for testing AI-powered data visualization**
