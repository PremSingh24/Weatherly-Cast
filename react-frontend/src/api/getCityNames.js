const getCityNames = async (searchInput) => {
  const url = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities";
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": `${process.env.REACT_APP_CITY_API_KEY}`,
      "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
    },
  };
  try {
    const response = await fetch(
      `${url}?minPopulation=1000000&namePrefix=${searchInput}&limit=10`,
      options
    );

    if (!response.ok) {
      const errorData = await response.json();
      return errorData;
    }

    const data = await response.json();

    return data.data;
  } catch (error) {
    return { message: "Something went wrong!" };
  }
};

export default getCityNames;
