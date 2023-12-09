const mongoose = require('mongoose');
const validator = require('validator');

const serviceSchema = new mongoose.Schema({
  quantity: {
    type: Number,
  },
  prestation: {
    type: String,
  },
  prix: {
    type: Number,
  },
  prixHT: {
    type: Number, 
  },
  totalTTC: {
    type: Number,
   
  },
  tva: {
    type: Number,
  },
});

const addressSchema = new mongoose.Schema({
  number: {
    type: Number,
    default: 0 
  },
  street: {
    type: String,
    default: ""
  },
  city: {
    type: String,
    default: ""
  },
  zipcode: {
    type: Number,
    default: 0
  },
  country: {
    type: String,
    default: "France"
  },
});

const invoiceSchema = new mongoose.Schema({
  title: {
    type: String
  },
  user : {
    type: String
  },
  client : {
    type: String
  },
  siret: {
    type: Number
  },
  userPhone : {
    type: String
  },
  clientPhone : {
    type: String
  },
  userEmail : {
    type: String
  },
  clientEmail : {
    type: String
  },
  tva : {
    type: Number
  },
  indexClient: {
    type: Number
  },

  userAddress: addressSchema,
  clientAddress: addressSchema,
  services: [serviceSchema],
  date: {
    type: String
  },
  dateValue: {
    type: String
  },
  validity: {
    type: String,
    default: "30 jours"
  },
  number: {
    type: String
  },
  numberValue: {
    type: String
  },
  totalHT: {
    type: String
  },
  totalTVA: {
    type: String
  },
  totalTTC: {
    type: String
  },
});

const clientSchema = new mongoose.Schema({
  index: {
    type: Number
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: addressSchema,
  invoices: [invoiceSchema],
  quotes: [invoiceSchema]
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'à définir'
  },
  siret: {
    type: Number,
    default: 0
  },
  tva: {
    type: Number,
    default: 0
  },
  address: {
    type: addressSchema,
    default: {}
  },
  phone: {
    type: String,
    default: 'à définir'
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(v) {
      if (!validator.isEmail(v)) throw new Error('E-mail non valide !');
    } 
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        return validator.isLength(v, { min: 10 });
      },
      message: 'Le mot de passe doit contenir au moins 10 caractères.'
    }
  },
  admin: {
    type: Boolean,
    default: false
  },
  logo: {
    type: String,
    default: '../assets/user.png'
  },
  profit: {
    type: Number,
    default: 0
  },
  expenses: {
    type: Number,
    default: 0
  },
  clients: [clientSchema],
  invoices: [invoiceSchema],
  quotes: [invoiceSchema], 
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);