import { useEffect } from "react";
import { useCityContext } from "../context/city";
import { useToastContext } from "../context/toast";
import { getCityService } from "../services/cityServices/getCity.service";
import loginStatus from "../utils/loginStatus";

const useGetFavCity = () => {
  const { setFavCity } = useCityContext();
  const { setSeverity, setMessage, setOpen } = useToastContext();

  const loggedIn = loginStatus();
  useEffect(() => {
    if (loggedIn) {
      (async () => {
        const response = await getCityService();
        if (response?.status) {
          setSeverity("error");
          const res = await response.json();
          setMessage(res.message);
          setOpen(true);
        } else {
          setFavCity(response.city);
        }
      })();
    }
  }, []);
};

export default useGetFavCity;
