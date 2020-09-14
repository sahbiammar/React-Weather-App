import React, { Component } from 'react'; 
import Form from './Components/Form';
import Weather from './Components/Weather';



const API_KEY = "a7f9e64ba4e3d508f85bda742ab459f6";
// http://api.openweathermap.org/data/2.5/weather?q=cairo,egypt&appid=e36ed364400282e43250b6c4c0274d44

class App extends Component {

  state = {
    tempreature: '',
    city: '',
    country: '',
    humidity: '',
    description: '',
    error: ''
  }

  getWeather = async  (e) => {
    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    
    const api = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`)
    const data = await api.json();
    if(city && country) {
      this.setState({
        tempreature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ''
      })
    } else {
      this.setState({
        tempreature: '',
        city: '',
        country: '',
        humidity: '',
        description: '',
        error: 'Please Enter City And Country'
      })
    }
  }


  render() {
    return (
      <div className="wrapper">
        <div className="form-container">
          <Form getWeather={this.getWeather}/>
          <Weather 
              tempreature= {this.state.tempreature}
              city= {this.state.city}
              country= {this.state.country}
              humidity= {this.state.humidity}
              description= {this.state.description}
              error= {this.state.error} 
          />
        </div> 
      </div>
    );    
  } 
}

export default App;
