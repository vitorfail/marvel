import axios from 'axios'
import ApiKey from './Axios'

async function puxar_dados(d){
    var dados = []
    await axios.get('http://gateway.marvel.com/v1/public/comics?'+d+ApiKey)
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
                items: await puxar_dados('limit=23')
            }
        ]
    }
}