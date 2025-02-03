// src/config/env.ts
export const APP_URL = "https://todomvc.com/examples/react/dist";

// You can also add other environment-specific configurations here
export const config = {
    appUrl: APP_URL,
    timeouts: {
        default: 5000,
        longWait: 10000
    },
    retries: 3
};