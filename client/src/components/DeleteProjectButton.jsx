import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {GET_PROJECTS } from "../queries/projectQueries";
import { useMutation } from "@apollo/client";
import { DELETE_PROJECT } from "../mutations/projectMutations";
import Project from "../pages/Project";

export default function DeleteProjectButton({projectId}) {

    const navigate = useNavigate();
    const [deleteProject] = useMutation(DELETE_PROJECT, {
        // whatever client we wanna delete through id
        variables: { id: projectId },
        onCompleted: ()=>navigate("/"), 
        // deleting client directly from frontend also preventing from refetching
        refetchQueries:[{query: GET_PROJECTS}],

        // update(cache, {data:{deleteProject}}){
        //   const {projects} = cache.readQuery({query: GET_PROJECT});
        //   cache.writeQuery({
        //     query: GET_PROJECT,
        //     // matching the data from projects that we want to delete 
        //     data:{projects: projects.filter(project=>project.id!== deleteProject.id)},
        //   });
        // },
      });
    

  return (
    <div className="d-flex mt-3">
        <button title="delete project" className="btn btn-danger  mt-2" onClick={deleteProject}>
            <FaTrash className="user_icon"/>Delete Project
        </button>
    </div>
  )
}
