import React from 'react'
import { createUserActionFromServerComponent } from './create-user-actions'

const ServerComponent = async () => {
  return (
    <form action={createUserActionFromServerComponent}>
        <input className="border" type="text" name="name" />
        <input className="border" type="email" name="email"/>
        <input className="border" type="password" name="password" />
        <button>Submit</button>
    </form>
  )
}

export default ServerComponent