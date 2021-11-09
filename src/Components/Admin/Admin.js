import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import './Admin.css'


const Admin = () => {
    const { register  , handleSubmit, watch, errors } = useForm();
    const [imageUrl , setImageUrl] = useState(null)


    const onSubmit = data => {
        const eventData = {
            id: data.id,
            name : data.name,
            price : data.price,
            imageURL : imageUrl 

        };

        const url = `https://blooming-gorge-87666.herokuapp.com/Admin`

        console.log(eventData);
        fetch(url , {
            method : 'POST',
            headers: {
               'content-type' : 'application/json' 
            },
            body:JSON.stringify(eventData)
        })
        .then(res => console.log('server side response') );
    };

    const handleImageUpload = event =>{
        console.log(event.target.files[0]);
        const imageData = new FormData();
        imageData.set('key' , 'c1acbff557d61045c8403ea9413912de')
        imageData.append('image' , event.target.files[0]);


        axios.post('https://api.imgbb.com/1/upload',imageData)
          .then(function (response) {
            setImageUrl(response.data.data.display_url);
          })
          .catch(function (error) {
            console.log(error);
          });


    }



    return (
        
        <div className="d-flex flex-column mx-5 p-5 border border-primary text-center">
            <form  onSubmit={handleSubmit(onSubmit)}>

            <div className="input-div">
                    <label className="text-light" htmlFor="">PRODUCT ID : </label>
                    <input name="id" className="form-control w-25 d-inline-block mx-4" type="number" defaultValue="id" ref={register} /><br/>

                    <label className="text-light" htmlFor="">PRODUCT NAME:  </label>
                    <input name="name" className="form-control w-25 d-inline-block mx-4" defaultValue="" ref={register} /><br/>

                    <label className="text-light" htmlFor="">PRICE</label>
                    <input name="price" className="form-control w-25 d-inline-block mx-4" type="number"  defaultValue="price" ref={register}/> <br/>

                    <input className="bg-success text-light rounded my-4" name="exampleRequired" type="file" onChange={handleImageUpload} />
                    
            </div>
            <br/>
            <input className="bg-info rounded px-4 py-1 text-light" type="submit" />
      

            </form>
            
        </div>
    );
};

export default Admin;