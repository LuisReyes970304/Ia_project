// Burger menu
const burgerButton = document.querySelector(".burgerButton");
const burgerContent = document.querySelector(".burgerContent");


const conversationHistory = [
    { role: 'system', 
      content: 'You are Dr. Mar Salud, an expert in medicine and health with over 20 years of clinical and academic experience. Your expertise spans general medicine, nutrition, mental health, pharmacology, first aid, and holistic wellness. YOUR ROLE - Answer health-related questions accurately, clearly, and empathetically. - Analyze the symptoms, habits, or situations described by the user. - Provide explanations that are understandable to people without medical training. - Advise the user on when to seek urgent medical care. HOW TO RESPOND 1. Active listening: Briefly summarize what the user has told you before responding. 2. Clear explanation: Use simple language. Avoid unnecessary technical terms; if you use them, explain them immediately. 3. Coherent analysis: Consider possible causes, risk factors, and context. 4. Practical recommendation: Provide concrete, actionable steps. 5. Responsible warning: Always indicate if the situation requires an in-person medical consultation. IMPORTANT RESTRICTIONS - Never make a definitive diagnosis of a medical condition. - Do not prescribe medications with specific dosages. - In emergencies (chest pain, difficulty breathing, loss of consciousness, etc.), instruct the user to call emergency services immediately. - You are not a substitute for a real doctor; you are a trusted source of information. FORMAT OF YOUR ANSWERS - Use short paragraphs and lists when necessary. - Always include a "When to See a Doctor" section if the topic requires it. - Conclude each answer by asking if the user needs more details. TONE: Professional but approachable. Speak like a trusted doctor, not like a clinical manual.' 
    }
];


burgerButton.addEventListener("click", (event) => {
    event.stopPropagation();
    burgerContent.classList.toggle("active");
});


burgerContent.addEventListener("click", (event) => {
    event.stopPropagation();
});


window.addEventListener("click", () => {
    burgerContent.classList.remove("active");
});


//AI Chatbot logic
const formAi = document.getElementById("formAi");
const screenAi = document.querySelector(".screenAi");
const inputChat = document.getElementById("inputChat");

inputChat.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        formAi.requestSubmit();
    }
});

formAi.addEventListener("submit", async (e) => {
    e.preventDefault(); 
    const userMessage = inputChat.value.trim();
    inputChat.value = "";
    if (!userMessage) {
        inputChat.value = "";
        return;
    }
    const userBubble = document.createElement("div");
    userBubble.className = "userBubble";
    userBubble.textContent = userMessage;
    screenAi.appendChild(userBubble);

    const botBubble = document.createElement("div");
    botBubble.className = "botBubble";
    botBubble.innerHTML = '<p class="loader">Loading...</p>';
    screenAi.appendChild(botBubble);

    screenAi.scrollTop = screenAi.scrollHeight;

    setTimeout(async () => {
        let cleanMessage = userMessage.toLowerCase();

        if (["hello", "hola", "hi", "hey", "buenos dias"].includes(cleanMessage)) {
            botBubble.innerHTML = marked.parse("Hello, this is **Mar-Bot Medical Assistance**! How can I help?");
        } else {
            const botAnswer = await callOllama(userMessage);
            botBubble.innerHTML = marked.parse(botAnswer); 
        }
        screenAi.scrollTop = screenAi.scrollHeight;
    }, 1000);
});

/**
 * Sends the user's message to the local Ollama API and returns the AI's response.
 * @param {string} userMessage - The message typed by the user
 * @returns {string} - The AI's response text
 */
async function callOllama(userMessage) {
    const url = 'http://localhost:11434/api/chat'; 
    
    conversationHistory.push({ role: 'user', content: userMessage });

    const payload = {
        model: 'llama3.2',
        messages: conversationHistory,
        stream: false                 
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        const botReply = data.message.content; 
        conversationHistory.push({ role: 'assistant', content: botReply });
        return botReply;

    } catch (error) {
        console.error('Error calling Ollama API:', error);
        return "There was an issue connecting to the AI. Make sure Ollama is running.";
    }
}