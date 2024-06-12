import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./layouts/Layout"


const App = () => {
  return (
    <Router>
      <Routes>
        <Route 
        path="/" 
        element={<Layout>
          <p>Main Screen</p>
        </Layout>}/>
        <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
    </Router>
  )
}

export default App;