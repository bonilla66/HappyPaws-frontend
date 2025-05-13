import { useState } from "react";
import { toast } from "react-toastify";

export function UseForm(initialValues, validateOnSubmit) {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((v) => ({
      ...v,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e, onSubmit) => {
    e.preventDefault();
    const error = validateOnSubmit(values);
    if (error) {
      toast.error(error);
      return;
    }
    onSubmit(values);
  };

  return { values, handleChange, handleSubmit };
}
