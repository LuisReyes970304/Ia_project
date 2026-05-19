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

formAi.addEventListener("submit", (e) => {
    e.preventDefault();

    const message = inputChat.value.trim();
    inputChat.value = "";

    if(!message) {
        inputChat.value = "";
        return;
    }

    const userBubble = document.createElement("output");
    userBubble.className = "userBubble";
    userBubble.value = message;
    screenAi.appendChild(userBubble);

    screenAi.scrollTop = screenAi.scrollHeight;

    setTimeout(() => {
        const lowerBubble = userBubble.value.toLocaleLowerCase();
        if (["hello", "hola", "hi", "hey", "buenos dias"].includes(lowerBubble)) {
            const botBubble = document.createElement("output");
            botBubble.className = "botBubble";
            botBubble.value = "Hello, this is Mar-Bot! How can I help?";
            screenAi.appendChild(botBubble);
        }

        else {
            const botBubble = document.createElement("output");
            botBubble.className = "botBubble";
            botBubble.value = "Sorry my friend I don't know how to respond to that yet 🙁";
            screenAi.appendChild(botBubble);
        }

        screenAi.scrollTop = screenAi.scrollHeight;

    },1000)

})