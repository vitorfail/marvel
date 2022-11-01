import React, { useRef, useState } from "react";
import './index.css'

export default function Banner(props){
    const [ indice, setindice] = useState(1)
    const ref = useRef()
    function passar(){
        
    }
    return(
        <div className="banner">
            <div className="anterior">
                <div>&gt;</div>
            </div>
            <div className="proximo">
                <div onClick={() => passar()}>&lt;</div>
            </div>
            <ul>
                {props.imagens.map((item, index) => (<li key={index}
                    style={{backgroundImage:"url("+item+")", 
                    backgroundPosition:'center', 
                    backgroundRepeat:'no-repeat', 
                    backgroundSize:'conver'}}
                className="slide"></li>))}
            </ul>
        </div>
    )
}