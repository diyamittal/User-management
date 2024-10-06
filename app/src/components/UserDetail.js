import React from 'react';
import { useParams } from 'react-router-dom';

const UserDetail = ({users})=>{
    const {id} = useParams();
    const user = users.find((u) => u.id === parseInt(id));
    return (
        <div>
            {user ? (
                <div>
                    <h2>{user.name}</h2>
                    <p>Email: {user.email}</p>
                    <p>Phone: {user.phone}</p>
                    <p>Address : {user.address.street}, {user.address.city}</p>
                    <p>Website: {user.website}</p>
                    <p>Company: {user.company.name}</p>
                </div>
            ) : (
                <p>User not found</p>
            )}
        </div>
    )
}

export default UserDetail;