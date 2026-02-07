'use client';

import React, { TextareaHTMLAttributes, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface FloatingLabelTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    register?: UseFormRegisterReturn;
    error?: string;
}

export function FloatingLabelTextArea({ label, register, error, className, ...props }: FloatingLabelTextAreaProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(!!props.value || !!props.defaultValue);

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        setIsFocused(true);
        if (props.onFocus) props.onFocus(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        setIsFocused(false);
        setHasValue(!!e.target.value);
        if (register?.onBlur) register.onBlur(e);
        if (props.onBlur) props.onBlur(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setHasValue(!!e.target.value);
        if (register?.onChange) register.onChange(e);
        if (props.onChange) props.onChange(e);
    };

    const isFloating = isFocused || hasValue;

    return (
        <div className="relative w-full">
            <div className={`relative border rounded-xl transition-all duration-300 bg-gray-50
                ${error ? 'border-red-500' : isFocused ? 'border-primary-gold ring-4 ring-primary-gold/10 bg-white' : 'border-gray-200'}
            `}>
                <textarea
                    {...props}
                    {...(register || {})}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className={`block w-full px-4 pt-6 pb-2 bg-transparent outline-none text-gray-900 font-medium resize-none ${className || ''}`}
                    placeholder=" "
                />
                <label
                    className={`absolute left-4 transition-all duration-200 pointer-events-none
                        ${isFloating
                            ? 'top-2 text-[10px] font-bold uppercase tracking-widest text-primary-navy'
                            : 'top-4 text-gray-500 font-medium text-base'}
                        ${error ? 'text-red-500' : ''}
                    `}
                >
                    {label}
                </label>
            </div>
            {error && <p className="text-red-500 text-xs font-bold mt-1 ml-1">{error}</p>}
        </div>
    );
}
