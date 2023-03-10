import React, { useRef, useState } from "react";
import './index.css'

export default function Banner(props){
    const [ indice, setindice] = useState(0)
    const ref = useRef([])
    function passar(){
        if(indice !== Math.round(props.imagens.length/2)-2){
            var indi = indice+1
            for(var i = 0;i< ref.current.length; i++){
                ref.current[i].style.transform = 'translateX(-'+(indi*100)+'%)'
            }
            setindice(indi)
        }
        else{
            var indi = indice+1
            ref.current[ref.current.length-2].style.transform = 'translateX(-'+(indi*100)+'%)'
            ref.current[ref.current.length-1].style.transform = 'translateX(-'+(indi*100)+'%)'
            for(var i = 0;i< ref.current.length; i++){
                if(i !== ref.current[ref.current.length-2] || i !== ref.current[ref.current.length-1]){
                    ref.current[i].style.transform = 'translateX('+((indi)*100)+'%)'
                }
            }
            setindice(indi)
        }
    }
    return(
        <div className="painel">
            <div onClick={() => passar()}  className="anterior">
                <div>&gt;</div>
            </div>
            <div className="proximo">
                <div >&lt;</div>
            </div>
            <ul style={{width: window.innerWidth*props.imagens.length}}>
                {props.imagens.map((item, index) => (<li key={index}
                    ref={(element) => {ref.current[index] = element}}
                    style={{backgroundImage:"url("+item+")", 
                    backgroundPosition:'center', 
                    backgroundRepeat:'no-repeat', 
                    backgroundSize:'100% 100%'    
                }}
                className="slide"></li>))}
            </ul>
        </div>
    )
}