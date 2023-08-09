// Header component
const Header = ({ course }) => {
	return <h1>{course}</h1>;
};

// Content component
const Content = ({ parts }) => {
	return (
		<>
			<Part part={parts[0]} />
			<Part part={parts[1]} />
			<Part part={parts[2]} />
		</>
	);
};

// Part component
const Part = ({ part }) => {
	return (
		<p>
			{part.name} {part.exercises}
		</p>
	);
};

// Footer component
const Footer = ({ parts }) => {
	const exerciseTotal = parts.reduce(
		(accumulator, currentValue) => accumulator + currentValue.exercises,
		0
	);
	return <p>Number of exercises {exerciseTotal}</p>;
};

// App component
const App = () => {
	const course = {
		name: "Half Stack application development",
		parts: [
			{
				name: "Fundamentals of React",
				exercises: 10,
			},
			{
				name: "Using props to pass data",
				exercises: 7,
			},
			{
				name: "State of a component",
				exercises: 14,
			},
		],
	};

	return (
		<div>
			<Header course={course.name} />
			<Content parts={course.parts} />
			<Footer parts={course.parts} />
		</div>
	);
};

export default App;
