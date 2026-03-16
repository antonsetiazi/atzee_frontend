// tailwind.config.js
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            keyframes: {
                "progress-indeterminate": {
                    "0%": { transform: "translateX(-100%)" },
                    "100%": { transform: "translateX(250%)" },
                },
                skeleton: {
                    "0%": { transform: "translateX(-100%)" },
                    "100%": { transform: "translateX(100%)" },
                },
            },
            animation: {
                "progress-indeterminate":
                    "progress-indeterminate 1.2s infinite",
                skeleton: "skeleton 1.6s ease-in-out infinite",
            },
        },
    },
    plugins: [],
};
