import { router } from '@inertiajs/react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Data {
    type: string;
    montant: number;
    annee_id: number;
    niveau_id: number;
}

export default function useScolarite() {
    // Création d'une scolarite
    const createScolarite = async (data: Data) => {
        try {
            await axios
                .post('/scolarite', data)
                .then((response) => {
                    if (response.data.success) {
                        toast.success('Scolarite créée avec succès !');
                    } else {
                        toast.error(response.data.message);
                    }
                })
                .catch((error) => {
                    toast.error(
                        'Erreur survenue lors de la creation de la Scolarite',
                    );
                    console.log(error);
                });
        } catch (error) {
            toast.error('Erreur survenue au niveau du serveur');
            console.log(error);
        }
    };

    // Modification d'une Scolarite
    const updateScolarite = async (id: number, data: Data) => {
        try {
            await axios
                .put(`/scolarite/${id}/update`, data)
                .then(() => {
                    toast.success('Scolarite modifiée avec succès !');

                    // Redirection sur la page d'affiche
                    router.visit('/scolarite');
                })
                .catch((error) => {
                    toast.error(
                        'Erreur survenue lors de la modification de la scolarite',
                    );
                    console.log(error);
                });
        } catch (error) {
            toast.error('Erreur survenue au niveau du serveur');
            console.log(error);
        }
    };

    // Suppression d'une scolarite
    const deleteScolarite = async (id: number) => {
        try {
            await axios
                .delete(`/scolarite/${id}/delete`)
                .then(() => {
                    toast.success('Scolarite supprimée !');
                })
                .catch((error) => {
                    toast.error(
                        'Erreur survenue lors de la suppression de la scolarite',
                    );
                    console.log(error);
                });
        } catch (error) {
            toast.error('Erreur survenue au niveau du serveur');
            console.log(error);
        }
    };

    return { createScolarite, updateScolarite, deleteScolarite };
}
