import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
    const [login, setlogin] = useState("Login")
    const auth = () =>{
      login === "Login"?setlogin("Logout"):setlogin("Login")
    }
  return (
    <div>
      <nav className="bg-gray-800 p-4">
      <div className="container-fluid mx-auto">
        <div className="flex items-center justify-between">
          <Link to={"/"} className="text-white font-bold text-xl">News Wave</Link>
          <div className="flex space-x-4">
            <Link to="/" className="text-white font-bold">News</Link>
            <Link to="/whether" className="text-white font-bold ">Whether</Link>
            </div>
            <button onClick={auth} className="text-white">{login}</button>
          
        </div>
      </div>
    </nav>
    </div>
  )
}
