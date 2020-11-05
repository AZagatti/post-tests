import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import api from "../services/api";

interface IRepo {
  id: number;
  name: string;
  description: string | null;
  url: string;
  stargazers_count: number;
  forks: number;
  open_issues: number;
}

const List = () => {
  const history = useHistory();
  const { state } = useLocation<{ name: string } | undefined>();

  const [repos, setRepos] = useState<IRepo[]>([]);

  console.log(repos);

  useEffect(() => {
    if (!state?.name) {
      return history.push("/");
    }
    (async () => {
      try {
        const { data } = await api.get(`/users/${state?.name}/repos`);
        setRepos(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [history, state?.name]);

  return (
    <div>
      <Link to="/">Voltar</Link>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <p data-testid={`name-${repo.name}`}>{repo.name}</p>
            {repo?.description ? <p>{repo.description}</p> : null}
            <div>
              <a href={repo.url} target="_blank" rel="noreferrer noopener">
                Link
              </a>
            </div>
            <span>Stars: {repo.stargazers_count}</span>{" "}
            <span>Forks: {repo.forks}</span>{" "}
            <span>Issues: {repo.open_issues}</span>{" "}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
