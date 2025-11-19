import { router } from '@inertiajs/react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Data {
    libelle: string;
    date_debut: Date;
    date_fin: Date;
}

export default function useAnnee() {
    // Création d'une nouvelle année
    const createAnnee = async (data: Data) => {
        try {
            await axios
                .post('/annee', data)
                .then(() => {
                    toast.success("L'année scolaire créée avec succès !");
                })
                .catch((error) => {
                    toast.success(
                        "Erreur survenue lors de la creation de l'annee",
                    );
                });
        } catch (error) {
            toast.success('Erreur survenue au niveau du serveur');
        }
    };

    // Modification d'une année
    const updateAnnee = async (id: number, data: Data) => {
        try {
            await axios
                .put(`/annee/${id}/update`, data)
                .then(() => {
                    toast.success("L'année scolaire modifiée avec succès !");

                    // Redirection sur la page d'affiche
                    router.visit('/annee');
                })
                .catch((error) => {
                    toast.success(
                        "Erreur survenue lors de la modification de l'annee",
                    );
                });
        } catch (error) {
            toast.success('Erreur survenue au niveau du serveur');
        }
    };

    // Suppression d'une année
    const deleteAnnee = async (id: number) => {
        try {
            await axios
                .delete(`/annee/${id}/delete`)
                .then(() => {
                    toast.success('Année scolaire supprimée !');
                })
                .catch((error) => {
                    toast.success(
                        "Erreur survenue lors de la suppression de l'annee",
                    );
                });
        } catch (error) {
            toast.success('Erreur survenue au niveau du serveur');
        }
    };

    return { createAnnee, updateAnnee, deleteAnnee };
}
