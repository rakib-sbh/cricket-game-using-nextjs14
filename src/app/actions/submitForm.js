const submitForm = async (formData) => {
  console.log(formData.get("name"));
  console.log(formData.get("email"));
};

const buttonAction = () => {
  console.log("Inside button action");
};

export { submitForm, buttonAction };
