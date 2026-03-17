import { horaire, semaine } from '@/routes';
import { router } from '@inertiajs/react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Data {
    libelle: string;
    date_debut: string;
    date_fin: string;
}

export default function useSemaine() {
    // Création d'une nouvelle semaine
    const createSemaine = async (data: Data) => {
        try {
            await axios
                .post('/semaine', data)
                .then((response) => {
                    if (response.data.success) {
                        toast.success('Semaine créée avec succès !');
                    }

                    if (response.data.success === false) {
                        toast.error(response.data.message);
                    }
                })
                .catch((error) => {
                    toast.error(
                        "Erreur survenue lors de la creation d'une semaine",
                    );
                    console.log(error);
                });
        } catch (error) {
            toast.error('Erreur survenue au niveau du serveur');
            console.log(error);
        }
    };

    // Modification d'une semaine
    const updateSemaine = async (id: number, data: Data) => {
        try {
            await axios
                .put(`/semaine/${id}/update`, data)
                .then(() => {
                    toast.success('Semaine modifiée avec succès !');

                    // Redirection sur la page d'affiche
                    router.visit(semaine());
                })
                .catch((error) => {
                    toast.error(
                        "Erreur survenue lors de la modification d'une semaine",
                    );
                    console.log(error);
                });
        } catch (error) {
            toast.error('Erreur survenue au niveau du serveur');
            console.log(error);
        }
    };

    // Suppression d'une semaine
    const deleteSemaine = async (id: number) => {
        try {
            await axios
                .delete(`/semaine/${id}/delete`)
                .then(() => {
                    toast.success('Semaine supprimée !');
                })
                .catch((error) => {
                    toast.error(
                        'Erreur survenue lors de la suppression d une semaine',
                    );
                    console.log(error);
                });
        } catch (error) {
            toast.error('Erreur survenue au niveau du serveur');
            console.log(error);
        }
    };

    return { createSemaine, updateSemaine, deleteSemaine };
}
