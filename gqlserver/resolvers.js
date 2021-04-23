export default {
  Query: {
    async sayHello(parent, args, {PhoneRecord}) {      
      return 'Hello World!'
    },
    async record(_, { id }, {PhoneRecord}){
      return await PhoneRecord.findById(id).exec();
    },
    async records(_ , __, {PhoneRecord}){
      return await PhoneRecord.find({}).exec()
    },
  },
  Mutation: {
    async addRecord(_, args, {PhoneRecord}){
      return await PhoneRecord.create({
        ...args.input
      });
    }
  }
}

