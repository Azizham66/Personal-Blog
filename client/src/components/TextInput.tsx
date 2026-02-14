import type { BaseProps } from "../types/BaseProps"
import "./styles/TextInput.css"

export type TextInputProps = BaseProps & {
    placeholder?: string;
    label: string;
    name: string;
    type: string;
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function TextInput({
    className,
    placeholder,
    label,
    name,
    type= "text",
    value,
    onChange,
}: TextInputProps) {
    return (
        <div>
            <label htmlFor={label} className="font-semibold text-xl font-mono block mt-4 mb-1 mx-1">{label}</label>
            <input 
                type={type} 
                onChange={onChange} 
                name={name} 
                id={label} 
                placeholder={placeholder} 
                className={className + " text-input px-4 py-2 rounded-lg"} 
                value={value}
            />
        </div>
    )
}