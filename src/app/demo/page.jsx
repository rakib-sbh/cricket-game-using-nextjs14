"use client";

import { useState } from "react";

import { submitForm, buttonAction } from "../actions/submitForm";

const DemoPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  return (
    <div>
      <h1>Hello Demo Page Server Action</h1>
      <form action={submitForm}>
        <div>
          <label htmlFor="name">Enter Your Name : </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Enter Your Email : </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <button onClick={() => buttonAction()}>Individual Form Button</button>
    </div>
  );
};

export default DemoPage;
