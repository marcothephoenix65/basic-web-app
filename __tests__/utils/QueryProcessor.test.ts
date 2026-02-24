import QueryProcessor from "../../utils/QueryProcessor";
import "@testing-library/jest-dom";

describe("QueryProcessor", () => {
    test("should return a string", () => {
        const query = "test";
        const response: string = QueryProcessor(query);
        expect(typeof response).toBe("string");
    });

    test("should return shakespeare description", () => {
        const query = "shakespeare";
        const response: string = QueryProcessor(query);
        expect(response).toBe(
            "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
            "English poet, playwright, and actor, widely regarded as the greatest " +
            "writer in the English language and the world's pre-eminent dramatist."
        );
    });

    test("should return name", () => {
        const query = "What is your name?";
        const response: string = QueryProcessor(query);
        expect(response).toBe("justinw5");
    });

    test("should return name from my name is query", () => {
        const query = "my name is justinw5";
        const response: string = QueryProcessor(query);
        expect(response).toBe("justinw5");
    });

    test("should return Andrew ID", () => {
        const query = "What is your Andrew ID?";
        const response: string = QueryProcessor(query);
        expect(response).toBe("justinw5");
    });

    test("should handle subtraction", () => {
        expect(QueryProcessor("What is 86 minus 51?")).toBe("35");
        expect(QueryProcessor("What is 1 minus 21?")).toBe("-20");
        expect(QueryProcessor("What is 49 minus 89?")).toBe("-40");
        expect(QueryProcessor("What is 58 minus 48?")).toBe("10");
        expect(QueryProcessor("What is 92 minus 79?")).toBe("13");
        expect(QueryProcessor("What is 44 minus 36?")).toBe("8");
    });

    test("should handle multiplication", () => {
        expect(QueryProcessor("What is 99 multiplied by 26?")).toBe("2574");
        expect(QueryProcessor("What is 21 multiplied by 86?")).toBe("1806");
        expect(QueryProcessor("What is 35 multiplied by 41?")).toBe("1435");
    });

    test("should handle exponentiation", () => {
        expect(QueryProcessor("What is 81 to the power of 90?")).toBe(
            "112977366573657407104332087938377452188607626345136466705721161865486665890319360"
        );
    });

    test("should return primes from list", () => {
        expect(
            QueryProcessor(
                "Which of the following numbers are primes: 91, 43, 8, 9, 49?"
            )
        ).toBe("43");
        expect(
            QueryProcessor(
                "Which of the following numbers are primes: 74, 78, 31, 24, 94?"
            )
        ).toBe("31");
        expect(
            QueryProcessor(
                "Which of the following numbers are primes: 61, 9, 78, 58, 91?"
            )
        ).toBe("61");
        expect(
            QueryProcessor(
                "Which of the following numbers are primes: 76, 82, 51, 5, 7?"
            )
        ).toBe("5, 7");
    });

    test("should return numbers that are both square and cube", () => {
        expect(
            QueryProcessor(
                "Which of the following numbers is both a square and a cube: 1, 225, 2189, 479, 323, 64, 1788?"
            )
        ).toBe("1, 64");
    });
});