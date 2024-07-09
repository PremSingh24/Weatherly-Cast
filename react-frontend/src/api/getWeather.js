const getWeather = async (longitude, latitude) => {
  const url = `https://visual-crossing-weather.p.rapidapi.com/forecast?contentType=json&unitGroup=us&aggregateHours=24&location=${latitude},${longitude}&shortColumnNames=false`;
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
      const errorData = await response.json();
      return errorData;
    }

    const data = await response.json();
    console.log("here ", data);
    return data;
  } catch (error) {
    return { message: "Something went wrong!" };
  }
};

export default getWeather;
