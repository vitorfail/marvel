import React from "react";
import './Rodape.css'
import Insta from './inta.png'
import Twittter from './twitter.png'
import Face from './facebook.png'

export default function Rodape(){
    return(
        <footer>
            <div className="rodape">
                <div className="contatos">
                    <h2><strong>Canais de atendimento</strong></h2>
                    <h4>(88) 98134-8978</h4>
                    <h4>emailteste@hotmail.com</h4>
                </div>
                <div className="endereço">
                    <h2><strong>Endereço</strong></h2>
                    <h4>Rua Alberta</h4>
                    <h4>Barbalha, ceará</h4>
                    <h4>Sala 205</h4>
                </div>
                <div className="redes">
                    <h2><strong>Contatos</strong></h2>
                    <div style={{display:'flex'}}>
                        <img alt="insta" src={Insta}></img>
                        <img alt='tweiter' src={Twittter}></img>
                        <img alt="face" src={Face}></img>
                    </div>
                </div>
            </div>
            <div className="bottom">
                <h3>@2019 Copyright - Vitor Manoel</h3>
            </div>
        </footer>
    )
}