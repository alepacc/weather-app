
export const weatherCodeMap: { [key: number]: { desc: string; image: string } } = {
  0: { desc: "Clear sky", image: "/images/icon-sunny.webp" },

  1: { desc: "Mainly clear", image: "/images/icon-sunny.webp" },
  2: { desc: "Partly cloudy", image: "/images/icon-partly-cloudy.webp" },
  3: { desc: "Overcast", image: "/images/icon-overcast.webp" },

  45: { desc: "Fog", image: "/images/icon-fog.webp" },
  48: { desc: "Rime fog", image: "/images/icon-fog.webp" },

  51: { desc: "Light drizzle", image: "/images/icon-drizzle.webp" },
  53: { desc: "Moderate drizzle", image: "/images/icon-drizzle.webp" },
  55: { desc: "Heavy drizzle", image: "/images/icon-drizzle.webp" },
  56: { desc: "Light freezing drizzle", image: "/images/icon-drizzle.webp" },
  57: { desc: "Heavy freezing drizzle", image: "/images/icon-drizzle.webp" },

  61: { desc: "Light rain", image: "/images/icon-rain.webp" },
  63: { desc: "Moderate rain", image: "/images/icon-rain.webp" },
  65: { desc: "Heavy rain", image: "/images/icon-rain.webp" },
  66: { desc: "Light freezing rain", image: "/images/icon-rain.webp" },
  67: { desc: "Heavy freezing rain", image: "/images/icon-rain.webp" },

  71: { desc: "Light snow", image: "/images/icon-snow.webp" },
  73: { desc: "Moderate snow", image: "/images/icon-snow.webp" },
  75: { desc: "Heavy snow", image: "/images/icon-snow.webp" },
  77: { desc: "Snow grains", image: "/images/icon-snow.webp" },

  80: { desc: "Light rain showers", image: "/images/icon-rain.webp" },
  81: { desc: "Moderate rain showers", image: "/images/icon-rain.webp" },
  82: { desc: "Violent rain showers", image: "/images/icon-rain.webp" },

  85: { desc: "Light snow showers", image: "/images/icon-snow.webp" },
  86: { desc: "Heavy snow showers", image: "/images/icon-snow.webp" },

  95: { desc: "Thunderstorm", image: "/images/icon-storm.webp" },
  96: { desc: "Thunderstorm with hail", image: "/images/icon-storm.webp" },
  99: { desc: "Heavy thunderstorm with hail", image: "/images/icon-heavy-storm.webp" },
};

