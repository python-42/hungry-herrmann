import { getDateISOString } from "./StringUtil";

export const BASE_URL = "https://api.jlh-mtu.dev/https://apiv4.dineoncampus.com/locations/"
export const FOOD_CATEGORIES = ["taste of home", "the diner", "flame", "the kitchen"];
export const PERIODS = ["lunch", "dinner"];
export const CACHE_EVENT = "cache";

export const locationDetailsURL = (locationID) => {
    return BASE_URL + locationID + "/details";
}

export const locationDetailsKey = (locationID) => {
    return locationID + ":details"
}

export const menuRequestURL = (locationID, periodID) => {
    return BASE_URL + locationID + "/menu?date=" + getDateISOString() + "&period=" + periodID;
}

export const menuRequestKey = (periodID, periodName) => {
    return periodID + ":" + periodName;
}

export const periodIdRequest = (locationID) => {
    return BASE_URL + locationID + "/periods?date=" + getDateISOString();
}

export const periodIdKey = (locationID) => {
    return locationID + ":periods";
}