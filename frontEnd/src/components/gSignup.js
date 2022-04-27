//importo de librerias externas
import React from 'react'
import GoogleLogin from 'react-google-login'

//importo los estilos
import '../styles/styles.css'

//importo acciones de redux
import {connect} from 'react-redux'
import userActions from '../redux/actions/userActions'

function GoogleSignUp(props) {
    const responseGoogle = async (res) => {
        //console.log(res)
        const userData = {
            userName: res.profileObj.givenName,
            lastName: res.profileObj.familyName,
            userPhoto: res.profileObj.imageUrl,
            email: res.profileObj.email,
            password: res.profileObj.googleId,
            admin: false,
            from: "google"
        }
        //console.log(userData)
        await props.signUpUser(userData)
    }
    return (
        <GoogleLogin
            /*fields = "name,email,id,picture"*/
            clientId="36255544994-21etll0ehidq27nj1jscdah10c9jpl58.apps.googleusercontent.com"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            render = { renderProps => (
                <>
                <button onClick={renderProps.onClick} className='btnForm'>
                    <img className='googleImg' src={process.env.PUBLIC_URL + "google.png"}/>
                </button>
                </>
            )}
        />
    )
}

const mapDispatchToProps = {
  signUpUser: userActions.signUpUser
}

export default connect(null, mapDispatchToProps)(GoogleSignUp)