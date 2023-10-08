import {useEffect, useState} from "react";

export const useTelegramWeb = () => {
  const [tgWeb, setTgWeb] = useState({expand: function() {}});
  useEffect(() => {
    setTgWeb(window.Telegram.WebApp);
  });
  return tgWeb
}
