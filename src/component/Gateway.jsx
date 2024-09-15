import React, { useEffect, useState } from 'react'
import { baseurl } from '../helper'
import { useContext } from 'react'
import { allMessage } from './TheContext'
import { TheContext } from './TheContext'

function Gateway() {

    const { tokenData, setTokenData } = useContext(TheContext)
    const { message, setMessage } = useContext(allMessage)


    //  Get Room table
    const [room, setRoom] = useState([])

    // Get Gateway table
    const [gateway, setGateway] = useState([])


    // For Building Data
    const [data, setData] = useState([])



    // For POST Gatway Data
    const [postData, setPostData] = useState({
        buildingname: "",
        roomname: "",
        name: "",
        gatewaymacid: ""

    })



    // Filter Data
    const [query, setQuery] = useState('')
    let filterItem = gateway.filter((item) => {
        return item.name.toLowerCase().includes(query)
    })

    // Pagination
    const [currentPage, setCurrentPage] = useState(1)


    const nOfpage = Math.ceil(gateway.length / 5);
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

    // Use Effect 

    useEffect(() => {

        getData()
        getRoomData()
        gatewayData()

    }, [message])
    // Get building Data

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

    // Get Room Data

    function getRoomData() {
        fetch(`${baseurl}/room`, {
            method: "GET",

            headers: {
                "content-type": "application/json"
            }
        })
            .then((response) => {

                return response.json()
            })
            .then((fdata) => {
                setRoom(fdata)
              
            })
            .catch((err) => console.log(err))
    }

    // Get Gateway Data

    function gatewayData() {
        fetch(`${baseurl}/gateway`, {
            method: "GET",

            headers: {
                "content-type": "application/json"
            }
        })
            .then((response) => {

                return response.json()
            })
            .then((fdata) => {
                setGateway(fdata)

            })
            .catch((err) => console.log(err))
    }

    // Building Name selection
    function roomInput(event) {

        setPostData((preValue) => {
            return ({ ...preValue, [event.target.name]: event.target.value }

            )
        })
    }

    // Submit Data
    function submitHandle(event) {
        event.preventDefault()

        fetch(`${baseurl}/gateway`, {
            method: "POST",
            body: JSON.stringify(postData),
            headers: {
                "content-type": "application/json",
                "header": `bearer ${tokenData.token}`
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    setPostData({
                        buildingname: "",
                        roomname: "",
                        name: "",
                        gatewaymacid: ""
                    })
                }
                return response.json()
            })
            .then((fdata) => {
                console.log(fdata)
                setMessage(fdata)
                // setMessage({Message:fdata.errorResponse.errmsg})

                setTimeout(() => {
                    setMessage({})
                }, 5000)
            })
            .catch((err) => console.log("Errorerror", err))
    }


    // Delete Data 
    function deleteHandle(event, id) {
        event.preventDefault()
        const buildingid = id.buildingname._id
        const roomid = id.roomname._id
        const gatewayid = id._id

        fetch(`${baseurl}/gateway/${buildingid}/${roomid}/${gatewayid}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
                "header": `bearer ${tokenData.token}`
            }
        })
            .then((response) => {
                console.log("gt res", response)

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
            buildingname: `${item.buildingname._id}`,
            roomname: `${item.roomname._id}`,
            name: `${item.name}`,
            gatwaymacid: `${item.gatewaymacid}`,

        })

        const eId = item._id

        function updateInput(event) {

            setEditeData((preVal) => {
                return ({ ...preVal, [event.target.name]: event.target.value })

            })
        }

        function updateSubmit(event) {
            event.preventDefault()

            fetch(`${baseurl}/gateway/${eId}`, {
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


                    <td> <input className='inp-update' type="text" name="name" placeholder='Enter Room Name' required onChange={updateInput} defaultValue={item.name} /></td>
                    <td> <input className='inp-update' type="text" name="gatewaymacid" placeholder='Enter Mac Id' required onChange={updateInput} defaultValue={item.gatewaymacid} /></td>
                    <td> <input className='inp-update' type="text" name="roomname" placeholder='Select Room Name' required onChange={updateInput} defaultValue={item.roomname._id} /></td>
                    <td> <input className='inp-update' type="text" name="buildingname" placeholder='Select Building Name' required onChange={updateInput} defaultValue={item.buildingname._id} /></td>
                    <td> <button className='update-btn' onClick={updateSubmit}>UPDATE</button></td>

                </tr>
            </>
        )
    }




    return (
        <div className="main">
            <div className="main-container">
                <h3 className='form-title'>Add Gateway</h3>
                <form action="" className='main-form' onSubmit={submitHandle}>
                    <div className="form-room-inp">
                        <label htmlFor="selectId">Building Name</label>
                        <select name="buildingname" id="selectId" className='select-inp' onChange={roomInput} value={postData.buildingname} required >
                            {
                                data.map((bname, i) => {

                                    return (<option key={i + 1} value={bname._id} >{bname.name}</option>
                                    )

                                })

                            }

                        </select>
                    </div>

                    <div className="form-room-inp">
                        <label htmlFor="roomnameId">Room Name</label>
                        <select name="roomname" id="roomnameId" className='select-inp' onChange={roomInput} value={postData.roomname} required >
                            {
                                room.map((bname, i) => {

                                    return postData.buildingname === bname.buildingname._id || bname.buildingname.name == "Select Building Name" ? (<option key={i + 1} value={bname._id} >{bname.name}</option>
                                    ) : ""

                                })

                            }

                        </select>
                    </div>


                    <div className="form-room-inp">
                        <label htmlFor="roomId">Gateway Name</label>
                        <input type="text" className='inp' id="roomId" name="name" onChange={roomInput} value={postData.name} required />
                    </div>

                    <div className="form-room-inp">
                        <label htmlFor="gatwaymacId">Gateway Mac ID</label>
                        <input type="text" className='inp' id="gatewaymacId" name="gatewaymacid" onChange={roomInput} value={postData.gatewaymacid} required />
                    </div>
                    <div className="btn">

                        <button type="submit" className='form-btn' >Add</button>
                    </div>
                </form>

            </div>

            {/* Search */}

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


            {/* Table */}
            <div className="table-parent">
                <div className="table-title">
                    <h3 className='table-heading'>Gateway Info</h3>
                </div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>SN.</th>
                            <th>Gateway Name</th>
                            <th>Gateway Mac ID</th>
                            <th>Room Name</th>
                            <th>Building Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pagination.map((item, i) => {

                                let n = i + 1;
                                count = firstIndex + i;

                                return (editId === item._id ? <Edit item={item} data={data} setData={setData} i={i} /> : (
                                    item.name !== "Select Gateway" ?
                                        <tr key={n}>
                                            <td>{count}</td>
                                            <td>{item.name}</td>
                                            <td>{item.gatewaymacid}</td>
                                            <td>{item.roomname.name}</td>
                                            <td>{item.buildingname.name}</td>
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
                    <p className='count-number'>{count} of {gateway.length - 1}</p>

                </div>


            </div>


        </div>
    )

}

export default Gateway