import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import {DELETE_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";
import { GET_PROJECTS } from "../queries/projectQueries";

export default function ClientRow({ client }) {
  // using useMutation hook { primary API for executing mutations in an Apollo application.}

  const [deleteClient] = useMutation(DELETE_CLIENT, {
    // whatever client we wanna delete through id
    variables: { id: client.id },

    // deleting client directly from frontend also preventing from refetching
   refetchQueries:[{query:GET_CLIENTS}, {query: GET_PROJECTS}],

    // update(cache, {data:{deleteClient}}){
    //   const {clients} = cache.readQuery({query: GET_CLIENTS});
    //   cache.writeQuery({
    //     query: GET_CLIENTS,
    //     // matching the data from clients that we want to delete 
    //     data:{clients: clients.filter(client=>client.id!== deleteClient.id)},
    //   });
    // },
  });

  return (
    <>
      <tr className="table_data">
        <td>{client.name}</td>
        <td>{client.email}</td>
        <td>{client.phone}</td>
       <td> <button title="Delete" className="btn btn-sm"
        onClick={deleteClient}>
          <FaTrash className="delete_icon" />
        </button></td>
      </tr>
    </>
  );
}
