import "./App.css";
// import axios from "axios";
import { useState } from "react";
import { BsCloudHaze } from "react-icons/bs";

function App() {

  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [spinner, setSpinner] = useState();
  let city = "";


  let api = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=25675717fe82d77523b70c705b7c296e&units=metric
  `

  function changeHandler(event) {

    setLocation(event.target.value);
  }

  function cityHandler(event) {

    setSpinner(true);
    event.preventDefault();

    getdata();
    setSpinner(true);

    setLocation('');
  }
  async function getdata() {
    try {
      let res = await fetch(api);
      let data = await res.json();
      setData(data);
      setSpinner(false);
      console.log(data.main);
      console.log(data.weather[0].main);
    }
    catch {
    }
  }

  return (


    <div className="app">
      <div className="container">

        <form onSubmit={cityHandler}>
          <input type="text" value={location} onChange={changeHandler} placeholder="Enter City" />
        </form>
        <div>
          {
            (spinner) ? <div class="spinner"></div> : <span></span>

          }
        </div>
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp " >
            {
              // if data.main available hai tabhi ye kro
              data.main ? <h1>{Math.round(data.main.temp)} <span className="tempspan">°C</span></h1> : null
            }
          </div>


          <div className="desc">
            {
              // if data.main available hai tabhi ye kro
              data.weather ? <p>{data.weather[0].main}</p> : null
            }
          </div>
        </div>

        {
          (data.main) ? <div className="bottom">
            <div className="feels">

              {
                // if data.main available hai tabhi ye kro
                data.main ? <p>{data.main.feels_like}</p> : null
              }

              <p className="bold">Feels like</p>
            </div>
            <div className="humidity">
              {
                // if data.main available hai tabhi ye kro
                data.main ? <p>{data.main.humidity}</p> : null
              }
              <p>Humidity</p></div>
            <div className="wind">
              {
                // if data.main available hai tabhi ye kro
                data.wind ? <p>{data.wind.speed}<span > km/hr</span></p> : null
              }
              <p>Wind Speed</p></div>
          </div> : null
        }
      </div>
    </div>
  );
}

export default App;
