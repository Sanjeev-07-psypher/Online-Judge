import mongoose from "mongoose";

const testCaseSchema = new mongoose.Schema(
    {
        input: {
            type: String,
            required: true,
        },

        output: {
            type: String,
            required: true,
        },

        isHidden: {
            type: Boolean,
            default: false,
        },
    },
    {
        _id: false,
    }
);

const problemSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
        },

        difficulty: {
            type: String,
            enum: ["Easy", "Medium", "Hard"],
            required: true,
        },

        tags: [
            {
                type: String,
            },
        ],

        testCases: [testCaseSchema],

        timeLimit: {
            type: Number,
            default: 2,
        },

        memoryLimit: {
            type: Number,
            default: 256,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Problem = mongoose.model("Problem", problemSchema);

export default Problem;