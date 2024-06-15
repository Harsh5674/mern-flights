import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AddFlight from "./pages/AddFlight";
import { useAppContext } from "./contexts/AppContext";
import MyFlights from "./pages/MyFlights";
import EditFlight from "./pages/EditFlight";
import Search from "./pages/Search";
import Details from "./pages/Details";
import Booking from "./pages/Booking";


const App = () => {
  const { isLoggedIn } = useAppContext();
    return(
      <Router>
        <Routes>
          <Route 
             path="/"
             element={
              <Layout>
                Home Page
              </Layout>
             }
             />
             <Route 
              path="/search"
              element={
                <Layout>
                  <Search />
                </Layout>
              }
             />
             <Route
              path="/detail/:flightId"
              element={
                <Layout>
                  <Details />
                </Layout>
              }
            />
             <Route
                path="/register"
                element={
                  <Layout>
                    <Register />
                  </Layout>
                }
              />
              <Route
                  path="/sign-in"
                  element={
                    <Layout>
                      <SignIn />
                    </Layout>
                  }
                />
               {isLoggedIn && (<>
                <Route
                  path="/flight/:flightId/booking"
                  element={
                    <Layout>
                      <Booking />
                    </Layout>
                  }
                />
                <Route
                  path="/add-flight"
                  element={
                    <Layout>
                      <AddFlight />
                    </Layout>
                  }
                />
                <Route
                  path="/edit-flight/:flightId"
                  element={
                    <Layout>
                      <EditFlight />
                    </Layout>
                  }
                />
                <Route
                  path="/my-flights"
                  element={
                    <Layout>
                      <MyFlights />
                    </Layout>
                  }
                />
               </>)
               } 
             <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    );
}

export default App;

