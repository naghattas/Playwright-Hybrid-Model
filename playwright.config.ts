import { defineConfig, devices } from "@playwright/test";

export const TEST_TIMEOUT_MS = 120 * 1000;
export const ASSERTION_TIMEOUT_MS = 30 * 1000;

export default defineConfig({
    expect: {
        timeout: ASSERTION_TIMEOUT_MS,
    },
    testDir: "./src/tests",
    timeout: TEST_TIMEOUT_MS,
    retries: 0,
    workers: 1,

    /* Enhanced Reporter Configuration */
    reporter: [
        ['html', {  // Creates a detailed HTML report
            open: 'never',  // Don't open automatically after runs
            outputFolder: './playwright-report'  // Where the HTML report is saved
        }],
        ['junit', {  // Creates JUnit XML report for CI integration
            outputFile: './playwright-test-results/junit.xml'
        }],
        ['list'],   // Shows test progress in console
        ['json', {  // Creates detailed JSON report
            outputFile: './playwright-test-results/test-results.json'
        }]
    ],

    /* Test Execution Configuration */
    use: {
        actionTimeout: ASSERTION_TIMEOUT_MS,
        navigationTimeout: ASSERTION_TIMEOUT_MS,
        
        /* Enhanced Tracing and Screenshot Options */
        trace: 'on-first-retry',  // Capture traces for failed tests
        screenshot: 'only-on-failure',  // Take screenshots only on test failures
        video: 'retain-on-failure',  // Record video only for failed tests
        
        /* Existing Configuration */
        launchOptions: {
            slowMo: 300,
        }
    },

    /* Project Configuration */
    projects: [
        {
            name: 'chromium',
            testMatch: '**/*.test.ts',
            use: { ...devices['Desktop Chrome'] },
        }
    ],

    /* Output Directory Configuration */
    outputDir: 'playwright-test-results/',

    /* Optional: Global Setup/Teardown */
    //globalSetup: require.resolve('./global-setup'),
    //globalTeardown: require.resolve('./global-teardown'),
});