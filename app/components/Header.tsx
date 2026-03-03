'use client';
import Image from "next/image";
import { useState } from "react";
import { useUnit } from "../context/unitContext";


export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const { unit, toggleUnit } = useUnit();
    
    return (
        <header >
            <Image src="/images/logo.svg" alt="Weather App Logo" width={100} height={40} />
            
            <div className="units-dropdown" role="button" onClick={toggleDropdown}>
                <span className="units-dropdown-label">
                    <Image src="/images/icon-units.svg" alt="Units Icon" width={16} height={16} />
                     Units
                    <Image src="/images/icon-dropdown.svg" alt="Dropdown Icon" width={12} height={8} />
                </span>
            
            {isOpen && (
            <div className="dropdown-header">
                {/* TODO: fix dropdown actions */}
                <div className="dropdown__button" role="button" onClick={toggleUnit}>
                    Switch to {unit==="metric" ? "Imperial": "Metric"}
                    </div>

                <div className="dropdown__group">
                    <div className="dropdown__title">Temperature</div>
                    <span className="unit-temp">Celsius (°C)</span>
                    <span className="unit-temp">Fahrenheit (°F)</span>
                </div>
                <hr />
                <div className="dropdown__group">
                    <div className="dropdown__title">Wind Speed</div>
                    <span className="unit-wind">km/h</span>
                    <span className="unit-wind">mph</span>
                </div>
                <hr />
                <div className="dropdown__group">
                    <div className="dropdown__title">Precipitation</div>
                    <span className="unit-precip">Millimeters (mm)</span>
                    <span className="unit-precip">Inches (in)</span>
                </div>
            </div>
            )}

            </div>
            
        </header>
    );
} 
