import docker from "../config/docker.js";

const container =
    await docker.createContainer({
        Image: "gcc:14",
        Cmd: ["tail", "-f", "/dev/null"],
        Tty: false,
    });

await container.start();

const stats =
    await container.stats({
        stream: false,
    });

console.log(
    JSON.stringify(
        stats,
        null,
        2
    )
);

await container.remove({
    force: true,
});