'use client';
import Image from "next/image";
import { useState } from "react";
import { ChevronUp } from "lucide-react";

type DropdownProps = {
  label: string;
  option: string[];
  value: string | null;
  onChange: (value: string | null) => void;
};


export default function Dropdown({
  label,
  option,
  value,
  onChange
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleSelected(opt: string) {
    onChange(opt);
    setIsOpen(false);
  }



  return (
    <>
      <div className="dropdown" onClick={() => setIsOpen((prev) => !prev)}>
        {value ?? label}
        { isOpen ? ( 
          <ChevronUp className="dropdown-chevron" />
        ) : (
          <Image src="/images/icon-dropdown.svg" alt="dropdown icon" width={16} height={16} className="dropdown-chevron" />
        )}
        {isOpen && (
          <ul className="dropdown__options-container">
            {option.map((opt) => (
              <li key={opt}>
                <button onClick={() => handleSelected(opt)}>{opt}</button>
              </li>
            ))}
        </ul>
        )}
      </div>
     
    </>
  );
}

