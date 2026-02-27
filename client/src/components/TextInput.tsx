import type { BaseProps } from "../types/BaseProps"
import "./styles/TextInput.css"

export type TextInputProps = BaseProps & {
    placeholder?: string;
    label: string;
    name: string;
    type: string;
    value?: string;
    error?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function TextInput({
    className,
    placeholder,
    label,
    name,
    type= "text",
    value,
    error,
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
                className={className + " text-input px-4 py-2 rounded-lg shadow-[3px_3px_0_0_#111827]"} 
                value={value || ""}
            />
            {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
        </div>
    )
}