import axios from 'axios'
import ApiKey from './Axios'

async function puxar_dados(d){
    var dados = []
    await axios.get('http://gateway.marvel.com/v1/public/comics?'+d+ApiKey)
    .then(res => {
        dados = res.data.data.results
    })
    return dados
}
async function pesquisar_comic(d){
    var dados = []
    await axios.get('http://gateway.marvel.com/v1/public/comics/'+d+'?'+ApiKey)
    .then(res => {
        dados = res.data.data.results[0]
    })
    return dados
}

export default{
    homelist: async ()=>{
        return [
            {
                titulo:"lista-inicial",
                items: await puxar_dados('limit=13')
            }
        ]
    }
}