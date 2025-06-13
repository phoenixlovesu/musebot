
const inputBox = document.getElementById("user-message");
const sendButton = document.getElementById("send-message");
const museaImage = document.getElementById("musea-img");
const chatOutput = document.getElementById("chat-output");


sendButton.addEventListener("click", () => {
  
    const userMessage = inputBox.value.trim();

    if(userMessage) {
        chatOutput.innerHTML = "Musea is thinking...";
        getMuseaResponse(userMessage); 
    }

})

async function getMuseaResponse(userMessage) {
    try {
        // Send POST request to backend with the user's message
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: userMessage })
        });

        const data = await response.json();
        const museaReply = data.reply;

        chatOutput.innerHTML = `<strong>Musea:</strong> ${museaReply}`;
        inputBox.value = "";

    } catch (error) {
        console.error("Error fetching Musea's reply:", error);
        chatOutput.innerHTML = "Musea had an error. Please try again later.";

    }
}
            
    







// Function to call OpenAI API (or other bot API)

// Optional: Function to speak text using Web Speech API
