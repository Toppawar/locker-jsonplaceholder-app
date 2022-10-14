// Render hook function is only provided
// in @testing-library/react@13.5.0 at this moment (14/10/2022)
import { renderHook } from '@testing-library/react';

import { useStatics } from "../../../components/StaticsProvider";

describe("useStatics hook tests", () => {
  test("Should return undefined at first render", () => {
    const { result } = renderHook(() => { return useStatics(); });
    expect(result.current).toBeUndefined();
  });
});
