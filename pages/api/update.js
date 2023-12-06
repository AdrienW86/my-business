import { connectDb } from "@/utils/database";
import jwt from 'jsonwebtoken';
import User from "@/models/user";

async function handler(req, res) {
  try {
    await connectDb();

    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ error: 'Token manquant' });
    }

    const token = authorization.replace('Bearer ', '');
    const decodedToken = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET || 'votre_clé_secrète');
    const userId = decodedToken.userId;

    // Utilisez userId pour effectuer la mise à jour de l'utilisateur

    // Exemple de mise à jour du nom de l'utilisateur
    const updatedUser = await User.findByIdAndUpdate(userId, {
        name: req.body.name,
        siret: req.body.siret,
        tva: req.body.tva,
        address: {
          number: req.body.address.number,
          street: req.body.address.street,
          city: req.body.address.city,
          zipcode: req.body.address.zipcode,
          country: req.body.address.country,
        },
        phone: req.body.phone,
      }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    res.status(200).json(updatedUser);

  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export default handler;