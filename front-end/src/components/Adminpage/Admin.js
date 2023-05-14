import { useEffect, useState } from "react";
import React from "react";
const Admin = () => {
    const [value,setValue]=useState([''])
    useEffect(()=>{
        fetch("http://127.0.0.1:5000/getadmin").
        then((res)=>
        {return res.json}
        ).then((v)=>{
            setValue(v)
        })
    },[])
    return ( 
        <>
        <h1>Hello</h1>
        <h5>{value.hotelName}</h5>
        </>
    );
}
export default Admin;