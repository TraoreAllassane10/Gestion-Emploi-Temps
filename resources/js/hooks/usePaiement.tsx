import { router } from '@inertiajs/react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Data {
    montant: number;
    date_paiement: string;
    methode_paiement: string;
    reference: string;
}

export default function usePaiement() {
    // Création d'un paiement
    const createPaiement = async (inscriptionId: number, data: Data) => {
        try {
            await axios
                .post(`/inscriptions/${inscriptionId}/paiement`, data, {
                    responseType: 'blob',
                })
                .then((response) => {
                    // Pouvoir ouvrir le stream du pdf dans un nouvel onglet
                    // const file = new Blob([response.data], {
                    //     type: 'application/pdf',
                    // });

                    // const fileUrl = URL.createObjectURL(file);

                    // window.open(fileUrl);

                    const url = window.URL.createObjectURL(
                        new Blob([response.data]),
                    );

                    const link = document.createElement('a');

                    link.href = url;
                    link.setAttribute('download', 'recu_paiement.pdf');

                    document.body.appendChild(link);
                    link.click();

                    router.reload()
                })
                .catch((error) => {
                    toast.error(
                        "Erreur survenue lors de l'enrgistrement du paiement",
                    );
                    console.log(error);
                });
        } catch (error) {
            toast.error('Erreur survenue au niveau du serveur');
            console.log(error);
        }
    };

    return { createPaiement };
}
