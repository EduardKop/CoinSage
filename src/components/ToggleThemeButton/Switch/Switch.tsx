import React, { useState, useEffect } from "react";
import "./Switch.css";
import { useTheme } from "next-themes";

function Switch() {
  const { theme, setTheme } = useTheme();
  const [isChecked, setIsChecked] = useState(theme === 'dark');

  const handleThemesChange = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    localStorage.setItem('isChecked', JSON.stringify(newTheme === 'dark'));
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedChecked = localStorage.getItem('isChecked');

    if (!savedTheme) {
      localStorage.setItem('theme', 'light');
    } else {
      setTheme(savedTheme);
    }

    if (savedChecked !== null) {
      setIsChecked(JSON.parse(savedChecked));
    }
  }, []);

  return (
    <label className="toggle-switch">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => {
          const newChecked = !isChecked;
          setIsChecked(newChecked);
          handleThemesChange();
        }}
      />
      <span className="switch" />
    </label>
  );
}

export default Switch;
