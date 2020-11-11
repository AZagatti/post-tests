import React from "react";
import { render, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import List from "./List";

const apiMock = new MockAdapter(axios);

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
    apiMock.onGet("https://api.github.com/users/azagatti/repos").reply(200, mocksRepos);
    const { getByText } = render(<List />);

    await waitFor(() => {
      expect(getByText("Repo01")).toBeInTheDocument();
      expect(getByText("Repo02")).toBeInTheDocument();
    });
  });
});
