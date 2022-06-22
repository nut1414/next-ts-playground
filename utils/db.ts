import mongoose from 'mongoose'

interface IMongoConnection {
  conn: typeof mongoose
}

declare global {
  var mongooseconn: IMongoConnection
}

const MONGODB_URI: string = process.env.MONGODB_URI || ''
const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}


if (MONGODB_URI === '') {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

// Global is used to prevent connections from growing exponentially during API Route usage in development.
global.mongooseconn = global.mongooseconn || { conn: null }
const cached: IMongoConnection = global.mongooseconn


export default async function dbConnect() {
  try {
    if (!cached.conn) {
      console.log('Connecting to MongoDb..')
      const conn: typeof mongoose = await mongoose.connect(MONGODB_URI,opts as mongoose.ConnectOptions)
      cached.conn = conn
    } 
  }catch (e: any) {
    throw new Error(e)
  } 
  
  return cached.conn
}