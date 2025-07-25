# 🧠 Input Validation – Feature Branch

This feature branch introduces **Intent Detection** to the AI Dashboard using [`node-nlp`](https://github.com/axa-group/nlp.js). It enables the app to intelligently determine whether a user prompt is requesting a chart or not, helping avoid irrelevant or unsupported inputs, saving API call costs.

---
## 📦 Based On

This project is based on [AI-Dash-testing](https://github.com/ABNmmd/AI-Dash-testing), created by [@ABNmmd](https://github.com/ABNmmd).

This fork extends the original dashboard by adding an NLP-based intent classifier to filter and handle prompt commands intelligently.
---
## 🚀 What This Feature Does

- Detects whether the user wants to **generate a chart** or not.
- Prevents unintended chart generation attempts by checking the user's intent.
- Alerts users to rephrase their prompt if intent confidence is too low.
- NLP model is trained once and reused via API calls (Next.js serverless route).

---

## 🧠 How It Works

1. A small NLP model is trained using predefined chart-related and non-chart phrases.
2. The model is saved to `src/models/intentmodel.nlp`.
3. A Next.js API route (`/api/classify-intent`) receives the prompt, uses `node-nlp` to detect intent, and returns the top intent and confidence score.
4. The frontend calls this API and only proceeds with chart generation if:
   - The intent is `"chart_command"`, and
   - The confidence score is at least `0.3`.

---

## 🗂 File Structure (New & Relevant Files)

```bash
src/
├── app/
│   └── api/
│       └── classify-intent/
│           └── route.ts        # API route that handles intent classification
│
├── scripts/
│   └── createModel.js          # Script to train and save the NLP model
│
├── models/
│   └── intentmodel.nlp         # Saved model file (created after training)
```

### Prerequisites

- Node.js 18+ installed
- A Google AI Studio account (free)
- Gemini API key

### 1. Clone and Install

```bash
git clone https://github.com/MoizPasha/AI-Dashboard-Prototype-1
cd AI-Dashboard-Prototype-1
node src/scripts/createModel.js
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
