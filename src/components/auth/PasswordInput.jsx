import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function PasswordInput({
    label,
    name,
    placeholder,
    value,
    onChange,
    required = true,
}) {

    const [showPassword, setShowPassword] = useState(false);

    return (

        <div className="form-group">

            {label && <label>{label}</label>}

            <div className="password-wrapper">

                <input
                    type={showPassword ? "text" : "password"}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    required={required}
                />

                <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                        setShowPassword(!showPassword)
                    }
                >

                    {showPassword ? (
                        <FaEyeSlash />
                    ) : (
                        <FaEye />
                    )}

                </button>

            </div>

        </div>

    );

}