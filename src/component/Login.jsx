import React, { useEffect, useState } from 'react'
import { baseurl } from '../helper'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { allMessage } from './TheContext'
import { TheContext } from './TheContext'


function Login() {

    const { message, setMessage } = useContext(allMessage)
    const { tokenData, setTokenData } = useContext(TheContext)

    const navigate = useNavigate()

    const [login, setLogin] = useState({
        email: "",
        password: "",

    })



    function loginInput(event) {

        setLogin((preValue) => {
            return ({ ...preValue, [event.target.name]: event.target.value }

            )
        })

    }

    function submitHandle(event) {
        event.preventDefault()

        fetch(`${baseurl}/login`, {
            method: "POST",
            body: JSON.stringify(login),
            headers: {
                "content-type": "application/json"
            }
        })
            .then((response) => {
                console.log("Loginresponse", response)

                return response.json()

            })
            .then((fdata) => {
                console.log("login",fdata)

                if (fdata.token != undefined) {
                    localStorage.setItem("localData", JSON.stringify(fdata))
                    setTokenData(fdata.token)
                    navigate('/')
                }

                setMessage(fdata)
                setLogin({
                    email: "",
                    password: "",

                })

                setTimeout(() => {
                    setMessage({})
                }, 5000)


            })
            .catch((err) => console.log("Errorerror", err))

    }

    return (
        <div className="login">
            <div className="login-form">
                <form className='form' action="">
                    <div className="form-title">
                        <h1 className='login-title'>Login</h1>
                    </div>
                    <div className="form-inp">
                        <label htmlFor="nameId" className='label'>User Name</label>
                        <input type="text" className='inp' id="nameId" name="email" onChange={loginInput} value={login.email} />
                    </div>
                    <div className="form-inp">
                        <label htmlFor="passwordId" className='label'>Password</label>
                        <input type="password" className='inp' id="passwordId" name="password" onChange={loginInput} value={login.password} />
                    </div>

                    <button type='submit' className='login-form-btn' onClick={submitHandle}>Join</button>
                    <p className='form-footer message'>{message.Message}</p>
                    <p className='form-footer'>No account? <Link to="/register">Register</Link></p>
                </form>

            </div>
        </div>
    )
}

export default Login