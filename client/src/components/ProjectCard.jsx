import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  console.log(project.id)
  return (
    <div className="col-md-6">
      <div className="card mb-3 mt-4 p-2">
        <div className="card_body p-2">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="project_title">{project.name}</h5>
            {/* <Link  to={`/projects/${project.id}`}
             className="btn btn-success" >
              view
            </Link> */}
             <Link title="view details" exact  to={`/projects/${project.id}`}
             className="btn btn-success w-25" >
              view
            </Link>
          </div>
          <p className="small">
            Status: <strong>{project.status}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
