import React, {useEffect,useState} from 'react'
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import basketActions from '../redux/actions/basketActions'
import {useDispatch} from 'react-redux'

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper} ` ,
    padding: '0 4px',
  },
}));

export default function CustomizedBadges() {
  const [badge,setBadge] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(basketActions.getUserBasket())
          .then(response=>setBadge(response.length))
          //.then(response=>console.log(response))
  },[])

  return (
    <IconButton aria-label="cart">
      <StyledBadge badgeContent={badge} className="BadgeNumber">  
      <ShoppingCartOutlinedIcon className='cart-nav'/>
      </StyledBadge>
    </IconButton>
  );
}