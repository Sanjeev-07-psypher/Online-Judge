export const compareOutput = (expected, actual) => {
    const normalizedExpected = expected.trim();
    const normalizedActual = actual.trim();

    return normalizedExpected === normalizedActual;
};