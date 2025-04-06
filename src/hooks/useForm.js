import { useState } from "react";

export function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (e) => {
    // get the name and value of the input because event.target is the input
    const { value, name } = e.target;
    // set the values into the object using the name
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
}
