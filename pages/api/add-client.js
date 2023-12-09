import { connectDb } from "@/utils/database";
import jwt from 'jsonwebtoken';
import User from "@/models/user";

async function handler(req, res) {
  try {
    await connectDb();

    const { authorization } = req.headers;
    const  data  = req.body

    console.log(data)

    if (!authorization) {
      return res.status(401).json({ error: 'Token manquant' });
    }

    const token = authorization.replace('Bearer ', '');
    const decodedToken = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET || 'votre_clé_secrète');
    const userId = decodedToken.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    console.log(user.clients.length)
    // Créer un nouvel objet client
    const newClient = {
      index: user.clients.length,
      name: data.name,
      phone: data.phone,
      email: data.email,
      address: {
        number: data.address.number,
        street: data.address.street,
        city: data.address.city,
        zipcode: data.address.zipcode,
        country: data.address.country,
      },
      invoices: [], // Ajoutez d'autres propriétés du client selon vos besoins
    };

    // Ajouter le nouvel objet client au tableau "clients" de l'utilisateur
    user.clients.push(newClient);
console.log(newClient)
    // Enregistrez les modifications de l'utilisateur dans la base de données
    await user.save();

    res.status(200).json(user);

  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export default handler;
