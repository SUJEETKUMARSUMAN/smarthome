import React, { useEffect, useState } from "react";
import "./App.css";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

// 🔴 Replace with YOUR Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCbX9YdeR5_hBQsAChX6PQ46_fhU4fF1LA",
  authDomain: "smart-home-dfd6c.firebaseapp.com",
  databaseURL: "https://smart-home-dfd6c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "smart-home-dfd6c",
  storageBucket: "smart-home-dfd6c.firebasestorage.app",
  messagingSenderId: "397536519306",
  appId: "1:397536519306:web:c957f67eba91fc8bf07973"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function App() {
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [light, setLight] = useState(0);
  const [smoke, setSmoke] = useState(0);

  useEffect(() => {
    onValue(ref(db, "devices/sensors/temperature"), (snapshot) => {
      setTemperature(snapshot.val());
    });

    onValue(ref(db, "devices/sensors/humidity"), (snapshot) => {
      setHumidity(snapshot.val());
    });

    onValue(ref(db, "devices/sensors/light"), (snapshot) => {
      setLight(snapshot.val());
    });

    onValue(ref(db, "devices/alert/smokealert"), (snapshot) => {
      setSmoke(snapshot.val());
    });
  }, []);

  return (
    <div className="container">
      <h1>Smart Environment Dashboard</h1>

      <div className="card">
        <h2>🌡 Temperature</h2>
        <p>{temperature} °C</p>
      </div>

      <div className="card">
        <h2>💧 Humidity</h2>
        <p>{humidity} %</p>
      </div>

      <div className="card">
        <h2>🌗 Light Level</h2>
        <p>{light}</p>
      </div>

      <div className="card">
        <h2>🔥 Smoke Status</h2>
        {smoke === 1 ? (
          <p className="alert">⚠ SMOKE DETECTED!</p>
        ) : (
          <p className="safe">Room Safe</p>
        )}
      </div>
    </div>
  );
}

export default App;