import { useEffect, useState } from "react";

export default function Notification({ notification }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (notification.visible) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 2000); // Duración de la notificación
      return () => clearTimeout(timer);
    }
  }, [notification.visible]);
  if (!notification.visible) return null;

  return (
    <div className="notification notification-active mx-auto text-center text-white bg-amount rounded-custom w-full h-auto px-2 py-[15px] mt-5">
      {notification.message}
    </div>
  );
}
