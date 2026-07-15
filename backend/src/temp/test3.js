import mongoose from "mongoose";

const uri =
  "mongodb+srv://sanjeevkrgupta17_online_judge:Sanjeev07@cluster0.azwkysp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(uri)
  .then(() => {
    console.log("CONNECTED");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });