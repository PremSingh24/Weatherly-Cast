export const getCityService = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/v1/city/get`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${localStorage.getItem("token")}`,
        },
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
