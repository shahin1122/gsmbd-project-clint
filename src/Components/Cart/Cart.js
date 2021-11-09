import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { UserContext } from '../../App';


const Cart = () => {
    const [loggedInUser , setLoggedInUser] = useContext(UserContext);
    const [selectedDate, setSelectedDate] = useState({
        cheakOut: new Date()
    });
    const handleDateChange = (date) => {
        const newDates = {...selectedDate}
        newDates.cheakOut = date 
        setSelectedDate(newDates);
    };

    const { cartId } = useParams();
    const [cart, setCart] = useState({});


    useEffect(() => {
        const url = `https://blooming-gorge-87666.herokuapp.com/products/${cartId}`
        fetch(url)
            .then(res => res.json())
            .then(data => setCart(data))

    }, [cartId])

    const handleBooking=()=>{
        const newBooking = {...loggedInUser , ...selectedDate}

        fetch('https://blooming-gorge-87666.herokuapp.com/Cart' , {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(newBooking)
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }
        return (
        <div className="m-5">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Ordered Date"
                        format="dd/MM/yyyy"
                        value={selectedDate.cheakOut}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    
                </Grid>
            </MuiPickersUtilsProvider>

            <br/>
           
            <br/>
            <br/>
            <table class="table w-75 float-right bg-secondary text-light">
                <thead>
                    <tr>
                        <th scope="col">Product ID</th>
                        <th scope="col">Product</th>
                        <th scope="col">Model</th>
                        <th scope="col">Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">{cart.id}</th>
                        <td> <img style={{ width: "50px" }} src={cart.imageURL} alt="" /> </td>
                        <td>{cart.name}</td>
                        <td>৳ {cart.price} TK </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td>Total</td>
                        <td>৳ {cart.price} TK</td>

                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td><button onClick={handleBooking} className="btn btn-success rounded">Cheak Out</button></td>
                    </tr>
                </tbody>

            </table>
        </div>
    );
};

export default Cart;