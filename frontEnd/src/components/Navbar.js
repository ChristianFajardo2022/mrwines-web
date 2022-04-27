import * as React from 'react'
import {Link as LinkRouter} from "react-router-dom"
import userActions from '../redux/actions/userActions'
import {connect} from 'react-redux'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Badge from "../components/Badge"

import "../styles/NavBar.css"

const NavBar = (props) => {
    const [anchorElNav, setAnchorElNav] = React.useState(null)
    const [anchorElUser, setAnchorElUser] = React.useState(null)
    const [navbar, setNavbar] = React.useState(false)

    const handleOpenNavMenu = (event) => {setAnchorElNav(event.currentTarget)}
    const handleOpenUserMenu = (event) => {setAnchorElUser(event.currentTarget)}
    const handleCloseNavMenu = () => {setAnchorElNav(null)}
    const handleCloseUserMenu = () => {setAnchorElUser(null)}
    
    const colorNav = () => {
        if (window.scrollY >= 5) {setNavbar(true)}
        else {setNavbar(false)}
    }

    window.addEventListener("scroll", colorNav)

    function signOutUser() {
        console.log(props.user.email)
        props.signOutUser(props.user.email)
    }

    return (

        <AppBar className='App-header' position="static">
            
            <Container maxWidth="xxl" className={navbar ? "navbar navbar-expand-lg " : " navbar navbar-expand-lg "}>
                <Toolbar disableGutters>
                    {/* ////////////////////////// BUTTON NAVBAR ////////////////////////// */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit">
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                            keepMounted
                            transformOrigin={{vertical: 'top', horizontal: 'left'}}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{display: { xs: 'block', md: 'none', },}} >
                            <MenuItem className="navLi" onClick={handleCloseNavMenu}>
                                <LinkRouter className="nav-linkUser" aria-current="page" to="/">Home</LinkRouter>
                            </MenuItem>
                            <MenuItem className="navLi" onClick={handleCloseNavMenu}>
                                <LinkRouter className="nav-linkUser" to="/shop">Shop</LinkRouter>
                            </MenuItem>
                            <MenuItem className="navLi" onClick={handleCloseNavMenu}>
                                <LinkRouter className="nav-linkUser" to="/blog">Blog</LinkRouter>
                            </MenuItem>
                            <MenuItem className="navLi" onClick={handleCloseNavMenu}>
                                <LinkRouter className="nav-linkUser" to="/basket">Basket</LinkRouter>
                            </MenuItem>
                        </Menu>
                    </Box>
                    {/* ////////////////////////// NAVBAR ////////////////////////// */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            <Button onClick={handleCloseNavMenu} className="navLi">
                                <LinkRouter className="linkGeneral" aria-current="page" to="/">Home</LinkRouter>
                            </Button>
                            <Button sx={{ my: 0, color: 'white', display: 'flex' }} className="navLi">
                                <LinkRouter className="linkGeneral" to="/shop">Shop</LinkRouter>
                            </Button>
                            <Button sx={{ my: 0, color: 'white', display: 'flex' }} className="navLi">
                                <LinkRouter className="linkGeneral" to="/blog">Blog</LinkRouter>
                            </Button>
                        </Box>
                    {/* ////////////////////////// USER ICON ////////////////////////// */}
                    <Box sx={{ flexGrow: 0.008 }}>
                        <Button sx={{ my: 0, color: 'white'}} className="navLi">
                            {/* <LinkRouter className="linkGeneral" to="/basket"><ShoppingCartOutlinedIcon className='cart-nav'/></LinkRouter> */}
                           <LinkRouter className="linkGeneral" to="/basket"> <Badge/></LinkRouter>
                        </Button>
                        <Tooltip>
                            {props.user ?
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
                                    <Avatar alt="Remy Sharp" className='logo' src={props.user.userPhoto} />
                                </IconButton>
                                :
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
                                    <Avatar className="iconoNav" alt="Remy Sharp"  variant="rounded" />
                                </IconButton>
                            }
                        </Tooltip>
                        <Menu
                            className='pruebaMenu'
                            sx={{ mt: '49px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                            keepMounted
                            transformOrigin={{vertical: 'top', horizontal: 'right'}}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}>
                            {props.user ?
                                <div> 
                                    {(props.user.admin===true) ? 
                                        <MenuItem onClick={handleCloseUserMenu} className="navLi">
                                            <LinkRouter className="nav-linkUser" aria-current="page" to="/NewAdmin">New Admin</LinkRouter>
                                        </MenuItem> : 
                                        <span className='spanUser'>{props.user.userName}</span>
                                    }
                                    <MenuItem onClick={handleCloseUserMenu} className="navLi">
                                        <LinkRouter className="nav-linkUser" aria-current="page" onClick={signOutUser} to="/">Sign Out</LinkRouter>
                                    </MenuItem>
                                </div> : <div>
                                    <MenuItem onClick={handleCloseUserMenu} className="navLi">
                                        <LinkRouter className="nav-linkUser" aria-current="page" to="/signIn">Sign In</LinkRouter>
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseUserMenu} className="navLi">
                                        <LinkRouter className="nav-linkUser " to="/signUp">Sign Up</LinkRouter>
                                    </MenuItem>
                                </div>
                            }
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
    )
}

const mapDispatchToProps = {
	signOutUser: userActions.signOutUser,
}

const mapStateToProps = (state) => {
	return {user: state.userReducer.user}
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)