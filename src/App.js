
import {
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core"
import { useEffect, useState } from "react";
import './App.css';

function App() {

  const[countries, setCountries] = useState([]);

  // https://disease.sh/v3/covid-19/countries

  //USEEFFECT = runs a piece of code based on a giver condition

  useEffect(() => {
    //runs the code inside only once once the component loads (only once)
    // async -> send a request, wait for it and do something with info
    const getCountryData = async () => {
      await fetch ("https://disease.sh/v3/covid-19/countries").then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => (
          {
            name: country.country,  // Unisted States, United Kingdom
            value: country.countryInfo.iso2 // UK,USK,FR
          }
        ));

        setCountries(countries)

      })
    }

    getCountryData();
  }, []);

  return (
    <div className="app"> 

      <div className="app__header"> 
      
      <h1>COVID-19 TRACKER</h1>

      <FormControl className="app__dropdown">
        <Select
          variant="outlined"
          value="abc"
          onchange=""
        >

          {
            countries.map(country => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))
          }

          {/*
          <MenuItem value="worldwide">Worldwide</MenuItem>
          <MenuItem value="worldwide">22</MenuItem>
          <MenuItem value="worldwide">ddde</MenuItem>
          <MenuItem value="worldwide">Wdwide</MenuItem>
          */}


        </Select>
      </FormControl>

      </div>

     
     {/* Header */}
     {/* Title + Select input dropdown field */}

     {/* InfoBoxs */}
     {/* InfoBoxs */}
     {/* InfoBoxs */}

     {/* Table */}
     {/* Graph */}

     {/* Map */}

    </div>
  );
}

export default App;
