import {
  EmbeddableWidgetAPI,
  PluginEndpointAPILayer,
} from "../../../@types/globals";
import { Project } from "./types";

const API_URL = "https://artemdev.youtrack.cloud/api/admin/projects";
// Надо бы API_TOKEN вынести полем в settings.json с форматом "secret", а потом дёргать его из ctx.settings
const API_TOKEN = "perm-YWRtaW4=.NDMtMA==.GFZGThXrDI4R0wfLcQiU97PeyeAYtO";

export async function fetchProjectsAPI(): Promise<Project[]> {
  const response = await fetch(`${API_URL}?fields=id,name,shortName`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
      "Cache-Control": "no-cache",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }

  return response.json();
}

export async function updateTestFlagAPI(
  host: PluginEndpointAPILayer | EmbeddableWidgetAPI,
  projectName: string,
  testFlag: boolean
): Promise<void> {
  await host.fetchApp("backend/updateTestFlag", {
    method: "POST",
    body: {
      projectName,
      testFlag,
    },
  });
}
