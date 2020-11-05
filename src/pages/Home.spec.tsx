import React from "react";
import Home from "./Home";
import { render, fireEvent } from "@testing-library/react";

const mockedHistoryPush = jest.fn();

jest.mock("react-router-dom", () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
  };
});

describe("Home", () => {
  it("should push to another page", () => {
    const { getByPlaceholderText, getByText } = render(<Home />);

    fireEvent.change(getByPlaceholderText("User"), {
      target: { value: "azagatti" },
    });
    fireEvent.click(getByText("Ver repos"));

    expect(mockedHistoryPush).toBeCalled();
  });
});
