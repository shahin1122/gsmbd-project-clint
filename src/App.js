import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import Products from './Components/Products/Products';
import Cart from './Components/Cart/Cart';
import Admin from './Components/Admin/Admin';
import { Navbar , Nav  , NavDropdown , Form , FormControl , Button} from 'react-bootstrap';
import Login from './Components/Login/Login';
import { useState } from 'react';
import { createContext } from 'react';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Order from './Components/Order/Order';
export const UserContext = createContext();

function App() {

  const [loggedInUser , setLoggedInUser] = useState({});


  return (
    
      <UserContext.Provider value={[loggedInUser , setLoggedInUser]}>
         <Router>
          <div>
            <Navbar bg="light" text="dark" expand="lg">
              <Navbar.Brand href="/products">GSMBD.com</Navbar.Brand>
              {/* <Image src="holder.js/171x180" rounded /> */}
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto ">
                  <Link className="m-2 p-2 text-light bg-success rounded" to="/products">Home</Link>
                  <Link className="m-2 p-2 text-light bg-success rounded" to="/Order">Orders</Link>
                  <Link className="m-2 p-2 text-light bg-success rounded" to="/Admin">Admin</Link>
                  <Link className="m-2 p-2 text-light bg-success rounded" to="#">Deals</Link>
                  <Link className="m-2 p-2 text-light bg-success rounded" to='/login'>Login</Link>
                  <span className="m-2 p-2 text-light bg-success rounded">{loggedInUser.namee}</span>
                 </Nav>
                <Form inline>
                <img className="mx-3 mx-sm-5" style={{height:"35px" ,width:"35px"}}  className=" rounded-circle"  src={loggedInUser.photoURL} alt=""/>
                  <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </Navbar.Collapse>
            </Navbar>
            </div>
        <Switch>
        <Route exact path="/">
             <Products></Products>
          </Route>

          <Route path="/products">
              <Products></Products>
          </Route>
          
          <PrivateRoute path='/cart/:cartId'>
              <Cart></Cart>
          </PrivateRoute>

          <PrivateRoute path='/Order'>
              <Order></Order>
          </PrivateRoute>

          <PrivateRoute path="/Admin">
             <Admin></Admin>
          </PrivateRoute>

          <Route path='/Login'>
          <Login></Login>
          </Route>
          </Switch>
          </Router>
    </UserContext.Provider>
  );
}

export default App;
