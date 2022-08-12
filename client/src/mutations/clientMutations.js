import { gql } from "@apollo/client";
// 1 is passing id and 2nd is type of id
// calling client


// adding client
const ADD_CLIENT= gql`

mutation addClient ($name: String!, $email: String!, $phone: String!){
 addClient(name: $name, email:$email, phone:$phone){
    id
    name
    email
    phone
 }
}
`;

// delete client
const DELETE_CLIENT= gql`

mutation deleteClient ($id: ID!){
 deleteClient(id: $id){
    id
    name
    email
    phone
 }
}
`;

export {ADD_CLIENT, DELETE_CLIENT};