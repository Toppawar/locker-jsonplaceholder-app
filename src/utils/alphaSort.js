export const sort = (arrayToSort = [], order = "asc", property) => {
  if (!property) { return arrayToSort; }
  const sortedArray = arrayToSort.sort((a, b) => {
    if (a[property] < b[property]) {
      return -1;
    }
    if (a[property] > b[property]) {
      return 1;
    }
    return 0;
  });
  return order === "asc" ? sortedArray : sortedArray.reverse();
};
