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
    const isMetric = unit === "metric";
    
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
                <div className="dropdown__button" role="button" onClick={toggleUnit}>
                    Switch to {unit==="metric" ? "Imperial": "Metric"}
                    </div>
                <div className="dropdown__group">
                    <div className="dropdown__title">Temperature</div>
                    <span className={`unit-item ${isMetric ? " active_btn" : ""}`}>Celsius (°C)</span>
                    <span className={`unit-item ${!isMetric ? " active_btn" : ""}`}>Fahrenheit (°F)</span>
                </div>
                <hr />
                <div className="dropdown__group">
                    <div className="dropdown__title">Wind Speed</div>
                    <span className={`unit-item ${isMetric ? " active_btn" : ""}`}>km/h</span>
                    <span className={`unit-item ${!isMetric ? " active_btn" : ""}`}>mph</span>
                </div>
                <hr />
                <div className="dropdown__group">
                    <div className="dropdown__title">Precipitation</div>
                    <span className={`unit-item ${isMetric ? " active_btn" : ""}`}>Millimeters (mm)</span>
                    <span className={`unit-item ${!isMetric ? " active_btn" : ""}`}>Inches (in)</span>
                </div>
            </div>
            )}

            </div>
            
        </header>
    );
} 
