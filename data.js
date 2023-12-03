import Logo from './assets/pmn.png'

export const user = {
    id: 0,
    name : "Nettoyage Perpignan",
    siret : 53299947100024 ,
    tva : "20.4" ,
    adress: {
        number: 9,
        street: "rue Balbino Giner",
        city : "Perpignan",
        zipcode : 66000,
    },
    phone: "07.79.19.82.15",
    email : "contact@nettoyage-perpignan.com",
    password : "secretpassword",
    admin : true,   
    logo : Logo,
    profit : 0,
    expenses : 0,
    clients: [
        {
            id: 0,
            name: "Le Parc De Goûts",
            phone: "0670009308",
            email: "parcdegouts@outlook.fr",
            adress: {
                number: 22,
                street: "rue de l'exemple",
                city: "Aiguillon",
                zipcode: 34000,
                country: "France"
            },
            factures: [
                {
                    id: 0,
                    number: 1,
                    name: "Le Parc de Goûts",
                    date: " 15/03/2023",
                    email: "exemple@parc.fr",
                    phone: "0670009308",
                    total: 1599,                   
                    services: [
                        {
                            id: 0,
                            number: 1,
                            name: 'Formule Custom',
                            price: 1499,
                        },
                        {
                            id: 1,
                            number: 1,
                            name: 'Serveur web',
                            price: 100,
                        },
                    ],
                    adress: {
                        number: 32,
                        street: "rue de l'exemple",
                        city: "Aiguillon",
                        zipcode: 34000,
                        country: "France"
                    }, 
                },
                {
                    id: 1,
                    number: 3,
                    name: "Le Parc de Goûts",
                    date: " 24/06/2023",
                    email: "exemple@parc.fr",
                    phone: "0670009308",
                    total: 200,                  
                    services: [
                        {
                            id: 0,
                            number: 1,
                            name: 'Application mobile',
                            price: 200,
                        },
                    ],
                    adress: {
                        number: 32,
                        street: "rue de l'exemple",
                        city: "Aiguillon",
                        zipcode: 34000,
                        country: "France"
                    }, 
                   
                },
            ],
            devis: [
                {
                    id: 0,
                    number: 1,
                    name: "Le Parc de Goûts",
                    date: " 15/03/2023",
                    email: "exemple@parc.fr",
                    phone: "0670009308",
                    total: 1599,                   
                    services: [
                        {
                            id: 0,
                            number: 1,
                            name: 'Formule Custom',
                            price: 1499,
                        },
                        {
                            id: 1,
                            number: 1,
                            name: 'Serveur web',
                            price: 100,
                        },
                    ],
                    adress: {
                        number: 32,
                        street: "rue de l'exemple",
                        city: "Aiguillon",
                        zipcode: 34000,
                        country: "France"
                    }, 
                },
                {
                    id: 1,
                    number: 3,
                    name: "Le Parc de Goûts",
                    date: " 24/06/2023",
                    email: "exemple@parc.fr",
                    phone: "0670009308",
                    total: 200,                   
                    services: [
                        {
                            id: 0,
                            number: 1,
                            name: 'Application mobile',
                            price: 200,
                        },
                    ],
                    adress: {
                        number: 32,
                        street: "rue de l'exemple",
                        city: "Aiguillon",
                        zipcode: 34000,
                        country: "France"
                    }, 
                   
                },
            ]
        },
        {
            id: 1,
            name: "Casino 2",
            phone: "0608414717",
            email: "casino2@outlook.fr",
            adress: {
                number: 47,
                street: "rue des jeux",
                city: "Paris",
                zipcode: 95000,
                country: "France"
            },
            factures: [
                {
                    id: 0,
                    number: 2,
                    name: "Casino 2",
                    date: " 03/08/2023",
                    email: "casino2@outlook.fr",
                    phone: "0608414717",
                    total: 499,                   
                    services: [
                        {
                            id: 0,
                            number: 1,
                            name: 'Formule Starter',
                            price: 499,
                        },
                        {
                            id: 1,
                            number: 1,
                            name: 'Serveur web',
                            price: 10,
                        },
                    ],
                    adress: {
                        number: 47,
                        street: "rue des jeux",
                        city: "Paris",
                        zipcode: 95000,
                        country: "France"
                    },
                },
            ],
            devis: [
                {
                    id: 0,
                    number: 2,
                    name: "Casino 2",
                    date: " 03/08/2023",
                    email: "casino2@outlook.fr",
                    phone: "0608414717",
                    total: 499,                   
                    services: [
                        {
                            id: 0,
                            number: 1,
                            name: 'Formule Starter',
                            price: 499,
                        },
                        {
                            id: 1,
                            number: 1,
                            name: 'Serveur web',
                            price: 10,
                        },
                    ],
                    adress: {
                        number: 47,
                        street: "rue des jeux",
                        city: "Paris",
                        zipcode: 95000,
                        country: "France"
                    }, 
                },
                
            ]
        },
    ], 
    factures: [
       {
            id: 0,
            number: 1,
            name: "Le Parc de Goûts",
            date: " 15/03/2023",
            email: "exemple@parc.fr",
            phone: "0670009308",
            total: 1599,                   
            services: [
                {
                    id: 0,
                    number: 1,
                    name: 'Formule Custom',
                    price: 1499,
                },
                {
                    id: 1,
                    number: 1,
                    name: 'Serveur web',
                    price: 100,
                },
            ],
            adress: {
                number: 32,
                street: "rue de l'exemple",
                city: "Aiguillon",
                zipcode: 34000,
                country: "France"
            }, 
        },
        {
            id: 1,
            number: 3,
            name: "Le Parc de Goûts",
            date: " 24/06/2023",
            email: "exemple@parc.fr",
            phone: "0670009308",
            total: 200,           
            services: [
                {
                    id: 0,
                    number: 1,
                    name: 'Application mobile',
                    price: 200,
                },
            ],
            adress: {
                number: 32,
                street: "rue de l'exemple",
                city: "Aiguillon",
                zipcode: 34000,
                country: "France"
            },           
        },
        {
            id: 2,
            number: 2,
            name: "Casino 2",
            date: " 03/08/2023",
            email: "casino2@outlook.fr",
            phone: "0608414717",
            total: 499,                   
            services: [
                {
                    id: 0,
                    number: 1,
                    name: 'Formule Starter',
                    price: 499,
                },
                {
                    id: 1,
                    number: 1,
                    name: 'Serveur web',
                    price: 10,
                },
            ],
            adress: {
                number: 47,
                street: "rue des jeux",
                city: "Paris",
                zipcode: 95000,
                country: "France"
            },
        },
    ], 
    devis: [
        {
            id: 0,
            number: 1,
            name: "Le Parc de Goûts",
            date: " 15/03/2023",
            email: "exemple@parc.fr",
            phone: "0670009308",
            total: 1599,                   
            services: [
                {
                    id: 0,
                    number: 1,
                    name: 'Formule Custom',
                    price: 1499,
                },
                {
                    id: 1,
                    number: 1,
                    name: 'Serveur web',
                    price: 100,
                },
            ],
            adress: {
                number: 32,
                street: "rue de l'exemple",
                city: "Aiguillon",
                zipcode: 34000,
                country: "France"
            }, 
        },
        {
            id: 1,
            number: 3,
            name: "Le Parc de Goûts",
            date: " 24/06/2023",
            email: "exemple@parc.fr",
            phone: "0670009308",
            total: 200,           
            services: [
                {
                    id: 0,
                    number: 1,
                    name: 'Application mobile',
                    price: 200,
                },
            ],
            adress: {
                number: 32,
                street: "rue de l'exemple",
                city: "Aiguillon",
                zipcode: 34000,
                country: "France"
            },           
        },
        {
            id: 2,
            number: 2,
            name: "Casino 2",
            date: " 03/08/2023",
            email: "casino2@outlook.fr",
            phone: "0608414717",
            total: 499,                   
            services: [
                {
                    id: 0,
                    number: 1,
                    name: 'Formule Starter',
                    price: 499,
                },
                {
                    id: 1,
                    number: 1,
                    name: 'Serveur web',
                    price: 10,
                },
            ],
            adress: {
                number: 47,
                street: "rue des jeux",
                city: "Paris",
                zipcode: 95000,
                country: "France"
            },
        },       
    ],
}