import MetricCard from "../ui/MetricCard";

import {
  Trophy,
  CheckCircle2,
  Code2,
  Activity,
} from "lucide-react";

const ProfileStats = ({
  profile,
}) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <MetricCard
        title="Solved Problems"
        value={
          profile.solvedProblems
        }
        subtitle="Unique accepted"
        icon={
          <Trophy className="text-yellow-400" />
        }
      />

      <MetricCard
        title="Accepted"
        value={
          profile.acceptedSubmissions
        }
        subtitle="Accepted submissions"
        icon={
          <CheckCircle2 className="text-green-400" />
        }
      />

      <MetricCard
        title="Submissions"
        value={
          profile.totalSubmissions
        }
        subtitle="Total attempts"
        icon={
          <Code2 className="text-cyan-400" />
        }
      />

      <MetricCard
        title="Acceptance Rate"
        value={`${profile.acceptanceRate}%`}
        subtitle="Overall accuracy"
        icon={
          <Activity className="text-violet-400" />
        }
      />

    </div>
  );
};

export default ProfileStats;