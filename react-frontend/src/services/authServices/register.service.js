export const registerUserService = async ({ username, password }) => {
  console.log("username ", username, " password ", password);
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/v1/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }
    );

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    return { message: "Something Went Wrong!" };
  }
};
