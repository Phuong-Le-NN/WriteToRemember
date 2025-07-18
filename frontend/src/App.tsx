import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./layouts/Layout"
import Register from "./pages/Register"
import SignIn from "./pages/SignIn";
import Showcase from "./pages/Homepage";
import CreateNote from "./pages/CreateNote";
import AllNotes from "./pages/AllNotes"
import UpdateNote from "./pages/UpdateNote";
import Chatty from "./pages/Chatty";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <Layout>
              <p></p>
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
        <Route 
          path="/showcase" 
          element={
              <Showcase />
          } 
        />
        <Route 
          path="/createNote" 
          element={
            <Layout>
              <CreateNote />
            </Layout>
          } 
        />
        <Route 
          path="/updateNote/:id" 
          element={
            <Layout>
              <UpdateNote />
            </Layout>
          } 
        />
        <Route 
          path="/allNotes" 
          element={
            <Layout>
              <AllNotes />
            </Layout>
          } 
        />
        <Route 
          path="/chatty" 
          element={
            <Layout>
              <Chatty />
            </Layout>
          } 
        />
        <Route 
          path="*" 
          element={<Navigate to="/" />} 
        />
      </Routes>
    </Router>
  );
};

export default App;