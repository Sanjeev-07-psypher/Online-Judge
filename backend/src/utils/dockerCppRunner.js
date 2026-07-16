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

export const createCppRunner = async (
    code
) => {
    const jobId = uuidv4();

    const cppFilePath = path.join(
        tempDir,
        `${jobId}.cpp`
    );

    const executableName = jobId;

    fs.writeFileSync(
        cppFilePath,
        code
    );

    const container =
        await docker.createContainer({
            Image: "gcc:14",

            Cmd: [
                "tail",
                "-f",
                "/dev/null",
            ],

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

    await container.start();

    const execCommand = async (
        command
    ) => {
        const exec =
            await container.exec({
                Cmd: [
                    "bash",
                    "-c",
                    command,
                ],

                AttachStdout: true,
                AttachStderr: true,
            });

        const stream =
            await exec.start({});

        let stdout = "";
        let stderr = "";

        docker.modem.demuxStream(
            stream,
            {
                write: (chunk) => {
                    stdout +=
                        chunk.toString();
                },
            },
            {
                write: (chunk) => {
                    stderr +=
                        chunk.toString();
                },
            }
        );

        await new Promise(
            (resolve) => {
                stream.on(
                    "end",
                    resolve
                );
            }
        );

        const inspect =
            await exec.inspect();

        return {
            exitCode:
                inspect.ExitCode,
            stdout,
            stderr,
        };
    };

    return {
        async compile() {
            const result =
                await execCommand(
                    `g++ /workspace/${jobId}.cpp -o /workspace/${executableName}`
                );

            if (
                result.exitCode !== 0
            ) {
                return {
                    success: false,
                    verdict:
                        "Compilation Error",
                    error:
                        result.stderr,
                };
            }

            return {
                success: true,
            };
        },

        async run(input) {
            const inputFilePath =
                path.join(
                    tempDir,
                    `${jobId}.txt`
                );

            fs.writeFileSync(
                inputFilePath,
                input
            );

            const result =
                await execCommand(
                    `timeout 2s /workspace/${executableName} < /workspace/${jobId}.txt`
                );

            try {
                fs.unlinkSync(
                    inputFilePath
                );
            } catch {}

            if (
                result.exitCode === 124
            ) {
                return {
                    success: false,
                    verdict:
                        "Time Limit Exceeded",
                    error:
                        "Execution exceeded time limit",
                };
            }

            if (
                result.exitCode !== 0
            ) {
                return {
                    success: false,
                    verdict:
                        "Runtime Error",
                    error:
                        result.stderr,
                };
            }

            return {
                success: true,
                output:
                    result.stdout,
            };
        },

        async cleanup() {
            try {
                await container.remove({
                    force: true,
                });
            } catch {}

            [
                cppFilePath,
                path.join(
                    tempDir,
                    executableName
                ),
            ].forEach((file) => {
                try {
                    if (
                        fs.existsSync(
                            file
                        )
                    ) {
                        fs.unlinkSync(
                            file
                        );
                    }
                } catch {}
            });
        },
    };
};