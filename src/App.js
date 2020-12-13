
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core"
import { useEffect, useState } from "react";
import './App.css';
import InfoBox from './InfoBox';
import Map from './Map';

function App() {

  const[countries, setCountries] = useState([]);
  const[country, setCountry] =  useState(['worldwide']);

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

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    
    setCountry(countryCode);
  };



  return (
    <div className="app"> 

      <div className="app__left"> 

      <div className="app__header"> 
      
      <h1>COVID-19 TRACKER</h1>

      <FormControl className="app__dropdown">
        <Select
          variant="outlined"
          value={country}
          onChange={onCountryChange}
        >
          <MenuItem value="worldwide">Worldwide</MenuItem>
          {
            countries.map(country => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))
          }



        </Select>
      </FormControl>

      </div>

      <div className="app__stats">
        <InfoBox title="Coronavirus Cases" cases={123} total={2000} />

        <InfoBox title="Recovered" cases={1253} total={200}  />

        <InfoBox title="Deaths" cases={126783} total={300}  />
        {/* InfoBoxs title="Corona cases" */}
        {/* InfoBoxs title="corona recoveries" */}
        {/* InfoBoxs */}

      </div>


     {/* Table */}
     {/* Graph */}

     {/* Map */}
     <Map />


      </div>


      <Card className="app__right"> 
      <CardContent>
        <h3>Live Cases by Country</h3>

        <h3>Worldwide New Cases</h3>
      </CardContent>

      </Card>


      </div>

      
  );
}

export default App;
