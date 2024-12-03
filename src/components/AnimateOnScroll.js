import React, { useEffect, useRef, useState } from 'react';

const AnimateOnScroll = ({ children, animation = 'fade-up' }) => {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.1,
                rootMargin: '50px'
            }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, []);

    const animationStyles = {
        opacity: isVisible ? 1 : 0,
        transform: isVisible
            ? 'translateY(0)'
            : 'translateY(50px)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
    };

    return (
        <div ref={elementRef} style={animationStyles} className="w-full">
            {children}
        </div>
    );
};

export default AnimateOnScroll;