import {gql} from "@apollo/client";

// creating query like we created in graphiql
const GET_CLIENTS =gql`
 query getClients{
    clients{
        id
        name
        email
        phone
    }
 }
`

export {GET_CLIENTS} ;