import {useEffect, useState} from "react";

export const useTelegramWeb = () => {
  const [tgWeb, setTgWeb] = useState(
      {expand: function() {}, showPopup: function () {},
        MainButton: {
          setParams: function () {return {onClick: function (f) {}}}
        }
      }
  );
  useEffect(() => {
    setTgWeb(window.Telegram.WebApp);
  });
  return tgWeb
}
