module.exports = {
    root: true,
    env: { browser: true, es2021: true },
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "react", "import"],
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
    ],
    rules: {
        "@typescript-eslint/no-explicit-any": "error",
        "import/no-restricted-paths": [
            "error",
            {
                zones: [
                    { target: "./src/core", from: "./src/business" },
                    { target: "./src/business", from: "./src/verticals" },
                    { target: "./src/shared", from: "./src/core" },
                ],
            },
        ],
    },
    settings: {
        react: { version: "detect" },
    },
};
