import { etudiants } from '@/routes';
import { EtudiantFormData } from '@/types';
import { router } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function useEtudiant() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const rechercheEtFiltrage = (search: string, filtreStatut: string, filtreGenre: string) => {
        try {
            return router.get(
                `/etudiants`,
                {
                    search: search,
                    statut: filtreStatut,
                    genre: filtreGenre,
                    page: 1
                },
                {
                    preserveState: true,
                    replace: true,
                },
            );
        } catch (error) {
            console.log('Erreur lors de la recherche ou du filtarge : ', error);
        }
    };

    // Création d'un etudiant
    const createEtudiant = async (data: EtudiantFormData) => {
        try {
            setIsLoading(true);

            await axios
                .post('/etudiants', data)
                .then((response) => {
                    if (response.data.message) {
                        toast.error(response.data.message);
                        return;
                    }

                    if (response.data.success) {
                        toast.success('Etudiant crée avec succès !');

                        // Redirection vers la page d'affichage des seances
                        router.visit(etudiants());
                    }
                })
                .catch((error) => {
                    toast.error(error.response.data.message);
                    console.log(error);
                });
        } catch (error) {
            toast.error('Erreur survenue au niveau du serveur');
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    // Modification d'un etudiant
    const updateEtudiant = async (id: string, data: EtudiantFormData) => {
        try {
            setIsLoading(true);

            await axios
                .put(`/etudiants/${id}/update`, data)
                .then((response) => {
                    if (response.data.success) {
                        toast.success('Etudiant modifié avec succès !');

                        // Redirection sur la page d'affiche
                        router.visit('/etudiants');
                    }
                })
                .catch((error) => {
                    toast.error(error.response.data.message);
                    console.log(error);
                });
        } catch (error) {
            toast.error('Erreur survenue au niveau du serveur');
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    // Suppression d'un etudiant
    const deleteEtudiant = async (id: string) => {
        try {
            setIsLoading(true);

            await axios
                .delete(`/etudiants/${id}/delete`)
                .then((response) => {
                    if (response.data.success) {
                        toast.success('Etudiant supprimé !');
                    }
                })
                .catch((error) => {
                    toast.success(
                        'Erreur survenue lors de la suppression du seance',
                    );
                    console.log(error);
                });
        } catch (error) {
            toast.success('Erreur survenue au niveau du serveur');
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        createEtudiant,
        updateEtudiant,
        deleteEtudiant,
        rechercheEtFiltrage,
        isLoading,
    };
}
