import { horaire } from '@/routes';
import { router } from '@inertiajs/react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Data {
    heure_debut: string;
    heure_fin: string;
    index_order: number;
}

export default function useHoraire() {
    // Création d'un nouvel horaire
    const createHoraire = async (data: Data) => {
        try {
            await axios
                .post('/horaire', data)
                .then((response) => {
                    if (response.data.success) {
                        toast.success('Horaire crée avec succès !');
                    }

                    if (response.data.success === false) {
                        toast.error(response.data.message);
                    }
                })
                .catch((error) => {
                    toast.error(
                        "Erreur survenue lors de la creation d'un horaire",
                    );
                    console.log(error);
                });
        } catch (error) {
            toast.error('Erreur survenue au niveau du serveur');
            console.log(error);
        }
    };

    // Modification d'un horaire
    const updateHoraire = async (id: number, data: Data) => {
        try {
            await axios
                .put(`/horaire/${id}/update`, data)
                .then(() => {
                    toast.success('Horaire modifié avec succès !');

                    // Redirection sur la page d'affiche
                    router.visit(horaire());
                })
                .catch((error) => {
                    toast.error(
                        "Erreur survenue lors de la modification d'un horaire",
                    );
                    console.log(error);
                });
        } catch (error) {
            toast.error('Erreur survenue au niveau du serveur');
            console.log(error);
        }
    };

    // Suppression d'un horaire
    const deleteHoraire = async (id: number) => {
        try {
            await axios
                .delete(`/horaire/${id}/delete`)
                .then(() => {
                    toast.success('Horaire supprimé !');
                })
                .catch((error) => {
                    toast.error(
                        'Erreur survenue lors de la suppression d un horaire',
                    );
                    console.log(error);
                });
        } catch (error) {
            toast.error('Erreur survenue au niveau du serveur');
            console.log(error);
        }
    };

    return { createHoraire, updateHoraire, deleteHoraire };
}
