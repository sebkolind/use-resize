import { Component } from "preact";
import { Ref, useEffect, useState } from "preact/hooks";

const defaultOptions = {
    isMobile: 760,
    isWide: 1000,
};

export const useResize = (
    el: Ref<Component>,
    options?: Record<string, unknown>
) => {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const o = { ...defaultOptions, ...options };

    useEffect(() => {
        /**
         * We check for the current element, to avoid creating redundant event listeners.
         * If we did not do this, all re-renders from React will create a listener,
         * which is problematic for performance.
         *
         */
        if (el.current != null) {
            let run: NodeJS.Timeout;
            const base = el.current.base as Element;

            const handleResize = () => {
                setWidth(base.clientWidth);
                setHeight(base.clientHeight);
            };

            /**
             * Set the initial height/width so that we can react on it
             * when the page initially loads, and the component is rendered.
             *
             */
            setWidth(base.clientWidth);
            setHeight(base.clientHeight);

            /**
             * Make sure to remove the resize event whenever the component updates,
             * so that we don't have redundant listeners.
             *
             */
            el.current.componentDidUpdate = () => {
                window.removeEventListener("resize", handleResize, false);
            };

            /**
             * When width and height are both 0, it is considered that
             * the component is not ready to be watched via our event listener.
             * Therefore we bail out and don't create a listener.
             *
             */
            if (width === 0 && height === 0) {
                return;
            }

            window.addEventListener("resize", () => {
                /**
                 * A low-key debounce effect.
                 * All credit goes to: https://stackoverflow.com/a/5490021/804506
                 *
                 */
                clearTimeout(run);
                run = setTimeout(handleResize, 50);
            });
        }
    }, [el.current]);

    return {
        width,
        height,
        isMobile: width < o.isMobile,
        isWide: width > o.isWide,
    };
};
