"use client";

import { useDispatch, useSelector } from "react-redux";
import { changeName } from "@/lib/demoSlice";
const Page = () => {
  const name = useSelector((state) => state.demo.name);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(changeName());
  };
  return (
    <div>
      <div>
        <h1>Hello World</h1>
        <p>Name is : {name}</p>
      </div>
      <button onClick={handleClick}>Change Name</button>
    </div>
  );
};

export default Page;
