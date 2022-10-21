import "./NavBarStyle.css";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="nav">
      <Link to="/" className="site_title">
        Stock Market Exchange App
      </Link>
      <ul>
        <CustomTab to="/news">News</CustomTab>
        <CustomTab to="/notes">New Notes</CustomTab>  
      </ul>
    </nav>
  );
}

function CustomTab({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
