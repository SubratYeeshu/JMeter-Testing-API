const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); 

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the JMeter Performance Test API' });
});

app.post('/data', (req, res) => {
    res.json({ message: 'Data received', data: req.body });
});

app.put('/update', (req, res) => {
    res.json({ message: 'Data updated', data: req.body });
});

app.delete('/delete', (req, res) => {
    res.json({ message: 'Item deleted' });
});

app.get('/delay', (req, res) => {
    setTimeout(() => {
        res.json({ message: 'This response was delayed by 5 seconds' });
    }, 5000);
});

app.get('/compute', (req, res) => {
    let sum = 0;
    for (let i = 0; i < 1e7; i++) {
        sum += i;
    }
    res.json({ message: 'Computation complete', result: sum });
});

app.get('/secure', (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || authHeader !== 'Bearer mysecrettoken') {
        return res.status(403).json({ message: 'Forbidden: Missing or invalid token' });
    }
    res.json({ message: 'Secure data accessed successfully' });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
