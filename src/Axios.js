import axios from "axios"

const req = 'http://gateway.marvel.com/v1/public/comics?limit=13&ts=1&apikey=163774de18d327969e456ad21a8820ec&hash=8c9c7f16e25f0ef8eb87c39821a03479'
const Axios = axios.create({
    baseURL:req
})
export default Axios