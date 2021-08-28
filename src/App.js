import Home from "pages/home";
import NetworkMap from "pages/network-map";
import Analyze from "pages/analyze";
import { BrowserRouter, Route } from "react-router-dom";

// shared
import TopHeader from "shared/TopHeader";
import Gateways from "pages/gateways";

function App() {
  return (
    <BrowserRouter>
      <TopHeader />
      <Route exact path="/" component={Home} />
      <Route exact path="/network-map" component={NetworkMap} />
      <Route exact path="/analyze" component={Analyze} />
      <Route exact path="/gateways" component={Gateways} />
    </BrowserRouter>
  );
}

export default App;
