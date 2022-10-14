import { sort } from "../../utils/alphaSort";

describe("Sort array by props", () => {
  const ARRAY_TO_SORT = [
    {
      id: 1,
      name: "Alfonso"
    }, {
      id: 5,
      name: "Raul"
    },
    {
      id: 2,
      name: "Michael"
    }
  ];

  test("Should return array ordered by id asc", () => {
    const sortedArray = sort(ARRAY_TO_SORT, "asc", "id");
    expect(sortedArray).toEqual([
      {
        id: 1,
        name: "Alfonso"
      },
      {
        id: 2,
        name: "Michael"
      }, {
        id: 5,
        name: "Raul"
      }
    ]);
  });
  test("Should return array ordered by name asc", () => {
    const sortedArray = sort(ARRAY_TO_SORT, "asc", "name");
    expect(sortedArray).toEqual([
      {
        id: 1,
        name: "Alfonso"
      },
      {
        id: 2,
        name: "Michael"
      },
      {
        id: 5,
        name: "Raul"
      }
    ]);
  });
  test("Should return array ordered by name desc", () => {
    const sortedArray = sort(ARRAY_TO_SORT, "desc", "name");
    expect(sortedArray).toEqual([
      {
        id: 5,
        name: "Raul"
      },
      {
        id: 2,
        name: "Michael"
      },
      {
        id: 1,
        name: "Alfonso"
      }
    ]);
  });
  test("Should return array ordered by id desc", () => {
    const sortedArray = sort(ARRAY_TO_SORT, "desc", "id");
    expect(sortedArray).toEqual([
      {
        id: 5,
        name: "Raul"
      },
      {
        id: 2,
        name: "Michael"
      },
      {
        id: 1,
        name: "Alfonso"
      }
    ]);
  });
});
