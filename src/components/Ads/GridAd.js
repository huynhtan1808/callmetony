import React, { useEffect } from "react";

const GridAd = () => {
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
            style={{ display:'block' }}
            data-ad-format="autorelaxed"
            data-ad-client="ca-pub-1763279739775162"
            data-ad-slot="4167222949"></ins>
        </div>
    )
}

export default GridAd