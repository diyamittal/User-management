import React, {useState, useEffect} from 'react';
import UserForm from './UserForm';
import Confirmation from './Confirmation';
import axios from 'axios';

const UserTable = ({users, setUsers})=>{
    const [isEditing, setIsEditing] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const handleEdit = (user) =>{
        setSelectedUser(user);
        setIsEditing(true);
    }

    const handleDelete = (userId) =>{
        setConfirmDelete(userId);
    }

    const handleConfirmDelete = async ()=>{
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${confirmDelete}`, {
            method: 'DELETE',
        });
        if(response.ok){
            setUsers(users.filter(user => user.id !==confirmDelete));
            setConfirmDelete(false);
        }
    }

    const filteredUsers = users.filter((user)=> user.name.toLowerCase().includes(searchTerm.toLowerCase()))

    useEffect(() => {
        const fetchUsers = async () => {
          setLoading(true); // Start loading
          try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            setUsers(response.data);
          } catch (error) {
            alert('Error fetching users');
          } finally {
            setLoading(false); // End loading
          }
        };
        fetchUsers();
      }, []);
      
    return (
        <div>
            <h2>User List</h2>
            <input
                type='text'
                placeholder='Search by name...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {loading ? (
                <p>Loading.. user</p>
            ):(
                <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={() => handleEdit(user)}>Edit</button>
                                <button onClick={() => handleDelete(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                </table>
            )}
            {isEditing && (
                <UserForm 
                    user={selectedUser}
                    setUsers={setUsers}
                    setIsEditing={setIsEditing}
                    setSelectedUser={setSelectedUser}
                />
            )}
            {confirmDelete && (
                <Confirmation 
                    onConfirm={handleConfirmDelete}
                    onCancel={() => setConfirmDelete(false)}
                />
            )}
        </div>
    )
}

export default UserTable;