import 'regenerator-runtime/runtime'
import 'materialize-css';
import { retrieveTravelData, updateUI } from "../src/client/js/travelInfoHandler"

describe("Testing the Analysis Handler methods", () => {
    test("Testing the retrieveAnalysis() function", () => {
        expect(retrieveTravelData).toBeDefined();
    });

    test("Testing the updateUI() function", () => {
        expect(updateUI).toBeDefined();
    });
});