import { router } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface CreateInscriptionData {
    etudiant_ip: string | undefined;
    annee_id: string;
    niveaux: string[];
    type_inscription: string;
    taux_reduction: number;
}

export default function useInscription() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Création d'une inscription
    const createEtudiant = async (data: CreateInscriptionData) => {
        try {
            setIsLoading(true);

            await axios
                .post('/inscriptions', data)
                .then((response) => {
                    // Sucess
                    if (response.data.success) {
                        console.log(response);
                        toast.success('Inscription effectuée !');
                    }

                    // Echec
                    if (response.data.success === false) {
                        toast.error(response.data.message);
                        return;
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

    // Modification d'une inscription
    // const updateEtudiant = async (id: string, data) => {
    //     try {
    //         setIsLoading(true);

    //         await axios
    //             .put(`/inscriptions/${id}/update`, data)
    //             .then((response) => {
    //                 if (response.data.success) {
    //                     toast.success('Etudiant modifié avec succès !');

    //                     // Redirection sur la page d'affiche
    //                     router.visit('/etudiants');
    //                 }
    //             })
    //             .catch((error) => {
    //                 toast.error(error.response.data.message);
    //                 console.log(error);
    //             })

    //     } catch (error) {
    //         toast.error('Erreur survenue au seance du serveur');
    //         console.log(error);
    //     }
    //     finally{
    //          setIsLoading(false);
    //     }
    // };

    // Suppression d'un etudiant
    // const deleteEtudiant = async (id: number) => {
    //     try {
    //         setIsLoading(true);

    //         await axios
    //             .delete(`/etudiants/${id}/delete`)
    //             .then((response) => {
    //                 if (response.data.success) {
    //                     toast.success('Etudiant supprimé !');
    //                 }
    //             })
    //             .catch((error) => {
    //                 toast.success(
    //                     'Erreur survenue lors de la suppression du seance',
    //                 );
    //                 console.log(error);
    //             });
    //     } catch (error) {
    //         toast.success('Erreur survenue au seance du serveur');
    //         console.log(error);
    //     }
    //     finally {
    //         setIsLoading(false);
    //     }
    // };

    return { createEtudiant, isLoading };
}
