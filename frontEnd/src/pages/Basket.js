import React, {useEffect,useState} from 'react'
import {connect} from "react-redux"
import basketActions from '../redux/actions/basketActions'
import "../styles/Carrito.css"
import {Link as LinkRouter } from 'react-router-dom'

function Basket(props) {

    const [reload, setReload] = useState(false)
    const [basket,setBasket] = useState([])
    const [secret,setSecret] = useState("")
    const [discount,setDiscount] = useState(0)

    useEffect(() => {
        props.getUserBasket()
            .then(response=>setBasket(response))
            //.then(response=>console.log(response))
    },[reload])

    let subtot = 0
    basket.forEach(everyWine => {
        subtot = subtot + everyWine.idWine.price*everyWine.amount
    })

    async function toModify(event) {
        event.preventDefault()
        const commentData = {
            productId: event.target.id,
            amount: event.target.value
        }
        await props.modifyProduct(commentData)
        setReload(!reload)
    }

    async function toDelete(event) {
        event.preventDefault()
        await props.deleteProduct(event.target.id)
        setReload(!reload)
    }

    function discountFunction(event) {
        event.preventDefault()
        if (secret.trim()==="missWines") {
            setDiscount(25)
        } else if (secret.trim()==="lordWines") {
            setDiscount(15)
        } else {
            setDiscount(0)
        }
    }

    async function toChangeState(event) {
        event.preventDefault()
        const commentData = {}
        basket.map(everyWine => {
            commentData.productId = everyWine._id
            commentData.buyState = "bought"
            props.modifyState(commentData)
        })
        setReload(!reload)
    }

    return (
        <div className="div-container0-carrito">
            <div className="div-tittle-carrito">
                <h1>Basket</h1>
            </div>
            <div className="div-container1-carrito">
                <div className="div-products-carrito">
                    {basket.length>0 ? basket.map( everyWine =>
                        <div key={everyWine._id} className="div1-products">
                            <div className="div-image">
                            <img className="img-carrito" src={everyWine.idWine.photo} alt={everyWine.idWine.nameWine} />
                            </div>
                            <div className="div2-products">
                                <p>{everyWine.idWine.nameWine}</p>
                                <p>{everyWine.idWine.type} - {everyWine.idWine.variety}</p>
                            </div>                           
                            <div className="div3-products">
                                <input id={everyWine._id} className="custom-input-products" type="number" onChange={toModify}  defaultValue={everyWine.amount} min="1" max="10"/>
                            </div>
                            <div className="div4-products">
                                <p> {everyWine.idWine.price} USD</p>
                            </div>
                            <div id={everyWine._id}> 
                                <span id={everyWine._id} onClick={toDelete} className="icon-delete"> ×</span>
                            </div>
                        </div> ) : (
                        <div className="CartEmpty">
                            <p>Your cart is empty</p>
                            <p>Choose a product in the <LinkRouter className="textDecorationBasket" to="/shop">shop!</LinkRouter></p>
                        </div>
                        )
                    }
                </div>
                <div className="div-details-carrito">
                    <div className="div1-details">
                        <p>Do you have a discount code?</p>
                    </div>
                    <div className="div2-details">
                    <div className="discount">
                        <input className="custom-input-details" type="text" onChange={event => setSecret(event.target.value)}/>
                        <button className="custom-button-details" onClick={discountFunction}>Apply</button>
                    </div>
                    </div>
                    <div className="div3-details">
                        <p>Subtotal: {subtot} USD</p>
                    </div>
                    <div className="div3-details">
                        <p>Discount: {discount} %</p>
                    </div>
                    <div className="div4-details">
                        <p>Total: {discount>0 ? subtot*(100-discount)/100 : subtot} USD</p>
                    </div>
                    <div className="div5-details">
                        <button className="btn-basket" onClick={toChangeState}>Checkout</button>
                        <LinkRouter className="btn-basket" to="/shop">Keep buying</LinkRouter>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = {
  addProduct: basketActions.addProduct,
  modifyProduct: basketActions.modifyProduct,
  deleteProduct: basketActions.deleteProduct,
  getUserBasket: basketActions.getUserBasket,
  modifyState: basketActions.modifyState
}

const mapStateToProps = (state) => {
  return {
      products: state.productReducer.products,
      user: state.userReducer.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Basket)