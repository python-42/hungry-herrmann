import { useState, useEffect } from "react";
import "./StatusBar.css"
import {getCurrentMeal} from "../StringUtil";

const dateOptions = {
    weekday: "long",
    month: "long",
    day: "numeric"
}

function StatusBar() {
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div id="root">
            <p>{time.toLocaleDateString("EN-US", dateOptions)}</p>
            <p>{time.toLocaleTimeString("EN-US")}</p>
            <p>{"Serving: " + getCurrentMeal(time)}</p>
        </div>
    )
}

export default StatusBar