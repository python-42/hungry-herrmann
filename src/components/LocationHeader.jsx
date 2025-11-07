import {fuzzyTiming, naturalCaps} from "../StringUtil"
import "./LocationHeader.css"
/*
Expects object with the following form:
{
    buildingName : string
    status : 
        {
            label   : "open" or "closed"
            message : string
            color   : string color
        }
}

may contain additional ignored parameters
*/
function LocationHeader({obj}) {
    return (
        <>
            <div className="titleContainer">
                <div className="title">
                    <h1>{obj.buildingName}</h1>
                    <span className="circle" style={{backgroundColor: obj.status.color}} />
                </div>
            </div>
            <div className="subtitleContainer">
                <p>{fuzzyTiming(naturalCaps(obj.status.message))}</p>
            </div>
            
        </>
    )
}

export default LocationHeader;