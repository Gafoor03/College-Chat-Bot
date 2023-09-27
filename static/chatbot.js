const chatLog = document.getElementById("chat-log");
const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");

sendBtn.addEventListener("click", sendMessage);
chatInput.addEventListener("keypress", function(event) {
	if (event.key === "Enter") {
		sendMessage();
	}
});

function sendMessage() {
	const userMessage = chatInput.value;
	if (userMessage.trim() === "") {
		return;
	}

	const userMessageElem = document.createElement("p");
	userMessageElem.textContent = userMessage;
	userMessageElem.classList.add("user-message");
	chatLog.appendChild(userMessageElem);
	chatInput.value = "";
	const typingIndicatorElem = document.createElement("div");
	typingIndicatorElem.classList.add("text-animation");
	typingIndicatorElem.innerHTML = "Processing your response...";
	chatLog.appendChild(typingIndicatorElem);
	fetch("/chatbot", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ message: userMessage })
	})
	.then(response => response.json())
	.then(data => {
		const botMessageElem = document.createElement("div");
		const botMessage = data.message;
		chatLog.removeChild(typingIndicatorElem);
		botMessageElem.classList.add("bot-message");
		botMessageElem.innerHTML = botMessage;
		chatLog.appendChild(botMessageElem);
		chatLog.scrollTop = chatLog.scrollHeight;
	})
	.catch(error => console.error(error));
}

