import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import axios from 'axios';
import {getAllTasks} from "./services/task.service";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const dataFromDatabase = await getAllTasks();
      setData(dataFromDatabase);
      setIsLoading(false);
    })()
  },[])
  console.log(data);
  return (
    <div className="l-app">
      <header className="l-app__header">
        Todo App
      </header>
      {
        isLoading && (<div className="spinner-border mt-5" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>)
      }
      <p>
        {JSON.stringify(data)}
      </p>
    </div>
  );
}

export default App;
