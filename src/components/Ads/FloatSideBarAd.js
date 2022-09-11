import React, { useEffect } from "react";

const FloatSideBarAd = () => {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.log(err);
        }
    }, [])

    return (
        <div style={{ width: '100%' }}>
            <ins class="adsbygoogle"
            style={{ display:'inline-block', width:'300px', height:'300px' }}
            data-ad-client="ca-pub-1763279739775162"
            data-ad-slot="8789923840"></ins>
        </div>
    )
}

export default FloatSideBarAd
