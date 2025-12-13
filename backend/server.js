const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const DATA_DIR = path.join(__dirname, 'data');
const PROGRAMS_FILE = path.join(DATA_DIR, 'programs.json');
const NOTICES_FILE = path.join(DATA_DIR, 'notices.json');
const ADMINS_FILE = path.join(DATA_DIR, 'admins.json');
const SCOREBOARD_FILE = path.join(DATA_DIR, 'scoreboard.json');

// Helper to read data
const readData = (file) => {
    if (!fs.existsSync(file)) return [];
    try {
        const data = fs.readFileSync(file);
        return JSON.parse(data);
    } catch (e) {
        return [];
    }
};

// Helper to write data
const writeData = (file, data) => {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

// Login Endpoint
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const admins = readData(ADMINS_FILE);
    const admin = admins.find(a => a.username === username && a.password === password);

    if (admin) {
        res.json({ success: true, token: 'admin-token-123' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// --- Programs CRUD ---

app.get('/api/programs', (req, res) => {
    const programs = readData(PROGRAMS_FILE);
    res.json(programs);
});

app.post('/api/programs', (req, res) => {
    const programs = readData(PROGRAMS_FILE);
    const newProgram = { id: Date.now(), ...req.body };
    programs.push(newProgram);
    writeData(PROGRAMS_FILE, programs);
    res.json(newProgram);
});

app.put('/api/programs/:id', (req, res) => {
    const { id } = req.params;
    let programs = readData(PROGRAMS_FILE);
    const index = programs.findIndex(p => p.id == id);
    if (index !== -1) {
        programs[index] = { ...programs[index], ...req.body };
        writeData(PROGRAMS_FILE, programs);
        res.json(programs[index]);
    } else {
        res.status(404).json({ message: 'Program not found' });
    }
});

app.delete('/api/programs/:id', (req, res) => {
    const { id } = req.params;
    let programs = readData(PROGRAMS_FILE);
    programs = programs.filter(p => p.id != id);
    writeData(PROGRAMS_FILE, programs);
    res.json({ success: true });
});

// --- Notices CRUD ---

app.get('/api/notices', (req, res) => {
    const notices = readData(NOTICES_FILE);
    res.json(notices);
});

app.post('/api/notices', (req, res) => {
    const notices = readData(NOTICES_FILE);
    const newNotice = { id: Date.now(), ...req.body };
    notices.push(newNotice);
    writeData(NOTICES_FILE, notices);
    res.json(newNotice);
});

app.put('/api/notices/:id', (req, res) => {
    const { id } = req.params;
    let notices = readData(NOTICES_FILE);
    const index = notices.findIndex(n => n.id == id);
    if (index !== -1) {
        notices[index] = { ...notices[index], ...req.body };
        writeData(NOTICES_FILE, notices);
        res.json(notices[index]);
    } else {
        res.status(404).json({ message: 'Notice not found' });
    }
});

app.delete('/api/notices/:id', (req, res) => {
    const { id } = req.params;
    let notices = readData(NOTICES_FILE);
    notices = notices.filter(n => n.id != id);
    writeData(NOTICES_FILE, notices);
    res.json({ success: true });
});

// --- Scoreboard CRUD ---

app.get('/api/scoreboard', (req, res) => {
    const scores = readData(SCOREBOARD_FILE);
    res.json(scores);
});

app.post('/api/scoreboard', (req, res) => {
    const scores = readData(SCOREBOARD_FILE);
    const newScore = { id: Date.now(), ...req.body };
    scores.push(newScore);
    writeData(SCOREBOARD_FILE, scores);
    res.json(newScore);
});

app.put('/api/scoreboard/:id', (req, res) => {
    const { id } = req.params;
    let scores = readData(SCOREBOARD_FILE);
    const index = scores.findIndex(s => s.id == id);
    if (index !== -1) {
        scores[index] = { ...scores[index], ...req.body };
        writeData(SCOREBOARD_FILE, scores);
        res.json(scores[index]);
    } else {
        res.status(404).json({ message: 'Score entry not found' });
    }
});

app.delete('/api/scoreboard/:id', (req, res) => {
    const { id } = req.params;
    let scores = readData(SCOREBOARD_FILE);
    scores = scores.filter(s => s.id != id);
    writeData(SCOREBOARD_FILE, scores);
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
