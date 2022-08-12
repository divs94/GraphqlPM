import Clients from "../components/Clients";
import Project from "../components/Projects";
import AddClientModel from "../components/AddClientModel";
import AddProjectModal from "../components/AddProjectModal";

export default function Home() {
  return (
    <>
      <div className="container justify-content-center d-flex gap-5 mb-4 pt-4">
        <AddClientModel />
        <AddProjectModal />
      </div>

      <Project />
      {/* <hr /> */}
      <Clients />
    </>
  );
}
