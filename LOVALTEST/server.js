const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Liste aller verfügbaren Namen
let names = ["Anna", "Ben", "Clara", "David", "Eva", "Felix", "Greta", "Hanna"];

// Speichert Namen, die vergeben wurden (userName -> assignedName)
let assignedNames = {};

app.post('/get-name', (req, res) => {
    const userName = req.body.userName;

    if (!userName) {
        return res.status(400).send({ error: 'Bitte gib deinen Namen ein!' });
    }

    // Überprüfen, ob der Benutzername bereits einen Namen erhalten hat
    if (assignedNames[userName]) {
        return res.status(200).send({
            message: `Hallo ${userName}, du hast bereits den Namen: ${assignedNames[userName]}`
        });
    }

    if (names.length === 0) {
        return res.status(200).send({ message: 'Alle Namen wurden bereits vergeben!' });
    }

    // Zufälligen Namen auswählen und entfernen
    const randomIndex = Math.floor(Math.random() * names.length);
    const assignedName = names.splice(randomIndex, 1)[0];

    // Benutzername und zufälligen Namen speichern
    assignedNames[userName] = assignedName;

    res.status(200).send({ userName, assignedName });
});

app.get('/assigned-names', (req, res) => {
    res.status(200).send({ assignedNames });
});

// HTML-Datei bereitstellen
app.use(express.static(path.join(__dirname, 'public')));

// Server starten
const PORT = 3000;
app.listen(PORT, () => console.log(`Server läuft auf http://localhost:${PORT}`));
