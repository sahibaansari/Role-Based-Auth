import { connect } from "mongoose";
const dbConnect = async () => {
  try {
    const mongoDbConnection = await connect(process.env.CONNECTION_STRING);
    console.log(`mongodb connected ${mongoDbConnection.connection.host}`);
  } catch (error) {
    console.log(`database connection failed ${error.message}`);
  }
};

export default dbConnect;
