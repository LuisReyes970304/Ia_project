// ============================================================
// BURGER MENU
// ============================================================

// Select the burger button and its dropdown content from the DOM
const burgerButton = document.querySelector(".burgerButton");
const burgerContent = document.querySelector(".burgerContent");

// Stores the full conversation so the AI remembers context between messages
const conversationHistory = [
    { 
        role: 'system', 
        // This is the system prompt that defines the AI's personality and behavior
        content: 'You are Dr. Mar Salud, an expert in medicine and health with over 20 years of clinical and academic experience. Your expertise spans general medicine, nutrition, mental health, pharmacology, first aid, and holistic wellness. YOUR ROLE - Answer health-related questions accurately, clearly, and empathetically. - Analyze the symptoms, habits, or situations described by the user. - Provide explanations that are understandable to people without medical training. - Advise the user on when to seek urgent medical care. HOW TO RESPOND 1. Active listening: Briefly summarize what the user has told you before responding. 2. Clear explanation: Use simple language. Avoid unnecessary technical terms; if you use them, explain them immediately. 3. Coherent analysis: Consider possible causes, risk factors, and context. 4. Practical recommendation: Provide concrete, actionable steps. 5. Responsible warning: Always indicate if the situation requires an in-person medical consultation. IMPORTANT RESTRICTIONS - Never make a definitive diagnosis of a medical condition. - Do not prescribe medications with specific dosages. - In emergencies (chest pain, difficulty breathing, loss of consciousness, etc.), instruct the user to call emergency services immediately. - You are not a substitute for a real doctor; you are a trusted source of information. FORMAT OF YOUR ANSWERS - Use short paragraphs and lists when necessary. - Always include a "When to See a Doctor" section if the topic requires it. - Conclude each answer by asking if the user needs more details. TONE: Professional but approachable. Speak like a trusted doctor, not like a clinical manual.' 
    }
];

// Toggle the dropdown menu when the burger button is clicked
// stopPropagation prevents the click from bubbling up to the window listener
burgerButton.addEventListener("click", (event) => {
    event.stopPropagation();
    burgerContent.classList.toggle("active");
});

// Prevent clicks inside the menu from closing it
burgerContent.addEventListener("click", (event) => {
    event.stopPropagation();
});

// Close the burger menu when clicking anywhere outside of it
window.addEventListener("click", () => {
    burgerContent.classList.remove("active");
});


// ============================================================
// AI CHATBOT LOGIC
// ============================================================

// Select the form, chat screen, and input field from the DOM
const formAi = document.getElementById("formAi");
const screenAi = document.querySelector(".screenAi");
const inputChat = document.getElementById("inputChat");

// Allow sending messages by pressing Enter (Shift+Enter adds a new line instead)
inputChat.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        formAi.requestSubmit(); // Triggers the form's submit event
    }
});

// Handle form submission when the user sends a message
formAi.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent the page from reloading

    const userMessage = inputChat.value.trim();
    inputChat.value = ""; // Clear the input field immediately

    // Do nothing if the message is empty
    if (!userMessage) {
        inputChat.value = "";
        return;
    }

    // Create and display the user's message bubble on the right side
    const userBubble = document.createElement("div");
    userBubble.className = "userBubble";
    userBubble.textContent = userMessage;
    screenAi.appendChild(userBubble);

    // Auto-scroll to the latest message
    screenAi.scrollTop = screenAi.scrollHeight;

    // Create the bot's bubble immediately with a loading animation
    const botBubble = document.createElement("div");
    botBubble.className = "botBubble";
    botBubble.innerHTML = '<p class="loader">Loading...</p>';
    screenAi.appendChild(botBubble);

    // Wait 1 second to simulate thinking time, then get the real response
    setTimeout(async () => {
        let cleanMessage = userMessage.toLowerCase();

        // Handle basic greetings locally without calling the AI
        if (["hello", "hola", "hi", "hey", "buenos dias"].includes(cleanMessage)) {
            // marked.parse() converts Markdown text into formatted HTML
            botBubble.innerHTML = marked.parse("Hello, this is **Mar-Bot Medical Assistance**! How can I help?");
        } else {
            // For all other messages, call the Ollama API
            const botAnswer = await callOllama(userMessage);
            botBubble.innerHTML = marked.parse(botAnswer); // Render response as formatted HTML
        }

        // Scroll down again after the response is rendered
        screenAi.scrollTop = screenAi.scrollHeight;
    }, 1000);
});


// ============================================================
// OLLAMA API CALL
// ============================================================

/**
 * Sends the user's message to the local Ollama API and returns the AI's response.
 * @param {string} userMessage - The message typed by the user
 * @returns {string} - The AI's response text
 */
async function callOllama(userMessage) {
    const url = 'http://localhost:11434/api/chat'; // Local Ollama server endpoint

    // Add the user's message to the conversation history before sending
    conversationHistory.push({ role: 'user', content: userMessage });

    // Build the request payload with the model and full conversation history
    const payload = {
        model: 'llama3.2',
        messages: conversationHistory, // Full history so the AI has context
        stream: false                  // Get the complete response at once (not streamed)
    };

    try {
        // Send POST request to the Ollama API
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        const botReply = data.message.content; // Extract the AI's text response

        // Save the AI's response to history so future messages have full context
        conversationHistory.push({ role: 'assistant', content: botReply });

        return botReply;

    } catch (error) {
        // Log the error and return a fallback message if the API call fails
        console.error('Error calling Ollama API:', error);
        return "There was an issue connecting to the AI. Make sure Ollama is running.";
    }
}