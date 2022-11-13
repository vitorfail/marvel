import './index.css'
import React from 'react'

/**
 * @constructor
 * @param {string} capa
 * @param {string} fundo 
 */
export default function FotoAmassada(props){
    return(
        <div className="banner">
            <div className="imagem2" style={{backgroundImage:"url("+props.fundo+")"}}></div>
            <div className="imagem--hover">
                <div className="imagem s1" style={{backgroundImage:"url("+props.capa+")"}}>
                    <div className="imagem s2" style={{backgroundImage:"url("+props.capa+")"}}>
                        <div className="imagem s3" style={{backgroundImage:"url("+props.capa+")"}}>
                            <div className="imagem s4" style={{backgroundImage:"url("+props.capa+")"}}>
                                <div className="imagem s5" style={{backgroundImage:"url("+props.capa+")"}}></div>
                            </div>
                        </div>
                    </div>
                </div>    
            </div>
        </div>
    )
}