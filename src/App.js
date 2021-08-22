import Home from "./pages/home";
import NetworkMap from "./pages/network-map";
import { BrowserRouter, Route } from "react-router-dom";

// shared
import TopHeader from "shared/TopHeader";

function App() {
  return (
    <BrowserRouter>
	  <TopHeader />
      <Route exact path="/" component={Home} />
	  <Route exact path="/network-map" component={NetworkMap} />
    </BrowserRouter>
  );
}

export default App;
