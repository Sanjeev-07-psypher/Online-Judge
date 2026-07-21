import apiClient from "./apiClient";

export const createSubmission = async ({
  problemId,
  code,
  language,
}) => {
  const response = await apiClient.post(
    "/submissions",
    {
      problemId,
      code,
      language,
    }
  );

  return response.data.submission;
};

export const getSubmissionById = async (
  submissionId
) => {
  const response = await apiClient.get(
    `/submissions/${submissionId}`
  );

  return response.data.submission;
};

export const getSubmissionAnalysis =
  async (submissionId) => {
    const response =
      await apiClient.get(
        `/submissions/${submissionId}/analysis`
      );

    return response.data;
  };

export const getMySubmissions =
  async () => {
    const response =
      await apiClient.get(
        "/submissions/my"
      );

    return response.data.submissions;
  };