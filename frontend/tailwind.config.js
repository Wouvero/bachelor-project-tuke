module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            keyframes: {
                "show-notification": {
                    "0%": {
                        marginLeft: "120%",
                    },
                    "100%": {
                        marginLeft: "0",
                    },
                },
                "hide-notification": {
                    "0%": {
                        marginLeft: "0",
                    },
                    "100%": {
                        marginLeft: "120%",
                    },
                },
            },
            animation: {
                "show-notification": "show-notification 0.3s ease-in-out",
                "hide-notification": "hide-notification 0.3s forwards",
            },
        },
    },
    plugins: [],
};
