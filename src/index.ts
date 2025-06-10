import express from "express";
import analyzeRouter from "./routes/analyze.route";

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true })); // <-- Agrega esta línea

// Ruta principal para mostrar el editor
app.get('/', (req, res) => {
    res.render('pages/index', { tokens: [], errors: [], input: '' });
});

app.use(analyzeRouter);

app.listen(PORT, () => {
    console.log(`The server is running on http://localhost:${PORT}`);
});