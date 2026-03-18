import { seance } from '@/routes';
import { router } from '@inertiajs/react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Data {
    jour: string;
    date: string;
    professeur_id: string;
    cours_id: string;
    salle_id: string;
    niveau_id: string;
    semaine_id: string;
    horaire_id: string;
}

interface DataSearch {
    recherchecours: string;
    rechercheProfesseur: string;
    rechercheNiveau: string;
    rechercheSalle: string;
}

export default function useSeance() {
    //Recherche et filtrage
    const searchAndSort = async (dataSearch: DataSearch) => {
        try {
            await axios.get(
                `/seance?cours=${dataSearch.recherchecours}&professeur=${dataSearch.rechercheProfesseur}&niveau=${dataSearch.rechercheNiveau}&salle=${dataSearch.rechercheSalle}`,
            );
        } catch (error) {
            toast.error('Erreur survenue au seance du serveur');
            console.log(error);
        }
    };

    // Création d'une séance
    const createSeance = async (data: Data) => {
        try {
            await axios
                .post('/seance', data)
                .then((res) => {
                    if (res.data.success) {
                        toast.success('seance crée avec succès !');
                        // Redirection vers la page d'affichage des seances
                        router.visit(seance());
                    }

                    if (res.data.success == false) {
                        console.log(res.data.message);
                        toast.error(res.data.message);
                    }
                })
                .catch((error) => {
                    toast.error(
                        "Erreur survenue lors de la creation d'une seance",
                    );
                    console.log(error);
                });
        } catch (error) {
            toast.error('Erreur survenue au seance du serveur');
            console.log(error);
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
                      toast.error(
                        "Erreur survenue lors de la modification d'une séance",
                    );
                    console.log(error);
                });
        } catch (error) {
            toast.success('Erreur survenue au seance du serveur');
            console.log(error);
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
                    toast.error(
                        'Erreur survenue lors de la suppression du seance',
                    );
                    console.log(error);
                });
        } catch (error) {
            toast.error('Erreur survenue au seance du serveur');
            console.log(error);
        }
    };

    return { createSeance, updateSeance, deleteSeance, searchAndSort };
}
