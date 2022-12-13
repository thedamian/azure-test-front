import { createContext, useState } from "react";

export const UserChoiceContext = createContext({});

export function UserChoiceContextProvider({ children }) {
  const { Provider } = UserChoiceContext;
  const [bestFor, setBestFor] = useState();
  const [type, setType] = useState();
  const [user, setUser] = useState();
  const value = {
    bestFor,
    setBestFor,
    type,
    setType,
    user,
    setUser,
  };
  return <Provider value={value}>{children}</Provider>;
}
