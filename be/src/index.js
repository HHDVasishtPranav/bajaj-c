const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3002;

app.use(bodyParser.json());

const userDetails = {
    user_id: "vasisht_06052004",
    email: "vasishtpranav_hari@srmap.edu.in",
    roll_number: "AP21110010364"
};

app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
        return res.status(400).json({ is_success: false, message: "Invalid input" });
    }

    const numbers = [];
    const alphabets = [];
    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (/^[a-zA-Z]$/.test(item)) {
            alphabets.push(item);
        }
    });

    let highestAlphabet = [];
    if (alphabets.length > 0) {
        let maxChar = alphabets[0];
        for (let i = 1; i < alphabets.length; i++) {
            if (alphabets[i].toUpperCase() > maxChar.toUpperCase()) {
                maxChar = alphabets[i];
            }
        }
        highestAlphabet = [maxChar];
    }

    res.json({
        is_success: true,
        ...userDetails,
        numbers,
        alphabets,
        highest_alphabet: highestAlphabet
    });
});

app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
