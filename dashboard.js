const burgerButton = document.querySelector(".burgerButton");
const burgerContent = document.querySelector(".burgerContent");

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

const formAi = document.getElementById("formAi");
const screenAi = document.querySelector(".screenAi");
const inputChat = document.getElementById("inputChat");

inputChat.addEventListener("keydown", (e) => {
    if(e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        formAi.requestSubmit();
    }
});

formAi.addEventListener("submit", async(e) => {
    e.preventDefault();

    const userMessage = inputChat.value.trim();
    inputChat.value = "";

    if(!userMessage ) {
        inputChat.value = "";
        return;
    }

    const userBubble = document.createElement("div");
    userBubble.className = "userBubble";
    userBubble.textContent = userMessage ;
    screenAi.appendChild(userBubble);

    screenAi.scrollTop = screenAi.scrollHeight;

    setTimeout(async() => {
        let cleanMessage = userMessage.toLowerCase();
        if (["hello", "hola", "hi", "hey", "buenos dias"].includes(cleanMessage)) {
            const botBubble = document.createElement("div");
            botBubble.className = "botBubble";
            botBubble.textContent = "Hello, this is Mar-Bot Medical Assistance! How can I help?";
            screenAi.appendChild(botBubble);
        }

        else {
            const botBubble = document.createElement("div");
            botBubble.className = "botBubble";
            const botAnswer = await callOllama(userMessage);
            botBubble.textContent = botAnswer;
            screenAi.appendChild(botBubble);
        }

        screenAi.scrollTop = screenAi.scrollHeight;

    },800)

})

async function callOllama(userMessage) {
    const url = 'http://localhost:11434/api/chat';

    const payload = {
    model: 'llama3.2',
    messages: [
        { role: 'system', content: 'You are an expert in clinical terminology.' },
        { role: 'user', content: userMessage }
    ],
    stream: false 
    };

    try {
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    const data = await response.json();
    return data.message.content;

    } catch (error) {
    console.error('Error:', error);
    return "There was an issue..."
    }
}

