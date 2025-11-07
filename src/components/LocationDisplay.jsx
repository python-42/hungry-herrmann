import { useState, useEffect } from "react";
import { FOOD_CATEGORIES, locationDetailsURL, menuRequestURL, periodIdRequest, PERIODS } from "../ApiDirectory";
import LocationHeader from "./LocationHeader";
import FoodMenu from "./FoodMenu";
import { request } from "./RestRequest";
import "./LocationDisplay.css"
import MealDisplay from "./MealDisplay";

function LocationDisplay({id}) {
    const [header, setHeader] = useState(<p>Loading...</p>);
    const [menu, setMenu] = useState(<p>Loading...</p>);

    function loadHeader(useCache) {
        return request(locationDetailsURL(id), 
            (message) => {
                console.log(message);
                setHeader(
                    <>
                        <p>Failed to load dining hall information:</p>
                        <p>{message}</p>
                    </>
                )
            }, 
            (data) => {
                setHeader(<LocationHeader obj={data} />);
            }, 
            useCache
        )

    }

    useEffect(() => {
        if (loadHeader(true)) {
            loadHeader(false); // if the cache is used to load the header, try again without 
            // header information changes more frequently than menu information so we must check more often
            // however, populating with cached information first is faster and gives us some information
        }

        request(periodIdRequest(id), 
            (message) => {}, 
            (data) => {
                const periods = data.periods;
                const newMenu = [];
                for (let i in periods) {
                    if (PERIODS.includes(periods[i].slug)) {
                        newMenu.push(<MealDisplay locationID={id} periodID={periods[i].id} key={i}/>)
                    }
                }
                if (newMenu.length == 0) {
                    setMenu(<div className="mealContainer"><p>No mealtimes found.</p></div>)
                }else {
                    setMenu(newMenu);
                }
            }
        )

        
    }, []);
    return (
        <div id="locationRoot">
            {header}
            <div className="menuContainer">
                {menu}
            </div>
            
        </div>
    )

    
}

export default LocationDisplay;