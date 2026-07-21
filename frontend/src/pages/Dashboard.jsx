import { useQuery } from "@tanstack/react-query";

import { useAuth } from "../context/AuthContext";

import DashboardLayout from "../app/layouts/DashboardLayout";

import LoadingState from "../components/ui/LoadingState";
import MetricCard from "../components/ui/MetricCard";

import RecentSubmissions from "../components/dashboard/RecentSubmissions";
import AIInsights from "../components/dashboard/AIInsights";

import {
  Trophy,
  CheckCircle2,
  Code2,
  Activity,
} from "lucide-react";

import {
  getUserProfile,
} from "../services/userService";

const Dashboard = () => {
  const { user } = useAuth();

  const userId =
  user?.id ||
  user?._id;

  const {
    data: profile,
    isLoading,
  } = useQuery({
    queryKey: [
      "dashboard-profile",
      userId,
    ],
    queryFn: () =>
      getUserProfile(userId),
    enabled: !!userId,
  });

  if (isLoading) {
    return (
      <DashboardLayout>
        <LoadingState />
      </DashboardLayout>
    );
  }

  if (!profile) {
    return null;
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
          Welcome back,
          {" "}
          {profile.user.username}
          👋
        </h1>

        <p className="mt-2 text-zinc-400">
          Here's your coding progress.
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <MetricCard
          title="Solved Problems"
          value={profile.solvedProblems}
          subtitle="Unique accepted"
          icon={
            <Trophy className="text-yellow-400" />
          }
        />

        <MetricCard
          title="Accepted"
          value={profile.acceptedSubmissions}
          subtitle="Accepted submissions"
          icon={
            <CheckCircle2 className="text-green-400" />
          }
        />

        <MetricCard
          title="Submissions"
          value={profile.totalSubmissions}
          subtitle="Total attempts"
          icon={
            <Code2 className="text-cyan-400" />
          }
        />

        <MetricCard
          title="Global Rank"
          value={`#${profile.rank}`}
          subtitle="Platform ranking"
          icon={
            <Activity className="text-violet-400" />
          }
        />

      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">

        <div className="lg:col-span-2">
          <RecentSubmissions
            submissions={
              profile.recentSubmissions
            }
          />
        </div>

        <AIInsights />

      </div>

    </DashboardLayout>
  );
};

export default Dashboard;