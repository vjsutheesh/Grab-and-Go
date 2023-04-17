import React from 'react';
import Biriyani from './img/Biriyani.jpg';
import ProductList from './ProductList';
import { useState } from 'react';
import {useHistory} from "react-router-dom";

const Cards = () => {
    const hotelNames =["Vasantham","Jallikattu","Tea-Time","A1-Biriyani"];
    const [MenuList,setMenuList]=useState([]);
    const VasanthamMenu=["Biriyani","Fried rice","Veg-Meals","Non-veg Meals","Dosai","Parotta","kothu-Parotta"];
    const JallikattuMenu=["Biriyani","Fried rice","Dosai","Parotta"];
    const TeaTimeMenu=["Biriyani","Fried rice","Dosai","Parotta"];
    const A1BiriyaniMenu=["Biriyani","Fried rice","Dosai","Parotta"];

    const Handleclick =(hotelName)=> {
        // console.log(hotelName);
        console.log("Hai");
        if(hotelName==="Vasantham")
        {
            setMenuList=VasanthamMenu;
        }
        if(hotelName==="Jallikattu")
        {
            setMenuList=JallikattuMenu;
        }
        if(hotelName==="Tea-Time")
        {
            setMenuList=TeaTimeMenu;
        }
        if(hotelName==="A1-Biriyani")
        {
            setMenuList=A1BiriyaniMenu;
        }
        // return(
        //     <ProductList MenuList={MenuList}></ProductList> 
        // )
        
        const history = useHistory();
        history.push("/ProductList", {params : MenuList});
    }
    return (
        <>
            {
                hotelNames.map(hotelName =>(
                    <div className="hotel-list">
                    <button className='button-click' onClick= {()=>this.Handleclick({hotelName})} >
                    <div className='container-11' >
                            <img src={Biriyani} alt="loading ..." style={{ width: '400px', }} />
                            <div className='details'>
                                <h1 className="title">{hotelName}</h1>
                                <span className='rating'> 3.5&nbsp; ★</span>
                            </div>
                            <p className="desc">Hotel Vasantham very busy having rudh hoyrs in 7:00 to 9:00 in nights</p>
                        </div>
                    </button>
                </div>
                ))
            }
        </>
    );
}

export default Cards;