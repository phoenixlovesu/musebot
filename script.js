
const inputBox = document.getElementById("user-message");   
const sendButton = document.getElementById("send-message"); 
const museaImage = document.getElementById("musea-img");     
const chatOutput = document.getElementById("chat-output"); 

sendButton.addEventListener("click", () => {
    const userMessage = inputBox.value.trim(); 

    if (userMessage) {

        if (chatOutput.innerText === "Chat will appear here.") {
            chatOutput.innerHTML = "";
        }

        chatOutput.innerHTML += `<div><strong>You:</strong> ${userMessage}</div>`;
        chatOutput.innerHTML += `<div id="thinking">Musea is thinking...</div>`; 
        getMuseaResponse(userMessage); 
    }
});

inputBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendButton.click();
    }
});


async function getMuseaResponse(userMessage) {
    try {
        museaImage.classList.add("glowing");
        
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: userMessage })
        });

        // Check if response was successful
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Unknown server error");
        }

        // Parse response  JSON if successful
        const data = await response.json();    
        const museaReply = data.reply;           

        // Remove the "thinking" message
        const thinkingDiv = document.getElementById("thinking");
        if (thinkingDiv) thinkingDiv.remove();

        chatOutput.innerHTML += `<div class="musea-reply"><strong>Musea:</strong> ${museaReply}</div>`; 
        inputBox.value = ""; 

        chatOutput.scrollTop = chatOutput.scrollHeight;

    } catch (error) {
        console.error("Error fetching Musea's reply:", error); 

        const thinkingDiv = document.getElementById("thinking");
        if (thinkingDiv) thinkingDiv.remove();

        chatOutput.innerHTML += `<div class="musea-reply"><strong>Musea:</strong> I'm having trouble thinking right now.</div>`;

        chatOutput.scrollTop = chatOutput.scrollHeight;
    } finally {
        museaImage.classList.remove("glowing");
    }
}
       
    








