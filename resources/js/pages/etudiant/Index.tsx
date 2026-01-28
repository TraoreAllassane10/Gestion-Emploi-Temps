import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import useAnnee from '@/hooks/useAnnee';
import AppLayout from '@/layouts/app-layout';
import { annee } from '@/routes';
import { BreadcrumbItem } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Etudiants',
        href: '/etudiants',
    },
];

interface Annee {
    id: number;
    libelle: string;
    date_debut: string;
    date_fin: string;
}

interface Meta {
    current_page: number;
    from: number;
    last_page: number;
    links: {
        active: boolean;
        label: string;
        page: number;
        url: string;
    }[];
}

interface Annees {
    data: Annee[];
    meta: Meta;
}

interface AnneeProps {
    annees: Annees;
    [key: string]: unknown;
}

const Index = () => {
    const { annees } = usePage<AnneeProps>().props;

    const [libelle, setLibelle] = useState('');
    const [date_debut, setDateDebut] = useState('');
    const [date_fin, setDateFin] = useState('');

    const { createAnnee, deleteAnnee } = useAnnee();

    // Enregistrement d'une annee
    const handleSubmit = () => {
        // Verification des données
        if (libelle == '' || date_debut == undefined || date_fin == undefined) {
            toast.error('Veuillez remplir tous les champs svp !');
            return;
        }

        // Creation d'une nouvelle année
        createAnnee({
            libelle,
            date_debut: new Date(date_debut),
            date_fin: new Date(date_fin),
        });

        // Nettoye de l'etat du composant
        setLibelle('');
        setDateDebut('');
        setDateFin('');

        //Redirection sur la page d'affiche
        router.visit(annee());
    };

    // Suppression d'une année
    const handleDelete = (id: number) => {
        if (id) deleteAnnee(id);
    };

    return (
        <div>
            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="p-4">
                    {/* Entete et le bouton d'ajout */}
                    <div className="my-2 flex place-items-center justify-between">
                        <h1 className="text-2xl font-bold">Etudiants</h1>

                        <Link href="/etudiants/create">
                            <Button
                                variant="outline"
                                className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground"
                            >
                                Nouvel Etudiant
                            </Button>
                        </Link>
                    </div>

                    <Card>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted">
                                        <TableHead>Libellé</TableHead>
                                        <TableHead>Date de Début</TableHead>
                                        <TableHead>Date de Fin</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {/* {annees?.data.map((annee) => (
                                        <TableRow key={annee.id}>
                                            <TableCell >
                                                {annee.libelle}
                                            </TableCell>
                                            <TableCell>
                                                {annee.date_debut}
                                            </TableCell>
                                            <TableCell>
                                                {annee.date_debut}
                                            </TableCell>
                                            <TableCell className="flex gap-2">
                                                <Link
                                                    href={`annee/${annee.id}/edit`}
                                                >
                                                    <Edit
                                                        size={20}
                                                        className="cursor-pointer text-blue-600 hover:text-blue-800"
                                                    />
                                                </Link>

                                                <Link
                                                    onClick={() =>
                                                        handleDelete(annee.id)
                                                    }
                                                >
                                                    <Trash
                                                        size={20}
                                                        className="cursor-pointer text-red-600 hover:text-red-800"
                                                    />
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))} */}
                                </TableBody>
                            </Table>

                            {/* Systeme de pagination */}
                            {/* <PaginationLinks links={annees.meta.links} /> */}
                        </CardContent>
                    </Card>
                </div>
            </AppLayout>
        </div>
    );
};

export default Index;
