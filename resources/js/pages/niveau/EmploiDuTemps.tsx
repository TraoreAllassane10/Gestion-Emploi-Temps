import { Card, CardContent } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import {
    BreadcrumbItem,
    DataNiveau,
    Horaire,
    Meta,
    Professeur,
    Salle,
} from '@/types';
import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Niveau',
        href: '/niveau',
    },
    {
        title: 'Emploi Du Temps',
        href: '/emploi',
    },
];

interface Data {
    id: number;
    jours: string;
    date: string;
    heure_debut: string;
    heure_fin: string;
    professeur: Professeur;
    cours: Cours;
    salle: Salle;
    niveau: DataNiveau;
    horaire: Horaire;
}

interface Seance {
    data: Data[];
    meta: Meta;
}

interface Cours {
    id: number;
    nom: string;
}

interface SeanceProps {
    seances: Seance;
    professeurs: {
        data: Professeur[];
    };
    cours: {
        data: Cours[];
    };
    salles: {
        data: Salle[];
    };
    niveaux: {
        data: DataNiveau[];
    };
    [key: string]: unknown;
}

const EmploiDuTemps = () => {
    const { seances } = usePage<SeanceProps>().props;

    //Les states pour la recherche et le filtrage
    const [rechercheProfesseur, setRechercheProfesseur] = useState('');

    const [rechercheSalle, setRechercheSalle] = useState('');
    const [rechercheDate, setRechercheDate] = useState('');

    // Recherche et filtrage
    const handleSearch = () => {
        // Je recupere le niveau id de la premiere données car elles sont toute le meme niveau id
        const niveauId = seances.data[0]?.niveau.id.toString();

        if (niveauId) {
            router.get(`/niveau/${niveauId}/emploi-du-temps`, {
                niveau: niveauId,
                professeur: rechercheProfesseur,
                salle: rechercheSalle,
                date: rechercheDate,
            });
        }
    };

    // Exportation en pdf
    const exportPDF = () => {
        // Je recupere le niveau id de la premiere données car elles sont toute le meme niveau id
        const niveauId = seances.data[0]?.niveau.id;

        const url =
            `/seance/export?` +
            `niveau=${niveauId}&` +
            `professeur=${rechercheProfesseur}&` +
            `salle=${rechercheSalle}&` +
            `date=${rechercheDate}`;

        window.open(url);
    };

    // const seancesTriee = seances.data.sort((a, b) => a.horaire.index_order - a.horaire.index_order);

    return (
        <div>
            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="p-4">
                    <Card>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/60">
                                        <TableHead className="border-2 border-gray-500 font-semibold">
                                            Horaires
                                        </TableHead>
                                        <TableHead className="border-2 border-gray-500 font-semibold">
                                            Lundi
                                        </TableHead>
                                        <TableHead className="border-2 border-gray-500 font-semibold">
                                            Mardi
                                        </TableHead>
                                        <TableHead className="border-2 border-gray-500 font-semibold">
                                            Mercredi
                                        </TableHead>
                                        <TableHead className="border-2 border-gray-500 font-semibold">
                                            Jeudi
                                        </TableHead>
                                        <TableHead className="border-2 border-gray-500 font-semibold">
                                            Vendredi
                                        </TableHead>
                                        <TableHead className="border-2 border-gray-500 font-semibold">
                                            Samedi
                                        </TableHead>

                                        <TableHead className="border-2 border-gray-500 text-center font-semibold">
                                            Dimanche
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="border-2 border-gray-500">
                                            7h30-9h30
                                        </TableCell>
                                        <TableCell className="border-2 border-gray-500">
                                            Merise
                                        </TableCell>
                                        <TableCell className="border-2 border-gray-500">
                                            Architecture
                                        </TableCell>
                                        <TableCell className="border-2 border-gray-500">
                                            Langage Php
                                        </TableCell>
                                        <TableCell className="border-2 border-gray-500">
                                            Anglais
                                        </TableCell>
                                        <TableCell className="border-2 border-gray-500">
                                            Maths
                                        </TableCell>
                                        <TableCell className="border-2 border-gray-500">
                                            UML
                                        </TableCell>
                                        <TableCell className="border-2 border-gray-500">
                                            Negociation informatique
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell className="border-2 border-gray-500">
                                            9h45-11h45
                                        </TableCell>
                                        <TableCell className="border-2 border-gray-500">
                                            Merise
                                        </TableCell>
                                        <TableCell className="border-2 border-gray-500">
                                            Architecture
                                        </TableCell>
                                        <TableCell className="border-2 border-gray-500">
                                            Langage Php
                                        </TableCell>
                                        <TableCell className="border-2 border-gray-500">
                                            Anglais
                                        </TableCell>
                                        <TableCell className="border-2 border-gray-500">
                                            Maths
                                        </TableCell>
                                        <TableCell className="border-2 border-gray-500">
                                            UML
                                        </TableCell>
                                        <TableCell className="border-2 border-gray-500">
                                            Negociation informatique
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell className="border-2 border-gray-500">
                                            11h45-13h30
                                        </TableCell>
                                        <TableCell className="border-2 border-gray-500">
                                            Merise
                                        </TableCell>
                                        <TableCell className="border-2 border-gray-500">
                                            Architecture
                                        </TableCell>
                                        <TableCell className="border-2 border-gray-500">
                                            Langage Php
                                        </TableCell>
                                        <TableCell className="border-2 border-gray-500">
                                            Anglais
                                        </TableCell>
                                        <TableCell className="border-2 border-gray-500">
                                            Maths
                                        </TableCell>
                                        <TableCell className="border-2 border-gray-500">
                                            UML
                                        </TableCell>
                                        <TableCell className="border-2 border-gray-500">
                                            Negociation informatique
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/60">
                                        <TableHead className="border-2 border-gray-500 font-semibold">
                                            Horaires
                                        </TableHead>
                                        <TableHead className="border-2 border-gray-500 font-semibold">
                                            Lundi
                                        </TableHead>
                                        <TableHead className="border-2 border-gray-500 font-semibold">
                                            Mardi
                                        </TableHead>
                                        <TableHead className="border-2 border-gray-500 font-semibold">
                                            Mercredi
                                        </TableHead>
                                        <TableHead className="border-2 border-gray-500 font-semibold">
                                            Jeudi
                                        </TableHead>
                                        <TableHead className="border-2 border-gray-500 font-semibold">
                                            Vendredi
                                        </TableHead>
                                        <TableHead className="border-2 border-gray-500 font-semibold">
                                            Samedi
                                        </TableHead>

                                        <TableHead className="border-2 border-gray-500 text-center font-semibold">
                                            Dimanche
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {seances.data.map((seance) => (
                                        <TableRow key={seance.id}>
                                            <TableCell className="border-2 border-gray-500">
                                                {seance.horaire.heure_debut} - {seance.horaire.heure_fin}
                                            </TableCell>
                                            <TableCell className="border-2 border-gray-500">
                                                {seance.cours.nom}
                                            </TableCell>
                                            <TableCell className="border-2 border-gray-500">
                                                Architecture
                                            </TableCell>
                                            <TableCell className="border-2 border-gray-500">
                                                Langage Php
                                            </TableCell>
                                            <TableCell className="border-2 border-gray-500">
                                                Anglais
                                            </TableCell>
                                            <TableCell className="border-2 border-gray-500">
                                                Maths
                                            </TableCell>
                                            <TableCell className="border-2 border-gray-500">
                                                UML
                                            </TableCell>
                                            <TableCell className="border-2 border-gray-500">
                                                Negociation informatique
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </AppLayout>
        </div>
    );
};

export default EmploiDuTemps;
