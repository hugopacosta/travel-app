import 'regenerator-runtime/runtime'
import { retrieveAnalysis, updateUI } from "../src/client/js/analysisHandler"

describe("Testing the Analysis Handler methods", () => {
    test("Testing the retrieveAnalysis() function", () => {
           expect(retrieveAnalysis).toBeDefined();
    });

    test("Testing the updateUI() function", () => {
        expect(updateUI).toBeDefined();
    });
});