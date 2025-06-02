import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';

const Clock = () => {
  const [min, setMin] = useState();
  const [hour, setHour] = useState();
  const [sec, setSec] = useState();


  const getClock = () => {
    const date = new Date();
    setSec(String(date.getSeconds()).padStart(2, "0"))
    setMin(String(date.getMinutes()).padStart(2, "0"))
    setHour(String(date.getHours()).padStart(2, "0"))
  }
  useEffect(() => {
    getClock();
  },[])
  
  setInterval(getClock, 100); // 시계 새로고침 간격
  return(
    <h2 id="clock">
      {hour > 12 ? "pm " : "am "}
      {parseInt(hour/2)}:{min}:{sec}
      </h2>
  );
};

const Weather = () => {
  const [list,setList] = useState([]);
  const [weatherData,setWeatherData] = useState();

  const weather = useRef();
  
  const getData = async () => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=35.1176&lon=129.0451&units=metric&appid=6edee3c2aa182bc44d18ccb204c98a31';
    const res = await fetch(url);
    const data = await res.json();
    setWeatherData(data);

    console.log(data);

    const lat = data.coord.lat;
    const lon = data.coord.lon;
    const name = data.name;
    
    const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const temp = data.main.temp;
    const speed = data.wind.speed;
    const degree = data.wind.deg;
    const main = data.weather[0].main;
    const mainDiscription = data.weather[0].description;
    setList({lat, lon, name, icon, temp, speed, degree, main, mainDiscription});

  }
  
  const windDeg = (degree) => {
    if (degree >= 337.5 || degree < 22.5) {return '북풍';}
      else if (degree >= 22.5){return '북동풍';}
      else if (degree >= 67.5){return '동풍';}
      else if (degree >= 112.5){return '남동풍';}
      else if (degree >= 157.5){return '남풍';}
      else if (degree >= 202.5){return '남서풍';}
      else if (degree >= 247.5){return '서풍';}
      else if (degree >= 292.5){return '북서풍';}
      return 'null';
 }

  useEffect(() => {
    if (weatherData && weatherData.coord) {
      console.log("날씨 데이터가 업데이트되었습니다! :", weatherData);
    }
  },[weatherData])
  
  // 버튼 클릭 시 현재 저장된 날씨 데이터 활용
  const showWeatherDetails = () => {
    if (weatherData) {
      alert(`현재 ${weatherData.name}의 날씨: ${weatherData.weather[0].main} (${weatherData.weather[0].description})
기온: ${weatherData.main.temp}˚C
바람속도: ${weatherData.wind.speed} m/s
바람방향: ${windDeg(weatherData.wind.deg)}`)
      }
    };
    
    useEffect (() => {
      getData();
    },[])
    

    return(
      <div id="weather" ref={weather}>
      <h1>{list.name}</h1>
      <h2>기온 : {list.temp}˚C</h2>
      <p>위도: {list.lat} / 경도: {list.lon}</p>
      <img src = {list.icon} alt='Weather icon' />
      <h2>{list.main}</h2>
      <h3>{list.mainDiscription}</h3>

      <button onClick={showWeatherDetails}>날씨 상세 정보</button>
    </div>
  );
  

};


function App() {
  return (
    <div className="App">
      <Clock />
      <Weather />
      
    </div>
  );
}

export default App;
