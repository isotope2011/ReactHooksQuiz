import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  fullname: yup.string().required().min(2),
  email: yup.string().required().email(),
  gender: yup.string().required().oneOf(["male", "female", "other"]),
  checkbox: yup.boolean().oneOf([true], "Must Check the box"),
  radio: yup.string().required(),
});

const config = {
  elements: [
    {
      id: "fullname",
      type: "text",
      placeholder: "full name",
      validate: { required: true, min: 2 },
    },
    {
      id: "email",
      name: "email",
      type: "email",
      validate: { required: true, email: true },
    },
    {
      id: "gender",
      name: "gender",
      type: "select",
      options: ["", "male", "female", "other"],
      validate: { required: true, oneOf: [["male", "female", "other"]] },
    },
    {
      id: "isChecked",
      name: "checkbox",
      type: "checkbox",
      validate: { boolean: true, oneOf: [[true], "Must Check the boxk"] },
    },
    {
      name: "radio",
      type: "radioGroup",
      radioGroup: [
        {
          id: "isTrue",
          name: "radio",
          type: "radio",
          value: "isTrue",
        },
        {
          id: "isFalse",
          name: "radio",
          type: "radio",
          value: "isFalse",
        },
      ],
      validate: { required: true },
    },
  ],
  schema: yup.object().shape({
    fullname: yup.string().required().min(2),
    email: yup.string().required().email(),
    gender: yup.string().required().oneOf(["male", "female", "other"]),
    checkbox: yup.boolean().oneOf([true], "Must Check the box"),
    radio: yup.string().required(),
  }),
};

const FormBuilder = ({ config, register, errors }) => {
  // use elements to build form fields
  console.log('form elements ', config.elements);
  // schema setup
  console.log('form schema ', config.schema);

  // return form element
  return (
    <div>
      <label for="fullname">Full Name: </label>
      <input
        name="fullname"
        placeholder="fullname here"
        // defaultValue="Joe Sm"
        ref={register}
      />
      <br />
      {errors.fullname && (
        <>
          {errors.fullname.message}
          <br />
        </>
      )}

      <label for="email">Email: </label>
      <input name="email" type="email" ref={register} />
      <br />
      {errors.email && (
        <>
          {errors.email.message}
          <br />
        </>
      )}

      <label for="gender">Gender: </label>
      <select name="gender" ref={register}>
        {["", "male", "female", "other"].map((val, idx) => {
          return (
            <option key={idx} value={val}>
              {val}
            </option>
          );
        })}
      </select>
      <br />
      {errors.gender && (
        <>
          {errors.gender.message}
          <br />
        </>
      )}

      <label for="isChecked">Checkbox: </label>
      <input id="isChecked" name="checkbox" type="checkbox" ref={register} />
      <br />
      {errors.checkbox && (
        <>
          {errors.checkbox.message}
          <br />
        </>
      )}

      <br />
      <fieldset>
        <legend>Is it True?</legend>
        <input
          type="radio"
          id="isTrue"
          name="radio"
          value="isTrue"
          ref={register}
        />
        <label for="isTrue">True</label>
        <br />
        <input
          type="radio"
          id="isFalse"
          name="radio"
          value="isFalse"
          ref={register}
        />
        <label for="isFalse">False</label>
        <br />
      </fieldset>
      {errors.radio && (
        <>
          {errors.radio.message}
          <br />
        </>
      )}
    </div>
  );
};

export default () => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = handleSubmit((data) => {
    console.log(`on submit data ${JSON.stringify(data)}`);
  });

  console.log("errors", errors);

  return (
    <>
      <h2>React Hook Form using Pre-defined Configs and Form Builder Concept</h2>
      <form {...{ onSubmit, name: "signin-form" }}>
        {FormBuilder({ config, register, errors })}
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
