import { useState } from "react";

export default function useAlert() {
  const [alert, setAlert] = useState({ visible: false, message: "", type: "" });

  const showAlert = (message, type = "info") => {
    setAlert({ visible: true, message, type });
    setTimeout(() => setAlert({ visible: false, message: "", type: "" }), 3000);
  };

  return {
    alert,
    showAlert,
  };
}
