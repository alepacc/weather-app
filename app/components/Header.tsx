import Image from "next/image";

export default function Header() {
    return (
        <header >
            <Image src="/images/logo.svg" alt="Weather App Logo" width={100} height={40} />
            
            <div className="units-dropdown" role="button" >
                <span className="units-dropdown-label">
                    <Image src="/images/icon-units.svg" alt="Units Icon" width={16} height={16} />
                     Units
                    <Image src="/images/icon-dropdown.svg" alt="Dropdown Icon" width={12} height={8} />
                </span>
                {/* <div className="units-dropdown-content">
                    <button className="units-dropdown-item">Celsius</button>
                    <button className="units-dropdown-item">Fahrenheit</button>
                </div> */}

            </div>
        </header>
    );
} 
