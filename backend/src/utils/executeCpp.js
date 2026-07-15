import fs from "fs";
import path from "path";
import { promisify } from "util";
import { exec } from "child_process";
import { v4 as uuidv4 } from "uuid";

const execPromise = promisify(exec);

const tempDir = path.join(process.cwd(), "src", "temp");

if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
}

export const executeCpp = async (code, input) => {
    const jobId = uuidv4();

    const cppFilePath = path.join(
        tempDir,
        `${jobId}.cpp`
    );

    const exeFilePath = path.join(
        tempDir,
        `${jobId}.exe`
    );

    const inputFilePath = path.join(
        tempDir,
        `${jobId}.txt`
    );

    try {
        fs.writeFileSync(cppFilePath, code);
        fs.writeFileSync(inputFilePath, input);

        // =========================
        // COMPILE PHASE
        // =========================
        try {
            await execPromise(
                `g++ "${cppFilePath}" -o "${exeFilePath}"`
            );
        } catch (error) {
            return {
                success: false,
                verdict: "Compilation Error",
                error:
                    error.stderr ||
                    error.stdout ||
                    error.message,
            };
        }

        // =========================
        // EXECUTION PHASE
        // =========================
        try {
            const { stdout } = await execPromise(
                `"${exeFilePath}" < "${inputFilePath}"`,
                {
                    timeout: 2000,
                }
            );

            return {
                success: true,
                output: stdout,
            };
        } catch (error) {
            if (error.killed) {
                return {
                    success: false,
                    verdict: "Time Limit Exceeded",
                    error: error.message,
                };
            }

            return {
                success: false,
                verdict: "Runtime Error",
                error:
                    error.stderr ||
                    error.stdout ||
                    error.message,
            };
        }
    } finally {
        [
            cppFilePath,
            exeFilePath,
            inputFilePath,
        ].forEach((file) => {
            if (fs.existsSync(file)) {
                fs.unlinkSync(file);
            }
        });
    }
};