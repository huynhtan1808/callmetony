import React, { useEffect } from "react";

const InArticleAds = () => {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.log(err);
        }
    }, [])

    return (
        <div style={{ width: '100%' }}>
            <ins class="adsbygoogle border border-gray-100 adbanner"
            style={{ display:'block' }}
            data-ad-layout="in-article"
            data-ad-format="fluid"
            data-ad-client="ca-pub-1763279739775162"
            data-ad-slot="6314077974"></ins>
        </div>
    )
}

export default InArticleAds