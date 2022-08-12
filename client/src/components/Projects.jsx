import Spinner from "./Spinner";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import ProjectCard from "./ProjectCard";

export default function Project() {

    const {loading, error, data}= useQuery(GET_PROJECTS);

    if(loading) return <Spinner/>

    if(error) return <p>something went wrong....</p>

  return (
    <>
    {data.projects.length > 0 ? (

        <div className="row">

            {data.projects.map((project)=>(
              <ProjectCard
              key={project.id}
              project={project}
              />
            ))}
        </div>
    ): 
    (<p> No Project</p>)
    }
   
   </>
   );
  
}
