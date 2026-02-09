import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, name: string) => void;
  logout: () => void;
  enrollCourse: (courseId: string) => void;
  completeLesson: (lessonId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load from local storage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('4intl_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string, name: string) => {
    // Simulate API call
    const newUser: User = {
      name,
      email,
      enrolledCourses: [],
      completedLessons: []
    };
    // Check if user already exists in simulated DB (localStorage for demo)
    // For this demo, we just overwrite/create session
    const existing = localStorage.getItem(`user_${email}`);
    const sessionUser = existing ? JSON.parse(existing) : newUser;
    
    setUser(sessionUser);
    localStorage.setItem('4intl_user', JSON.stringify(sessionUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('4intl_user');
  };

  const enrollCourse = (courseId: string) => {
    if (!user) return;
    if (user.enrolledCourses.includes(courseId)) return;

    const updatedUser = {
      ...user,
      enrolledCourses: [...user.enrolledCourses, courseId]
    };
    setUser(updatedUser);
    localStorage.setItem('4intl_user', JSON.stringify(updatedUser));
    localStorage.setItem(`user_${user.email}`, JSON.stringify(updatedUser));
  };

  const completeLesson = (lessonId: string) => {
     if (!user) return;
     if (user.completedLessons.includes(lessonId)) return;

     const updatedUser = {
       ...user,
       completedLessons: [...user.completedLessons, lessonId]
     };
     setUser(updatedUser);
     localStorage.setItem('4intl_user', JSON.stringify(updatedUser));
     localStorage.setItem(`user_${user.email}`, JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, enrollCourse, completeLesson }}>
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