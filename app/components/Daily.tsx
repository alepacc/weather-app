import Image  from "next/image";

export default function Daily() {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    return(
        <div className="daily">
          <h2 className="daily__title">Daily forecast</h2>
          <div className="daily__item">
            {days.map((day) => (
              <div key={day} className="daily__forcast card">
                <span className="daily__forcast-day">{day}</span>
                <span className="daily__forcast-icon">
                  <Image src="/images/icon-sunny.webp" alt="sunny icon" width={50} height={50} />
                </span>
                <span className="daily__forcast-temp">
                  <p className="temp-max">20°</p> 
                  <p className="temp-min">10°</p>
                </span>
              </div>
            ))}
            </div>

        </div>
    )
}