const mongoose = require('mongoose');
const validator = require('validator');


const serviceSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
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
  id: {
    type: Number,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  services: [serviceSchema],
  address: addressSchema,
});

const clientSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
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
    // Vous devez définir le type approprié pour le logo, peut-être String pour le chemin d'accès à l'image
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
  quotes: [invoiceSchema], // Assurez-vous de renommer devis en quotes si nécessaire
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);