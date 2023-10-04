const mongoose = require("mongoose");

if (process.argv.length < 3) {
	console.log("Please provide a password");
	process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://cihan:${password}@command-line-database.rovm43k.mongodb.net/commandLineDatabase?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const numberShema = new mongoose.Schema({
	name: String,
	number: Number,
});

const PhoneNumber = mongoose.model("PhoneNumber", numberShema);

if (process.argv.length === 3) {
	PhoneNumber.find({}).then((response) => {
		console.log(response);
		mongoose.connection.close();
	});
} else if (process.argv.length === 5) {
	const name = process.argv[3];
	const number = process.argv[4];

	const newNumber = new PhoneNumber({
		name,
		number,
	});

	newNumber.save().then((response) => {
		console.log(`added ${name} number ${number} to phonebook`);
		mongoose.connection.close();
	});
}
