import React, { useState } from "react"; 
import { GoogleMap , useJsApiLoader, Marker} from '@react-google-maps/api';



export default function Mapa(props){
 
    const containerStyle = {
        width: '100%',
        height: '100%'
    };
      const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_Mapkey
      })
    return isLoaded?(
        <GoogleMap 
            mapContainerStyle={containerStyle}
            center={props.cep}
            zoom={10}>
            <Marker position={props.cep}></Marker>
        </GoogleMap>

    ): <></>
}