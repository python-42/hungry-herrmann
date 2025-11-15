import { CACHE_EVENT } from "../ApiDirectory";
import { getDateISOString } from "../StringUtil";

/**
 * Requests data from the API. May use cached data
 * @param {string} url url to send request to
 * @param {string} key cache key associated with this url. This should be a key that is unique to this request, bt doesn't change from day to day
 * @param {function} failureCallback function to call if request fails. Should accept a string as parameter
 * @param {function} successCallback function to call if request succeeds, or if cached data is used. Should accept object as parameter
 * @param {boolean} useCache whether we should use cached values or not. Default true
 * @returns true if cached data was used, false otherwise
 */
export function request(url, key, failureCallback, successCallback, useCache = true) {
    // check if we have cached data for this request
    let cached = localStorage.getItem(key);
    if (cached != null && useCache) {
        cached = JSON.parse(cached);

        if (cached.validDate == getDateISOString()) {
            // we have valid cached data, send that back instead of requesting new data
            console.debug("Using cached data " + url);
            successCallback(JSON.parse(cached.data));
            return true;
        }else {
            // cached data is expired, clear it out to save time in the future
            console.debug("cached data invalid for " + url);
            localStorage.removeItem(key);
            window.dispatchEvent(new CustomEvent(CACHE_EVENT));
        }
    }

    // we don't have any valid cached data, send request
    fetch(url).then(response => {
    if(!response.ok) {
        throw new Error(response.status + ": " + response.statusText);
    }
        return response.json();
    }).then(data => {
        // we have new valid data, cache it
        // we need to cache response data and the current date so that the cached data expires
        if (useCache) {
            let toCache = {
                validDate : getDateISOString(),
                data : JSON.stringify(data)
            }
            localStorage.setItem(key, JSON.stringify(toCache));
            window.dispatchEvent(new CustomEvent(CACHE_EVENT));
        }

        //call UI callback
        successCallback(data);
    }).catch( error => {
        failureCallback(error.message);
    });
    return false;
}

export function clearCache() {
    localStorage.clear();
    window.dispatchEvent(new CustomEvent(CACHE_EVENT));
}