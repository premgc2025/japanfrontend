
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Header from './component/Header';
import Login from './component/Login';
import Register from './component/Register';
import Home from './component/Home';
import Building from './component/Building';
import Room from './component/Room';
import Gateway from './component/Gateway';
import Booth from './component/Booth';
import { useState } from 'react';
import Pairing from './component/Pairing';
import { TheContext } from './component/TheContext';
import { allMessage } from './component/TheContext';
import Private from './component/Private';

function App() {

  const[message, setMessage] = useState({})
  const [tokenData, setTokenData] = useState(JSON.parse(localStorage.getItem("localData")))
 

  return (
    <>
      <div className="ts-main">
        <TheContext.Provider value={{tokenData,setTokenData}}>
        <allMessage.Provider value={{message,setMessage}}>
        <BrowserRouter>
        <Header/>   

        <Routes>
          <Route path="/" element={<Private Component={Home}/>}/>
          <Route path="/building" element={<Private Component={Building}/>}/>
          <Route path="/room" element={<Private Component={Room}/>}/>
          <Route path="/gateway" element={<Private Component={Gateway}/>}/>
          <Route path="/booth" element={<Private Component={Booth}/>}/>
          <Route path="/pairing" element={<Private Component={Pairing}/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>        


        </Routes>
       
        
        </BrowserRouter>
        </allMessage.Provider>
        </TheContext.Provider>
         
      </div>
    </>
  )
}

export default App
