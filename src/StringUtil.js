export function naturalCaps(str) {
    str = str.toLowerCase();
    let arr = str.split(" ");
    str = "";
    for (let i in arr) {
        str += arr[i].charAt(0).toUpperCase();
        str += arr[i].substring(1);
        str += " "; 
    }

    return str;
}

export function getCurrentMeal(time) {
    let hour = time.getHours();
    if (hour >= 7 && hour < 10) {
        return "Breakfast";
    }
    if (hour >= 11 && hour < 15) {
        return "Lunch";
    }
    if (hour >= 16 && hour < 20) {
        return "Dinner";
    }

    return "Nothing";
}

/**
 * Remove absolute times from messages
 * @param {*} message 
 */
export function fuzzyTiming(message) {
    if (!message.includes("Minutes")) {
        return message;
    }

    let searchString = "Closes";
    if (message.includes(searchString)) {
        return message.substring(0, message.indexOf(searchString) + searchString.length) + " Soon."
    }
}

export function getDateISOString() {
    return (new Date()).toISOString().substring(0, 10);
}
