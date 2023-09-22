import React, { useState, useEffect } from "react";
import "./Switch.scss";
import { useTheme } from "next-themes";
import MoonIcon from "../icons/Switch/MoonIcon";
import SunIcon from "../icons/Switch/SunIcon";

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
    <label className={`toggle-switch ${theme === 'light' ? 'light-theme' : 'dark-theme'}`}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => {
          const newChecked = !isChecked;
          setIsChecked(newChecked);
          handleThemesChange();
        }}
      />
      {/* <span className="switch" /> */}
      <div className={`sun ${theme === 'dark' ? 'hidden' : ''}`}>
        <SunIcon />
      </div>
      <div className={`moon ${theme === 'light' ? 'hidden' : ''}`}>
        <MoonIcon />
      </div>
    </label>
  );
}

export default Switch;
