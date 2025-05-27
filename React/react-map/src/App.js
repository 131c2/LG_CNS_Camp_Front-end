import './App.css';
import { useEffect, useRef, useState } from 'react';

const { kakao } = window;
let ref = null;

const MapContainer = () => {
  ref = useRef();
  useEffect(() => {
    async function getData() {
      const url = 'https://ggoreb.pythonanywhere.com/location/data/?page=1&count=50';
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      const list = data.data;

      list.map((v) => {
        // 마커가 표시될 위치
        const lat = v.latitude;
        const lon = v.longitude;
        var markerPosition = new kakao.maps.LatLng(lat, lon);
        // 마커를 생성
        var marker = new kakao.maps.Marker({
          position: markerPosition
        });
        marker.setMap(ref.current);
      })
    }
    getData();

    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3
    };
    const map = new kakao.maps.Map(container, options);
    ref.current = map;
  }, []);

  return (
    <div id='myMap' style={{
      width: '500px',
      height: '500px'
    }}></div>
  );
}

function App() {
  return (
    <>
      <h1>Kakao Map</h1>
      <MapContainer />
      <button onClick={() => {
        var moveLatLon = new kakao.maps.LatLng(33.452613, 126.570888);
        ref.current.setCenter(moveLatLon);
      }}>이동</button>
    </>
  );
}

export default App;


// kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
    
//   // 클릭한 위도, 경도 정보를 가져옵니다 
//   var latlng = mouseEvent.latLng;
  
//   var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
//   message += '경도는 ' + latlng.getLng() + ' 입니다';
  
//   var resultDiv = document.getElementById('result'); 
//   resultDiv.innerHTML = message;
  
// });