// Serverless function for vercel to run as backend code

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({message: "Method not allowed" });
    }

    // Get the user's message from the frontend request
    const { message } = req.body;

    try {
        const repsonse = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body.JSON.stringify({
                model: "gpt-4o",
                messages: [
                    { role: "system", content: "You are Musea, a friendly pixel-art Ai who gives creative, kind, and playful replies."},
                    { role: "user", content: message }
                ]
            })
        });

        const data = await repsonse.json();

        const museaReply = data.choices[0].message.content; //Extract the chatbot's reply message
        res.status(200).json({ reply: museaReply }); // Send thst reply back to the frontend as JSON

    } catch (err) {

        console.error("OpenAI API error:", err);
        res.status(500).json({ error: "Something went wrong." });
    }
}