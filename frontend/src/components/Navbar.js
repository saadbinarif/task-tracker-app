import { Link } from 'react-router-dom'

export default function Navbar(){

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Task Tracker</h1>
        </Link>
      </div>
    </header>
  )
}

 