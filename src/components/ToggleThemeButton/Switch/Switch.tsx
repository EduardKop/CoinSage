import React, { useState } from "react";
import "./Switch.css";
import { useEffect } from "react";
import { useTheme } from "next-themes";

function Switch() {
  const { theme, setTheme } = useTheme();
  const [isChecked, setIsChecked] = useState(theme === 'light' ? false : true);

  const handleThemesChange = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);

    localStorage.setItem('theme', newTheme);

    localStorage.setItem('isChecked', JSON.stringify(!isChecked));
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedChecked = localStorage.getItem('isChecked');

    if (!savedTheme) {
      localStorage.setItem('theme', 'light');
    }

    if (savedTheme) {
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
          setIsChecked(!isChecked);
          handleThemesChange();
        }}
      />
      <span className="switch" />
    </label>
  );
}
export default Switch;
