const entities = require("@jetbrains/youtrack-scripting-api/entities");

exports.httpHandler = {
  endpoints: [
    {
      method: "POST",
      path: "getProjectFlag",
      handle: function handle(ctx) {
        try {
          const requestBody = JSON.parse(ctx.request.body);
          const projectName = requestBody.projectName;

          const project = entities.Project.findByName(projectName);
          if (!project) {
            ctx.response.json({ error: "Project not found" });
            return;
          }

          if (!ctx.globalStorage.extensionProperties.projectFlags) {
            ctx.globalStorage.extensionProperties.projectFlags = JSON.stringify(
              {}
            );
          }

          const testFlag =
            JSON.parse(ctx.globalStorage.extensionProperties.projectFlags)[
              projectName
            ] === true;
          ctx.response.json({ projectName, testFlag });
        } catch (e) {
          ctx.response.json({ error: e.message });
        }
      },
    },
    {
      method: "POST",
      path: "updateTestFlag",
      handle: function handle(ctx) {
        try {
          const requestBody = JSON.parse(ctx.request.body);
          const projectName = requestBody.projectName;
          const testFlag = !!requestBody.testFlag;

          const project = entities.Project.findByName(projectName);
          if (!project) {
            ctx.response.json({ error: "Project not found" });
            return;
          }

          if (!ctx.globalStorage.extensionProperties.projectFlags) {
            ctx.globalStorage.extensionProperties.projectFlags = JSON.stringify(
              {}
            );
          }

          const flags = JSON.parse(
            ctx.globalStorage.extensionProperties.projectFlags
          );
          flags[projectName] = testFlag;
          ctx.globalStorage.extensionProperties.projectFlags =
            JSON.stringify(flags);
          ctx.response.json({ success: true, projectName, testFlag });
        } catch (e) {
          ctx.response.json({ error: e.message });
        }
      },
    },
  ],
};
