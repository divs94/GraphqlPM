import { useState } from "react";
import { FaBookOpen } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECTS } from "../queries/projectQueries";
import { GET_CLIENTS } from "../queries/clientQueries";

export default function AddClientModal() {
    
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("new");
  const [clientId, setClientId] = useState("");


  const [addProject] = useMutation(ADD_PROJECT, {
    // whatever project we wanna delete through id
    variables: { name, description, clientId, status },

    // deleting project directly from frontend also preventing from refetching

    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });
      cache.writeQuery({
        query: GET_PROJECTS,
        // matching the data from projects that we want to delete
        // comes from current project which we creating using mutation
        data: { projects: [...projects, addProject] },
      });
    },
  });


// GET CLIENTS FOR SELECT
const {loading, error, data} = useQuery(GET_CLIENTS);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(name, description, status, clientId);
    if (name === "" || description === "" || status === "" ||clientId==="") {
      return alert("please fill all fields..");
    }

    // calling addProject function
    addProject(name, description, clientId, status);
    setName("");
    setDescription("");
    setStatus("new");
    setClientId("");
  };

  if(loading) return null;
  if(error) return <p>something went wrong..!!</p>

  return (<>
    {!loading && !error &&(
        <>
        <button title="Add project"
   style={{border:"6px solid black"}}

        type="button"
        className="btn btn-primary w-25"
        data-bs-toggle="modal"
        data-bs-target="#addProjectModel"
      >
        <div className="d-flex align-items-center">
          <FaBookOpen className="user_icon" />
          <div>New Project</div>
        </div>
      </button>

      <div
        className="modal fade"
        id="addProjectModel"
        aria-labelledby="addProjectModelLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addProjectModelLabel">
                Add Project
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body project_card">
              {/* form starts here */}
              <form className="project_card" onSubmit={onSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input 
                    type="text"
                    className="form-control project_card"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="mb-3 project_card">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control project_card"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>

                <div className="mb-3 project_card">
                  <label className="form-label project_card">Status</label>
                  <select id="status" className="form-select project_card"
                  value={status}
                  onChange={(e)=> setStatus(e.target.value)}
                  >
                    <option value="new">Not Started</option>
                    <option value="progress">In progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div className="mb-3 project_card">
                    <label className="form-label project_card">Client</label>
                    <select className="form-select project_card" 
                    id="clientId"
                    value={clientId}
                    onChange={(e)=> setClientId(e.target.value)}
                    >
                      <option value="">Select Client</option>
                      {/* maping through client from clients and showing name */}
                      {data.clients.map((client)=>(
                        <option key={client.id} 
                        value={client.id}>
                          {client.name}
                        </option>
                      ))}

                    </select>
                </div>

                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </form>
              {/* form ends here */}
            </div>
          </div>
        </div>
      </div>
        </>
    )}
   </>
  )
}
