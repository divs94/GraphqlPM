//{gql} use to make the query  {useQuery} use to get data and use queries
import { useQuery} from "@apollo/client";  
import ClientRow from "./ClientRow";
import { GET_CLIENTS } from "../queries/clientQueries";
import Spinner from "./Spinner";



export default function Clients() {


// using useQuery hook :useQuery React hook is the primary API for executing queries in an Apollo app.
    const {loading, error, data} = useQuery(GET_CLIENTS);

    if(loading) return <Spinner/>
    if(error) return <p>something went wrong.!!</p>

  return (
    <>
     {!loading && !error && (
        <table className="table mt-3" style={{border:"0.1px solid black"}}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th></th>     
                </tr>
            </thead>

            <tbody>
                {data.clients.map(client =>(
                    <ClientRow key={client.id} client={client} />
                ))}
            </tbody>
        </table>
     )}
    </>
  );
}
