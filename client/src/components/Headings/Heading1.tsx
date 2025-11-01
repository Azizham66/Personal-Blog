import type { BaseProps } from "../types/BaseProps";
import './Heading1.css';


export default function Heading1 ({
    className,
    children,
} : BaseProps) {
    return (
        <h1 className={className + " marker-h1 text-4xl text-marker-black mb-6"}>
            {children}
        </h1>
    )
}