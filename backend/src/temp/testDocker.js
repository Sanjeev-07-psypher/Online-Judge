import docker from "../config/docker.js";

const testDocker = async () => {
    try {
        const info = await docker.info();

        console.log("Docker Connected");
        console.log("Containers:", info.Containers);
        console.log("Images:", info.Images);
    } catch (error) {
        console.error("Docker Connection Failed");
        console.error(error);
    }
};

testDocker();