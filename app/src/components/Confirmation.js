import React, {useState} from 'react';

const Confirmation = ({onConfirm, onCancel})=>{
    return (
        <div className='modal'>
            <h2>Are you sure you want to delete this user?</h2>
            <button onClick={onConfirm}>Yes</button>
            <button onClick={onCancel}>No</button>
        </div>
    )
}

export default Confirmation;