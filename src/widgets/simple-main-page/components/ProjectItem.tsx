import Toggle from "@jetbrains/ring-ui-built/components/toggle/toggle";
import { Project } from "../types";

interface ProjectItemProps {
  project: Project;
  updateTestFlag: (projectName: string, newValue: boolean) => Promise<void>;
}

const ProjectItem: React.FC<ProjectItemProps> = ({
  project,
  updateTestFlag,
}) => {
  return (
    <div
      key={project.id}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px 16px",
      }}
    >
      <div>
        <div style={{ fontWeight: "bold" }}>{project.name}</div>
        <div style={{ color: "#888", fontSize: "12px" }}>
          Key: {project.shortName}
        </div>
      </div>
      <Toggle
        name={`toggle-${project.id}`}
        checked={project.testFlag}
        onChange={() => updateTestFlag(project.name, !project.testFlag)}
      />
    </div>
  );
};

export default ProjectItem;
