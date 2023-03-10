import React from "react";
import './index.css'

export default function BannerCompra(){
    return(
        <div class="banner-compra">
            <div class="cart">
                <div class="front">
                    <h2>Signature</h2>
                    <p>7.7 deck<span>2018</span></p>
                    <p class="price">$ 89.00</p>
                    </div>
                <div class="right">
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
            <div class="img-wrapper">
                <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/577128/deck.png' alt=''/>    
            </div>
        </div>
    )
}