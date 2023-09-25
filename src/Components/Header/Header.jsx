import React from 'react'
import "./header.css"
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="navbar-brand" aria-current="page" to="/">Busqueda</Link>
              </li>
              <li className="nav-item">
                <Link className="navbar-brand" to="/personajes">Personajes</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
