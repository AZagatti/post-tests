import React from "react";
import { render, fireEvent } from "@testing-library/react";

import Home from "./Home";

const mockedHistoryPush = jest.fn();

jest.mock("react-router-dom", () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
  };
});

describe("Home", () => {
  it("should go to List page", () => {
    const { getByPlaceholderText, getByText } = render(<Home />);

    fireEvent.change(getByPlaceholderText("User"), {
      target: { value: "azagatti" },
    });
    fireEvent.click(getByText("Ver repos"));

    expect(getByPlaceholderText("User")).toHaveDisplayValue('azagatti');
    expect(mockedHistoryPush).toBeCalled();
  });
});
