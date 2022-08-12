import logo from "../assets/Graphql logo.svg";

export default function Header() {
  return (<>
  
  <nav className="navbar bg-dark mb-4 p-0">
    <div className="container">
      <a className="navbar-brand"  href="/">
        <div className="d-flex">
        <img src={logo} className="mr-2" alt="logo" />
        <span className="mt-2"><h1>GraphQL</h1></span>
        </div>
      </a>     
    </div>
  </nav>

  </>
   
  );
}
