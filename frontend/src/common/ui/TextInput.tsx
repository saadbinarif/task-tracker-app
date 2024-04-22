
import React from "react";

interface TextInputProps {
    placeholderProp: string;
}

const TextInput: React.FC<TextInputProps> = ({ placeholderProp }) => {
    return (
        <input
            type="text"
            id="Username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-6"
            placeholder={placeholderProp}
            required
        />
    );
}

export default TextInput;
