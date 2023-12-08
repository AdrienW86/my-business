import { connectDb } from "@/utils/database";
import jwt from 'jsonwebtoken';
import User from "@/models/user";

async function handler(req, res) {
  try {
    await connectDb();
    const { authorization } = req.headers;

    if (req.method !== 'POST') {
      return res.status(405).end();  // Méthode non autorisée
    }

    const token = authorization.replace('Bearer ', '');
    const decodedToken = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET || 'votre_clé_secrète');
    const userId = decodedToken.userId;

    const pdfData = req.body;

   
    console.log('Contenu du PDF (Buffer) :', pdfData);

    // Enregistrez le contenu du PDF dans la base de données
   
  console.log(pdfData.services)
   
console.log(pdfData.user)
    // Ajoutez la référence de la facture à l'utilisateur
    const user = await User.findById(userId);

    const bills = {
      title: pdfData.title,
      tva: pdfData.tva,
      user: pdfData.user,
      userSiret: pdfData.userSiret,
      userPhone: pdfData.userPhone,
      userEmail: pdfData.userEmail,
      userAddress: pdfData.userAddress,
      
      client: pdfData.client,
      clientPhone: pdfData.clientPhone,
      clientEmail: pdfData.clientEmail,
      clientAddress: pdfData.clientAddress,
      
     tva: pdfData,
      services: {
        quantity: pdfData.services.quantity,
        prestation: pdfData.services.prestation,
        prixHT: pdfData.services.prixHT,
        prix: pdfData.services.prix,
        totalTTC: pdfData.services.totalTTC,
        tva: pdfData.services.tva,

      },
      date: pdfData.date,
      dateValue : pdfData.dateValue,    
      validity: pdfData.validity,  
      number: pdfData.number,
      numberValue: pdfData.numberValue,
      totalHT: pdfData.totalHT,
      totalTVA: pdfData.totalTVA,
      totalTTC: pdfData.totalTTC, 
    }
   
    console.log(bills)
    user.invoices.push(pdfData);
   
    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement du PDF dans la base de données :', error);
    return res.status(500).end();
  }
}

export default handler;
