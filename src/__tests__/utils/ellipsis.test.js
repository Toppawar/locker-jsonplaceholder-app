import ellipsis from "../../utils/ellipsis";

test("Should return a formated string", () => {
  const testSentence = "this string is a test";
  // Result is 5 because it has 3 points
  expect(ellipsis(testSentence, 2).length).toBe(5);
});
