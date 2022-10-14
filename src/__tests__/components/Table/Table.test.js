import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";

import Table from "../../../components/Table";

const DATA = [
  {
    name: "test 1",
    userId: 1,
    id: 1,
    title: "title test 1",
    body: "body test 1"
  }, {
    name: "test 2",
    userId: 2,
    id: 2,
    title: "title test 2",
    body: "body  test 2"
  }
];

describe("Table component test", () => {
  test("Test should have header elements", () => {
    const component = render(
      <Table
        data={DATA}
        header={[
          "name", "userId", "id", "title", "body"
        ]}
      />
    );
    const headerColumnName = component.getAllByText("name")[0];
    const rowCell = component.getAllByText("body test 1")[0];
    expect(headerColumnName).toBeDefined();
    expect(rowCell).toBeDefined();
  });
  test("Header should be clicked to order", () => {
    const handleColumnClick = jest.fn();
    const component = render(
      <Table
        data={DATA}
        onOrder={handleColumnClick}
        fieldsToOrder={["name"]}
        header={[
          "name", "userId", "id", "title", "body"
        ]}
      />
    );
    const firstHeaderColumn = component.container.getElementsByTagName("th")[0];
    fireEvent.click(firstHeaderColumn);
    expect(handleColumnClick).toHaveBeenCalled();
  });
});
