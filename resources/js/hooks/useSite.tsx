import { router } from '@inertiajs/react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Data {
    nom: string;
}

export default function useSite() {
    // Création du nouveau site
    const createSite = async (data: Data) => {
        try {
            await axios
                .post('/site', data)
                .then(() => {
                    toast.success("Site crée avec succès !");
                })
                .catch((error) => {
                    toast.success(
                        "Erreur survenue lors de la creation d'un site",
                    );
                    console.log(error)
                });
        } catch (error) {
            toast.error('Erreur survenue au niveau du serveur');
            console.log(error)
        }
    };

    // Modification d'un site
    const updateSite = async (id: number, data: Data) => {
        try {
            await axios
                .put(`/site/${id}/update`, data)
                .then(() => {
                    toast.success("Site modifié avec succès !");

                    // Redirection sur la page d'affiche
                    router.visit('/site');
                })
                .catch((error) => {
                    toast.success(
                        "Erreur survenue lors de la modification de la salle",
                    );
                    console.log(error)
                });
        } catch (error) {
            toast.success('Erreur survenue au niveau du serveur');
            console.log(error)
        }
    };

    // Suppression d'un site
    const deleteSite = async (id: number) => {
        try {
            await axios
                .delete(`/site/${id}/delete`)
                .then(() => {
                    toast.success('Site supprimé !');
                })
                .catch((error) => {
                    toast.success(
                        "Erreur survenue lors de la suppression du site",
                    );
                    console.log(error)
                });
        } catch (error) {
            toast.success('Erreur survenue au niveau du serveur');
            console.log(error)
        }
    };

    return { createSite, updateSite, deleteSite };
}
