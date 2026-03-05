import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";

export const getCurrentUser = async (dispatch:any) => {
  try {
    const result = await axios.get(`${serverUrl}/api/user/currentuser`, {
      withCredentials: true
    });

    dispatch(setUserData(result.data))
    return result.data;

  } catch (error: any) {
    console.log(error.response?.data || error.message);
  }
};