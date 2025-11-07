import type { BaseProps } from "../../types/BaseProps";
import "./styles/Heading3.css";

export default function Heading3({
    className,
    children,
}: BaseProps) {
    return (
        <h3 className={className + " text-2xl marker-h3"}>
            {children}
        </h3>
    )
}