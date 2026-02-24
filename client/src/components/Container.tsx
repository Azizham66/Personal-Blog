import type { BaseProps } from "../types/BaseProps";
import './styles/Container.css';

export default function Container({
    className,
    children
}: BaseProps) {
    return (
    <div className={className + " blog-container p-12 sm:p-10 "}>
        {children}
    </div>
    )
}