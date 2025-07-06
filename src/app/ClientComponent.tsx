'use client'

import React, { ChangeEvent, useState } from 'react'
import { createUserActions } from './create-user-actions';

const ClientComponent = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeData = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setData({ ...data, [name]: value });
  }
    

  const onSubmit = () => {
    createUserActions(data).then((res) => {
        console.log(res);
    })
  }
    return (
    <div>
        <input className="border" type="text" name="name" onChange={onChangeData} />
        <input className="border" type="email" name="email" onChange={onChangeData} />
        <input className="border" type="password" name="password" onChange={onChangeData} />
        <button onClick={onSubmit}>Submit</button>
    </div>
  )
}

export default ClientComponent