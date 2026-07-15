import Submission from "../models/Submission.js";
import { judgeSubmission } from "../services/judgeService.js";

export const createSubmission = async (req, res) => {
    try {
        const { problemId, code, language } = req.body;

        const submission = await Submission.create({
            user: req.user._id,
            problem: problemId,
            code,
            language,
        });

        await judgeSubmission(submission._id);

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