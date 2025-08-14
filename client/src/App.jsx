import React, { useState, useEffect } from 'react'
import axios from "axios"
import SalamApp from './SalamApp';
import Layout from './layout/Layout';
import Home from './pages/Home';

const App = () => {

  const [response, setResponse] = useState("")

  useEffect(() => {
    async function greetBackend(){
      try {
        let message = await axios.get("http://localhost:7000/cow");
        setResponse(message.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    greetBackend();
  }, []);
  
  return (
    // <div>{response}</div>
    // <Layout/>
    <Home/>
    // <SalamApp/>
  )
}

export default App