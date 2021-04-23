import {  gql } from 'apollo-server-micro';


export default gql`
  type PhoneRecord {
    id:ID!
    name: String!
    phoneNumber:[String!]
    address: String
    email: String
  }

  input PhoneRecordInput {
    "A name for a phone record"
    name: String!
    "A list of numbers for a phone record"
    phoneNumber:[String!]
    "Optional address for a phone record"
    address: String
    "Optional email for a phone record"
    email: String
  } 

  type Query {
    sayHello: String
    record(id: ID!): PhoneRecord!
    records: [PhoneRecord!]
  }

  type Mutation {
    addRecord(input: PhoneRecordInput!): PhoneRecord!
  }
`


