import Problem from "../models/Problem.js";
import Submission from "../models/Submission.js";

import { createCppRunner } from "../utils/dockerCppRunner.js";
import { compareOutput } from "../utils/compareOutput.js";

export const judgeSubmission = async (
    submissionId
) => {
    const submission =
        await Submission.findById(
            submissionId
        );

    if (!submission) {
        throw new Error(
            "Submission not found"
        );
    }

    const problem =
        await Problem.findById(
            submission.problem
        );

    if (!problem) {
        throw new Error(
            "Problem not found"
        );
    }

    const testCases =
        problem.testCases;

    let passedTestCases = 0;

    const runner =
        await createCppRunner(
            submission.code
        );

    try {
        const compileResult =
            await runner.compile();

        if (
            !compileResult.success
        ) {
            submission.verdict =
                compileResult.verdict;

            submission.passedTestCases = 0;

            submission.totalTestCases =
                testCases.length;

            await submission.save();

            return submission;
        }

        for (const testCase of testCases) {
            const result =
                await runner.run(
                    testCase.input
                );

            if (!result.success) {
                submission.verdict =
                    result.verdict;

                submission.passedTestCases =
                    passedTestCases;

                submission.totalTestCases =
                    testCases.length;

                await submission.save();

                return submission;
            }

            const isCorrect =
                compareOutput(
                    testCase.output,
                    result.output
                );

            if (!isCorrect) {
                submission.verdict =
                    "Wrong Answer";

                submission.passedTestCases =
                    passedTestCases;

                submission.totalTestCases =
                    testCases.length;

                await submission.save();

                return submission;
            }

            passedTestCases++;
        }

        submission.verdict =
            "Accepted";

        submission.passedTestCases =
            passedTestCases;

        submission.totalTestCases =
            testCases.length;

        await submission.save();

        return submission;
    } finally {
        await runner.cleanup();
    }
};