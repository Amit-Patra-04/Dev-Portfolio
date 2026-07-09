import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';

export const ScrollStackItem = ({ children, itemClassName = '', ...props }) => {
    const hasPadding = /\bp[xy]?-/.test(itemClassName);
    const paddingClass = hasPadding ? '' : 'p-6 md:p-12';
    const hasHeight = /\bh-/.test(itemClassName);
    const heightClass = hasHeight ? '' : 'h-screen';
    return (
        <div
            {...props}
            className={`scroll-stack-card relative w-full ${heightClass} my-0 ${paddingClass} box-border origin-top will-change-transform ${itemClassName}`.trim()}
            style={{
                backfaceVisibility: 'hidden',
                transformStyle: 'preserve-3d'
            }}
        >
            {children}
        </div>
    );
};

const ScrollStack = ({
    children,
    className = '',
    itemDistance = 100,
    itemScale = 0.03,
    itemStackDistance = 30,
    stackPosition = '20%',
    scaleEndPosition = '10%',
    baseScale = 0.85,
    scaleDuration = 0.5,
    rotationAmount = 0,
    blurAmount = 0,
    useWindowScroll = false,
    onStackComplete,
    onActiveCardChange
}) => {
    const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileOrTablet(window.innerWidth < 1400);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const handleUserInteraction = () => {
            if (window.isProgrammaticScrolling) {
                window.isProgrammaticScrolling = false;
                window.dispatchEvent(new Event('scroll'));
            }
        };
        window.addEventListener('wheel', handleUserInteraction, { passive: true });
        window.addEventListener('touchstart', handleUserInteraction, { passive: true });
        return () => {
            window.removeEventListener('wheel', handleUserInteraction);
            window.removeEventListener('touchstart', handleUserInteraction);
        };
    }, []);
    const scrollerRef = useRef(null);
    const stackCompletedRef = useRef(false);
    const animationFrameRef = useRef(null);
    const lenisRef = useRef(null);
    const cardsRef = useRef([]);
    const lastTransformsRef = useRef(new Map());
    const isUpdatingRef = useRef(false);
    const lastActiveIdRef = useRef(null);

    const onActiveCardChangeRef = useRef(onActiveCardChange);
    const onStackCompleteRef = useRef(onStackComplete);

    useEffect(() => {
        onActiveCardChangeRef.current = onActiveCardChange;
        onStackCompleteRef.current = onStackComplete;
    });

    const calculateProgress = useCallback((scrollTop, start, end) => {
        if (scrollTop < start) return 0;
        if (scrollTop > end) return 1;
        return (scrollTop - start) / (end - start);
    }, []);

    const parsePercentage = useCallback((value, containerHeight) => {
        if (typeof value === 'string' && value.includes('%')) {
            return (parseFloat(value) / 100) * containerHeight;
        }
        return parseFloat(value);
    }, []);

    const getScrollData = useCallback(() => {
        if (useWindowScroll) {
            return {
                scrollTop: window.scrollY,
                containerHeight: window.innerHeight,
                scrollContainer: document.documentElement
            };
        } else {
            const scroller = scrollerRef.current;
            return {
                scrollTop: scroller.scrollTop,
                containerHeight: scroller.clientHeight,
                scrollContainer: scroller
            };
        }
    }, [useWindowScroll]);

    const getElementOffset = useCallback(
        element => {
            if (useWindowScroll) {
                const rect = element.getBoundingClientRect();
                return rect.top + window.scrollY;
            } else {
                return element.offsetTop;
            }
        },
        [useWindowScroll]
    );

    const updateCardTransforms = useCallback(() => {
        if (!cardsRef.current.length || isUpdatingRef.current) return;

        const { scrollTop, containerHeight } = getScrollData();

        if (window.isProgrammaticScrolling) {
            if (lastTransformsRef.current.size > 0) {
                lastTransformsRef.current.clear();
                cardsRef.current.forEach((card) => {
                    if (card) {
                        card.style.transform = '';
                        card.style.filter = '';
                    }
                });
            }
            return;
        }

        if (isMobileOrTablet) {
            let activeId = null;
            cardsRef.current.forEach((card) => {
                if (card) {
                    card.style.transform = '';
                    card.style.filter = '';

                    const cardTop = getElementOffset(card);
                    if (scrollTop >= cardTop - containerHeight / 2) {
                        activeId = card.id;
                    }
                }
            });
            if (activeId && activeId !== lastActiveIdRef.current) {
                lastActiveIdRef.current = activeId;
                onActiveCardChangeRef.current?.(activeId);
            }
            return;
        }

        isUpdatingRef.current = true;
        const stackPositionPx = parsePercentage(stackPosition, containerHeight);
        const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

        const endElement = useWindowScroll
            ? document.querySelector('.scroll-stack-end')
            : scrollerRef.current?.querySelector('.scroll-stack-end');

        const endElementTop = endElement ? getElementOffset(endElement) : 0;

        let activeId = null;

        cardsRef.current.forEach((card, i) => {
            if (!card) return;

            const lastTransform = lastTransformsRef.current.get(i);
            const lastTranslateY = useWindowScroll ? (lastTransform ? lastTransform.translateY : 0) : 0;
            const cardTop = getElementOffset(card) - lastTranslateY;

            // Height-based pinning shift:
            const cardHeight = card.offsetHeight;
            const scrollOffset = Math.max(0, cardHeight - containerHeight);

            const triggerStart = cardTop + scrollOffset - stackPositionPx - itemStackDistance * i;
            const triggerEnd = cardTop + scrollOffset - scaleEndPositionPx;
            const pinStart = cardTop + scrollOffset - stackPositionPx - itemStackDistance * i;
            const pinEnd = useWindowScroll
                ? endElementTop - containerHeight
                : endElementTop - containerHeight / 2;

            if (scrollTop >= triggerStart) {
                activeId = card.id;
            }

            const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
            const targetScale = baseScale + i * itemScale;
            const scale = 1 - scaleProgress * (1 - targetScale);
            const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

            let blur = 0;
            if (blurAmount) {
                let topCardIndex = 0;
                for (let j = 0; j < cardsRef.current.length; j++) {
                    const jCard = cardsRef.current[j];
                    if (!jCard) continue;
                    const jLastTransform = lastTransformsRef.current.get(j);
                    const jLastTranslateY = useWindowScroll ? (jLastTransform ? jLastTransform.translateY : 0) : 0;
                    const jCardTop = getElementOffset(jCard) - jLastTranslateY;
                    const jCardHeight = jCard.offsetHeight;
                    const jScrollOffset = Math.max(0, jCardHeight - containerHeight);
                    const jTriggerStart = jCardTop + jScrollOffset - stackPositionPx - itemStackDistance * j;
                    if (scrollTop >= jTriggerStart) {
                        topCardIndex = j;
                    }
                }

                if (i < topCardIndex) {
                    const depthInStack = topCardIndex - i;
                    blur = Math.max(0, depthInStack * blurAmount);
                }
            }

            let translateY = 0;
            const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

            if (isPinned) {
                translateY = scrollTop - cardTop - scrollOffset + stackPositionPx + itemStackDistance * i;
            } else if (scrollTop > pinEnd) {
                translateY = pinEnd - cardTop - scrollOffset + stackPositionPx + itemStackDistance * i;
            }

            const newTransform = {
                translateY: Math.round(translateY * 100) / 100,
                scale: Math.round(scale * 1000) / 1000,
                rotation: Math.round(rotation * 100) / 100,
                blur: Math.round(blur * 100) / 100
            };

            const hasChanged =
                !lastTransform ||
                Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
                Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
                Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
                Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

            if (hasChanged) {
                const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
                const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';

                card.style.transform = transform;
                card.style.filter = filter;

                lastTransformsRef.current.set(i, newTransform);
            }

            if (i === cardsRef.current.length - 1) {
                const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
                if (isInView && !stackCompletedRef.current) {
                    stackCompletedRef.current = true;
                    onStackCompleteRef.current?.();
                } else if (!isInView && stackCompletedRef.current) {
                    stackCompletedRef.current = false;
                }
            }
        });

        if (activeId && activeId !== lastActiveIdRef.current) {
            lastActiveIdRef.current = activeId;
            onActiveCardChangeRef.current?.(activeId);
        }

        isUpdatingRef.current = false;
    }, [
        itemScale,
        itemStackDistance,
        stackPosition,
        scaleEndPosition,
        baseScale,
        rotationAmount,
        blurAmount,
        useWindowScroll,
        calculateProgress,
        parsePercentage,
        getScrollData,
        getElementOffset,
        isMobileOrTablet
    ]);

    const handleScroll = useCallback(() => {
        updateCardTransforms();
    }, [updateCardTransforms]);

    const setupLenis = useCallback(() => {
        if (useWindowScroll) {
            const lenis = new Lenis({
                duration: 1.2,
                easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                smoothWheel: true,
                touchMultiplier: 1,
                infinite: false,
                wheelMultiplier: 1,
                lerp: 0.1,
                syncTouch: false
            });

            lenis.on('scroll', handleScroll);

            const raf = time => {
                lenis.raf(time);
                animationFrameRef.current = requestAnimationFrame(raf);
            };
            animationFrameRef.current = requestAnimationFrame(raf);

            lenisRef.current = lenis;
            window.lenis = lenis; // Expose globally for sub-components to control
            return lenis;
        } else {
            const scroller = scrollerRef.current;
            if (!scroller) return;

            const lenis = new Lenis({
                wrapper: scroller,
                content: scroller.querySelector('.scroll-stack-inner'),
                duration: 1.2,
                easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                smoothWheel: true,
                touchMultiplier: 1,
                infinite: false,
                wheelMultiplier: 1,
                lerp: 0.1,
                syncTouch: false
            });

            lenis.on('scroll', handleScroll);

            const raf = time => {
                lenis.raf(time);
                animationFrameRef.current = requestAnimationFrame(raf);
            };
            animationFrameRef.current = requestAnimationFrame(raf);

            lenisRef.current = lenis;
            window.lenis = lenis; // Expose globally for sub-components to control
            return lenis;
        }
    }, [handleScroll, useWindowScroll]);

    useLayoutEffect(() => {
        const scroller = scrollerRef.current;
        if (!scroller) return;

        const cards = Array.from(
            useWindowScroll
                ? document.querySelectorAll('.scroll-stack-card')
                : scroller.querySelectorAll('.scroll-stack-card')
        );

        cardsRef.current = cards;
        const transformsCache = lastTransformsRef.current;

        cards.forEach((card, i) => {
            if (i < cards.length - 1) {
                card.style.marginBottom = `${itemDistance}px`;
            }
            if (isMobileOrTablet) {
                card.style.willChange = '';
                card.style.transformOrigin = '';
                card.style.backfaceVisibility = '';
                card.style.transform = '';
                card.style.webkitTransform = '';
                card.style.perspective = '';
                card.style.webkitPerspective = '';
            } else {
                card.style.willChange = 'transform, filter';
                card.style.transformOrigin = 'top center';
                card.style.backfaceVisibility = 'hidden';
                card.style.transform = 'translateZ(0)';
                card.style.webkitTransform = 'translateZ(0)';
                card.style.perspective = '1000px';
                card.style.webkitPerspective = '1000px';
            }
        });

        setupLenis();

        updateCardTransforms();

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            if (lenisRef.current) {
                lenisRef.current.destroy();
            }
            if (window.lenis === lenisRef.current) {
                window.lenis = null;
            }
            stackCompletedRef.current = false;
            cardsRef.current = [];
            transformsCache.clear();
            isUpdatingRef.current = false;
        };
    }, [
        itemDistance,
        itemScale,
        itemStackDistance,
        stackPosition,
        scaleEndPosition,
        baseScale,
        scaleDuration,
        rotationAmount,
        blurAmount,
        useWindowScroll,
        onStackComplete,
        setupLenis,
        updateCardTransforms,
        isMobileOrTablet
    ]);

    // Container styles based on scroll mode
    const containerStyles = useWindowScroll
        ? {
            // Global scroll mode - no overflow constraints
            overscrollBehavior: 'contain',
            WebkitOverflowScrolling: 'touch',
            WebkitTransform: 'translateZ(0)',
            transform: 'translateZ(0)'
        }
        : {
            // Container scroll mode - original behavior
            overscrollBehavior: 'contain',
            WebkitOverflowScrolling: 'touch',
            scrollBehavior: 'smooth',
            WebkitTransform: 'translateZ(0)',
            transform: 'translateZ(0)',
            willChange: 'scroll-position'
        };

    const containerClassName = useWindowScroll
        ? `relative w-full ${className}`.trim()
        : `relative w-full h-full overflow-y-auto overflow-x-visible ${className}`.trim();

    const innerPaddingClass = useWindowScroll
        ? "pt-0 px-0 pb-0"
        : "pt-[20vh] px-4 sm:px-8 md:px-16 lg:px-24 pb-[50rem]";

    return (
        <div className={containerClassName} ref={scrollerRef} style={containerStyles}>
            <div className={`scroll-stack-inner min-h-screen ${innerPaddingClass}`}>
                {children}
                {/* Spacer so the last pin can release cleanly */}
                <div className="scroll-stack-end w-full h-px" />
            </div>
        </div>
    );
};

export default ScrollStack;
