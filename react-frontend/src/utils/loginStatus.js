const loginStatus = () => {
  if (localStorage.getItem("token")) {
    return true;
  }

  return false;
};

export default loginStatus;
