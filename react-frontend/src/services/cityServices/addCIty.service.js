export const addCityService = async (city) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/v1/city/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ city: city }),
      }
    );
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    }
    return response;
  } catch (error) {
    return { message: "Something Went Wrong!" };
  }
};
