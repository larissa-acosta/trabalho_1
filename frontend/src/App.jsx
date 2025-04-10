import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import UserDetail from './components/UserDetail';
import Header from './components/Header'; 
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/add" element={<UserForm />} />
          <Route path="/edit/:id" element={<UserForm />} />
          <Route path="/details/:id" element={<UserDetail />} />
        </Routes>        
      </div>
    </Router>
  );
}

export default App;