import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.dbURI, { dbName: "TestAPI" })
    .then((e) => console.log(`Database Connected with ${e.connection.host} `))
    .catch((err) => console.log(err));
};
