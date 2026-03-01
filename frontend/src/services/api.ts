import axios from "axios";
import { serverUrl } from "../App";

export const getCurrentUser = async () => {
  try {
    const result = await axios.get(`${serverUrl}/api/user/currentuser`, {
      withCredentials: true
    });

    console.log(result.data);
    return result.data;

  } catch (error: any) {
    console.log(error.response?.data || error.message);
  }
};