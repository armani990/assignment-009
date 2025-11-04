import { toast } from "react-hot-toast";

export const showToast = (type, message) => {
  toast[type](message, {
    style: { borderRadius: "10px", background: "#333", color: "#fff" },
  });
};