import PaginationLinks from '@/components/Pagination';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    NativeSelect,
    NativeSelectOption,
} from '@/components/ui/native-select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import useSeance from '@/hooks/useSeance';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Horaire, Meta, Professeur } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { Edit, PlusCircle, Printer, Search, Trash } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Seance',
        href: '/seance',
    },
];

interface Data {
    id: number;
    jour: string;
    date: string;
    heure_debut: string;
    heure_fin: string;
    professeur: Professeur;
    cours: Cours;
    salle: Salle;
    niveau: Niveau;
    horaire: Horaire;
}

interface Seance {
    data: Data[];
    meta: Meta;
}

// Type des données du professeur

interface Cours {
    id: number;
    nom: string;
}

interface Salle {
    id: number;
    nom: string;
}

interface Niveau {
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
        data: Niveau[];
    };
    [key: string]: unknown;
}

const Index = () => {
    const { seances, professeurs, salles, niveaux } =
        usePage<SeanceProps>().props;

    //Les states pour la recherche et le filtrage
    const [rechercheProfesseur, setRechercheProfesseur] = useState('');
    const [rechercheNiveau, setRechercheNiveau] = useState('');
    const [rechercheSalle, setRechercheSalle] = useState('');
    // const [rechercheDate, setRechercheDate] = useState('');

    const { deleteSeance } = useSeance();

    // Suppression d'une
    const handleDelete = (id: number) => {
        if (id) deleteSeance(id);
    };

    // Recherche et filtrage
    const handleSearch = () => {
        router.get('/seance', {
            niveau: rechercheNiveau,
            professeur: rechercheProfesseur,
            salle: rechercheSalle,
            // date: rechercheDate,
        });
    };

    // Exportation en pdf
    const exportPDF = () => {
        const url =
            `/seance/export?` +
            `niveau=${rechercheNiveau}&` +
            `professeur=${rechercheProfesseur}&` +
            `salle=${rechercheSalle}&` 
            // `date=${rechercheDate}`;

        window.open(url);
    };

    return (
        <div>
            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="p-4">
                    {/* Entete et le bouton d'ajout */}
                    <div className="my-2 flex place-items-center justify-between">
                        <h1 className="text-2xl font-bold">Programmes</h1>

                        <Link href="/seance/create">
                            <Button className="gap-2">
                                <PlusCircle className="h-4 w-4" />
                                Nouvelle séance
                            </Button>
                        </Link>
                    </div>

                    {/* Recherche et Filtrage */}
                    <Card className="mb-4">
                        <div className="flex place-items-center justify-between px-4">
                            <div className="flex place-items-center gap-4">
                                <div>
                                    <Label className="text-gray-500">
                                        Niveau
                                    </Label>
                                    <NativeSelect
                                        className="w-full"
                                        value={rechercheNiveau}
                                        onChange={(e) =>
                                            setRechercheNiveau(e.target.value)
                                        }
                                    >
                                        <NativeSelectOption value="">
                                            {' '}
                                        </NativeSelectOption>

                                        {niveaux.data.map((niveau) => (
                                            <NativeSelectOption
                                                value={niveau.id}
                                            >
                                                {niveau.nom}
                                            </NativeSelectOption>
                                        ))}
                                    </NativeSelect>
                                </div>

                                <div>
                                    <Label className="text-gray-500">
                                        Salle
                                    </Label>
                                    <NativeSelect
                                        className="w-full"
                                        value={rechercheSalle}
                                        onChange={(e) =>
                                            setRechercheSalle(e.target.value)
                                        }
                                    >
                                        <NativeSelectOption value="">
                                            {' '}
                                        </NativeSelectOption>

                                        {salles.data.map((salle) => (
                                            <NativeSelectOption
                                                value={salle.id}
                                            >
                                                {salle.nom}
                                            </NativeSelectOption>
                                        ))}
                                    </NativeSelect>
                                </div>

                                <div>
                                    <Label className="text-gray-500">
                                        Professeur
                                    </Label>
                                    <NativeSelect
                                        className="w-full"
                                        value={rechercheProfesseur}
                                        onChange={(e) =>
                                            setRechercheProfesseur(
                                                e.target.value,
                                            )
                                        }
                                    >
                                        <NativeSelectOption value="">
                                            {' '}
                                        </NativeSelectOption>

                                        {professeurs.data.map((professeur) => (
                                            <NativeSelectOption
                                                value={professeur.id}
                                            >
                                                {professeur.nom}{' '}
                                                {professeur.prenom}
                                            </NativeSelectOption>
                                        ))}
                                    </NativeSelect>
                                </div>

                                {/* <div>
                                    <Label>Date</Label>
                                    <Input
                                        type="date"
                                        value={rechercheDate}
                                        onChange={(e) =>
                                            setRechercheDate(e.target.value)
                                        }
                                    />
                                </div> */}

                                <button
                                    onClick={handleSearch}
                                    className="mt-6 cursor-pointer rounded-md bg-blue-500 p-2 text-white hover:bg-blue-500/80"
                                >
                                    <Search size={16} />
                                </button>
                            </div>

                            <div>
                                <button
                                    onClick={exportPDF}
                                    className="flex cursor-pointer items-center gap-2 rounded bg-green-500 p-2 text-sm text-white hover:bg-green-500/90"
                                >
                                    <Printer size={16} /> Imprimer
                                </button>
                            </div>
                        </div>
                    </Card>

                    {/* Affichage des données */}
                    <Card>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/60">
                                        <TableHead className="font-semibold">
                                            Jour
                                        </TableHead>
                                        <TableHead className="font-semibold">
                                            Date
                                        </TableHead>
                                        <TableHead className="font-semibold">
                                            Horaire
                                        </TableHead>
                                        <TableHead className="font-semibold">
                                            Cours
                                        </TableHead>
                                        <TableHead className="font-semibold">
                                            Professeur
                                        </TableHead>
                                        <TableHead className="font-semibold">
                                            Salle
                                        </TableHead>
                                        <TableHead className="font-semibold">
                                            Niveau
                                        </TableHead>
                                        <TableHead className="text-center font-semibold">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {seances?.data.map((seance) => (
                                        <TableRow key={seance.id}>
                                            <TableCell>
                                                {seance.jour}
                                            </TableCell>
                                            <TableCell>
                                                {new Date(
                                                    seance.date,
                                                ).toLocaleDateString('fr-FR')}
                                            </TableCell>
                                            <TableCell>
                                                {seance.horaire?.heure_debut} - {seance.horaire?.heure_fin}
                                            </TableCell>
                                            <TableCell>
                                                {seance.cours?.nom}
                                            </TableCell>
                                            <TableCell>
                                                {seance.professeur?.nom}{' '}
                                                {seance.professeur?.prenom}
                                            </TableCell>
                                            <TableCell>
                                                {seance.salle?.nom}
                                            </TableCell>
                                            <TableCell>
                                                {seance.niveau?.nom}
                                            </TableCell>
                                            <TableCell className="flex gap-2">
                                                {/* <Link
                                                    href={`/seance/${seance.id}/edit`}
                                                >
                                                    <Edit
                                                        size={20}
                                                        className="cursor-pointer text-blue-600 hover:text-blue-800"
                                                    />
                                                </Link> */}

                                                <Link
                                                    onClick={() =>
                                                        handleDelete(seance.id)
                                                    }
                                                >
                                                    <Trash
                                                        size={20}
                                                        className="cursor-pointer text-red-600 hover:text-red-800"
                                                    />
                                                </Link>
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

export default Index;
