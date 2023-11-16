import React from 'react'

function Input({city, onChange, placeholder, onClickButton}) {
  return (
    <>
        <input id='input' type="text" value={city} onChange={onChange} placeholder={placeholder}/>
        <button id='input-btn' onClick={onClickButton}>Enter</button>
    </>
  )
}

export default Input