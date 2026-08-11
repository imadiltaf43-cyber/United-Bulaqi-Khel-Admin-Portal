import hotToast from "react-hot-toast";

const toast = {
  success: (message, options) => hotToast.success(message, options),
  error: (message, options) => hotToast.error(message, options),
  info: (message, options) => hotToast(message, { ...options, icon: "ℹ️" }),
  warn: (message, options) => hotToast(message, { ...options, icon: "⚠️" }),
  loading: (message, options) => hotToast.loading(message, options),
  dismiss: (toastId) => hotToast.dismiss(toastId),
  promise: (promise, messages, options) => hotToast.promise(promise, messages, options),
};

export { toast };
export default toast;
