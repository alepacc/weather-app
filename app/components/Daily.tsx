import Image  from "next/image";

export default function Daily() {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    return(
        <div className="daily">
          <h2 className="daily__title">Daily forecast</h2>
          <div className="daily__item">
            {days.map((day) => (
              <div key={day} className="daily__forcast card">
                <span className="daily__forcast-day">{day[0]}</span>
                <Image src="/images/icon-sunny.webp" alt="sunny icon" width={30} height={30} />
                <span className="daily__forcast-temp">20°</span>
              </div>
            ))}
            </div>

        </div>
    )
}