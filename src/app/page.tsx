import React, { Suspense } from 'react'
import ClientComponent from './ClientComponent'
import ServerComponent from './ServerComponent'

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <ClientComponent />
      {/* <Suspense fallback={<div>Loading...</div>}>
        <ServerComponent />
      </Suspense> */}
    </div>
  )
}

export default Home
