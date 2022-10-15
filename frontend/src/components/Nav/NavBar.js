import "./NavBarStyle.css"

export default function NavBar() {
    return <nav className="nav">
        <a href="/" className="site_title">Stock Market Exchange App</a>
        <ul>
            <li className="active">
                <a href="/charts">Charts</a>
            </li>
            <li>
                <a href="/news">News</a>
            </li>
        </ul>
    </nav>
}