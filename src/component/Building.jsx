
import React, { useEffect, useState } from 'react'
import { baseurl } from '../helper'
import { useContext } from 'react'
import { allMessage } from './TheContext'
import { TheContext } from './TheContext'

function Building() {
    const { message, setMessage } = useContext(allMessage)
    const { tokenData, setTokenData } = useContext(TheContext)

    const [data, setData] = useState([])
    const [bData, setBData] = useState({
        name: "",
        address: ""
    })


    const [query, setQuery] = useState('')
    let filterItem = data.filter((item) => {
        return item.name.toLowerCase().includes(query)
    })


    // Pagination
    const [currentPage, setCurrentPage] = useState(1)


    const nOfpage = Math.ceil(data.length / 5);
    const lastIndex = currentPage * 5;
    const firstIndex = lastIndex - 5;
    const pagination = filterItem.slice(firstIndex, lastIndex)
    const numbers = [...Array(nOfpage + 1).keys()].slice(1);



    let count;

    //   Previous Button
    function paginationPrev() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    //   Next Button
    function paginationNext() {
        if (currentPage < nOfpage) {
            setCurrentPage(currentPage + 1);
        }
    }

    //   Pagination Select

    function paginationSelect(id) {
        setCurrentPage(id)
    }

    //   Filter 


    function search(event) {
        setQuery(event.target.value.toLowerCase())
    }

    useEffect(() => {

        getData()

    }, [message])


    // Get Data

    function getData() {
        fetch(`${baseurl}/building`, {
            method: "GET",

            headers: {
                "content-type": "application/json",
            }
        })
            .then((response) => {

                return response.json()
            })
            .then((fdata) => {
                setData(fdata)

            })
            .catch((err) => console.log(err))
    }



    function buildingInput(event) {

        setBData((preValue) => {
            return ({ ...preValue, [event.target.name]: event.target.value }

            )
        })

    }

    // Submit Data
    function submitHandle(event) {
        event.preventDefault()
       

        fetch(`${baseurl}/building`, {
            method: "POST",
            body: JSON.stringify(bData),
            headers: {
                "content-type": "application/json",
                "header": `bearer ${tokenData.token}`
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    setBData({
                        name: "",
                        address: ""
                    })
                }
                return response.json()
            })
            .then((fdata) => {
                console.log("Hello message", fdata)
                setMessage(fdata)


                setTimeout(() => {
                    setMessage({})
                }, 5000)
            })
            .catch((err) => console.log("Errorerror", err))
    }

    // Delete Data 
    function deleteHandle(event, id) {
        event.preventDefault()
        const buildingid = id._id

        fetch(`${baseurl}/building/${buildingid}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                "header": `bearer ${tokenData.token}`
            }
        })
            .then((response) => {

                if (response.status === 200) {
                    return response.json()
                }
                return response.json()


            })
            .then((fdata) => {
                setMessage(fdata)

                setTimeout(() => {
                    setMessage({})

                }, 5000)
            })
            .catch((err) => console.log(err))

    }








    //   Edit Handle

    const [editId, setEditId] = useState()



    function editIdHandle(id) {
        setEditId(id)
    }

    //   Edit Function

    function Edit({ item, data, setData, i }) {


        const [editData, setEditeData] = useState({
            name: `${item.name}`,
            address: `${item.address}`,

        })

        const eId = item._id

        function updateInput(event) {

            setEditeData((preVal) => {
                return ({ ...preVal, [event.target.name]: event.target.value })

            })
        }

        function updateSubmit(event) {
            event.preventDefault()

            fetch(`${baseurl}/building/${eId}`, {
                method: "PUT",
                body: JSON.stringify(editData),
                headers: {
                    "content-type": "application/json",
                    "header": `bearer ${tokenData.token}`
                }
            })
                .then((info) => {
                    console.log("Updateitem Successfully")
                    return info.json()
                })
                .then((fdata) => {
                    setMessage(fdata)

                    setTimeout(() => {
                        setMessage({})

                    }, 5000)

                    setEditId()

                })
                .catch((err) => console.log({ Message: "Failed to Update item" }))


        }

        //  Note:- use defaultValue={item.name} to edit and update value and apply new onChange={} function
        return (
            <>
                <tr className='tr-update'>
                    <td></td>
                    <td> <input className='inp-update' type="text" name="name" placeholder='Enter Customer Name' required onChange={updateInput} defaultValue={item.name} /></td>
                    <td> <input className='inp-update' type="text" name="address" placeholder='Enter Address' required onChange={updateInput} defaultValue={item.address} /></td>
                    <td> <button className='update-btn' onClick={updateSubmit}>UPDATE</button></td>

                </tr>
            </>
        )
    }


    return (
        <div className="main">
            <div className="main-container">
                <h3 className='form-title'>Add building</h3>

                <form action="" className='main-form' onSubmit={submitHandle}>

                    <div className="form-building-inp">
                        <label htmlFor="nameId">Building Name</label>
                        <input type="text" className='inp' id="nameId" name="name" onChange={buildingInput} value={bData.name} required />
                    </div>
                    <div className="form-building-inp">
                        <label htmlFor="nameId">Building Address</label>
                        <input type="text" className='inp' id="nameId" name="address" onChange={buildingInput} value={bData.address} required />
                    </div>
                    <div className="btn">
                        <button type="submit" className='form-btn' >Add</button>
                    </div>
                </form>
            </div>

            <div className="search-parent">
                <input type="search" className='search' placeholder='Search by Name' onChange={search} />
            </div>

            <div className="message">
                <p>{message.Message}</p>
            </div>

            <div className="pagination-btn-parent">
                <button className='pagination-btn' onClick={paginationPrev}>Prev</button>

                {
                    numbers.map((num) => {
                        return (
                            <button className={`pagination-btn ${currentPage === num ? 'active' : ""}`} onClick={() => {
                                paginationSelect(num)
                            }} key={num} >{num}</button>
                        )
                    })
                }
                <button className='pagination-btn' onClick={paginationNext}>Next</button>
            </div>

            <div className="table-parent">
                <div className="table-title">
                    <h3 className='table-heading'>Building Info</h3>
                </div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>SN.</th>
                            <th >Building Name </th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pagination.map((item, i) => {

                                let n = i + 1
                                count = firstIndex + i;

                                return (editId === item._id ? <Edit item={item} data={data} setData={setData} i={i} /> : (
                                    item.name !== "Select Building Name" ?
                                        <tr key={n}>
                                            <td>{count}</td>
                                            <td>{item.name}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button className='edit-btn' onClick={() => {
                                                    editIdHandle(item._id)
                                                }} >Edit</button>
                                                <button className='delete-btn' onClick={(event) => {
                                                    deleteHandle(event, item)
                                                }}>DEL</button>

                                            </td>
                                        </tr> : "")

                                )

                            })
                        }


                    </tbody>
                </table>
                <div className="count">
                    <p className='count-number'>{count} of {data.length - 1}</p>

                </div>


            </div>

        </div>
    )
}

export default Building