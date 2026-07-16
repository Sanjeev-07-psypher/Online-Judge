import fs from "fs";
import path from "path";

import docker from "../config/docker.js";

const testCppDocker = async () => {
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

    const cppFile = path.join(
        tempDir,
        "main.cpp"
    );

    fs.writeFileSync(
        cppFile,
        `
#include <iostream>
using namespace std;

int main() {
    int a, b;
    cin >> a >> b;
    cout << a + b;
    return 0;
}
`
    );

    try {
        const container =
            await docker.createContainer({
                Image: "gcc:14",

                Cmd: [
                    "bash",
                    "-c",
                    "g++ /workspace/main.cpp -o /workspace/main && echo '2 3' | /workspace/main",
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

        const result =
            await container.wait();

        await container.remove();

        console.log(
            "Exit Code:",
            result.StatusCode
        );

        console.log(
            "Output:",
            output
        );
    } catch (error) {
        console.error(error);
    } finally {
        if (fs.existsSync(cppFile)) {
            fs.unlinkSync(cppFile);
        }

        const executable = path.join(
            tempDir,
            "main"
        );

        if (
            fs.existsSync(executable)
        ) {
            fs.unlinkSync(executable);
        }
    }
};

testCppDocker();