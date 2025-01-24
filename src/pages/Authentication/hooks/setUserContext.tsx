import axios from "axios";
import { BASE_URL } from "../../../utils/constant";
import { useUserContext } from "../../Home/UserContext";
import { useEffect } from "react";

export const useSetUserContext = () => {
  const { setUserData, setPermissions } = useUserContext();

  useEffect(() => {
    const fetchAndSetUserContext = async () => {
      const authToken = localStorage.getItem("accessToken");
      try {
        const userData = await axios.get(`${BASE_URL}/auth/users/`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        setUserData({
          name: `${userData.data.first_name} ${userData.data.last_name}`,
          email: userData.data.email,
        });
      } catch (error) {
        console.log(error, "The error");
      }
      try {
        const permissions = await axios.get(`${BASE_URL}/auth/permissions`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        setPermissions(permissions.data.permissions);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAndSetUserContext();
  }, [setUserData, setPermissions]);

  return null;
};
