import { Router, Route } from "react-router-dom";
import ChatPage from "./components/pages/ChatPage";
import SigninPage from "./components/pages/SigninPage";
import { history } from "./history";

function App() {
    return (
        <Router history={history}>
            <Route path="/signin" component={SigninPage} exact />
            <Route path="/rooms/:roomId" component={ChatPage} exact />
            <Route path="/" component={ChatPage} exact />
        </Router>
    );
}

export default App;
