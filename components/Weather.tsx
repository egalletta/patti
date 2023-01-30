import {useEffect} from 'react';

export function Weather() {
    useEffect(() => {
        (function (d, s, id) {
            const fjs = d.getElementsByTagName(s)[0];
            const js = d.createElement(s) as HTMLScriptElement;
            js.id = id;
            js.src = 'https://weatherwidget.io/js/widget.min.js';
            js.defer = true;
            fjs.parentNode && fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'weatherwidget-io-js'));
    }, []);

    return (
        <a
            className="weatherwidget-io"
            href="https://forecast7.com/en/42d36n71d06/boston/?unit=us"
            data-label_1="BOSTON"
            data-label_2="WEATHER"
            data-theme="original"
            data-basecolor="#ffffff"
            data-shadow="#ffffff"
            data-textcolor="#000000"
            data-highcolor="#000000"
            data-lowcolor="#4f4f4f"
            data-mooncolor="#d8d8d8"
        >
            BOSTON WEATHER
        </a>
    );
}
