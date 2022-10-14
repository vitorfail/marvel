import axios from 'axios'

async function puxar_dados(){
    var dados = []
    await axios.get('https://gateway.marvel.com/v1/public/comics?limit=23&ts=1&apikey='+process.env.REACT_APP_ApiKey+'&hash='+process.env.REACT_APP_hash)
    .then(res => {
        for(var i =0; i < res.data.data.results.length; i++){
            if(res.data.data.results[i].description !== ""){
                dados.push(res.data.data.results[i])
            }
        }
    })
    return dados
}


export default{
    homelist: async ()=>{
        return [
            {
                titulo:"lista-inicial",
                items: await puxar_dados()
            }
        ]
    }
}