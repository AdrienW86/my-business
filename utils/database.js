require('dotenv').config()
const mongoose = require('mongoose')
const validator = require('validator')
   
async function connectDb() {
  await mongoose.connect(process.env.MONGO_URL)
console.log('database connected')
  
}

module.exports = { connectDb }
