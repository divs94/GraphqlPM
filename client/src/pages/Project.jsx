import { Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import ClientInfo from "../components/ClientInfo";
import DeleteProjectButton from "../components/DeleteProjectButton";
import EditProjectForm from "../components/EditProjectForm";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";

export default function Project() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, { variables: { id } });

  if (loading) return <Spinner />;
  if (error) return <p>something went wrong..!!!</p>;

  return (
    <>
      {!loading && !error && (
        <div className="mx-auto w-5 card p-5">
          <Link to="/" className="btn btn-primary ms-auto w-25 d-inline">
            Back
          </Link>
          <h1 className="mt-3 pb-3">{data.project.name}</h1>
          
          <p className="client_card">{data.project.description}</p>
          <hr style={{ color: "gray" }} />

          <h5 className="mt-3 pb-3">Project Status</h5>
          <p className="client_card">{data.project.status}</p>
          <hr style={{ color: "gray" }} />

          <ClientInfo client={data.project.client} />
          <hr style={{ color: "gray" }} />

          <EditProjectForm project={data.project} />

          <DeleteProjectButton projectId={data.project.id} />
        </div>
      )}
    </>
  );
  // return(<div><h1>project</h1></div>)
}
