import React from "react";
import './index.css'

export default function Logos(props){
    return(            
        <section className='logos'>
            {props.logos.map((item, index) => (
                <div alt={index} key={index} style={{background:'url('+item+') no-repeat center', backgroundSize:'contain'}}></div>
            ))}
        </section>
    )
}