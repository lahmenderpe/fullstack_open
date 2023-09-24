import { useState, useEffect } from "react";

const Weather = ({ weather, country }) => {
	if (weather) {
		return (
			<div>
				<img src={country.flags.png} alt={country.flags.alt} />
				<h1>Weather in {country.name.common}</h1>
				<p>temperature {weather.main.temp} Celcius</p>
				<img
					src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
					alt="weather icon"
				/>
				<p>wind {weather.wind.speed} m/s</p>
			</div>
		);
	}
	return null;
};

const SingleCountry = ({ country }) => {
	const [weather, setWeather] = useState(null);
	useEffect(() => {
		const api_key = process.env.REACT_APP_API_KEY;
		const [lat, lon] = country.latlng;
		const baseURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
		fetch(baseURL)
			.then((response) => response.json())
			.then((response) => setWeather(response))
			.catch((error) => console.log(error));
	}, [country]);

	return (
		<div>
			<h1>{country.name.common}</h1>
			<p>capital: {country.capital[0]}</p>
			<p>area: {country.area}</p>
			<div>
				<h3>languages</h3>
				<ul>
					{Object.keys(country.languages).map((key, index) => {
						return <li key={index}>{country.languages[key]}</li>;
					})}
				</ul>
			</div>
			<Weather weather={weather} country={country} />
		</div>
	);
};

const Countries = ({ countries, inputValue }) => {
	if (!inputValue) return null;
	if (countries.length === 1) {
		return <SingleCountry country={countries[0]} />;
	}
	if (countries.length > 10) {
		return <p>Too many matches, specify another filter</p>;
	}
	return (
		<div>
			{countries.map((country) => {
				return <p key={country.name.common}>{country.name.common}</p>;
			})}
		</div>
	);
};

function App() {
	const [inputValue, setInputValue] = useState("");
	const [countries, setCountries] = useState([]);

	const handleOnChange = (e) => {
		e.preventDefault();
		setInputValue(e.target.value);
	};

	const countriesToShow = countries.filter((country) =>
		country.name.common.toLowerCase().includes(inputValue.toLowerCase())
	);

	useEffect(() => {
		const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";
		fetch(baseUrl)
			.then(async (response) => {
				const jsonValue = await response.json();
				setCountries(jsonValue);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<div>
			<form>
				find countries:{" "}
				<input type="text" value={inputValue} onChange={handleOnChange} />
			</form>
			{inputValue && (
				<Countries countries={countriesToShow} inputValue={inputValue} />
			)}
		</div>
	);
}

export default App;
