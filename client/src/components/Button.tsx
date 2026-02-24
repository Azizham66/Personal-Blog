import type { BaseProps } from '../types/BaseProps.ts';
import './styles/Button.css';
type ButtonProps = BaseProps & {
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    color?: "marker-btn-default" | "marker-btn-violet" | "marker-btn-red" | "marker-btn-blue";
}

export default function Button({
    className,
    children,
    onClick,
    type = "button",
    color = "marker-btn-default"
} : ButtonProps) {
    return (
        <button
            className = {className + ` ${color} px-4 py-2 rounded-lg marker-btn shadow-[3px_3px_0_0_#111827]`}
            type = {type}
            onClick = {onClick}
        >
            {children} 
        </button>
    )
}