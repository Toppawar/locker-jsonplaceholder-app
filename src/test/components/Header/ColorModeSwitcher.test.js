import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent } from "@testing-library/react";

import { render } from "../../../utils/testUtils";
import ColorModeSwitcher from "../../../components/Header/ColorModeSwitcher";

describe("Color Mode Switcher Component Test", () => {
  const labels = {
    dark: "Switch to dark mode",
    light: "Switch to light mode",
  };
  let component = render();

  beforeEach(() => {
    component = render(<ColorModeSwitcher />);
  });

  test("render content", () => {
    expect(component.container).toBeInTheDocument();
  });

  test("expect to be in dark mode", () => {
    const button = component.getByLabelText(labels.dark);
    expect(button).toBeInTheDocument();
    expect(button.outerHTML.includes(labels.dark));
  });

  test("change color mode", () => {
    const button = component.getByLabelText(labels.dark);
    fireEvent.click(button);
    expect(button.outerHTML.includes(labels.light));
  });
});
