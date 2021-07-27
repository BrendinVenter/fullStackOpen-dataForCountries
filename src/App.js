import React, {useState, useEffect} from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';


function App() {
    const [searchText, setSearchText] = useState('');
    const [countries, setCountries] = useState([]);
    const [countryString, setCountryString] = useState('');
    const [showCountry, setShowCountry] = useState(false);
    const [countryFinal, setCountryFinal] = useState({});

    console.log(searchText);

    /* API Call */

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => setCountries(response.data))
            .catch(error => console.log(error));
    }, []);


    /* Fun Fun Functions */

    function handleChange(event) {
        setSearchText(event.target.value);
    }

    const countriesToShow = searchText === '' ? []
        : countries.filter(country => country.name.toLowerCase().includes(searchText.toLowerCase()));

    const handleShowCountry = (event) => {
        setShowCountry(!showCountry);
        const uniqueCountry = event.target.previousSibling;
        const countryString = uniqueCountry.textContent;
        setCountryString(countryString);
        setCountryFinal(countriesToShow.find(country => country.name === countryString));
    };

    const handleReset = () => {
        setCountryString('');
        setCountryFinal({});
        setShowCountry(!showCountry);
    }

    /* Return Elements */

    if (showCountry && countryString !== '') {
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
                        <h3>{countryFinal.name}</h3>
                        <img src={countryFinal.flag} alt={'Country Flag'}/>
                    </div>
                    <p><strong>Capital:</strong> {countryFinal.capital}</p>
                    <p><strong>Population:</strong> {countryFinal.population} </p>
                    <p><strong>Currency:</strong> {countryFinal.currencies[0].name} </p>
                    <h3>Languages</h3>
                    <ul>
                        {countryFinal.languages.map(language => <li key={language.name}>{language.name}</li>)}
                    </ul>
                </div>
                <div>
                    <button onClick={handleReset}>{'<-- Back to Search'}</button>
                </div>
            </div>
        );
    }

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
                {countriesToShow.length > 10 || countriesToShow.length === 0
                    ? 'Check spelling or keep typing to display countries...'
                    : countriesToShow.map(country =>
                        <div key={country.name}>
                            <p>{country.name}</p>
                            <button onClick={handleShowCountry}>View</button>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default App;
