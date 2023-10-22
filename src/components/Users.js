import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUser } from '../actions/action';

function Users() {
    const [userdata, setUserData] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllUser())
    }, [])
    const allUsers = useSelector(state => state.fetchallusers)
    useEffect(() => {
        if (allUsers.list !== null) {
            var userArray = allUsers.list.data
            setUserData(userArray)
        }
    }, [allUsers])
    return (
        <div className='row m-2'>
            {userdata.map((item, key) => (
                <div className='col-lg-2 mt-2' key={key} style={{ cursor: "pointer" }} >
                    <div className="shadow p-3 mb-5 bg-body-tertiary rounded  bg-opacity-10 border border-info border-start-1 rounded-end">
                        <div className='circle-container'>
                            <div className='circle' style={{ color: "white" }}>{item.name.charAt(0).toUpperCase()}</div>
                            <label className='name-label linkColor' ><b>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</b></label>
                        </div>
                    </div>
                </div>
            ))}
        </div>

    )
}

export default Users
