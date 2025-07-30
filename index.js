const express = require('express');
const app = express();

app.use(express.json());

app.post('/bfhl', (req, res) => {
    try {
        const data = req.body.data;
        if (!data || !Array.isArray(data)) {
            throw new Error("Input data must be an array.");
        }

        const odd_numbers = [];
        const even_numbers = [];
        const alphabets = [];
        const special_characters = [];
        let total_sum = 0;

        data.forEach(item => {
            if (!isNaN(parseFloat(item)) && isFinite(item)) {
                const num = parseInt(item, 10);
                total_sum += num;
                if (num % 2 === 0) {
                    even_numbers.push(item);
                } else {
                    odd_numbers.push(item);
                }
            } 
            else if (/^[a-zA-Z]+$/.test(item)) {
                alphabets.push(item);
            } 
            else {
                special_characters.push(item);
            }
        });
        
        const fullAlphabetString = alphabets.join('');
        const reversedString = fullAlphabetString.split('').reverse().join('');
        let concat_string = '';
        for (let i = 0; i < reversedString.length; i++) {
            concat_string += (i % 2 === 0) ? reversedString[i].toUpperCase() : reversedString[i].toLowerCase();
        }

        const response = {
            is_success: true,
            user_id: "akshit_kansal_04022004",
            email: "akshit92.be22@chitkara.edu.in", 
            roll_number: "2210990092",
            even_numbers: even_numbers,        
            odd_numbers: odd_numbers,      
            alphabets: alphabets.map(a => a.toUpperCase()), 
            special_characters: special_characters,         
            sum: total_sum.toString(),                    
            concat_string: concat_string                
        };

        res.status(200).json(response);

    } catch (error) {
        res.status(400).json({ is_success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});