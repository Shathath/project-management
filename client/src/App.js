import Dashboard from "./screens/Dashboard";

import Projects from "./screens/Projects";

import Sidebar from "./screens/Sidebar";

import { Route, Routes } from 'react-router-dom';

function App() 
{
  return (
    <div className="App">
		    <div className="container">
             <Sidebar />
             <div className="container__main">
              <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/projects" element={<Projects />} />
                </Routes>
             </div>
        </div>
    </div>
  );
}

export default App;
