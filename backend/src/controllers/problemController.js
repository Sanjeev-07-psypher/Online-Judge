import Problem from "../models/Problem.js";

export const createProblem = async (req, res) => {
    try {
        const problem = await Problem.create({
            ...req.body,
            createdBy: req.user._id,
        });

        res.status(201).json({
            success: true,
            problem,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getProblems = async (req, res) => {
    try {
        const problems = await Problem.find()
            .populate("createdBy", "username email");

        res.status(200).json({
            success: true,
            count: problems.length,
            problems,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getProblemById = async (req, res) => {
    try {
        const problem = await Problem.findById(req.params.id)
            .populate("createdBy", "username email");

        if (!problem) {
            return res.status(404).json({
                success: false,
                message: "Problem not found",
            });
        }

        res.status(200).json({
            success: true,
            problem,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateProblem = async (req, res) => {
    try {
        const problem = await Problem.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!problem) {
            return res.status(404).json({
                success: false,
                message: "Problem not found",
            });
        }

        res.status(200).json({
            success: true,
            problem,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteProblem = async (req, res) => {
    try {
        const problem = await Problem.findById(req.params.id);

        if (!problem) {
            return res.status(404).json({
                success: false,
                message: "Problem not found",
            });
        }

        await problem.deleteOne();

        res.status(200).json({
            success: true,
            message: "Problem deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};