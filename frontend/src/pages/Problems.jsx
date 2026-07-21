import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import DashboardLayout from "../app/layouts/DashboardLayout";

import LoadingState from "../components/ui/LoadingState";
import EmptyState from "../components/ui/EmptyState";

import ProblemCard from "../components/problems/ProblemCard";

import { getProblems } from "../services/problemService";

const Problems = () => {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("q") || "").toLowerCase();

  const { data: problems, isLoading } = useQuery({
    queryKey: ["problems"],
    queryFn: getProblems,
  });

  if (isLoading) {
    return (
      <DashboardLayout>
        <LoadingState />
      </DashboardLayout>
    );
  }

  if (!problems?.length) {
    return (
      <DashboardLayout>
        <EmptyState
          title="No Problems Found"
          description="Create your first problem."
        />
      </DashboardLayout>
    );
  }

  const filtered = query
    ? problems.filter(
        (p) =>
          p.title?.toLowerCase().includes(query) ||
          p.tags?.some((t) => t.toLowerCase().includes(query))
      )
    : problems;

  return (
    <DashboardLayout>
      <div className="mb-8">
        <p className="text-[11px] uppercase tracking-[0.2em] text-ink-faint">
          // problemset
        </p>

        <h1 className="mt-2 font-mono text-4xl font-bold">Problems</h1>

        <p className="mt-2 text-ink-dim">
          {query
            ? `${filtered.length} result${
                filtered.length === 1 ? "" : "s"
              } for “${searchParams.get("q")}”`
            : "Solve challenges and improve your skills."}
        </p>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No matching problems"
          description="Try a different search term."
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((problem) => (
            <ProblemCard key={problem._id} problem={problem} />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default Problems;
