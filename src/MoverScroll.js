 export default function descer(cl){
    let t = (document.querySelector(cl)).offsetTop;
    window.scrollTo({ top: t-50, behavior: 'smooth' });
}