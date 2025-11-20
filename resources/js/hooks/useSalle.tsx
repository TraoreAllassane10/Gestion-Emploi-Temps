import { router } from '@inertiajs/react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Data {
    nom: string;
}

export default function useSalle() {
    // Création d'une nouvelle salle
    const createSalle = async (data: Data) => {
        try {
            await axios
                .post('/salle', data)
                .then(() => {
                    toast.success("Salle créée avec succès !");
                })
                .catch((error) => {
                    toast.success(
                        "Erreur survenue lors de la creation de la salle",
                    );
                });
        } catch (error) {
            toast.success('Erreur survenue au niveau du serveur');
        }
    };

    // Modification d'une salle
    const updateSalle = async (id: number, data: Data) => {
        try {
            await axios
                .put(`/salle/${id}/update`, data)
                .then(() => {
                    toast.success("Salle modifiée avec succès !");

                    // Redirection sur la page d'affiche
                    router.visit('/salle');
                })
                .catch((error) => {
                    toast.success(
                        "Erreur survenue lors de la modification de la salle",
                    );
                });
        } catch (error) {
            toast.success('Erreur survenue au niveau du serveur');
        }
    };

    // Suppression d'une salle
    const deleteSalle = async (id: number) => {
        try {
            await axios
                .delete(`/salle/${id}/delete`)
                .then(() => {
                    toast.success('Salle supprimée !');
                })
                .catch((error) => {
                    toast.success(
                        "Erreur survenue lors de la suppression de la salle",
                    );
                });
        } catch (error) {
            toast.success('Erreur survenue au niveau du serveur');
        }
    };

    return { createSalle, updateSalle, deleteSalle };
}
