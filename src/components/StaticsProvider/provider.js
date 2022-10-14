import { createContext, useMemo } from "react";

import useSWRImmutable from "swr/immutable";

export const StaticsContext = createContext();

const getFormatedUsers = (users = []) => {
  return users.reduce((result, user) => {
    return {
      ...result,
      [user.id]: user
    };
  }, {});
};

const StaticsProvider = ({ children }) => {
  const { data: users } = useSWRImmutable({
    url: "/users",
    method: "GET",
  });

  const staticsValue = useMemo(() => { return { users: getFormatedUsers(users) }; }, [users]);

  return (
    <StaticsContext.Provider value={staticsValue}>
      {children}
    </StaticsContext.Provider>
  );
};

export default StaticsProvider;
