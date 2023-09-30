const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(
	morgan(function (tokens, req, res) {
		return [
			tokens.method(req, res),
			tokens.url(req, res),
			tokens.status(req, res),
			tokens["response-time"](req, res),
			"ms",
			"-",
			JSON.stringify(req.body),
		].join(" ");
	})
);

let persons = [
	{
		name: "Arto Hellas",
		number: "040-123456",
		id: 1,
	},
	{
		name: "Ada Lovelace",
		number: "39-44-5323523",
		id: 2,
	},
	{
		name: "Dan Abramov",
		number: "12-43-234345",
		id: 3,
	},
	{
		name: "Mary Poppendieck",
		number: "39-23-6423122",
		id: 4,
	},
];

// Get all persons
app.get("/api/persons", (req, res) => {
	res.status(200).send(persons);
});

// Get e single person
app.get("/api/persons/:id", (req, res) => {
	const { id } = req.params;
	const person = persons.find((person) => Number(person.id) === Number(id));

	if (!person) {
		res.status(404).send();
		return;
	}

	res.status(200).json(person);
});

// Delete a single person
app.delete("/api/persons/:id", (req, res) => {
	const { id } = req.params;

	persons = persons.filter((person) => Number(person.id) !== Number(id));
	res.status(200).send();
});

// Add a new person
app.post("/api/persons", (req, res) => {
	const newId = Math.floor(Math.random() * 100000000);
	const { name, number } = req.body;
	const foundName = persons.find(
		(p) => p.name.toLowerCase() === name.toLowerCase()
	);

	if (!name || !number) {
		res.status(400).json({ error: "please provide a name and number" });
		return;
	}

	if (foundName) {
		res.status(400).json({ error: "The name must be unique" });
		return;
	}

	const person = { id: newId, ...req.body };
	persons.push(person);
	res.status(200).send(person);
});

// Get API info
app.get("/api/info", (req, res) => {
	const text = `Phonebook has info for ${persons.length} <br> ${new Date()}`;
	res.status(200).send(text);
});

app.listen(PORT, () => console.log(`Server is running at port ${PORT}...`));
