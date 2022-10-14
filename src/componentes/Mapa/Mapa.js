import React, { useState } from "react"; 
import { GoogleMap , useJsApiLoader, Marker} from '@react-google-maps/api';
import { Mapkey } from "../../Axios";



export default function Mapa(props){
 
    const containerStyle = {
        width: '60%',
        height: '100%'
    };
      const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: Mapkey
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