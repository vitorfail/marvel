import React from "react"
import "./index.css"

export function CuboGiratorio(props){
    return(
        <div class="dados-conteudo">
            <div class="dados">
                {props.imagens.map((item, index) => (
                    <img key={index} class="lados" src={item} />
                ))}
            </div>  
        </div>

    )
}