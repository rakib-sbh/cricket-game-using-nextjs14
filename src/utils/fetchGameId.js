"use server"
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src", "utils", "currentGameId.txt");

const fetchGameId = () => {
    console.log(filePath);
    const id = fs.readFileSync(filePath, "utf8");

    return id;

}

export { fetchGameId }