import React from "react";
import MoonIcon from "./icons/Switch/MoonIcon";
import SunIcon from "./icons/Switch/SunIcon";
import Switch from "./Switch/Switch";

const ToggleThemeButton : React.FC  = () =>  {
    return(
        <div >
            
            <SunIcon />
            <Switch />
            <MoonIcon />
            
        </div>
    )
}

export default ToggleThemeButton
