import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Home from "./pages/Home";
import Project from "./pages/Project";
import NotFound from "./pages/NotFound";

const cache = new InMemoryCache({
  typePolicies: {
    Queries: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

// setting a client variable
const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache,
});

function App() {
  return (
    <>
      <ApolloProvider client={client} >
        <Router>
          <Header />
          <div className="container">
           <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/projects/:id" element={<Project/>} />
            <Route exact path="*" element={<NotFound/>}/>
            </Routes>   
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
