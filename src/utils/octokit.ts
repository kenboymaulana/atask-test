import { Octokit } from "@octokit/core";
import { GITHUB_API, GITHUB_TOKEN } from "./application.properties";

export const octokit = new Octokit({
  auth: GITHUB_TOKEN,
  baseUrl: GITHUB_API,
});