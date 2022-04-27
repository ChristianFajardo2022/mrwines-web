import React, {useState} from 'react'
import {Link as LinkRouter } from 'react-router-dom'

import {connect} from 'react-redux'
import userActions from '../redux/actions/userActions'

function NewAdmin(props) {

    //defino las variables de estado
    const [name,setName] = useState("")
    const [lastName,setLastName] = useState("")
    const [userPhoto,setUserPhoto] = useState("")
    const [mail,setMail] = useState("")
    const [pass,setPass] = useState("")
    //const [file,setFile] = useState()

    const handleSubmit = (event) => {
        event.preventDefault()
        const userData={
			userName: name,
            lastName: lastName,
            userPhoto: userPhoto,
            email: mail,
			password: pass,
            admin: true,
			from: "newAdminForm"
        }
        //console.log(userData)
        props.newAdmin(userData)
    }

    return (
        <div className="containerFormSign BgSignUp">
            <h1 className=" title white signuptext">New Admin</h1>
            <div className='signBody'>
                <form onSubmit={handleSubmit} className='form'>
                    <div>
                        <input name="Name" className="inputForm" placeholder="Name" type="text" value={name} onChange={e=>setName(e.target.value)} required />
                    </div>
                    <div>
                        <input name="Last name" className="inputForm" placeholder="Last name" type="text" value={lastName} onChange={e=>setLastName(e.target.value)} required />
                    </div>
                    <div>
                        {/* <input name="User Photo" className="inputForm" placeholder="URL photo" type="file" value={file} onChange={e=>setFile(e.target.files)} required /> */}
                        <input name="User Photo" className="inputForm" placeholder="URL photo" type="text" value={userPhoto} onChange={e=>setUserPhoto(e.target.value)} required />

                    </div>
                    <div>
                        <input name="Email" className="inputForm" placeholder="Email address" type="email" value={mail} onChange={e=>setMail(e.target.value)} required />
                    </div>
                    <div>
                        <input name='Password' className="inputForm" placeholder="Create password" type="password" value={pass} onChange={e=>setPass(e.target.value)} required />
                    </div>
                    <div className="divBtn">
                        <button type="submit" className="btnForm">Create Account</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

const mapDispatchToProps = {
    newAdmin: userActions.newAdmin
}
const mapStateToProps = (state) => {
    return {
        message: state.userReducer.message
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewAdmin)