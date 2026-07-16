import {
    createCppRunner,
} from "../utils/dockerCppRunner.js";

const code = `
#include <iostream>
using namespace std;

int main() {
    int a,b;
    cin >> a >> b;
    cout<<a-b0;
}
`;

const main = async () => {
    const runner =
        await createCppRunner(
            code
        );

    const compileResult =
        await runner.compile();

    console.log(
        "Compile:",
        compileResult
    );

    const test1 =
        await runner.run(
            "2 3"
        );

    console.log(
        "Test1:",
        test1
    );

    const test2 =
        await runner.run(
            "10 20"
        );

    console.log(
        "Test2:",
        test2
    );

    await runner.cleanup();

    console.log("Done");
};

main();