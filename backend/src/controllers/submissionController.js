import Submission from "../models/Submission.js";
import submissionQueue from "../queues/submissionQueue.js";

export const createSubmission = async (req, res) => {
    try {
        const { problemId, code, language } = req.body;

        const submission = await Submission.create({
            user: req.user._id,
            problem: problemId,
            code,
            language,
        });

        await submissionQueue.add(
            "judge-submission",
            {
                submissionId: submission._id,
            }
        );

        const updatedSubmission = await Submission.findById(
            submission._id
        );

        res.status(201).json({
            success: true,
            submission: updatedSubmission,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getMySubmissions = async (req, res) => {
    try {
        const submissions = await Submission.find({
            user: req.user._id,
        })
            .populate("problem", "title difficulty")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: submissions.length,
            submissions,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getSubmissionById = async (req, res) => {
    try {
        const submission = await Submission.findById(
            req.params.id
        )
            .populate("user", "username email")
            .populate("problem", "title difficulty");

        if (!submission) {
            return res.status(404).json({
                success: false,
                message: "Submission not found",
            });
        }

        res.status(200).json({
            success: true,
            submission,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getRecentSubmissions = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const totalSubmissions =
            await Submission.countDocuments();

        const submissions =
            await Submission.find()
                .populate("user", "username")
                .populate("problem", "title")
                .sort({
                    createdAt: -1,
                })
                .skip(skip)
                .limit(limit)
                .select(
                    "user problem language verdict executionTime memoryUsed passedTestCases totalTestCases createdAt"
                );

        return res.status(200).json({
            success: true,
            page,
            limit,
            totalSubmissions,
            totalPages: Math.ceil(
                totalSubmissions / limit
            ),
            submissions,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message:
                "Failed to fetch recent submissions",
        });
    }
};