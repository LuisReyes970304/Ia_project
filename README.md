# 🩺 Mar-Bot — Medical AI Assistant
 
Mar-Bot is a web-based medical chatbot powered by **Llama 3.2** running locally via **Ollama**. It acts as a virtual health assistant called *Dr. Mar Salud*, capable of answering health-related questions with clarity, empathy, and structured responses — all from your own machine, with no data sent to the cloud.
 
---
 
## 📸 Features
 
- 🤖 **Local AI** — Runs entirely on your machine using Ollama + Llama 3.2
- 🧠 **Conversation memory** — Remembers the full chat history within a session
- 💬 **Markdown rendering** — Responses display with proper formatting (bold, lists, sections)
- 🩺 **Medical role prompt** — The assistant behaves as an experienced health expert
- 🌐 **Multilingual** — Responds in the same language the user writes in
- 🍔 **Burger menu** — Navigation menu with profile options
- ⚡ **Enter to send** — Press Enter to submit (Shift+Enter for new line)
---
 
## 🗂️ Project Structure
 
```
mar-bot/
├── index.html        # Main HTML layout
├── style.css         # Styles and theming (CSS variables)
└── dashboard.js      # Chatbot logic and Ollama API integration
```
 
---
 
## 🛠️ Tech Stack
 
| Technology | Purpose |
|---|---|
| HTML5 | Page structure |
| CSS3 | Styling and layout |
| JavaScript (Vanilla) | Chatbot logic and DOM manipulation |
| [Ollama](https://ollama.com) | Local LLM server |
| Llama 3.2 | AI language model |
| [Marked.js](https://marked.js.org) | Markdown to HTML rendering |
 
---
 
## ⚙️ Requirements
 
- [Ollama](https://ollama.com/download) installed on your machine
- Llama 3.2 model downloaded
- A modern web browser (Chrome, Firefox, Edge)
---
 
## 🚀 Getting Started
 
### 1. Install Ollama
 
Download and install Ollama from [https://ollama.com/download](https://ollama.com/download)
 
### 2. Download the Llama 3.2 model
 
```bash
ollama pull llama3.2
```
 
### 3. Start Ollama with CORS enabled
 
**Windows (PowerShell):**
```powershell
$env:OLLAMA_ORIGINS="*"
ollama serve
```
 
**Linux / macOS:**
```bash
OLLAMA_ORIGINS=* ollama serve
```
 
> ⚠️ Keep this terminal open while using the chatbot.
 
### 4. Open the project
 
Open `index.html` in your browser. The chatbot will be ready to use.
 
---
 
## 🧠 AI System Prompt
 
The assistant uses a detailed system prompt that defines its behavior as *Dr. Mar Salud*:
 
- Summarizes what the user said before responding (active listening)
- Uses simple, clear language accessible to non-medical users
- Analyzes possible causes, risk factors, and context
- Provides concrete, actionable recommendations
- Always includes a **"When to See a Doctor"** section when relevant
- Never makes definitive diagnoses or prescribes medications with specific dosages
- Instructs users to call emergency services in critical situations
---
 
## 💡 How It Works
 
```
User types a message
        ↓
dashboard.js sends message to Ollama API (localhost:11434)
        ↓
Ollama processes with Llama 3.2 + full conversation history
        ↓
Response is rendered as formatted HTML using Marked.js
        ↓
Bot bubble appears in the chat screen
```
 
---
 
## ⚠️ Disclaimer
 
> Mar-Bot is an **informational tool only**. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider for medical concerns.
 
---
 
## 👨‍💻 Author
 
Developed by **Luis Reyes**, **Dilan Chavez**, and **Sebastián Arevalo** —RIWI Cohort 5, Barranquilla, Colombia.
