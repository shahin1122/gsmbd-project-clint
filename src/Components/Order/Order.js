import React, { useContext, useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useParams } from 'react-router';
import { UserContext } from '../../App';
import Cart from '../Cart/Cart';
import Products from '../Products/Products';

const Order = (event) => {
    const [loggedInUser , setLoggedInUser] = useContext(UserContext);
    const [order , setOrder] = useState([{}])
    useEffect(() => {
        const url = 'https://blooming-gorge-87666.herokuapp.com/Orderd?email='+ loggedInUser.email;
        fetch(url)
        .then(res => res.json())
        .then(data => setOrder(data))
    },[])
    return (
        <div>
            <div>
                {
                    order.map(pd =>
                         <div>
                            <div className="">
                            </div>
                                <Alert variant="success">
                                    <Alert.Heading>Hey, {pd.namee} Thank you for Ordering!</Alert.Heading>
                                    <h4>  orderd time {(new Date (pd.cheakOut).toDateString('dd/MM/yyyy') )}</h4>
                                    <hr />
                                    <p className="mb-0">
                                        <h5>Ordered from : {pd.email}</h5>
                                    </p>
                                </Alert>
                            </div> 
                         )
                }
            </div>
            
        </div>
    );
};

export default Order;