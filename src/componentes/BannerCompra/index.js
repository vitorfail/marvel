import React from "react";
import './index.css'

export default function BannerCompra(props){
    return(
        <div className="banner-compra">
            <div className="cart">
                <div className="front" style={{backgroundImage:"linear-gradient(180deg, "+props.cor+" 0%, rgba(92,91,94,0) 100%)"}}>
                    <h2>Signature</h2>
                    <p>7.7 deck<span>2018</span></p>
                    <p className="price">$ 89.00</p>
                    </div>
                <div className="right" style={{backgroundImage:"linear-gradient(0deg, "+props.cor+" 0%, rgba(92,91,94,0) 100%)"}}>
                    <h2>Signature</h2>
                    <ul>
                    <li>Width	7.7"</li>
                    <li>Length	31.75"</li>
                    <li>Wheelbase	14"</li>
                    <li>Nose	6.875"</li>
                    <li>Tail	6.25"</li>
                    </ul>
                    <button>Add to cart, yo</button>
                </div>
            </div>
            <div className="img-wrapper">
                <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/577128/deck.png' alt=''/>    
            </div>
        </div>
    )
}