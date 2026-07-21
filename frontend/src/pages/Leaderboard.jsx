import { useQuery } from "@tanstack/react-query";

import DashboardLayout from "../app/layouts/DashboardLayout";

import LoadingState from "../components/ui/LoadingState";

import TopThreePodium from "../components/leaderboard/TopThreePodium";
import LeaderboardTable from "../components/leaderboard/LeaderboardTable";

import {
  getLeaderboard,
} from "../services/leaderboardService";

const Leaderboard = () => {
  const {
    data,
    isLoading,
  } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: () =>
      getLeaderboard(),
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

      <div className="mb-8">

        <h1
          className="
            font-mono
            text-4xl
            font-bold
          "
        >
          Leaderboard
        </h1>

        <p className="mt-2 text-zinc-400">
          Compete with the best
          programmers on the platform.
        </p>

      </div>

      <TopThreePodium
        leaderboard={
          data?.leaderboard
        }
      />

      <div className="mt-8">

        <LeaderboardTable
          leaderboard={
            data?.leaderboard || []
          }
        />

      </div>

    </DashboardLayout>
  );
};

export default Leaderboard;