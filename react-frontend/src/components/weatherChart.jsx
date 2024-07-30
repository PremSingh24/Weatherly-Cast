import { Line } from "react-chartjs-2";
import { useWeatherContext } from "../context/weather";
import { Chart as ChartJs } from "chart.js/auto";

const WeatherChart = () => {
  const { weather } = useWeatherContext();

  let maxTemp = Math.max(
    ...weather.slice(0, 7).map((today) => Math.ceil(today.maxt))
  );

  maxTemp += (maxTemp % 2) + 2;

  const data = {
    labels: weather
      .slice(0, 7)
      .map(
        (today) =>
          new Date(today.datetime)
            .toLocaleTimeString("en", { weekday: "long" })
            .split(" ")[0]
      ),
    datasets: [
      {
        label: "Max Temp",
        data: weather.slice(0, 7).map((today) => today.maxt),
        backgroundColor: "#ffca28",
        borderColor: "#ffca28",
        borderWidth: 1.5,
        pointBorderWidth: 3,
        pointHoverBorderWidth: 6,
        tension: 0.325,
      },
      {
        label: "Min Temp",
        data: weather.slice(0, 7).map((today) => today.mint),
        backgroundColor: "rgba(207, 216, 220, 0.5)",
        borderColor: "rgba(207, 216, 220, 0.5)",
        borderWidth: 1.5,
        fill: true,
        pointBorderWidth: 3,
        pointHoverBorderWidth: 6,
        tension: 0.325,
      },
    ],
  };

  const chartStyles = {
    container: {
      width: "auto",
      height: "100vh", // Default height for larger screens
    },
    containerMobile: {
      width: "100%",
      height: "350px", // Increased height for mobile screens
    },
  };
  return (
    <div
      style={
        window.innerWidth < 768
          ? chartStyles.containerMobile
          : chartStyles.container
      }
    >
      <Line
        data={data}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          width: "80%",
          plugins: {
            legend: {
              labels: {
                font: {
                  size: 14,
                  color: "#ffca28",
                },
              },
            },
          },
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: "Day",
                font: {
                  size: 18,
                },
              },
              ticks: {
                color: "#ffca28",
                font: {
                  size: 14,
                },
              },
              grid: {
                color: "rgba(255,255,255,0.3)",
              },
            },
            y: {
              max: maxTemp,
              display: true,
              title: {
                display: true,
                text: "Temp in Celcius",
                font: {
                  size: 18,
                },
              },
              ticks: {
                color: "#ffca28",
                font: {
                  size: 14,
                },
              },
              grid: {
                color: "rgba(255,255,255,0.3)",
              },
            },
          },
        }}
      />
    </div>
  );
};

export default WeatherChart;
