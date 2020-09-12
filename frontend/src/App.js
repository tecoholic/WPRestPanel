import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Explorer from "./pages/Explorer";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/explorer/:site_url" children={<Explorer />} />
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
