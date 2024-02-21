import React from "react"
import "./index.css"

export function CuboGiratorio(props){
    return(
        <div className="dados-conteudo">
            <div className="dados">
                {props.imagens.map((item, index) => (
                    <img key={index} className="lados" src={item} />
                ))}
            </div>  
        </div>

    )
}