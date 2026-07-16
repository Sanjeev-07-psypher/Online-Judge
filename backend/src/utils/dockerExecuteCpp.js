import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

import docker from "../config/docker.js";

const tempDir = path.join(
    process.cwd(),
    "src",
    "temp"
);

if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, {
        recursive: true,
    });
}

export const dockerExecuteCpp = async (
    code,
    input
) => {
    const jobId = uuidv4();

    const cppFilePath = path.join(
        tempDir,
        `${jobId}.cpp`
    );

    const inputFilePath = path.join(
        tempDir,
        `${jobId}.txt`
    );

    const executableName = `${jobId}`;

    try {
        fs.writeFileSync(cppFilePath, code);
        fs.writeFileSync(
            inputFilePath,
            input
        );

        // FIX: The 2s time limit is now enforced INSIDE the container with
        // coreutils `timeout` on the run step ONLY. Previously the 2s limit was
        // applied by an external timer that also covered container startup and
        // g++ compilation, so a slow compile (e.g. <bits/stdc++.h>) was wrongly
        // reported as "Time Limit Exceeded". Compilation now has no tight limit;
        // only the running program is capped. `timeout` exits with code 124 on
        // timeout, and the `&&` means the program never runs if g++ fails.
        const compileAndRunCommand = `
g++ /workspace/${jobId}.cpp -o /workspace/${executableName} &&
timeout 2s /workspace/${executableName} < /workspace/${jobId}.txt
`;

        console.log("Creating Container");

        const container =
            await docker.createContainer({
                Image: "gcc:14",

                Cmd: [
                    "bash",
                    "-c",
                    compileAndRunCommand,
                ],

                AttachStdout: true,
                AttachStderr: true,

                Tty: false,

                HostConfig: {
                    Binds: [
                        `${tempDir}:/workspace`,
                    ],

                    AutoRemove: false,

                    Memory:
                        256 * 1024 * 1024,

                    NanoCpus:
                        1 * 1000000000,

                    NetworkMode:
                        "none",
                },
            });

        const stream = await container.attach({
            stream: true,
            stdout: true,
            stderr: true,
        });

        let stdout = "";
        let stderr = "";

        docker.modem.demuxStream(
            stream,
            {
                write: (chunk) => {
                    stdout += chunk.toString();
                },
            },
            {
                write: (chunk) => {
                    stderr += chunk.toString();
                },
            }
        );

        console.log("Starting Container");

        await container.start();

        console.log("Container Started");

        let timedOut = false;

        // FIX: This external timer is ONLY a SAFETY NET for a container that is
        // genuinely stuck (Docker hang or a pathological compile), NOT the
        // execution limit. The real 2s run limit is enforced by `timeout 2s`
        // inside the container, independent of how long compilation takes.
        // It is set to 60s (not 10s) because compiling a heavy header like
        // <bits/stdc++.h> takes ~10s alone and much longer when several
        // submissions compile at once (worker concurrency), which was tripping
        // the old 10s net and mislabeling Compilation Errors as TLE.
        const timeoutId = setTimeout(
            async () => {
                timedOut = true;

                console.log(
                    "Safety timeout reached. Killing container..."
                );

                try {
                    await container.kill();
                } catch (error) {
                    console.log(
                        "Kill Error:",
                        error.message
                    );
                }
            },
            60000
        );

        const result =
            await container.wait();

        clearTimeout(timeoutId);

        if (timedOut) {
            console.log(
                "Container Killed By Safety Timeout"
            );

            try {
                await container.remove({
                    force: true,
                });
            } catch {}

            return {
                success: false,
                verdict:
                    "Time Limit Exceeded",
                error:
                    "Execution exceeded time limit",
            };
        }


        // console.log("Container Finished");
        // console.log("Status Code:", result.StatusCode);

        // console.log("STDOUT:");
        // console.log(stdout);

        // console.log("STDERR:");
        // console.log(stderr);

        await container.remove({
            force: true,
        });

        console.log("Container Removed");

        // FIX: `timeout` returns exit code 124 when the program exceeded the
        // 2s run limit, so exit 124 is a genuine Time Limit Exceeded (measured
        // on execution only, not compilation). This is checked before the
        // compile/runtime branch below.
        if (result.StatusCode === 124) {
            return {
                success: false,
                verdict:
                    "Time Limit Exceeded",
                error:
                    "Execution exceeded time limit",
            };
        }

        if (result.StatusCode !== 0) {
            // Compilation failed => the `&&` short-circuits and the program is
            // never run, so g++'s diagnostics ("error:" / "undefined reference")
            // in stderr mean a Compilation Error. Any other non-zero exit means
            // it compiled but crashed while running => Runtime Error.
            if (
                stderr.includes("error:") ||
                stderr.includes("undefined reference")
            ) {
                return {
                    success: false,
                    verdict:
                        "Compilation Error",
                    error: stderr,
                };
            }

            return {
                success: false,
                verdict:
                    "Runtime Error",
                error: stderr,
            };
        }

        return {
            success: true,
            output: stdout,
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            verdict:
                "Runtime Error",
            error:
                error.message ||
                "Unknown Error",
        };
    } finally {
        [
            cppFilePath,
            inputFilePath,
            path.join(
                tempDir,
                executableName
            ),
        ].forEach((file) => {
            try {
                if (
                    fs.existsSync(file)
                ) {
                    fs.unlinkSync(file);
                }
            } catch {}
        });
    }
};