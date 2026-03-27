import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";

export const getCurrentUser = async (dispatch) => {
  try {
    const result = await axios.get(`${serverUrl}/api/user/currentuser`, {
      withCredentials: true
    });

    dispatch(setUserData(result.data))
    return result.data;

  } catch (error) {
    console.log(error.response?.data || error.message);
  }
};

export const generateNotes = async (payload) => {
  try {

    const result = await axios.post(
      `${serverUrl}/api/notes/generate-notes`,
      payload,
      { withCredentials: true }
    );

    return result.data;

  } catch (error) {

    console.log(error.response?.data || error.message);

    throw error; // important
  }
};



export const downloadPdf = async (result) => {
  try {
    const response = await axios.post(
      serverUrl + "/api/pdf/generate-pdf",
      { result },
      {
        responseType: "blob",
        withCredentials: true,
      }
    );

    // ✅ create blob from response
    const blob = new Blob([response.data], { type: "application/pdf" });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "ExamNotesAI.pdf";

    document.body.appendChild(link);
    link.click();

    link.remove(); 
    window.URL.revokeObjectURL(url);

  } catch (error) {
    console.error("PDF download error:", error);
  }
};