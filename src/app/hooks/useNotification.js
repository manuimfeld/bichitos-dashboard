import { useState } from "react";

function useNotification() {
  const [notification, setNotification] = useState({
    visible: false,
    message: "",
  });

  const showNotification = (message) => {
    setNotification({ visible: true, message });
    setTimeout(() => setNotification({ visible: false, message: "" }), 2000);
  };

  return {
    notification,
    showNotification,
  };
}

export default useNotification;
