import React, {useEffect}from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"

import Footer from "./components/Footer"
import NavBar from "./components/Navbar"

import Home from './pages/Home'
import Welcome from  "./pages/Welcome"
import Error404 from "./pages/Error404"
import Shop from "./pages/Shop"
import WineDetails from "./pages/WineDetails"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Blog from "./pages/blog"
import Basket from "./pages/Basket"
import NewAdmin from './pages/NewAdmin'

import {connect} from 'react-redux'
import userActions from './redux/actions/userActions'
import Snackbar from "../src/components/Snackbar"

function App(props) {

    useEffect(() => {
        if(localStorage.getItem('token')!== null) {
            const token = localStorage.getItem("token")
            props.verifyToken(token)
        }
    },[])

    return (
        <BrowserRouter>
            <NavBar/>
                <Routes> 
                    <Route path="/welcome" element={<Welcome />} />
                    <Route path="/*" element={<Error404 />} />
                    <Route path="/basket" element={<Basket />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path ="/wine/:id" element={<WineDetails />}/>     
                    {props.user ? <>
                        <Route path='/signIn' element={<Home />} /> <Route path='/signUp' element={<Error404 />} />
                    </> : <>
                        <Route path='/signIn' element={<SignIn />} /> <Route path='/signIn' element={<SignUp />} />
                    </>}
                    <Route path ="/signUp" element={<SignUp/>}/>
                    <Route path ="/newAdmin" element={<NewAdmin/>}/>
                    <Route path ="/blog" element={<Blog/>}/>
                    <Route path="/" index element={<Home />} />
                </Routes>
            <Footer/>
            <Snackbar/>
        </BrowserRouter>
    )
}

const mapDispatchToProps = {
	verifyToken: userActions.verifyToken,
}

const mapStateToProps = (state) => {
    return {user: state.userReducer.user}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
