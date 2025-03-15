import { memo, useCallback, useEffect, useState } from "react";
import ProjectHeader from "./components/ProjectHeader";
import ProjectList from "./components/ProjectList";
import { fetchProjectsAPI, updateTestFlagAPI } from "./api";
import { Project, ProjectFlagResponse } from "./types";

const host = await YTApp.register();

const AppComponent: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProjects = useCallback(async () => {
    setLoading(true);

    const projectsData = await fetchProjectsAPI();
    const projectsWithFlags = await Promise.all(
      projectsData.map(async (project) => {
        const flagResponse = await host.fetchApp<ProjectFlagResponse>(
          "backend/getProjectFlag",
          {
            method: "POST",
            body: {
              projectName: project.name,
            },
          }
        );

        return {
          ...project,
          testFlag: flagResponse.testFlag,
        };
      })
    );
    setProjects(projectsWithFlags);
    setLoading(false);
  }, []);

  const updateTestFlag = useCallback(
    async (projectName: string, newValue: boolean) => {
      await updateTestFlagAPI(host, projectName, newValue);

      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.name === projectName
            ? { ...project, testFlag: newValue }
            : project
        )
      );
    },
    []
  );

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <div
      style={{
        padding: "16px",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "24px auto" }}>
        <ProjectHeader fetchProjects={fetchProjects} loading={loading} />
        <ProjectList
          projects={projects}
          loading={loading}
          updateTestFlag={updateTestFlag}
        />
      </div>
    </div>
  );
};

export const App = memo(AppComponent);
