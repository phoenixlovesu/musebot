
const inputBox = document.getElementById("user-message");   
const sendButton = document.getElementById("send-message"); 
const museaImage = document.getElementById("musea-img");     
const chatOutput = document.getElementById("chat-output"); 

sendButton.addEventListener("click", () => {
    const userMessage = inputBox.value.trim(); 

    if (userMessage) {
        chatOutput.innerHTML = "Musea is thinking..."; 
        getMuseaResponse(userMessage); 
    }
});


async function getMuseaResponse(userMessage) {
    try {
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

        chatOutput.innerHTML = `<strong>Musea:</strong> ${museaReply}`; 
        inputBox.value = ""; 
    } catch (error) {
        console.error("Error fetching Musea's reply:", error); 
        chatOutput.innerHTML = `<strong>Musea:</strong> I'm having trouble thinking right now.`;
    }
}
       
    








