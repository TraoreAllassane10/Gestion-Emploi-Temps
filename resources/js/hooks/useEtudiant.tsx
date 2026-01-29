import { etudiants } from '@/routes';
import { router } from '@inertiajs/react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Data {
    ip: string;
    nom: string;
    prenom: string;
    date_naissance: string;
    lieu_naissance: string;
    numero: number ;
    nom_parent: string;
    numero_parent: number;
    niveau_id: string[];
    annee_id: string;
}

interface DataSearch {
    recherchecours: string;
    rechercheProfesseur: string;
    rechercheNiveau: string;
    rechercheSalle: string;
}

export default function useEtudiant() {

    // Création d'un etudiant
    const createEtudiant = async (data: Data) => {
        try {
            console.log(data)
            await axios
                .post('/etudiants', data)
                .then((res) => {
                    if (res.data.message) {
                        toast.error(res.data.message);
                        return;
                    }

                    toast.success('Etudiant crée avec succès !');

                    // Redirection vers la page d'affichage des seances
                    router.visit(etudiants());
                })
                .catch((error) => {
                    toast.error(error.response.data.message);
                    console.log(error);
                });
        } catch (error) {
            toast.error('Erreur survenue au seance du serveur');
            console.log(error);
        }
    };

    // Modification d'un etudiant
    const updateEtudiant = async (id: string, data: Data) => {
        try {
            await axios
                .put(`/etudiants/${id}/update`, data)
                .then(() => {
                    toast.success('Etudiant modifié avec succès !');

                    // Redirection sur la page d'affiche
                    router.visit('/etudiants');
                })
                .catch((error) => {
                    toast.error(error.response.data.message);
                    console.log(error);
                });
        } catch (error) {
            toast.success('Erreur survenue au seance du serveur');
            console.log(error);
        }
    };

    // Suppression d'un etudiant
    const deleteEtudiant = async (id: number) => {
        try {
            await axios
                .delete(`/etudiants/${id}/delete`)
                .then(() => {
                    toast.success('Etudiant supprimé !');
                })
                .catch((error) => {
                    toast.success(
                        'Erreur survenue lors de la suppression du seance',
                    );
                    console.log(error);
                });
        } catch (error) {
            toast.success('Erreur survenue au seance du serveur');
            console.log(error);
        }
    };

    return { createEtudiant, updateEtudiant, deleteEtudiant };
}
