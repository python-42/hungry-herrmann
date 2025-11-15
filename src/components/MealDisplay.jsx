import { useEffect, useState } from "react";
import { FOOD_CATEGORIES, menuRequestKey, menuRequestURL } from "../ApiDirectory";
import { request } from "./RestRequest";
import FoodMenu from "./FoodMenu";

function MealDisplay({ locationID, periodID, periodName }) {
    const [menu, setMenu] = useState(<p>Loading menu...</p>);
    const [name, setName] = useState("");

    useEffect(() => {
        request(menuRequestURL(locationID, periodID), menuRequestKey(locationID, periodName),
            (message) => {
                setMenu(
                    <>
                        <p>Failed to load information for this period.</p>
                        <p>{message}</p>
                    </>
                );
            },
            (data) => {
                const arr = data.period.categories;
                const newMenu = [];
                for (let i in arr) {
                    if (FOOD_CATEGORIES.includes(arr[i].name.toLowerCase())) {
                        newMenu.push(<FoodMenu obj={arr[i]} key={i} />);
                    }
                }
                setName(data.period.name);
                if (newMenu.length == 0) {
                    setMenu(<p>No menu items found for meal {name}.</p>);
                } else {
                    setMenu(newMenu);
                }

            }
        );
    }, [])

    return (
        <div>
            <h2>{name}</h2>
            {menu}
        </div>
    )

}

export default MealDisplay;