import apiClient from "./apiClient";

export const getLeaderboard = async (
  page = 1
) => {
  const response =
    await apiClient.get(
      `/leaderboard?page=${page}&limit=20`
    );

  return response.data;
};