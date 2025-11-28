import { niveau } from '@/routes';
import { router } from '@inertiajs/react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Data {
    nom: string;
    filiere_id: string;
}

export default function useNiveau() {
    // Création d'une niveau
    const createNiveau = async (data: Data) => {
        try {
            await axios
                .post('/niveau', data)
                .then(() => {
                    toast.success('Niveau crée avec succès !');
                    // Redirection vers la page d'affichage des niveau
                    router.visit(niveau());
                })
                .catch((error) => {
                    toast.success(
                        "Erreur survenue lors de la creation d'un niveau",
                    );
                    console.log(error)
                });
        } catch (error) {
            toast.success('Erreur survenue au niveau du serveur');
            console.log(error)
        }
    };

    // Modification d'un niveau
    const updateNiveau = async (id: string, data: Data) => {
        try {
            await axios
                .put(`/niveau/${id}/update`, data)
                .then(() => {
                    toast.success('Niveau modifié avec succès !');

                    // Redirection sur la page d'affiche
                    router.visit('/niveau');
                })
                .catch((error) => {
                    toast.success(
                        "Erreur survenue lors de la modification d'un niveau",
                    );
                    console.log(error)
                });
        } catch (error) {
            toast.success('Erreur survenue au niveau du serveur');
            console.log(error)
        }
    };

    // Suppression d'une filere
    const deleteNiveau = async (id: number) => {
        try {
            await axios
                .delete(`/niveau/${id}/delete`)
                .then(() => {
                    toast.success('Niveau supprimé !');
                })
                .catch((error) => {
                    toast.success(
                        'Erreur survenue lors de la suppression du niveau',
                    );
                    console.log(error)
                });
        } catch (error) {
            toast.success('Erreur survenue au niveau du serveur');
            console.log(error)
        }
    };

    return { createNiveau, updateNiveau, deleteNiveau };
}
