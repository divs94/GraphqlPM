import { FaExclamationCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (<>
    <div className="d-flex flex-column justify-content-center align-items-center mt-5 pt-5">
<FaExclamationCircle className="text-danger" size="8em"/>
<h1 style={{color:"white", fontSize:"5rem"}}>404</h1>
<p style={{color:"white"}}>Sorry, page does'nt exist</p>
<Link to="/" className="btn btn-primary" >Go Back to Home</Link>
    </div>
    </> )
}
