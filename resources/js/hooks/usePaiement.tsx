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
                .post(`/inscriptions/${inscriptionId}/paiement`, data)
                .then((response) => {
                    // Lance l'onglet d'affichage du reçu
                    window.open(response.data.recu_url);

                    router.reload();
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
