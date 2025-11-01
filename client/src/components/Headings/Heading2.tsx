import type { BaseProps } from "../../types/BaseProps";
import "./Heading2.css";

export default function Heading2({
    className, 
    children
} : BaseProps) {
    return (
        <h2 className={className + " marker-h2 text-3xl"}>
            {children}
        </h2>
    )
}