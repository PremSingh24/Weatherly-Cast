const getWeather = async (location) => {
  const url = `https://visual-crossing-weather.p.rapidapi.com/forecast?contentType=json&unitGroup=metric&aggregateHours=24&location=${location}&shortColumnNames=false`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": `${process.env.REACT_APP_WEATHER_API_KEY}`,
      "x-rapidapi-host": "visual-crossing-weather.p.rapidapi.com",
    },
  };
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      return response;
    }

    const data = await response.json();

    return Object.values(data.locations)[0];
  } catch (error) {
    return { message: "Something went wrong!" };
  }
};

export default getWeather;
