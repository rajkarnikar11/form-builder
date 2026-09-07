'use client';

import { useState, useRef, useEffect, ReactNode, KeyboardEvent } from 'react';

interface AccordionProps {
    header: ReactNode | ((isOpen: boolean) => ReactNode);
    children: ReactNode;
    defaultOpen?: boolean;
    duration?: number;
}

export function Accordion({ header, children, defaultOpen = true, duration = 300 }: AccordionProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<number | undefined>(defaultOpen ? undefined : 0);

    const toggle = () => setIsOpen((prev) => !prev);

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle();
        }
    };

    useEffect(() => {
        const el = contentRef.current;
        if (!el) return;

        if (isOpen) {
            setHeight(el.scrollHeight);
            const timeout = setTimeout(() => setHeight(undefined), duration);
            return () => clearTimeout(timeout);
        } else {
            setHeight(el.scrollHeight);
            requestAnimationFrame(() => setHeight(0));
        }
    }, [isOpen, duration]);

    return (
        <div className="border border-gray-300 rounded-lg">
            <div
                role="button"
                tabIndex={0}
                onClick={toggle}
                onKeyDown={handleKeyDown}
                className="w-full cursor-pointer"
            >
                {typeof header === 'function' ? (header as (isOpen: boolean) => ReactNode)(isOpen) : header}
            </div>

            <div
                style={{
                    height: height === undefined ? 'auto' : `${height}px`,
                    overflow: 'hidden',
                    transition: `height ${duration}ms ease-in-out`,
                }}
            >
                <div ref={contentRef}>{children}</div>
            </div>
        </div>
    );
}