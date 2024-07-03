// utils/errorHandler.ts
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

interface ICustomError {
  status?: number;
  message?: string;
}

const handleError = (error: unknown): void => {
  let message = "An unknown error occurred";
  let navigateTo = "";

  if (typeof error === "object" && error !== null) {
    const customError = error as ICustomError;
    if (customError.status) {
      switch (customError.status) {
        case 400:
          message = "Bad request. Please try again.";
          break;
        case 401:
          message = "Unauthorized. Please log in.";
          navigateTo = "/error/401";
          break;
        case 403:
          message =
            "Forbidden. You don't have permission to perform this action.";
          navigateTo = "/error/403";
          break;
        case 404:
          message = "Resource not found.";
          navigateTo = "/error/404";
          break;
        case 500:
          message = "Internal server error. Please try again later.";
          navigateTo = "/error/500";
          break;
        case 503:
          message = "Service unavailable. Please try again later.";
          navigateTo = "/error/503";
          break;
        case 504:
          message = "Gateway timeout. Please try again later.";
          navigateTo = "/error/504";
          break;
        default:
          message = customError.message || "An unknown error occurred";
          break;
      }
    }
  }

  toast.error(message);

  if (navigateTo) {
    redirect(navigateTo);
  }
};

export default handleError;
