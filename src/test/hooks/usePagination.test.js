import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import usePagination from "../../hooks/usePagination";

const DATA = [{ name: "test 1" }, { name: "test 2" }, { name: "test 3" }, { name: "test 4" }, { name: "test 5" }];

describe("Use pagination hook test cases", () => {
  test("Expect default attr", () => {
    const { result } = renderHook(() => {
      return usePagination({
        data: DATA,
        pageSize: 1
      });
    });
    expect(result.current.currentPage).toBe(0);
    expect(result.current.page).toEqual([{ name: "test 1" }]);
  });

  test("Should change next page", () => {
    const { result } = renderHook(() => {
      return usePagination({
        data: DATA,
        pageSize: 1
      });
    });
    act(() => {
      result.current.nextPage();
    });
    expect(result.current.currentPage).toBe(1);
    expect(result.current.page).toEqual([{ name: "test 2" }]);
  });

  test("Should change previous page", () => {
    const { result } = renderHook(() => {
      return usePagination({
        data: DATA,
        pageSize: 1
      });
    });
    act(() => {
      result.current.nextPage();
    });
    expect(result.current.currentPage).toBe(1);
    act(() => {
      result.current.previousPage();
    });
    expect(result.current.currentPage).toBe(0);
  });
  test("Should not change previous page", () => {
    const { result } = renderHook(() => {
      return usePagination({
        data: DATA,
        pageSize: 1
      });
    });
    act(() => {
      result.current.previousPage();
    });
    expect(result.current.currentPage).toBe(0);
  });

  test("Should load last page", () => {
    const { result } = renderHook(() => {
      return usePagination({
        data: DATA,
        pageSize: 1
      });
    });
    act(() => {
      result.current.lastPage();
    });
    expect(result.current.currentPage).toBe(4);
  });
});
