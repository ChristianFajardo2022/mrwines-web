import React, {useState} from 'react'
import {Link as LinkRouter } from 'react-router-dom'

import GoogleSignIn from '../components/gLogin'

import {connect} from 'react-redux'
import userActions from '../redux/actions/userActions'
 import Snackbar from "../components/Snackbar" 
 import '../styles/styles.css'

function SignIn(props) {

	const [mail,setMail] = useState("")
    const [pass,setPass] = useState("")

	const handleSubmit = (event) => {
		event.preventDefault()
		const userLogin = {
			email: mail,
			password: pass
		}
		//console.log(userLogin)
		props.logInUser(userLogin)
	}

	return (
        <div className="containerFormSign BgSignIn">
		
		<Snackbar/>
            <h1 className=" title white signuptext">Sign in</h1>
			<div className='signBody'>
				<form onSubmit={handleSubmit} className='form'>
					<div>
						<input name="Email" className="inputForm" placeholder="Email address" type="email" value={mail} onChange={e=>setMail(e.target.value)} required />
					</div>
					<div>
						<input name='Password' className="inputForm" placeholder="Password" type="password" value={pass} onChange={e=>setPass(e.target.value)} required />
					</div>
					<div className="divBtn">
						<button type="submit" className="btnForm"> Sign in  </button>
						<GoogleSignIn />
					</div>
				</form>
			</div>
			<div className="textForm text-shadow">
				<p>You don't have an account?</p><p>Please <LinkRouter className="textDecoration" to="/signUp">sign up</LinkRouter></p>
			
		</div>
		
        </div>
	)
}

const mapDispatchToProps = {
    logInUser: userActions.logInUser
}
const mapStateToProps = (state) => {
    return {
        message: state.userReducer.message
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);