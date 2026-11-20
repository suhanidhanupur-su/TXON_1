const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static("public"));

// Contact form API
app.post("/send-message", (req, res) => {
    const { name, email, message } = req.body;

    // Validate presence of required fields
    if (!name || !email || !message || !name.trim() || !email.trim() || !message.trim()) {
        return res.status(400).json({
            success: false,
            message: "Please fill in all fields (name, email, and message)."
        });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
        return res.status(400).json({
            success: false,
            message: "Please enter a valid email address."
        });
    }

    console.log("----------------------------------------");
    console.log("New Contact Message Received:");
    console.log("Name:   ", name.trim());
    console.log("Email:  ", email.trim());
    console.log("Message:", message.trim());
    console.log("Time:   ", new Date().toISOString());
    console.log("----------------------------------------");

    return res.json({
        success: true,
        message: "Thank you! Your message has been received successfully."
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
