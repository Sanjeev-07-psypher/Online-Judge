const generateOptimizationHints = (
    code,
    estimatedComplexity
) => {
    const hints = [];

    if (
        estimatedComplexity ===
        "O(n³)"
    ) {
        hints.push(
            "Try reducing one nested loop using preprocessing or dynamic programming."
        );

        hints.push(
            "Consider hash-based lookups instead of repeated traversal."
        );
    }

    if (
        estimatedComplexity ===
        "O(n²)"
    ) {
        hints.push(
            "Check whether a hash map can replace a nested loop."
        );

        hints.push(
            "Consider sorting the data and using binary search."
        );

        hints.push(
            "Look for two-pointer techniques."
        );
    }

    if (
        estimatedComplexity ===
        "O(n log n)"
    ) {
        hints.push(
            "Your solution is already efficient for most constraints."
        );
    }

    if (
        code.includes(
            "unordered_map"
        ) ||
        code.includes("HashMap")
    ) {
        hints.push(
            "Hash map usage already removes many linear searches."
        );
    }

    if (
        code.includes("sort(")
    ) {
        hints.push(
            "Sorting is being used. Verify whether sorting is actually required."
        );
    }

    if (
        code.includes(
            "binary_search"
        ) ||
        code.includes(
            "lower_bound"
        ) ||
        code.includes(
            "upper_bound"
        )
    ) {
        hints.push(
            "Binary search detected. Ensure the searched range remains sorted."
        );
    }

    if (
        code.includes("left") &&
        code.includes("right")
    ) {
        hints.push(
            "A two-pointer approach may be applicable."
        );
    }

    return [...new Set(hints)];
};

export default generateOptimizationHints;