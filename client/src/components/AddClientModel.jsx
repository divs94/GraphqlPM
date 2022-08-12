import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";

export default function AddClientModel() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [addClient] = useMutation(ADD_CLIENT, {
    // whatever client we wanna delete through id
    variables: { name, email, phone },

    // deleting client directly from frontend also preventing from refetching

    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        // matching the data from clients that we want to delete
        data: { clients: [...clients, addClient] },
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, phone);
    if (name === "" || email === "" || phone === "") {
      return alert("please fill all fields..");
    }

    addClient(name, email, phone);
    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <>
    {/* add clients button starts */}
  
   <button title="Add client"
   style={{border:"6px solid black", }}
        type="button"
        className="btn btn-primary w-25"
        data-bs-toggle="modal"
        data-bs-target="#addClientModel"
      >
        <div className="d-flex align-items-center">
          <FaUser className="user_icon" />
          <div>Add Client</div>
        </div>
      </button>

  

    {/* add clients button starts */}

      <div
        className="modal fade"
        id="addClientModel"
        aria-labelledby="addClientModelLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addClientModelLabel">
                Add Client
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
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control project_card"
                    name=""
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control project_card"
                    name=""
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    className="form-control project_card"
                    name=""
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
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
  );
}
