import { toast, ToastContainer, Zoom } from "react-toastify";
import { clearCache } from "./RestRequest";
import { useEffect, useState } from "react";
import "./CacheInfo.css"
import { CACHE_EVENT } from "../ApiDirectory";

function CacheInfo() {
    const [cacheCount, setCacheCount] = useState(0);
    useEffect(() => {
        function syncCacheCount() {
            setCacheCount(localStorage.length);
        }

        syncCacheCount();

        window.addEventListener(CACHE_EVENT, syncCacheCount);

        return () => { // remove the listener when this component is unmounted
            window.removeEventListener(CACHE_EVENT, syncCacheCount);
        }
    }, []);

    function triggerCacheClear() {
        clearCache();
        toast.success("Cache cleared.", {
            transition: Zoom
        });
    }

    return (
        <div className="cacheInfo">
            <p>Items in cache: {cacheCount}</p>
            <button onClick={() => {triggerCacheClear()}}>Clear cache</button>
            <ToastContainer 
                position="top-right"
                autoClose={2500}
                closeOnClick
                pauseOnFocusLoss={false}
                pauseOnHover={false}
                theme="dark"
            />
        </div>
    );
}

export default CacheInfo;