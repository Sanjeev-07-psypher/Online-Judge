import { dockerExecuteCpp } from "./dockerExecuteCpp.js";

export const executeCpp = async (
    code,
    input
) => {
    return dockerExecuteCpp(
        code,
        input
    );
};