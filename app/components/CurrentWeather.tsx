import Image from "next/image"
export default function Location() {
    return (
    <>
        <div className="location card">
            <span className="location__header">
                <h2 className="location__name">location</h2>
                <h3 className="location__date">date</h3>
            </span>
            <span className="location__condition">
                <Image src="/images/icon-sunny.webp" alt="sunny icon" width={100} height={100} />
                <h1 className="location__temperature">20°</h1>
            </span>
            
        </div>
        <div className="details__item">
            <div className="details__item--temperature card min-w-34">
                <h3>Feels like</h3>
                <span className="detail--temp">20°</span>
            </div>
            <div className="details__item--condition card  min-w-34">
                <h3>Humidity</h3>
                
                <span className="detail--humidity">60%</span>
            </div>
            <div className="details__item--wind card  min-w-34">
                <h3>Wind</h3>
                <span className="detail--wind">15 km/h</span>
            </div>
            <div className="details__item--precipitation card  min-w-34">
                <h3>Precipitation</h3>
                <span className="detail--prec">2 mm</span>
            </div>
        </div>
    </>
    )
}