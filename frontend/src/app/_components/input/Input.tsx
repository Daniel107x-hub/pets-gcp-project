import React, { HTMLInputTypeAttribute } from 'react'

type Props = {
    type?: HTMLInputTypeAttribute;
    name: string;
    label: string;
}

const Input = ({name, label, type = "text"}: Props) => {
  return (
    <div className='w-full'>
        <label htmlFor={name} className="text-sm">{label}</label>
        <input type={type} name={name} className="bg-white w-full shadow-md" />
    </div>
  )
}

export default Input