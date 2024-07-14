import { useContext, createContext, useState } from "react";

const toastContext = createContext();

export const ToastContextProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState(false);

  return (
    <toastContext.Provider
      value={{
        open,
        setOpen,
        severity,
        setSeverity,
        message,
        setMessage,
      }}
    >
      {children}
    </toastContext.Provider>
  );
};

export const useToastContext = () => useContext(toastContext);
