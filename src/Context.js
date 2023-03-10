import React, {useState} from "react";

export const  StoreContext = React.createContext({})

export const Provider = (props) =>{
    const [popup, setpopup] = useState(false)
    const [price, setprice] = useState(0)
    const [listahq, setlistahq] = useState([])
    const [imagemBanner, setimagemBanner] = useState('')
    const [tituloBanner, settituloBanner] =useState('')
    const [descricaoBanner, setdescricaoBanner] = useState("Por questões técinicas a sinopse desta hq ainda não ficou pront, mas não se preocupae, logo resolveremos isso")
    const [criadoresBanner, setcriadoresBanner]= useState([{name:'Desconhecido'}])
    const [idBanner, setidBanner] = useState(false)

  
    return(
        <StoreContext.Provider value={{price, setprice, listahq, setlistahq, 
            imagemBanner, setimagemBanner, tituloBanner, settituloBanner, descricaoBanner
            , setdescricaoBanner, criadoresBanner, setcriadoresBanner, idBanner, setidBanner, popup, setpopup}}>
            {props.children}
        </StoreContext.Provider>
    )
} 