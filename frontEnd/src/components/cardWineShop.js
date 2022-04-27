import React, {useEffect,useState} from 'react'
import {Link as LinkRouter} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {connect} from "react-redux"
import wineActions from '../redux/actions/wineActions'
import basketActions from '../redux/actions/basketActions'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import "../styles/Shop.css"

function CardWineShop(props) {

    //console.log(props)

    const [reload, setReload] = useState(false)
    const [basket,setBasket] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(wineActions.filterWines(props.search))
    },[props.search])

    const filterFromRedux = useSelector(store => store.wineReducer.filter).sort(((a, b) => a.nameWine - b.nameWine))
    //console.log(filterFromRedux)
    
    let data = props.search ? filterFromRedux : props.wines
    //console.log(data)

    async function toAdd(event) {
        const idWine = event.target.value
        //console.log(idWine)
        await props.addProduct(idWine)
        setReload(!reload)
    }
    
    useEffect(() => {
        dispatch(basketActions.getUserBasket())
            .then(response=>setBasket(response))
            //.then(response=>console.log(response))
    },[reload])

    useEffect(() => {
        
    },[reload])

    return (
        <>
        {data.length>0 ?
            (data.map(everyWine =>
                <div className='cardTopWines' key={everyWine._id}>
                    <div className="card-div">
                        <img className='wineImg' src={everyWine.photo} alt={everyWine.nameWine}/>
                        <div className="infoCard-div">
                            <h3>{everyWine.nameWine}</h3>
                            <h4>{everyWine.type}</h4>
                            <h4>{everyWine.variety}</h4>
                            <h3 className='price'>U$D {everyWine.price}</h3>
                        </div>
                        <div className='btnShop-div'>
                        <LinkRouter to={`/wine/${everyWine._id}`}>
                            <button className='btnShop'>Info</button>
                        </LinkRouter>
                        {props.user ? (
                            (props.products.includes(everyWine._id)) ? (
                                <LinkRouter to={`/wine/${everyWine._id}`}>
                                    <span className='btnShop'><ShoppingCartOutlinedIcon/></span>
                                </LinkRouter>    
                            ) : (
                                <button className='btnShop' value={everyWine._id} onClick={toAdd}>Buy</button>
                            )
                        ) : (
                            <button className='btnShop'>Buy</button>
                        )}
                        </div>
                        title="Add to Cart"
                  color="#824d48"
                    </div>
                </div>
            )) : (
            <div className='cardTopWines noWines'>
                <h2>No matches with your search. Please try again.</h2>
                <h2>Or contact us to give you a solution.</h2>
            </div> 
            )
        }
        </>
    )
}

const mapDispatchToProps = {
    addProduct: basketActions.addProduct,
    deleteProduct: basketActions.deleteProduct,
    getUserBasket: basketActions.getUserBasket
}

const mapStateToProps = (state) => {
    return {
        products: state.productReducer.products,
        user: state.userReducer.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardWineShop)