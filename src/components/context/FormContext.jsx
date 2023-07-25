import { createContext, useState } from "react";

export const FlightContext = createContext();

export const FlightProvider = ({ children }) => {
  const [formValues, setFormValues] = useState({
    adultCount: 0,
    childCount: 0,
  });

  const onFormValueChange = (key, value) => {
    formValues[key] = value;
    setFormValues({ ...formValues });
  };

  const clearFormValues = () => {
    setFormValues({
      adultCount: 0,
      childCount: 0,
    });
  };

  const context = {
    onFormValueChange,
    formValues,
    clearFormValues,
  };
  return (
    <FlightContext.Provider value={context}>{children}</FlightContext.Provider>
  );
};
