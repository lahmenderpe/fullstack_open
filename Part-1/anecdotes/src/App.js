import { useState } from "react";

const MostVoted = ({ anecdotes, points, popular }) => {
	return (
		<div>
			<p>{anecdotes[popular]}</p>
			<p>has {points[popular]} votes</p>
		</div>
	);
};

const Title = ({ children }) => {
	return <h1>{children}</h1>;
};

const Anectodes = ({ anecdotes, selected, points }) => {
	return (
		<>
			<p>{anecdotes[selected]}</p>
			<p>Has {points[selected]} votes</p>
		</>
	);
};

const Button = ({ handleOnClick, children }) => {
	return <button onClick={handleOnClick}>{children}</button>;
};

const App = () => {
	const anecdotes = [
		"If it hurts, do it more often.",
		"Adding manpower to a late software project makes it later!",
		"The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
		"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
		"Premature optimization is the root of all evil.",
		"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
		"Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
		"The only way to go fast, is to go well.",
	];

	const [selected, setSelected] = useState(0);
	const [popular, setPopular] = useState(null);
	const [points, setPoints] = useState(
		Array.apply(0, new Array(anecdotes.length)).map(() => 0)
	);

	const handleNextAnecdote = () => {
		const num = Math.floor(Math.random() * anecdotes.length);
		setSelected(num);
	};

	const handleVote = (index) => {
		const tempPoints = [...points];
		tempPoints[index] += 1;
		setPoints(tempPoints);
		handlePopular(tempPoints);
	};

	const handlePopular = (points) => {
		const maxVote = Math.max(...points);
		const tempIndex = points.findIndex((i) => i === maxVote);
		setPopular(tempIndex);
	};

	return (
		<div>
			<Title>Anecdote of the day</Title>
			<Anectodes anecdotes={anecdotes} points={points} selected={selected} />
			<Button handleOnClick={() => handleVote(selected)}>vote</Button>
			<Button handleOnClick={handleNextAnecdote}>next anectod</Button>
			<Title>Anectode with most votes</Title>
			{popular !== null ? (
				<MostVoted anecdotes={anecdotes} points={points} popular={popular} />
			) : (
				""
			)}
		</div>
	);
};

export default App;
