const complexityRanks = {
    "O(1)": 1,
    "O(log n)": 2,
    "O(n)": 3,
    "O(n log n)": 4,
    "O(n²)": 5,
    "O(n³)": 6,
    "O(2ⁿ)": 7,
};

const detectNestedLoops = (code) => {
    const lines = code.split("\n");

    let maxDepth = 0;
    let currentDepth = 0;

    for (const line of lines) {
        const trimmed = line.trim();

        if (
            trimmed.startsWith("for(") ||
            trimmed.startsWith("for (") ||
            trimmed.startsWith("while(") ||
            trimmed.startsWith("while (")
        ) {
            currentDepth++;
            maxDepth = Math.max(
                maxDepth,
                currentDepth
            );
        }

        const closeCount =
            (trimmed.match(/}/g) || [])
                .length;

        currentDepth = Math.max(
            0,
            currentDepth - closeCount
        );
    }

    return maxDepth;
};

const complexityAnalyzer = (code) => {
    const detected = [];

    const loopDepth =
        detectNestedLoops(code);

    if (loopDepth === 1) {
        detected.push("O(n)");
    }

    if (loopDepth === 2) {
        detected.push("O(n²)");
    }

    if (loopDepth >= 3) {
        detected.push("O(n³)");
    }

    if (
        code.includes("sort(") ||
        code.includes(".sort(")
    ) {
        detected.push("O(n log n)");
    }

    if (
        code.includes("binary_search") ||
        code.includes("lower_bound") ||
        code.includes("upper_bound")
    ) {
        detected.push("O(log n)");
    }

    if (
        code.includes("unordered_map") ||
        code.includes("unordered_set") ||
        code.includes("HashMap") ||
        code.includes("HashSet")
    ) {
        detected.push("O(n)");
    }

    if (detected.length === 0) {
        detected.push("O(1)");
    }

    let estimatedComplexity =
        detected[0];

    for (const complexity of detected) {
        if (
            complexityRanks[
                complexity
            ] >
            complexityRanks[
                estimatedComplexity
            ]
        ) {
            estimatedComplexity =
                complexity;
        }
    }

    let optimizedComplexity =
        estimatedComplexity;

    switch (
        estimatedComplexity
    ) {
        case "O(n³)":
            optimizedComplexity =
                "O(n²)";
            break;

        case "O(n²)":
            optimizedComplexity =
                "O(n log n)";
            break;

        case "O(n log n)":
            optimizedComplexity =
                "O(n)";
            break;

        default:
            optimizedComplexity =
                estimatedComplexity;
    }

    return {
        estimatedComplexity,
        optimizedComplexity,
    };
};

export default complexityAnalyzer;