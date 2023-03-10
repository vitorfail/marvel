import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./pages/Home/App";
import Venda from "./pages/Venda/Venda";
const Rotas = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route exact path="/venda" component={Venda}/>
        </Switch>
    </BrowserRouter>
)
export default Rotas