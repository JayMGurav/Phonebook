import mongoose from 'mongoose'

const PhoneRecordSchema = new mongoose.Schema({
  name:{
    type: String,
    required: [true, "name is required field"]
  },
  phoneNumber:[{
    type: String,
    required: [true, "phone number is required field"]
  }],
  address: {
    type: String
  },
  email: {
    type: String
  },
},{timestamps: true });


export default mongoose.models.PhoneRecord || mongoose.model('PhoneRecord', PhoneRecordSchema)