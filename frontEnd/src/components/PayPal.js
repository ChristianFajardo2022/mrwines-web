
import React, {useEffect, useState} from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import {useStateValue} from '../../StateProvider';
import {getTotal} from '../../reducer';

export default function PayPal() {
    const [{basket},dispatch] = useStateValue(); //traemos la info de nuestro carrito de compra
    const [success, setSuccess] = useState(false);
    const [orderID, setOrderID] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");

    console.log(1, orderID);
    console.log(2, success);
    console.log(3, ErrorMessage);  
    
    useEffect(() => {

        PayPalCheckOut()//LLamo al cdn de PayPal cada vez que cambia el carrito

    }, [basket]);

    const initialOptions = {
        "client-id": "AYAN6x3O5XiiMpSQIGLPpPp6K5vWkJ4WvElKCKsvNPqNaUBN3G0_nwtJcms3r_26tg7n4GTQfhRoi4xq",
        currency: "USD",
        intent: "capture"
    }

    let productsId=basket.map(items=>items.id)
    console.log(productsId)
  const createOrder = (data, actions) => {
       //Creo la orden de con los datos, esta puede ser general o con detalle de items
      console.log(data)
    return actions.order.create({
            purchase_units: [
       {
          description:"items",
          amount: {
            value: getTotal(basket),
          },
    
        },
     
       
      ],
 
    /* purchase_units: [{
                reference_id: "PUHF",
                description: "Sporting Goods",

                custom_id: "CUST-HighFashions",
                soft_descriptor: "HighFashions",
                amount: {
                    currency_code: "USD",
                    value: "230.00",
                    breakdown: {
                        item_total: {
                            currency_code: "USD",
                            value: "180.00"
                        },
                        shipping: {
                            currency_code: "USD",
                            value: "30.00"
                        },
                        handling: {
                            currency_code: "USD",
                            value: "10.00"
                        },
                        tax_total: {
                            currency_code: "USD",
                            value: "20.00"
                        },
                        shipping_discount: {
                            currency_code: "USD",
                            value: "10"
                        }
                    }
                },
                items: [{
                    name: "T-Shirt",
                    description: "Green XL",
                    sku: "sku01",
                    unit_amount: {
                         currency_code: "USD",
                         value: "90.00"
                    },
                    tax: {
                        currency_code: "USD",
                        value: "10.00"
                    },
                    quantity: "1",
                    category: "PHYSICAL_GOODS"
                },
                    {
                    name: "Shoes",
                    description: "Running, Size 10.5",
                    sku: "sku02",
                    unit_amount: {
                         currency_code: "USD",
                         value: "45.00"
                    },
                    tax: {
                        currency_code: "USD",
                        value: "5.00"
                    },
                    quantity: "2",
                    category: "PHYSICAL_GOODS"
                }
                ],
                shipping: {
                    method: "United States Postal Service",
                    address: {
                        name: {
                            full_name: "John",
                            surname: "Doe"
                        },
                        address_line_1: "123 Townsend St",
                        address_line_2: "Floor 6",
                        admin_area_2: "San Francisco",
                        admin_area_1: "CA",
                        postal_code: "94107",
                        country_code: "US"
                    }
                }
            }]
            */
    });
  };
  const onApprove = (data, actions) => { //recibo el resultado de mi operacion
      console.log(data)
    return actions.order.capture()
    .then(function (details) {
        const { payer } = details;
        setSuccess(true);
        console.log('Capture result', details, JSON.stringify(details, null, 2)); //veo los datos en consola
                var transaction = details.purchase_units[0].payments.captures[0];
                alert('Transaction '+ transaction.status + ': ' + transaction.id + '\n\nSee console for all available details');
        console.log(details)
        setOrderID(transaction.id)
    });  
  };
  const onCancel = (data) => {
    console.log('You have cancelled the payment!', data);
}	        

  const onError = (data, actions) => { //Capturo error en caso de que exista
    setErrorMessage("An Error occured with your payment ");
  };

  const PayPalCheckOut = ()=>{
    return (
        <PayPalScriptProvider options={initialOptions}> {/*Inicializo el CDN*/}

                {/*Inicializo los botones*/}
                <PayPalButtons 
                    createOrder={createOrder}
                    onApprove={ onApprove}
                    onError={onError}
                    onCancel={onCancel}
                />
        </PayPalScriptProvider>
    )
}
  return (
<PayPalCheckOut/> 
  );
}
