import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";

import List from "./List";
import api from "../services/api";

const mocksRepos = [
  {
    id: 1,
    name: "Repo01",
    description: "Description01",
    url: "about:blank",
    stargazers_count: "1",
    forks: "2",
    open_issues: "3",
  },
  {
    id: 2,
    name: "Repo02",
    description: "Description02",
    url: "about:blank",
    stargazers_count: "4",
    forks: "5",
    open_issues: "6",
  },
];

jest.mock("react-router-dom", () => {
  return {
    useLocation: () => ({
      pathname: "/list",
      state: { name: "azagatti" },
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe("List", () => {
  it("should load repos", async () => {
    const apiMock = new MockAdapter(api);
    apiMock.onGet("/users/azagatti/repos").reply(200, mocksRepos);
    const { getByTestId } = render(<List />);

    await waitFor(() => {
      expect(getByTestId("name-Repo01")).toBeInTheDocument();
    });
  });
});
