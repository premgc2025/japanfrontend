
import React, { useEffect, useState } from 'react'
import { baseurl } from '../helper'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { allMessage } from './TheContext'




function Register() {
    const { message, setMessage } = useContext(allMessage)

    const navigate = useNavigate()

    const [register, setRegister] = useState({
        email: "",
        password: "",
        age: ""
    })



    function registerInput(event) {

        setRegister((preValue) => {
            return ({ ...preValue, [event.target.name]: event.target.value }

            )
        })

    }




    function submitHandle(event) {
        event.preventDefault()

        fetch(`${baseurl}/register`, {
            method: "POST",
            body: JSON.stringify(register),
            headers: {
                "content-type": "application/json"
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    setRegister({
                        email: "",
                        password: "",
                        age: ""
                    })

                    setMessage({ Message: "User Created successfully" })
                    navigate('/login')

                    setTimeout(() => {
                        setMessage({})
                    }, 5000)
                }
                else {
                    return response.json()

                }

            })
            .then((fdata) => {


                if (fdata.errorResponse.code === 11000) {
                    setMessage({ Message: 'User already exists' })

                    setTimeout(() => {
                        setMessage({})
                    }, 5000)

                }


            })
            .catch((err) => console.log("Errorerror", err))

    }

    return (
        <div className="login">
            <div className="login-form">
                <form className='form' action="">
                    <div className="form-title">
                        <h1 className='login-title'>Register</h1>
                    </div>
                    <div className="form-inp">
                        <label htmlFor="nameId" className='label'>Email Address</label>
                        <input type="text" className='inp' id="nameId" name="email" onChange={registerInput} value={register.email} />
                    </div>
                    <div className="form-inp">
                        <label htmlFor="passwordId" className='label'>Password</label>
                        <input type="password" className='inp' id="passwordId" name="password" onChange={registerInput} value={register.password} />
                    </div>
                    <div className="form-inp">
                        <label htmlFor="ageId" className='label' >Age</label>
                        <input type="number" className='inp' id="ageId" name="age" onChange={registerInput} value={register.age} />
                    </div>

                    <button type='submit' className='login-form-btn' onClick={submitHandle}>Submit</button>
                    <p className='form-footer message'>{message.Message}</p>
                    <p className='form-footer'>Have account? <Link to="/login">Login</Link></p>
                </form>

            </div>
        </div>
    )
}

export default Register