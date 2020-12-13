
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
import Table from './Table';
import { sortData } from "./util";

function App() {

  const[countries, setCountries] = useState([]);
  const[country, setCountry] =  useState(['worldwide']);
  const[countryInfo, setCountryInfo] = useState({});
  const[tableData, setTableData] = useState([]);

  // https://disease.sh/v3/covid-19/countries

  //USEEFFECT = runs a piece of code based on a giver condition

useEffect(() => {
  fetch("https://disease.sh/v3/covid-19/all")
  .then(response => response.json())
  .then(data => {
    setCountryInfo(data);
  })
}, [])


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

        const sortedData = sortData(data);
        setTableData(sortedData);
        setCountries(countries)

      })
    }

    getCountryData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    
    setCountry(countryCode);

    //if worldwide it gets url : https://disease.sh/v3/covid-19/all
    //otherwise : https://disease.sh/v3/covid-19/countries/[country_code]

    const url = countryCode == 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : 
    `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode);

      //all of the data from the country
      setCountryInfo(data);
    });



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
        <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />

        <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}  />

        <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}  />
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
        <Table countries={tableData} />

        <h3>Worldwide New Cases</h3>
      </CardContent>

      </Card>


      </div>

      
  );
}

export default App;
