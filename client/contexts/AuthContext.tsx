import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  signup: (email: string, password: string, name: string) => Promise<void>;
  signin: (email: string, password: string) => Promise<void>;
  signout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo admin credentials - in production, this should be handled by a backend
const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'admin123';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved user session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const signup = async (email: string, password: string, name: string) => {
    // For demo purposes, only allow signup with admin email
    if (email !== ADMIN_EMAIL) {
      throw new Error('Only admin users can sign up');
    }
    
    if (password !== ADMIN_PASSWORD) {
      throw new Error('Invalid admin password');
    }

    const newUser = { id: '1', email, name };
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const signin = async (email: string, password: string) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const user = { id: '1', email, name: 'Admin' };
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const signout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, signin, signout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};