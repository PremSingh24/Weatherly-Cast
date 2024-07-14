export const loginUserService = async ({ username, password }) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/v1/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
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
