import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import DashboardLayout from "../app/layouts/DashboardLayout";

import LoadingState from "../components/ui/LoadingState";

import SubmissionHeader from "../components/submission/SubmissionHeader";
import SubmissionMetrics from "../components/submission/SubmissionMetrics";
import SubmissionCodeView from "../components/submission/SubmissionCodeView";
import AIAnalysisPanel from "../components/submission/AIAnalysisPanel";

import {
  getSubmissionById,
  getSubmissionAnalysis,
} from "../services/submissionService";

const SubmissionDetail = () => {
  const { id } = useParams();

  const {
    data: submission,
    isLoading,
  } = useQuery({
    queryKey: ["submission", id],
    queryFn: () =>
      getSubmissionById(id),
  });

  const {
    data: analysisData,
  } = useQuery({
    queryKey: [
      "submission-analysis",
      id,
    ],
    queryFn: () =>
      getSubmissionAnalysis(id),
  });

  if (isLoading) {
    return (
      <DashboardLayout>
        <LoadingState />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <SubmissionHeader
        submission={submission}
      />

      <div className="mt-6">
        <SubmissionMetrics
          submission={submission}
        />
      </div>

      <div className="mt-6">
        <SubmissionCodeView
          code={submission.code}
        />
      </div>

      <div className="mt-6">
        <AIAnalysisPanel
          analysis={
            analysisData?.aiAnalysis
          }
          status={
            analysisData?.aiAnalysisStatus
          }
        />
      </div>

    </DashboardLayout>
  );
};

export default SubmissionDetail;