import { createContext } from 'react';

export const AuthContext = createContext(null);
export const logout = setUser => {
  setUser(null); // Clear the user authentication data
};
