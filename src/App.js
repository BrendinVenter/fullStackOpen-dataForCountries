import React, {useState, useEffect} from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {
    const [searchText, setSearchText] = useState('');
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => setCountries(response.data))
            .catch(error => console.log(error));
    }, []);


    function handleChange(event) {
        console.log(event.target.value);
        setSearchText(event.target.value);
    }

    const countriesToShow = searchText === '' ? []
        : countries.filter(country => country.name.toLowerCase().includes(searchText.toLowerCase()));

    console.log(countriesToShow);

    if (countriesToShow.length === 1) {
        return (
            <div className='App'>
                <header className='App-header'>
                    <img src={logo} className='App-logo' alt='logo'/>
                    <h1>Data for Countries</h1>
                </header>
                <hr/>
                <div className={'Main-body'}>
                    <h2>Search for Country</h2>
                    <label/>
                    <input type='text' onChange={handleChange}/>
                </div>
                <br/>
                <div className={'Country-info'}>
                    <div className={'Country-info-header'}>
                        <h3>{countriesToShow[0].name}</h3>
                        <img src={countriesToShow[0].flag} alt={'Country Flag'}/>
                    </div>
                    <p><strong>Capital:</strong> {countriesToShow[0].capital}</p>
                    <p><strong>Population:</strong> {countriesToShow[0].population} </p>
                    <p><strong>Currency:</strong> {countriesToShow[0].currencies[0].name} </p>
                    <h3>Languages</h3>
                    <ul>
                        {countriesToShow[0].languages.map(language => <li key={language.name}>{language.name}</li>)}
                    </ul>
                </div>
            </div>
        );
    }

    console.log(countries);

    return (
        <div className='App'>
            <header className='App-header'>
                <img src={logo} className='App-logo' alt='logo'/>
                <h1>Data for Countries</h1>
            </header>
            <hr/>
            <div className={'Main-body'}>
                <h2>Search for Country</h2>
                <label/>
                <input type='text' onChange={handleChange}/>
            </div>
            <br/>
            <div className={'Countries-list'}>
                {countriesToShow.length > 10
                    ? 'Keep typing to display country list...'
                    : countriesToShow.map(country => <p key={country.name}>{country.name}</p>)}
            </div>
        </div>
    );
}

export default App;
