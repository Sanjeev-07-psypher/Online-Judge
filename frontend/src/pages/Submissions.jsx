import { useQuery } from "@tanstack/react-query";

import DashboardLayout from "../app/layouts/DashboardLayout";

import LoadingState from "../components/ui/LoadingState";
import EmptyState from "../components/ui/EmptyState";

import SubmissionsTable from "../components/submission/SubmissionTable";

import {
  getMySubmissions,
} from "../services/submissionService";

const Submissions = () => {
  const {
    data: submissions,
    isLoading,
  } = useQuery({
    queryKey: ["mySubmissions"],
    queryFn: getMySubmissions,
  });

  if (isLoading) {
    return (
      <DashboardLayout>
        <LoadingState />
      </DashboardLayout>
    );
  }

  if (!submissions?.length) {
    return (
      <DashboardLayout>
        <EmptyState
          title="No Submissions Yet"
          description="Start solving problems to see your submission history."
        />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="mb-8">

        <h1
          className="
            font-mono
            text-4xl
            font-bold
          "
        >
          My Submissions
        </h1>

        <p className="mt-2 text-zinc-400">
          Track all your submissions,
          verdicts, execution times,
          and AI feedback.
        </p>

      </div>

      <SubmissionsTable
        submissions={submissions}
      />

    </DashboardLayout>
  );
};

export default Submissions;