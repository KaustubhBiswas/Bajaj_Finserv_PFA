const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());


const FULL_NAME = "kaustubh_biswas";
const DOB = "30112003";
const EMAIL = "kaustubhbiswas001@gmail.com";
const ROLL_NUMBER = "22BCE2176";

const USER_ID = `${FULL_NAME}_${DOB}`;


function isNumber(str) {
    return /^\d+$/.test(str);
}


function alternatingCaps(str) {
    return str
        .split("")
        .map((c, i) => (i % 2 === 0 ? c.toUpperCase() : c.toLowerCase()))
        .join("");
}


app.post("/bfhl", (req, res) => {
    try {
        const data = req.body.data;
        let evens = [], odds = [], alphabets = [], specials = [];
        let sum = 0;

        data.forEach(item => {
            if (isNumber(item)) {
                let num = parseInt(item);
                sum += num;
                if (num % 2 === 0) {
                    evens.push(item);
                } else {
                    odds.push(item);
                }
            } else if (/^[a-zA-Z]+$/.test(item)) {
                alphabets.push(item.toUpperCase());
            } else {
                specials.push(item);
            }
        });


        let allAlpha = data.filter(x => /^[a-zA-Z]+$/.test(x)).join("");
        let reversed = allAlpha.split("").reverse().join("");
        let concatStr = alternatingCaps(reversed);

        res.status(200).json({
            is_success: true,
            user_id: USER_ID,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            even_numbers: evens,
            odd_numbers: odds,
            alphabets: alphabets,
            special_characters: specials,
            sum: sum.toString(),
            concat_string: concatStr
        });
    } catch (err) {
        res.status(500).json({
            is_success: false,
            user_id: USER_ID,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            error: err.message
        });
    }
});


app.get("/", (req, res) => {
    res.send("Bajaj Finserv BFHL API is running 🚀");
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
