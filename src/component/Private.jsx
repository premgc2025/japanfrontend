
import React from 'react'
import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { TheContext } from './TheContext'

function Private(props) {

    const {tokenData, setTokenData} = useContext(TheContext)
   
  return (

    tokenData!==null? <props.Component/> : <Navigate to ='/login'/>
    
  )
}

export default Private