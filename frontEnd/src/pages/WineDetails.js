import React, {useEffect, useState} from 'react'
import {Link as LinkRouter} from 'react-router-dom'
import {useParams} from 'react-router-dom'
import "../styles/WineDetails.css"
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import {useDispatch, useSelector} from 'react-redux'
import wineActions from '../redux/actions/wineActions'


function WineDetails() {

  const {id} = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(wineActions.oneWine(id))
  },[])

  const oneWine = useSelector(store => store.wineReducer.onlyWine)
  console.log(oneWine)

  return (
    <div className="details-container">
      <div className="card-details">
        <div className="flexCard">
          <div className='img-details-div'>
            <img className="img-details" src={oneWine.photo} alt={oneWine._id}/>
          </div>
          <div className="padding-text">
            <div className="head-details">
              <h1>{oneWine.nameWine}</h1>
              <h3>{oneWine.type}</h3>
              <h3>{oneWine.variety}</h3>
              <h1 className='price-details'>U$D {oneWine.price}</h1>
            </div>
            <div className="clarification-details">
            </div>
            <div className="custom-div-container-acordion">
              <div className="custom-acordion">
                <nav className="accordion arrows">
                  <input type="radio" name="accordion" id="cb1" />
                  <section className="box">
                    <label className="box-title" for="cb1">
                      Description
                    </label>
                    <label className="box-close" for="acc-close"></label>
                    <div className="box-content">
                      <style type="text/css"></style>
                      <div id="global">
                        <div className="text">
                          <h4>Tasting notes:</h4>
                          <p className="text">COLOR: {oneWine.color}</p>
                          <p className="text">AROMA: {oneWine.smell}</p>
                          <p className="text">PALATE: {oneWine.palate}</p>
                          <p className="text">FOOD: {oneWine.food}</p>
                        </div>
                        <div className="text">
                          <h4>Origin:</h4>
                          <p className="text">{oneWine.country} - {oneWine.harvest} years</p>
                        </div>
                      </div>
                    </div>
                  </section>
                  <input type="radio" name="accordion" id="acc-close" />
                </nav>
              </div>
            </div>
            <div>
              <h4 className="text">Payment and shipping:</h4>
            </div>
            <div>
              <p>Pay your order with the main credit and debit cards.</p>
              <p>We make FREE shipments up to 10 km from the premises. It takes between 48 hours and 96 hours, depending on the area</p>
            </div>
            <div className='clarifications-text'>
              <p>The images are illustrative only.</p>
              <p>Units are sold by closed box. Maximum order of 10 closed boxes.</p>
              <p>For larger orders or unit sales please contact us.</p>
            </div>
          </div>
        </div>
        <div className = "counterDiv-details">
            <div className="productCounter-details">
              <input className="input-customised" type="number" placeholder='0' min="1" max="10" step="1"/>
            </div>
            <LinkRouter to={`/basket`}><button className="btn-details cart-details"><ShoppingCartOutlinedIcon/></button></LinkRouter>
        </div>
      </div>
    </div>
  );
}

export default WineDetails;