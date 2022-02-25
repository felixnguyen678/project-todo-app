import React, {useContext, useEffect, useState} from "react";
import DataContext from "../../contexts/data.context";
import {projectService} from "../../services";
import {useNavigate} from "react-router";
import ProjectCard from "../../components/project/ProjectCard";
import AddNewProjectCard from "../../components/project/AddNewProjectCard";
import useAuth from "../../hooks/useAuth";
import {UserRole} from "../../models/user.model";

function Projects(props) {
  const {loginUser} = useAuth();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getProjectFromDatabase() {
    setIsLoading(true);
    if(loginUser.role === UserRole.ADMIN) {
      const dataFromDatabase = await projectService.getAllProjects();
      setProjects(dataFromDatabase);
    } else {
      const dataFromDatabase = await projectService.getProjectsOfUser(loginUser.username);
      console.log(dataFromDatabase)
      setProjects(dataFromDatabase);
    }
    setIsLoading(false);
  }

  useEffect(async () => {
    await getProjectFromDatabase()
  },[]);

  if(!projects) return <></>;


  return (
    <>

      <div className="container mt-5">

          {
            isLoading ?(<div className="spinner-border mt-5 d-block mx-auto" role="status">
              <span className="visually-hidden"/>
            </div>) : (
              <>
                <div className="row">
                {
                  loginUser.role === UserRole.ADMIN && (
                    <div className="col-lg-4 col-md-6 col-sm-12">
                      <AddNewProjectCard />
                    </div>
                  )
                }
                {
                  projects.map(project => <div className="col-lg-4 col-md-6 col-sm-12"><ProjectCard project={project} /></div>)
                }
                </div>
                {projects.length === 0 && (<p className="">No data found.</p>)}
                </>

            )
          }
      </div>
    </>
  );
}

export default Projects;