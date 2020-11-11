import React, { FormEvent, useCallback, useState } from "react";
import { useHistory } from "react-router-dom";

const Home = () => {
  const [name, setName] = useState("");
  const history = useHistory();

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (name) {
        history.push("/list", { name });
      }
    },
    [history, name]
  );

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <div>User</div>
        <input
          placeholder="User"
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
      </label>
      <button type="submit">Ver repos</button>
    </form>
  );
};

export default Home;
