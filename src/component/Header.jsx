
import React, { useState } from 'react'
import { Link, } from 'react-router-dom'
import { TheContext } from './TheContext'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'

function Header() {
  const { tokenData, setTokenData } = useContext(TheContext)
  const navigate = useNavigate()

  const [activeClass, setActiveClass] = useState()


  function logout() {
    setTokenData(null)
    localStorage.removeItem("localData")
    navigate('/login')

  }

  return (
    <div className="header">
      <div className="nav">
        <img src="./logo.png" alt="logo" className='logo-img' />
        <ul className='nav-ul'>
          <li className={`nav-li ${activeClass === "home" ? "active" : ""}`} onClick={() => { setActiveClass("home") }}><Link to="/" className='link-nav'>
            <p className='sub-li1'>ホ一ム</p>
            <p className='sub-li2'> Home</p>
          </Link> </li>
          <li className={`nav-li ${activeClass === "building" ? "active" : ""}`} onClick={() => { setActiveClass("building") }}><Link to="/building" className='link-nav'>
            <p className='sub-li1'> 物件名</p>
            <p className='sub-li2'> Building</p>
          </Link> </li>
          <li className={`nav-li ${activeClass === "room" ? "active" : ""}`} onClick={() => { setActiveClass("room") }}><Link to="/room" className='link-nav'>
            <p className='sub-li1'> 設備名</p>
            <p className='sub-li2'> Room</p>
          </Link> </li>
          <li className={`nav-li ${activeClass === "gateway" ? "active" : ""}`} onClick={() => { setActiveClass("gateway") }}><Link to="/gateway" className='link-nav'>
            <p className='sub-li1'> ゲートウェイ</p>
            <p className='sub-li2'>Gateway</p>
          </Link> </li>
          <li className={`nav-li ${activeClass === "booth" ? "active" : ""}`} onClick={() => { setActiveClass("booth") }}><Link to="/booth" className='link-nav'>
            <p className='sub-li1'>  ブース</p>
            <p className='sub-li2'>Booth</p>
          </Link> </li>
          <li className={`nav-li ${activeClass === "pairing" ? "active" : ""}`} onClick={() => { setActiveClass("pairing") }}><Link to="/pairing" className='link-nav'>
            <p className='sub-li1'>  ペアリング</p>
            <p className='sub-li2'>Pairing</p>
          </Link> </li>
          <li className={`nav-li ${activeClass === "register" ? "active" : ""}`} onClick={() => { setActiveClass("register") }}><Link to="/register" className='link-nav'>Register</Link> </li>
          <li className={`nav-li ${activeClass === "login" ? "active" : ""}`} onClick={() => { setActiveClass("login") }}><Link to="/login" className='link-nav'>Login</Link> </li>
          <li className='nav-li' > <button className={`logout-btn ${activeClass === "logout" ? "active" : ""}`} onClick={() => { logout(), setActiveClass("logout") }}>Logout
          </button></li>

        </ul>
      </div>

    </div>

  )
}

export default Header