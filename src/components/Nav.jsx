import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"


const Nav = () => {
    const navigate = useNavigate()

    return (
        <nav>
            <ul className="nav">
                <li className="nav-item">
                    <Link to='/'>Add Lead</Link>
                </li>
                <li className="nav-item">
                    <Link to="/service-leads">Service Leads</Link>
                </li>
                <li className="nav-item">
                    <Link to="/inactive-leads">Inactive Leads</Link>
                </li>
            </ul>
            {localStorage.getItem("agent_user") ? (
                <div className="nav-item nav-logout">
                    <Link
                        className="nav-link"
                        to=""
                        onClick={() => {
                            localStorage.removeItem("agent_user")
                            navigate("/", { replace: true })
                        }}
                    >
                        Logout
                    </Link>
                </div>
            ) : (
                ""
            )}
        </nav>
    )
}

export default Nav