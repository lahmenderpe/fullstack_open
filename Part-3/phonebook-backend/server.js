const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(express.static("build"));
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

const errorHandler = (error, request, response, next) => {
	// console.error(error);

	if (error.name === "CastError") {
		return response.status(400).send("malformatted id");
	} else if (error.name === "ValidationError") {
		return response.status(400).json({ error: error.message });
	}

	next(error);
};

// Get all persons
app.get("/api/persons", (req, res) => {
	Person.find({}).then((response) => res.status(200).json(response));
});

// Get e single person
app.get("/api/persons/:id", (req, res, next) => {
	const { id } = req.params;

	Person.findById(id)
		.then((response) => {
			if (response) {
				res.status(200).json(response);
			} else {
				res.status(404).end();
			}
		})
		.catch((error) => next(error));
});

// Delete a single person
app.delete("/api/persons/:id", (req, res, next) => {
	const { id } = req.params;

	Person.findByIdAndRemove(id)
		.then((response) => res.status(204).end())
		.catch((error) => next(error));
});

// Add a new person
app.post("/api/persons", (req, res, next) => {
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

	const person = new Person(req.body);

	person
		.save()
		.then((response) => res.status(200).send(response))
		.catch((error) => next(error));
});

// Update person
app.put("/api/persons/:id", (req, res, next) => {
	const { id } = req.params;
	const body = req.body;

	console.log(body);

	Person.findByIdAndUpdate(id, body, {
		new: true,
		runValidators: true,
		context: "query",
	})
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => next(error));
});

// Get API info
app.get("/api/info", (req, res, next) => {
	Person.find({})
		.then((response) => {
			const text = `Phonebook has info for ${
				response.length
			} <br> ${new Date()}`;
			res.status(200).send(text);
		})
		.catch((error) => next(error));
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running at port ${PORT}...`));
