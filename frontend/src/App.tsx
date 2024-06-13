import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AddFlight from "./pages/AddFlight";
import { useAppContext } from "./contexts/AppContext";


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
                  Search Page
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
                  path="/add-flight"
                  element={
                    <Layout>
                      <AddFlight />
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

