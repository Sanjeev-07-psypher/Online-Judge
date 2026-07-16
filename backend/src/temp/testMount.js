import fs from "fs";
import path from "path";

import docker from "../config/docker.js";

const testMount = async () => {
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

    const testFile = path.join(
        tempDir,
        "hello.txt"
    );

    fs.writeFileSync(
        testFile,
        "Hello From Mounted File"
    );

    try {
        const container =
            await docker.createContainer({
                Image: "gcc:14",

                Cmd: [
                    "cat",
                    "/workspace/hello.txt",
                ],

                AttachStdout: true,
                AttachStderr: true,

                HostConfig: {
                    Binds: [
                        `${tempDir}:/workspace`,
                    ],
                },
            });

        const stream =
            await container.attach({
                stream: true,
                stdout: true,
                stderr: true,
            });

        let output = "";

        stream.on("data", (chunk) => {
            output += chunk.toString();
        });

        await container.start();

        await container.wait();

        await container.remove();

        console.log(output);
    } catch (error) {
        console.error(error);
    } finally {
        if (fs.existsSync(testFile)) {
            fs.unlinkSync(testFile);
        }
    }
};

testMount();