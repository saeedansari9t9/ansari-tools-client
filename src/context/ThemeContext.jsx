import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("ansari_theme");
      if (saved === "light" || saved === "dark") return saved;
    }
    return "dark"; // Default to premium dark theme
  });

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    localStorage.setItem("ansari_theme", theme);
    root.setAttribute("data-theme", theme);

    if (theme === "dark") {
      root.classList.add("home-dark-root");
      root.classList.remove("home-light-root");
      body.classList.add("home-dark");
      body.classList.remove("home-light");
    } else {
      root.classList.add("home-light-root");
      root.classList.remove("home-dark-root");
      body.classList.add("home-light");
      body.classList.remove("home-dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isDark: theme === "dark" }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
