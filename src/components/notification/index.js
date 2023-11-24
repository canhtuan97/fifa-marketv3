import { notification } from "antd";

export const openNotificationSuccess = (placement, message, description) => {
  notification.success({
    message,
    description,
    placement,
    duration: 3,
    style: { marginTop: 50, zIndex: 999999, borderRadius: 10 },
  });
};

export const openNotificationError = (placement, message, description) => {
  notification.error({
    message,
    description,
    placement,
    style: { marginTop: 50, zIndex: 999999, borderRadius: 10 },
    duration: 3,
  });
};
