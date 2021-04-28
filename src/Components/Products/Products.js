import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Cart from '../Cart/Cart';
import Order from '../Order/Order';


const Products = () => {

  

    const [cartId , serCartId ] = useState([])
    const history = useHistory()

    const handleClick= (cartId) =>{
        history.push(`/Cart/${cartId}`);
    }
    

    var [product , setProduct] = useState([])

    useEffect(()=>{
        fetch('https://blooming-gorge-87666.herokuapp.com/products')
        .then(res => res.json())
        .then(data => setProduct(data))
    },[])

   


    return (
        <div className="row d-flex justify-content-around">
            {
                product.map( event =>   

                    
                <div className="col-lg-3 col-md-4 bg-info m-1 px-0 py-5 rounded justify-content-center text-center">
                    <img style={{height:'200px'}} src={event.imageURL} alt=""/>
                    
                    <h5>{event.name}</h5>
                    <h5>Price {event.price} ৳</h5>
                    {/* <Cart information={event}></Cart> */}
                    <button onClick={()=>handleClick(event.id)}  className="btn btn-danger text-light">Order Now</button>
                </div> 

               

                // onClick={()=>handleClick(cart.id)}

                

                
                )
            }
        </div>
    );
};

export default Products;