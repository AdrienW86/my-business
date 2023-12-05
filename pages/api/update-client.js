// Dans votre fichier d'API
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
    const id = req.query.clientId
    
    
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    // Mettez à jour les détails du client
    // Utilisez req.body pour obtenir les nouvelles données du client
    // Assurez-vous de valider et de sécuriser les données entrantes avant de les enregistrer dans la base de données

    // Exemple (à adapter à votre modèle de données)
    user.clients[id].name = req.body.name;
    user.clients[id].phone = req.body.phone;
    user.clients[id].email = req.body.email;
    user.clients[id].address.number = req.body.address.number;
    user.clients[id].address.street = req.body.address.street;
    user.clients[id].address.city = req.body.address.city;
    user.clients[id].address.zipcode = req.body.address.zipcode;
    user.clients[id].address.country = req.body.address.country;
    // ... d'autres champs

    await user.save();

    res.status(200).json({ message: 'Client mis à jour avec succès', updatedClient: user.clients[id] });
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export default handler;
