import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import axios from 'axios';

function App() {
  const [data, setData] = useState();
  useEffect(() => {
    axios.post(`http://localhost:8080/get-tasks`)
      .then(res => {
        const tasks = res.data;
        setData({ tasks });
      })
  },[])
  console.log(data);
  return (
    <div className="l-app">
      <header className="l-app__header">
        Todo App
      </header>
      <p>
        {JSON.stringify(data)}
      </p>
    </div>
  );
}

export default App;
