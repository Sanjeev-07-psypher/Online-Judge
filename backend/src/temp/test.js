import { executeCpp } from "../utils/executeCpp.js";

const code = `
#include <iostream>
using namespace std;

int main() {
    int a,b;
    cin >> a >> b;
    cout << a + b;
}
`;

const result = await executeCpp(
    code,
    "2 3"
);

console.log(result);