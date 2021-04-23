import mongoose from 'mongoose'

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }
  try {
    if (!cached.promise) {
      const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        bufferCommands: false,
        bufferMaxEntries: 0,
        useFindAndModify: false,
        useCreateIndex: true,
      }
  
      cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
        return mongoose
      })
    }
    cached.conn = await cached.promise
    console.log(mongoose.connection.readyState)
    return cached.conn
  } catch (error) {
    console.error('Error connecting mongoDB', error.message)
  }
  
}

export default dbConnect;