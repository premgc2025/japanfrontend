import React, { useEffect, useState } from 'react'
import { baseurl } from '../helper'
import { useContext } from 'react'
import { allMessage } from './TheContext'
import { TheContext } from './TheContext'

function Booth() {
    const { tokenData, setTokenData } = useContext(TheContext)
    const { message, setMessage } = useContext(allMessage)


    //  Get Room table
    const [room, setRoom] = useState([])

    // Get Gateway table
    const [gateway, setGateway] = useState([])



    // Get Booth Data
    const [booth, setBooth] = useState([])


    // For Building Data
    const [data, setData] = useState([])



    // For POST Gatway Data
    const [postData, setPostData] = useState({
        buildingname: "",
        roomname: "",
        gatewayname: "",
        name: "",
        sensorid: "",
        sensortype: ""

    })



    // Filter Data
    const [query, setQuery] = useState('')
    let filterItem = booth.filter((item) => {
        return item.name.toLowerCase().includes(query)
    })

    // Pagination
    const [currentPage, setCurrentPage] = useState(1)


    const nOfpage = Math.ceil(booth.length / 5);
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
        boothData()

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


    // Get Gateway Data

    function boothData() {
        fetch(`${baseurl}/booth`, {
            method: "GET",

            headers: {
                "content-type": "application/json"
            }
        })
            .then((response) => {

                return response.json()
            })
            .then((fdata) => {
                setBooth(fdata)


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

        fetch(`${baseurl}/booth`, {
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
                        gatewayname: "",
                        name: "",
                        sensorid: "",
                        sensortype: ""
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


    // Delete Booth Data 
    function deleteHandle(event, id) {
        event.preventDefault()
        const buildingid = id.buildingname._id
        const roomid = id.roomname._id
        const gatewayid = id.gatewayname._id
        const boothid = id._id

        fetch(`${baseurl}/booth/${buildingid}/${roomid}/${gatewayid}/${boothid}`, {
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
            gatewayname: `${item.gatewayname._id}`,
            name: `${item.name}`,
            sensorid: `${item.sensorid}`,
            sensortype: `${item.sensortype}`

        })

        const eId = item._id

        function updateInput(event) {

            setEditeData((preVal) => {
                return ({ ...preVal, [event.target.name]: event.target.value })

            })
        }

        function updateSubmit(event) {
            event.preventDefault()

            fetch(`${baseurl}/booth/${eId}`, {
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
                    <td> <input className='inp-update' type="text" name="name" placeholder='Enter Booth Name' required onChange={updateInput} defaultValue={item.name} /></td>
                    <td> <input className='inp-update' type="text" name="sensorid" placeholder='Enter Sensor Id' required onChange={updateInput} defaultValue={item.sensorid} /></td>
                    <td> <input className='inp-update' type="text" name="sensortype" placeholder='Enter Sensor type' required onChange={updateInput} defaultValue={item.sensortype} /></td>
                    <td> <input className='inp-update' type="text" name="gatewayname" placeholder='Select Gateway Name' required onChange={updateInput} defaultValue={item.gatewayname.name} /></td>
                    <td> <input className='inp-update' type="text" name="roomname" placeholder='Select Room Name' required onChange={updateInput} defaultValue={item.roomname.name} /></td>
                    <td> <input className='inp-update' type="text" name="buildingname" placeholder='Select Building Name' required onChange={updateInput} defaultValue={item.buildingname.name} /></td>
                    <td> <button className='update-btn' onClick={updateSubmit}>UPDATE</button></td>

                </tr>
            </>
        )
    }




    return (
        <div className="main">
            <div className="main-container">
                <h3 className='form-title'>Add Booth</h3>
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
                        <label htmlFor="gatewayId">Gateway Name</label>
                        <select name="gatewayname" id="gatewayId" className='select-inp' onChange={roomInput} value={postData.gatewayname} required >
                            {
                                gateway.map((bname, i) => {
                                 
                                    return postData.roomname === bname.roomname._id || bname.roomname.name == "Select Room" ? (<option key={i + 1} value={bname._id} >{bname.name}</option>
                                    ) : ""

                                })

                            }

                        </select>
                    </div>


                    <div className="form-room-inp">
                        <label htmlFor="roomId">Booth Name</label>
                        <input type="text" className='inp' id="roomId" name="name" onChange={roomInput} value={postData.name} required />
                    </div>

                    <div className="form-room-inp">
                        <label htmlFor="sensorId">Sensor ID</label>
                        <input type="text" className='inp' id="sensorId" name="sensorid" onChange={roomInput} value={postData.sensorid} required />
                    </div>

                    <div className="form-room-inp">
                        <label htmlFor="sensortypeId">Sensor Type</label>
                        <select id="sensortypeId" className='select-inp' name="sensortype" onChange={roomInput} value={postData.sensortype} >
                            <option value="CALLSWITCH">Call Switch</option>
                            <option value="MAGNET">Magnet Sensor</option>
                            <option value="Air">Switch Strike Air</option>
                            <option value="TABLE">Table Keeper</option>
                            <option value="Distance">Distance Sensor</option>
                            <option value="MOTION">Motion Sensor</option>
                            <option value="MSENSOR">Motion-Illumination Sensor</option>
                        </select>
                    </div>

                    {/* <div className="form-room-inp">
                    <label htmlFor="sensorType">Sensor Type</label>
                    <input type="text" className='inp' id="sensorType" name="sensortype"  onChange={roomInput} value={postData.sensortype} required/>
                </div> */}
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
                    <h3 className='table-heading'>Booth Info</h3>
                </div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>SN.</th>
                            <th>Booth Name</th>
                            <th>Sensor EnOcen Id</th>
                            <th>Sensor Type</th>
                            <th>Gateway Name</th>
                            <th>Room Name</th>
                            <th>Building Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            pagination.map((item, i) => {

                                let n = i + 1
                                count = firstIndex + i + 1;

                                return (editId === item._id ? <Edit item={item} data={data} setData={setData} i={i} /> :

                                    <tr key={n}>
                                        <td>{count}</td>
                                        <td>{item.name}</td>
                                        <td>{item.sensorid}</td>
                                        <td>{item.sensortype}</td>
                                        <td>{item.gatewayname.name}</td>
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
                                    </tr>

                                )
                            })
                        }


                    </tbody>
                </table>
                <div className="count">
                    <p className='count-number'>{count} of {booth.length}</p>

                </div>


            </div>


        </div>
    )

}





export default Booth