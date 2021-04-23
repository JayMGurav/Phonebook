import { ApolloServer} from 'apollo-server-micro'
import {makeExecutableSchema} from 'graphql-tools';
import mongoose from "mongoose"
import typeDefs from "@/gqlserver/typeDefs"
import resolvers from "@/gqlserver/resolvers"
import PhoneRecord from "@/models/phoneRecord"

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


const apolloServer = new ApolloServer({ 
    schema: makeExecutableSchema({
      typeDefs,
      resolvers
    }),
    context: async () => {
      if (cached.conn) {
        return {
          PhoneRecord
        }
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
        cached.conn = await cached.promise;
        return {
          PhoneRecord
        }
      } catch (error) {
        console.error('Error connecting mongoDB', error.message)
      }
  }
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: '/api/graphql' });