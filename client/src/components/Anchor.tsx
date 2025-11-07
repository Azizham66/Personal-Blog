import type { BaseProps } from "../types/BaseProps";
import "./styles/Anchor.css";

type AnchorProps = BaseProps & {
    href: string;
}

export default function Anchor({
    className,
    children,
    href,
}: AnchorProps) {
    return (
        <a className={className + " primary-link"} href={href}>
            {children}
        </a>
    )
}