import apiClient from "./apiClient";

export const getUserProfile = async (
  userId
) => {
  const response =
    await apiClient.get(
      `/users/${userId}`
    );

  return response.data.profile;
};