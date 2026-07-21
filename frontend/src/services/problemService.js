import apiClient from "./apiClient";

export const getProblems = async () => {
  const response = await apiClient.get("/problems");

  return response.data.problems;
};

export const getProblemById = async (id) => {
  const response = await apiClient.get(
    `/problems/${id}`
  );

  return response.data.problem;
};

export const getProblemStats = async (id) => {
  const response = await apiClient.get(
    `/problems/${id}/stats`
  );

  return response.data.stats;
};