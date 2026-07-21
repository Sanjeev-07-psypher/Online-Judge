import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";

import DashboardLayout from "../app/layouts/DashboardLayout";

import Card from "../components/ui/Card";
import LoadingState from "../components/ui/LoadingState";
import DifficultyBadge from "../components/ui/DifficultyBadge";

import MonacoEditor from "../components/editor/MonacoEditor";
import EditorToolbar from "../components/editor/EditorToolbar";

import SubmissionResult from "../components/submission/SubmissionResult";
import AIAnalysisPanel from "../components/submission/AIAnalysisPanel";

import {
  getProblemById,
  getProblemStats,
} from "../services/problemService";

import {
  createSubmission,
  getSubmissionById,
  getSubmissionAnalysis,
} from "../services/submissionService";

const starterCode = {
  cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {

    return 0;
}`,

  c: `#include <stdio.h>

int main() {

    return 0;
}`,

  java: `public class Main {

    public static void main(String[] args) {

    }
}`,

  python: `def solve():
    pass

solve()`,
};

const ProblemDetail = () => {
  const { id } = useParams();

  const [language, setLanguage] =
    useState("cpp");

  const [code, setCode] =
    useState(starterCode.cpp);

  const [submission, setSubmission] =
    useState(null);

  const [analysis, setAnalysis] =
    useState(null);

  const [analysisStatus,
    setAnalysisStatus] =
    useState(null);

  const [submitting,
    setSubmitting] =
    useState(false);

  const {
    data: problem,
    isLoading,
  } = useQuery({
    queryKey: ["problem", id],
    queryFn: () =>
      getProblemById(id),
  });

  const {
    data: stats,
  } = useQuery({
    queryKey: ["problemStats", id],
    queryFn: () =>
      getProblemStats(id),
  });

  // Holds the active polling interval so we can always clear it — on a new
  // submit, on unmount, or when polling finishes. Prevents the runaway
  // background API calls that were slowing the app down.
  const pollRef = useRef(null);

  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  const startPolling = (submissionId) => {
    if (pollRef.current) clearInterval(pollRef.current);

    let attempts = 0;
    let judged = false;

    pollRef.current = setInterval(async () => {
      attempts += 1;

      // Safety cap (~90s) so polling never runs forever.
      if (attempts > 45) {
        clearInterval(pollRef.current);
        return;
      }

      try {
        if (!judged) {
          // Phase 1: wait for the judge verdict.
          const latest = await getSubmissionById(submissionId);
          setSubmission(latest);

          if (latest.status === "Completed") {
            judged = true;
          }
        } else {
          // Phase 2: AI review runs on a separate queue after judging,
          // so keep polling its status until it finishes.
          const ai = await getSubmissionAnalysis(submissionId);
          setAnalysis(ai.aiAnalysis);
          setAnalysisStatus(ai.aiAnalysisStatus);

          if (
            ai.aiAnalysisStatus === "Completed" ||
            ai.aiAnalysisStatus === "Failed"
          ) {
            clearInterval(pollRef.current);
          }
        }
      } catch (err) {
        console.error(err);
      }
    }, 2000);
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      setSubmission(null);
      setAnalysis(null);
      setAnalysisStatus(null);

      const created = await createSubmission({
        problemId: id,
        code,
        language,
      });

      toast.success("Submission queued");

      startPolling(created._id);
    } catch (err) {
      console.error(err);
      toast.error("Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <LoadingState />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="grid grid-cols-2 gap-6">

        {/* LEFT PANEL */}

        <Card className="h-[calc(100vh-140px)] overflow-y-auto">

          <div className="flex items-center gap-3">

            <h1 className="text-3xl font-bold">
              {problem.title}
            </h1>

            <DifficultyBadge
              difficulty={
                problem.difficulty
              }
            />

          </div>

          <div className="mt-4 flex flex-wrap gap-2">

            {problem.tags?.map(
              (tag) => (
                <span
                  key={tag}
                  className="
                    rounded-lg
                    bg-zinc-900
                    px-3
                    py-1
                    text-xs
                  "
                >
                  {tag}
                </span>
              )
            )}

          </div>

          <div className="mt-6">
            <p className="leading-7 text-zinc-300 whitespace-pre-wrap">
              {problem.description}
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">

            <Card>
              <p className="text-zinc-500">
                Acceptance Rate
              </p>

              <h3 className="mt-2 text-2xl font-bold">
                {stats?.acceptanceRate || 0}%
              </h3>
            </Card>

            <Card>
              <p className="text-zinc-500">
                Total Submissions
              </p>

              <h3 className="mt-2 text-2xl font-bold">
                {stats?.totalSubmissions || 0}
              </h3>
            </Card>

          </div>

        </Card>

        {/* RIGHT PANEL */}

        <div className="space-y-6">

          <Card className="overflow-hidden p-0">

            <EditorToolbar
              language={language}
              setLanguage={(newLang) => {
                setLanguage(newLang);
                setCode(
                  starterCode[newLang]
                );
              }}
              onSubmit={handleSubmit}
              submitting={submitting}
            />

            <MonacoEditor
              language={language}
              code={code}
              setCode={setCode}
            />

          </Card>

          {submission && (
            <SubmissionResult
              submission={submission}
            />
          )}

          {submission && (
            <AIAnalysisPanel
              analysis={analysis}
              status={analysisStatus}
            />
          )}

        </div>

      </div>

    </DashboardLayout>
  );
};

export default ProblemDetail;