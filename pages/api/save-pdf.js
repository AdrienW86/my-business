import { connectDb } from "@/utils/database";
import jwt from 'jsonwebtoken';
import User from "@/models/user";

async function handler(req, res) {
  try {
    await connectDb();
    const { authorization } = req.headers;

    if (req.method !== 'POST') {
      return res.status(405).end(); 
    }

    const token = authorization.replace('Bearer ', '');
    const decodedToken = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET || 'votre_clé_secrète');
    const userId = decodedToken.userId;

    const pdfData = req.body;
    const user = await User.findById(userId);

    const id = pdfData.indexClient

    console.log(pdfData.title)

    console.log(id)
    if(pdfData.title == "Facture") {
      user.invoices.push(pdfData)
      user.clients[id].invoices.push(pdfData);
    }
     if(pdfData.title == "Devis") {
      user.quotes.push(pdfData)
      user.clients[id].quotes.push(pdfData);
    }
    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement du PDF dans la base de données :', error);
    return res.status(500).end();
  }
}
export default handler;