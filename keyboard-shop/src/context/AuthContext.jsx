import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = users.find(u => u.email === email);
    
    if (!foundUser) {
      return { success: false, message: "Account does not exist." };
    }
    if (foundUser.password !== password) {
      return { success: false, message: "Incorrect password." };
    }
    
    const loggedInUser = { email: foundUser.email, fullname: foundUser.fullname };
    localStorage.setItem('user', JSON.stringify(loggedInUser));
    setUser(loggedInUser);
    return { success: true };
  };

  const register = (fullname, email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(u => u.email === email)) {
      return { success: false, message: "Email is already registered." };
    }
    users.push({ fullname, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    
    const registeredUser = { fullname, email };
    localStorage.setItem('user', JSON.stringify(registeredUser));
    setUser(registeredUser);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
