import { useCallback } from "react";
import * as Notifications from "expo-notifications";

const usePushNotification = () => {
  const [status, requestPermission] = Notifications.usePermissions();

  const getPushToken = useCallback(async () => {
    let finalStatus;
    let pushToken;
    if (!status?.granted) {
      finalStatus = (await requestPermission()).status;
    }
    if (status?.granted || finalStatus === "granted") {
      pushToken = (await Notifications.getExpoPushTokenAsync()).data;
    }
    return pushToken;
  }, [status, requestPermission]);

  return getPushToken;
};

export default usePushNotification;
