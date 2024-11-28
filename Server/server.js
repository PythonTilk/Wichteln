const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Liste aller verfügbaren Namen
let names = ["Anna", "Ben", "Clara", "David", "Eva", "Felix", "Greta", "Hanna"];

// Speichert Namen, die vergeben wurden
let assignedNames = [];

app.post('/get-name', (req, res) => {
    const userName = req.body.userName;

    if (!userName) {
        return res.status(400).send({ error: 'Bitte einen Namen angeben!' });
    }

    if (names.length === 0) {
        return res.status(200).send({ message: 'Keine Namen mehr verfügbar!' });
    }

    // Zufälligen Namen auswählen und entfernen
    const randomIndex = Math.floor(Math.random() * names.length);
    const assignedName = names.splice(randomIndex, 1)[0];

    // Namen zu vergebenen Namen hinzufügen
    assignedNames.push({ userName, assignedName });

    res.status(200).send({ userName, assignedName });
});

app.get('/assigned-names', (req, res) => {
    res.status(200).send({ assignedNames });
});

// Server starten
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));
