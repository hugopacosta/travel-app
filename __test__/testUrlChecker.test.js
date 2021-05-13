import 'regenerator-runtime/runtime'
import { checkUrl } from "../src/client/js/urlChecker"

describe("Testing the URL Checker methods", () => {

    test("Is the checkUrl() function defined?", () =>{
        expect(checkUrl).toBeDefined();
    })

    test("Testing the checkUrl() function", () => {
        expect(checkUrl('https://www.google.com')).toBe(true);
    });
    
    test("Testing the checkUrl() function", () => {
        expect(checkUrl('www.google.com.br')).toBe(true);
    });

    test("Testing the checkUrl() function", () => {
        expect(checkUrl('wwwgoogleom')).toBe(false);
    });
});