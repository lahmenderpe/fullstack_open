import { useState, useEffect } from "react";
import personService from "./services/server";
import "./app.css";

const Filter = ({ value, onchange }) => {
	return (
		<form>
			<div>
				filter shown with:{" "}
				<input value={value} onChange={(e) => onchange(e.target.value)} />
			</div>
		</form>
	);
};

const PersonForm = ({
	nameValue,
	numberValue,
	nameOnChange,
	numberOnChange,
	handleSubmit,
}) => {
	return (
		<form>
			<div>
				name:{" "}
				<input
					value={nameValue}
					onChange={(e) => nameOnChange(e.target.value)}
				/>
			</div>
			<div>
				number:{" "}
				<input
					value={numberValue}
					onChange={(e) => numberOnChange(e.target.value)}
				/>
			</div>
			<div>
				<button onClick={handleSubmit} type="submit">
					add
				</button>
			</div>
		</form>
	);
};

const Persons = ({ personsList, handleDelete }) => {
	return (
		<section>
			{personsList.map((person) => (
				<div key={person.id}>
					{person.name} {person.number}{" "}
					<button onClick={() => handleDelete(person.id)}>delete</button>
				</div>
			))}
		</section>
	);
};

const Notification = ({ errorMessage }) => {
	const { message, type } = errorMessage;

	if (message === null) return null;

	return (
		<div className={`notification ${type === "success" ? "success" : "error"}`}>
			{message}
		</div>
	);
};

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filterTerm, setFilterTerm] = useState("");
	const [errorMessage, setErrorMessage] = useState({
		message: null,
		type: null,
	});

	const personsToShow = persons.filter(
		(person) => person.name.toLowerCase().indexOf(filterTerm.toLowerCase()) > -1
	);

	const showMessage = (message, type) => {
		setErrorMessage({ message, type });

		setTimeout(() => {
			setErrorMessage({ message: null, type: null });
		}, 3000);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!newName || !newNumber) return;
		const sameName = persons.find(
			(person) => person.name.toLowerCase() === newName.toLowerCase()
		);

		if (sameName) {
			const response = window.confirm(
				`${sameName.name} is already added to phonebook, replace the old number with a new one?`
			);
			if (response) {
				const newPerson = { ...sameName, number: newNumber };
				personService
					.updatePerson(newPerson.id, newPerson)
					.then((response) => {
						const index = persons.findIndex(
							(person) => person.id === sameName.id
						);
						const tempPersons = [...persons];
						tempPersons.splice(index, 1, response.data);
						setPersons(tempPersons);
						console.log("Burayasadds");
						showMessage(
							`${newPerson.name} successfully added to phonebook`,
							"success"
						);
						clearAddFields();
					})
					.catch((error) => {
						showMessage(
							`Something went wrong while adding ${newPerson.name} to phonebook`,
							"error"
						);
					});

				return;
			}
		}

		const newPerson = { name: newName, number: newNumber };
		personService
			.addPerson(newPerson)
			.then((response) => {
				const tempState = persons.concat(response.data);
				setPersons(tempState);
				showMessage(
					`${newPerson.name} successfully added to phonebook`,
					"success"
				);
				clearAddFields();
			})
			.catch((error) => {
				console.log(error);
				if (error.response.status === 404) {
					showMessage(
						`Something went wrong while adding ${newPerson.name} to phonebook`,
						"error"
					);
				}
			});
	};

	const clearAddFields = () => {
		setNewName("");
		setNewNumber("");
	};

	const handleDelete = async (id) => {
		const foundPerson = persons.find((person) => person.id === id);
		if (window.confirm(`Delete ${foundPerson.name}`)) {
			personService
				.deletePerson(id)
				.then((response) => {
					if (response.status === 200) {
						const tempList = persons.filter((person) => person.id !== id);
						showMessage(`${foundPerson.name} deleted successfully`, "success");
						setPersons(tempList);
					}
				})
				.catch((error) => {
					if (error.response.status === 404) {
						showMessage(
							`Information of ${foundPerson.name} has already been removed from server`,
							"error"
						);
					}
				});
		}
	};

	useEffect(() => {
		personService
			.getAll()
			.then((response) => setPersons(response.data))
			.catch((error) => console.error(error));
	}, []);

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter value={filterTerm} onchange={setFilterTerm} />
			<Notification errorMessage={errorMessage} />
			<h2>Add new</h2>
			<PersonForm
				nameValue={newName}
				numberValue={newNumber}
				nameOnChange={setNewName}
				numberOnChange={setNewNumber}
				handleSubmit={handleSubmit}
			/>
			<h2>Numbers</h2>
			{persons.length > 0 && (
				<Persons personsList={personsToShow} handleDelete={handleDelete} />
			)}
		</div>
	);
};

export default App;
