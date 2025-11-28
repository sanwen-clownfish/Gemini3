import React from "react";
import { createRoot } from "react-dom/client";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: "YOUR_SILICONFLOW_KEY",       // ← 在这里填入你的 Key
  baseURL: "https://api.siliconflow.cn/v1"
});

function App() {
  const [input, setInput] = React.useState("");
  const [response, setResponse] = React.useState("");

  async function handleSend() {
    const completion = await client.chat.completions.create({
      model: "deepseek-ai/DeepSeek-V2",  // 可换别的免费模型
      messages: [
        { role: "user", content: input }
      ]
    });
    setResponse(completion.choices[0].message.content);
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Free AI (DeepSeek via SiliconFlow)</h1>

      <textarea
        className="w-full mt-4 p-3 bg-zinc-900 rounded"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask DeepSeek something..."
      />

      <button
        className="px-5 py-2 mt-4 bg-blue-600 rounded"
        onClick={handleSend}
      >
        Send
      </button>

      <pre className="mt-6 bg-zinc-800 p-4 rounded text-sm whitespace-pre-wrap">
        {response}
      </pre>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
