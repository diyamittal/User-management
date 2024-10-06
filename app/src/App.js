import React, {useState, useEffect} from 'react'
import './App.css';
import {Routes, Route, Link} from 'react-router-dom'
import UserTable from './components/UserTable'
import UserDetail from './components/UserDetail'
import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(()=>{
    const fetchUsers = async ()=>{
      try{
        const response = await axios.get(API_URL);
        setUsers(response.data);
      }
      catch(err){
        setError('Error fetching users')
      }
      finally{
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className='App'>
      <h1>User Management</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <Link to="/">Home</Link>
      <Routes>
        <Route path="/" element={<UserTable users={users} setUsers={setUsers}/>}></Route>
        <Route path="/user/:id" element={<UserDetail users={users}/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
