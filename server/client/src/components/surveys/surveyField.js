import React from 'react';

export default ({input, label, meta}) => {
    console.log(meta);
  
    return (
        <div>
            <label>{label}</label>
             {/* input here may have different pairs of key and values */}
            <input {...input} />
            {meta.touched && meta.error && <span>{meta.error}</span>}
        </div>
    );
};