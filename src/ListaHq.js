import Axios from "./Axios";

async function puxar_dados(){
    var dados = []
    await Axios.get()
    .then(res => {
        dados = res.data.data.results
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