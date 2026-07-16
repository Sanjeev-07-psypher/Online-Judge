import docker from "../config/docker.js";

const testContainer = async () => {
    try {
        const container = await docker.createContainer({
            Image: "gcc:14",
            Cmd: ["echo", "Hello From Docker"],
            AttachStdout: true,
            AttachStderr: true,
            Tty: false,
        });

        const stream = await container.attach({
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

        console.log("Container Output:");
        console.log(output);
    } catch (error) {
        console.error(error);
    }
};

testContainer();