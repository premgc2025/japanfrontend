
import React, { useEffect, useState } from 'react'
import { baseurl } from '../helper'
import { useContext } from 'react'
import { allMessage } from './TheContext'



function Pairing() {

    const { message, setMessage } = useContext(allMessage)



    // Get Booth Data
    const [booth, setBooth] = useState([])



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

        boothData()

    }, [message])



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
    return (
        <div className="main">

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
                    <h3 className='table-heading'>Pairing Info</h3>
                </div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>SN.</th>
                            <th>Select</th>
                            <th>Booth Name</th>
                            <th>Sensor EnOcen Id</th>
                            <th>Sensor Type</th>
                            <th>Gateway Name</th>
                            <th>Room Name</th>
                            <th>Floor</th>
                            <th>Building Name</th>
                            <th>Latest Event</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pagination.map((item, i) => {

                                let n = i + 1
                                count = firstIndex + i + 1;

                                return (
                                    <tr key={n}>
                                        <td>{count}</td>
                                        <td><button type='radio' className='radio-btn' /></td>

                                        <td>{item.name}</td>
                                        <td>{item.sensorid}</td>
                                        <td>{item.sensortype}</td>
                                        <td>{item.gatewayname.name}</td>
                                        <td>{item.roomname.name}</td>
                                        <td>{item.roomname.floor}</td>
                                        <td>{item.buildingname.name}</td>
                                        <td></td>
                                        <td>


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





export default Pairing