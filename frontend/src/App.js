import './App.css';
//import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'  //npm i bootstrap-dark-5 boostrap
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

import Home from './screens/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './screens/Login';
import Signup from './screens/Signup';
 import MyOrder from './screens/MyOrder';
 import { CartProvider } from './components/ContextReducer';
// start
import Cancel from './components/Cancel.js';
// end


function App() {
  return (
    <CartProvider>
      <Router>
        <React.Fragment>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/creatuser" element={<Signup />} />
            <Route exact path="/myOrder" element={<MyOrder />} />
            {/* start */}
            <Route exact path="/cancel" element={<Cancel />} />
            {/* end */}
          </Routes>
        </React.Fragment>
      </Router>
    </CartProvider>
  );
}

export default App;