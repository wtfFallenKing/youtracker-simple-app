import Button from "@jetbrains/ring-ui-built/components/button/button";
import Island from "@jetbrains/ring-ui-built/components/island/island";
import Text from "@jetbrains/ring-ui-built/components/text/text";

interface ProjectHeaderProps {
  fetchProjects: () => Promise<void>;
  loading: boolean;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  fetchProjects,
  loading,
}) => {
  return (
    <Island style={{ marginBottom: "24px", padding: "24px" }}>
      <Text style={{ marginBottom: "16px" }}>
        Enable or disable test management for projects.
      </Text>
      <Button
        primary
        onClick={fetchProjects}
        disabled={loading}
        style={{ width: "100%" }}
      >
        Refresh Projects (To make sure it's saved on YouTrack's side)
      </Button>
    </Island>
  );
};

export default ProjectHeader;
