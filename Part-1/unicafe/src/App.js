import { useState } from "react";

const StatisticLine = ({ text, value }) => {
	return (
		<tr>
			<td>{text}</td>
			<td>{value}</td>
		</tr>
	);
};

const Button = ({ handleClick, children }) => {
	return <button onClick={handleClick}>{children}</button>;
};

const Statistics = ({ good, neutral, bad }) => {
	const all = good + neutral + bad;
	const average = (good * 1 + bad * -1) / all;
	const positive = all !== 0 ? (good / all) * 100 : 0;

	return (
		<table>
			<tbody>
				<StatisticLine text="good" value={good} />
				<StatisticLine text="neutral" value={neutral} />
				<StatisticLine text="bad" value={bad} />
				<StatisticLine text="all" value={all} />
				<StatisticLine text="average" value={average.toFixed(1)} />
				<StatisticLine text="positive" value={`${positive.toFixed(1)} %`} />
			</tbody>
		</table>
	);
};

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const handleGood = () => setGood(good + 1);
	const handleNeutral = () => setNeutral(neutral + 1);
	const handleBad = () => setBad(bad + 1);

	return (
		<div>
			<h1>give feedback</h1>
			<Button handleClick={handleGood}>good</Button>
			<Button handleClick={handleNeutral}>neutral</Button>
			<Button handleClick={handleBad}>bad</Button>
			<h1>statistics</h1>
			{good + neutral + bad !== 0 ? (
				<Statistics good={good} neutral={neutral} bad={bad} />
			) : (
				<p>No feedback given</p>
			)}
		</div>
	);
};

export default App;
