import LoaderInline from "@jetbrains/ring-ui-built/components/loader-inline/loader-inline";
import Island from "@jetbrains/ring-ui-built/components/island/island";

const Loader = () => {
  return (
    <Island style={{ padding: "24px", textAlign: "center" }}>
      <div style={{ textAlign: "center", padding: "24px" }}>
        <LoaderInline />
      </div>
    </Island>
  );
};

export default Loader;
