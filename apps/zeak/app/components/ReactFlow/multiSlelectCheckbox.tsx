import React, { useState, useCallback } from "react";
import { RxCross2 } from "react-icons/rx";

interface EmailItem {
  email: string;
  checked: boolean;
}

interface EmailInputWithCheckboxesProps {
  onChange: (emails: any[]) => void;
  data: EmailItem[];
}

const EmailInputWithCheckboxes: React.FC<EmailInputWithCheckboxesProps> = ({
  onChange,
  data,
}) => {
  const [emails, setEmails] = useState<EmailItem[]>(data);
  const [inputValue, setInputValue] = useState("");

  const addEmail = useCallback(() => {
    if (inputValue && /\S+@\S+\.\S+/.test(inputValue)) {
      setEmails((prevEmails) => [
        ...prevEmails,
        { email: inputValue, checked: true },
      ]);
      setInputValue("");
      // onChange([...emails, { email: inputValue, checked: true }].filter(e => e.checked).map(e => e.email));
      onChange([...emails, { email: inputValue, checked: true }]);
    }
  }, [inputValue, emails, onChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addEmail();
    }
  };

  const toggleEmailCheck = useCallback(
    (index: number) => {
      setEmails((prevEmails) => {
        const newEmails = prevEmails.map((email, i) =>
          i === index ? { ...email, checked: !email.checked } : email,
        );
        // onChange(newEmails.filter(e => e.checked).map(e => e.email));
        onChange(newEmails);
        return newEmails;
      });
    },
    [onChange],
  );

  const removeEmail = useCallback(
    (index: number) => {
      setEmails((prevEmails) => {
        const newEmails = prevEmails.filter((_, i) => i !== index);
        // onChange(newEmails.filter(e => e.checked).map(e => e.email));
        onChange(newEmails);
        return newEmails;
      });
    },
    [onChange],
  );

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {emails.map((email, index) => {
          return (
            <div
              key={index}
              className="flex items-center space-x-2 bg-gray-100 p-2 rounded"
            >
              <input
                type="checkbox"
                checked={email.checked}
                onChange={() => toggleEmailCheck(index)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span>{email.email}</span>
              <button
                onClick={() => removeEmail(index)}
                className="text-red-500 hover:text-red-700"
              >
                <RxCross2 size={16} />
              </button>
            </div>
          );
        })}
      </div>
      <div className="flex space-x-2">
        <input
          type="email"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Enter email"
          className="flex-grow border rounded p-2"
        />
        <button
          onClick={addEmail}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default EmailInputWithCheckboxes;
