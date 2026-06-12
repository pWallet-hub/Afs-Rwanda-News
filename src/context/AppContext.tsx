"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Role = "Admin" | "Editor" | "Journalist" | "Reader";

export interface Article {
  id: string;
  title: string;
  content: string;
  category: "global-news" | "climate-change" | "food-security";
  author: string;
  status: "Draft" | "Pending Review" | "Approved" | "Published";
  createdAt: string;
  imageUrl: string;
}

interface AppContextType {
  currentUser: Role;
  setCurrentUser: (role: Role) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (status: boolean) => void;
  articles: Article[];
  setArticles: React.Dispatch<React.SetStateAction<Article[]>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<Role>("Reader");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedArticles = localStorage.getItem("news_system_articles");
    if (savedArticles) setArticles(JSON.parse(savedArticles));
    
    const savedUser = localStorage.getItem("news_system_user");
    if (savedUser) {
      setCurrentUser(savedUser as Role);
      setIsLoggedIn(savedUser !== "Reader");
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem("news_system_user", currentUser);
  }, [currentUser, mounted]);

  if (!mounted) return <div className="min-h-screen bg-[#021D38]" />;

  return (
    <AppContext.Provider value={{ currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn, articles, setArticles }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within an AppProvider");
  return context;
}