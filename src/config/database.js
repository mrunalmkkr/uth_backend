const mongoose = require('mongoose');

const user = process.env.DB_USER;
const password = encodeURIComponent(process.env.DB_PASSWORD);
const cluster = process.env.DB_CLUSTER; // e.g. cluster1.xnxexyj.mongodb.net
const dbName = process.env.DB_NAME;     // e.g. mydatabase

const uri = `mongodb+srv://carveurway92_db_user:admin1@3@cluster0.qr0kqzi.mongodb.net/`;
              

// const uri = 'mongodb://127.0.0.1:27017/ambedkar'; 

exports.connect = async () => {
  try {
    await mongoose.connect(uri);
    console.log('DB connected successfully');
  } catch (error) {
    console.error('DB CONNECTION FAILED');
    console.error(error.message);
    process.exit(1);
  }
};
