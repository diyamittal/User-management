import React, {useEffect, useState} from 'react';
import axios from 'axios';

const UserForm = ({user, setUsers, setIsEditing, setSelectedUser})=>{
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        username: '',
        address: {street: '', city: ''},
        website: '',
        company: {name: ''},
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const {name, value} = e.target;
        if(name === 'street' || name === 'city'){
            setFormData((prev)=>({...prev, address: {...prev.address, [name]:value},}));
        }
        else{
            setFormData((prev)=>({...prev, [name]: value}));
        }

        setErrors((prev) => ({...prev, [name]: ''}));
    }

    const validateForm = () => {
        const newErrors = {};

        if(!formData.name || formData.name.length <3){
            newErrors.name = 'Name is required and must be at least 3 characters long.'
        }
        if(!formData.email || !/\S+@\S+\.\S+/.test(formData.email)){
            newErrors.email = 'A valid email is required';
        }
        if(!formData.phone || !/^\d{10}$/.test(formData.phone)){
            newErrors.phone = 'Phone number is required and must be 10 digits.';
        }
        
        if(!formData.address.street){
            newErrors.street = 'Street address is required';
        }
        if(!formData.address.city){
            newErrors.city = 'City is required';
        }
        
        if(!formData.company.name && formData.company.name.length<3){
            newErrors.comapny = 'Comapny name must be at least 3 characters long if provided';
        }
        if(!formData.website && !/^(ftp|http|https):\/\/[^ "]+$/.test(formData.website)){
            newErrors.website = 'Website must be a valid URL if provided';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(!validateForm()) return;
        try{
            let response;
            if(user){
                //update user
                response = await axios.put(`https://jsonplaceholder.typicode.com/users/${user.id}`, formData);
            }
            else{
                //create user
                response = await axios.post('https://jsonplaceholder.typicode.com/users', formData);
            }

            setUsers((prev) => {
                if(user){
                    return prev.map((u) => (u.id === user.id ? response.data : u));
                }
                return [...prev, response.data];
            })

            setIsEditing(false);
        }
        catch(error){
            alert('Error saving user');
        }
    }

    useEffect(()=>{
        if(user){
            setFormData(user);
        }
    }, [user]);

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                name='name'
                placeholder='Name'
                value={formData.name}
                onChange={handleChange}
                required
            />
            {errors.name && <p className="error">{errors.name}</p>}

            <input
                type='email'
                name='email'
                placeholder='Email'
                value={formData.email}
                onChange={handleChange}
                required
            />
            {errors.email && <p className="error">{errors.email}</p>}

            <input
                type='text'
                name='phone'
                placeholder='Phone'
                value={formData.phone}
                onChange={handleChange}
                required
            />
            {errors.phone && <p className="error">{errors.phone}</p>}

            <input
                type='text'
                name='username'
                value={`USER-${formData.username}`}
                readOnly
            />
            <input
                type='text'
                name='street'
                placeholder='Street'
                value={formData.address.street}
                onChange={handleChange}
                required
            />
            {errors.street && <p className="error">{errors.street}</p>}

            <input
                type='text'
                name='city'
                placeholder='City'
                value={formData.address.city}
                onChange={handleChange}
                required
            />
            {errors.city && <p className="error">{errors.city}</p>}

            <input
                type='text'
                name='website'
                placeholder='Website'
                value={formData.website}
                onChange={handleChange}
            />
            {errors.website && <p className="error">{errors.website}</p>}

            <input
                type='text'
                name='comapny'
                placeholder='Company Name'
                value={formData.company.name}
                onChange={(e) => handleChange({...e, target: {name: 'company', value: {name: e.target.value}}})}
            />
            {errors.company && <p className="error">{errors.company}</p>}

            <button type="submit">{user ? 'Update User' : 'Create User'}</button>
        </form>
    )
}

export default UserForm;