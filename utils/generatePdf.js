import 'jspdf-autotable';
import jsPDF from 'jspdf';

export const generatePdf = (bills) => {

    console.log(bills)

  const prestations = bills.services
  const pdf = new jsPDF();
  const margin = 80;
   
  // Ajouter le titre
  pdf.setFontSize(32);
  pdf.setTextColor('#0060df')
  pdf.text(`${bills.title}`, 15, 20);
  pdf.setFontSize(14);
  pdf.setFont("helvetica", "bold");
  pdf.text(`Vendeur: `, 15, 50);
  pdf.text(`${bills.user}`, margin, 50);
  pdf.text(`Client: `, 15, 100);
  pdf.text(`${bills.client}`, margin, 100)
  pdf.text(`${bills.date}:`, 15, 150)
  pdf.text(`${bills.number}:`, margin, 150);
  pdf.text(`${bills.validity}`, 150, 150);
  pdf.setTextColor(0, 0, 0);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);

  // Infos
  pdf.text(`Siret : ${bills.siret}`, margin, 60)
  pdf.text(`Téléphone : ${bills.userPhone}`, margin, 66)
  pdf.text(`Email : ${bills.userEmail}`, margin, 72)
  pdf.text(`${bills.userAddress.number} ${bills.userAddress.street}`, margin, 78)
  pdf.text(`${bills.userAddress.zipcode} ${bills.userAddress.city}`, margin, 84)
  pdf.text(`Téléphone : ${bills.clientPhone}`, margin, 110)
  pdf.text(`Email : ${bills.clientEmail}`, margin, 116)
  pdf.text(`${bills.clientAddress.number} ${bills.clientAddress.street}`, margin, 122)
  pdf.text(`${bills.clientAddress.zipcode} ${bills.clientAddress.city}`, margin, 128)
  pdf.text(`${bills.dateValue}`, 15, 155)
  pdf.text(`${bills.numberValue}`, margin, 155);
  pdf.text(`30 jours`, 150, 155);

  // Ajouter les prestations dans le tableau
  const tableData = [
    ['Prestation', 'Quantité', 'Prix unitaire','Prix HT', `T.V.A. (${bills.tva}%)`, 'Prix TTC'],
    ...prestations.map(item => [
      item.prestation,
      item.quantity,
      item.prix + '€',
      item.prixHT + '€',
      item.tva + '€',
      item.totalTTC + '€',
    ]),
  ];

  const totalTitle = ['Total', 'Total HT',  `T.V.A. (${bills.tva}%)`, 'Total TTC'];
  const total = ['', bills.totalHT,  bills.totalTVA , bills.totalTTC  ];

  pdf.autoTable({
    startY: 165,
    head: [tableData[0]],
    body: tableData.slice(1),
    theme: 'striped',
    columnStyles: { 0: { cellWidth: 60 }, 1: { cellWidth: 20 }, 2: { cellWidth: 25 }, 3: { cellWidth: 25 }, 4: { cellWidth: 30 }, 5: { cellWidth: 22 } },
  });

  pdf.autoTable({    
    startY: pdf.lastAutoTable.finalY + 5 ,
    head: [totalTitle],
    body: [total],
    theme: 'striped',
    columnStyles: { 0: { cellWidth: 105 }, 1: { cellWidth: 25 }, 2: { cellWidth: 30 }, 3: { cellWidth: 22 }},
  });
  pdf.save('facture.pdf');
}