const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.MONGODB_URL;

mongoose
	.connect(url)
	.then((response) => console.log("connected to Mongo"))
	.catch((error) => console.log("error connecting to MongoDB:", error.message));

const personSchema = mongoose.Schema({
	name: {
		type: String,
		minLength: 3,
		required: true,
	},
	number: {
		type: String,
		required: true,
		minLength: 8,
		validate: {
			validator: function (number) {
				return /^\d{2,3}-\d+$/.test(number);
			},
		},
	},
});

personSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
