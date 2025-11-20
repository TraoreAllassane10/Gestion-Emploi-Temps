import { niveau, professeur } from '@/routes';
import { router } from '@inertiajs/react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Data {
    nom: string;
    prenom: string;
    email: string;
    telephone: string;

}

export default function useProfesseur() {
    // Création d'un professeur
    const createProfesseur = async (data: Data) => {
        try {
            await axios
                .post('/professeur', data)
                .then(() => {
                    toast.success('Professeur crée avec succès !');
                    // Redirection vers la page d'affichage des professeur
                    router.visit(professeur());
                })
                .catch((error) => {
                    toast.success(
                        "Erreur survenue lors de la creation d'un professeur",
                    );
                });
        } catch (error) {
            toast.success('Erreur survenue au professeur du serveur');
        }
    };

    // Modification d'un professeur
    const updateProfesseur = async (id: string, data: Data) => {
        try {
            await axios
                .put(`/professeur/${id}/update`, data)
                .then(() => {
                    toast.success('Niveau modifié avec succès !');

                    // Redirection sur la page d'affiche
                    router.visit('/professeur');
                })
                .catch((error) => {
                    toast.success(
                        "Erreur survenue lors de la modification d'un professeur",
                    );
                });
        } catch (error) {
            toast.success('Erreur survenue au professeur du serveur');
        }
    };

    // Suppression d'un professeur
    const deleteProfesseur = async (id: number) => {
        try {
            await axios
                .delete(`/professeur/${id}/delete`)
                .then(() => {
                    toast.success('Professeur supprimé !');
                })
                .catch((error) => {
                    toast.success(
                        'Erreur survenue lors de la suppression du professeur',
                    );
                });
        } catch (error) {
            toast.success('Erreur survenue au niveau du serveur');
        }
    };

    return { createProfesseur, updateProfesseur, deleteProfesseur };
}
