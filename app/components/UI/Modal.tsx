import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
    const dialogRef = useRef<HTMLDivElement>(null);

    // close on Escape
    useEffect(() => {
        if (!isOpen) return;
        function handleKey(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
        }
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [isOpen, onClose]);

    // prevent background scroll while open
    useEffect(() => {
        if (!isOpen) return;
        const original = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = original; };
    }, [isOpen]);

    if (!isOpen) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            // clicking the backdrop (not the dialog itself) closes it
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div onClick={onClose} className="absolute inset-0 bg-black/40" />

            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-label={title}
                className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-4"
            >
                <div className="flex items-center justify-between mb-3">
                    {title && <h2 className="text-base font-semibold text-gray-900">{title}</h2>}
                    <button
                        onClick={onClose}
                        aria-label="Close"
                        className="text-gray-400 hover:text-gray-700 text-lg leading-none"
                    >
                        ✕
                    </button>
                </div>

                {children}
            </div>
        </div>,
        document.body
    );
}