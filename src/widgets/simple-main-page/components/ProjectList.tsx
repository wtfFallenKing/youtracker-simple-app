import Text from "@jetbrains/ring-ui-built/components/text/text";
import Island from "@jetbrains/ring-ui-built/components/island/island";
import Loader from "./Loader";
import ProjectItem from "./ProjectItem";
import { Project } from "../types";

interface ProjectListProps {
  projects: Project[];
  loading: boolean;
  updateTestFlag: (projectName: string, newValue: boolean) => Promise<void>;
}

const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  loading,
  updateTestFlag,
}) => {
  if (loading) {
    return <Loader />;
  }

  if (ProjectList.length === 0) {
    return (
      <Island style={{ padding: "24px", textAlign: "center" }}>
        <Text>No projects found.</Text>
      </Island>
    );
  }

  return (
    <Island>
      {projects.map((project) => (
        <ProjectItem
          key={project.id}
          project={project}
          updateTestFlag={updateTestFlag}
        />
      ))}
    </Island>
  );
};

export default ProjectList;
