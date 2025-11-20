import { seance } from '@/routes';
import { router } from '@inertiajs/react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Data {
    jours: string;
    heure_debut: string;
    heure_fin: string;
    professeur_id: string;
    cours_id: string;
    salle_id: string;
    niveau_id: string;
}

export default function useSeance() {
    // Création d'une séance
    const createSeance = async (data: Data) => {
        try {
            await axios
                .post('/seance', data)
                .then((res) => {
                    toast.success('seance crée avec succès !');
                    // Redirection vers la page d'affichage des seances
                    router.visit(seance());

                    console.log(res);
                })
                .catch((error) => {
                    toast.error(error.response.data.message);
                });
        } catch (error) {
            toast.error('Erreur survenue au seance du serveur');
        }
    };

    // Modification d'un seance
    const updateSeance = async (id: string, data: Data) => {
        try {
            await axios
                .put(`/seance/${id}/update`, data)
                .then(() => {
                    toast.success('seance modifié avec succès !');

                    // Redirection sur la page d'affiche
                    router.visit('/seance');
                })
                .catch((error) => {
                    toast.error(error.response.data.message);
                });
        } catch (error) {
            toast.success('Erreur survenue au seance du serveur');
        }
    };

    // Suppression d'un seance
    const deleteSeance = async (id: number) => {
        try {
            await axios
                .delete(`/seance/${id}/delete`)
                .then(() => {
                    toast.success('seance supprimé !');
                })
                .catch((error) => {
                    toast.success(
                        'Erreur survenue lors de la suppression du seance',
                    );
                });
        } catch (error) {
            toast.success('Erreur survenue au seance du serveur');
        }
    };

    return { createSeance, updateSeance, deleteSeance };
}
