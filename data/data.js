import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.dbURI, { dbName: "TestAPI" })
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log(err));
};
