import React, {useState} from "react";

export const  StoreContext = React.createContext({})

export const Provider = (props) =>{
    const [price, setprice] = useState(0)
    const [listahq, setlistahq] = useState([])
    const [imagemBanner, setimagemBanner] = useState('')
    const [tituloBanner, settituloBanner] =useState('')
    const [descricaoBanner, setdescricaoBanner] = useState("")
    const [criadoresBanner, setcriadoresBanner]= useState([{name:'Desconhecido'}])
  
    return(
        <StoreContext.Provider value={{price, setprice, listahq, setlistahq, 
            imagemBanner, setimagemBanner, tituloBanner, settituloBanner, descricaoBanner
            , setdescricaoBanner, criadoresBanner, setcriadoresBanner}}>
            {props.children}
        </StoreContext.Provider>
    )
} 