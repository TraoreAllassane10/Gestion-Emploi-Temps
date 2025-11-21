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
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
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
import { BreadcrumbItem } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { Edit, Search, Trash } from 'lucide-react';
import { format } from 'path';
import { useState } from 'react';
import toast from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Seance',
        href: '/seance',
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
    niveau: Niveau;
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

interface Seance {
    data: Data[];
    meta: Meta;
}

// Type des données du professeur
interface Professeur {
    id: number;
    nom: string;
    prenom: string;
}

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
    const { seances, professeurs, cours, salles, niveaux } =
        usePage<SeanceProps>().props;

    const [jours, setJours] = useState('');
    const [date, setDate] = useState("");
    const [heure_debut, setHeureDebut] = useState('');
    const [heure_fin, setHeureFin] = useState('');
    const [cours_id, setCoursId] = useState('');
    const [professeur_id, setProfesseurId] = useState('');
    const [salle_id, setSalleId] = useState('');
    const [niveau_id, setNiveauId] = useState('');

    //Les states pour la recherche et le filtrage
    const [rechercheProfesseur, setRechercheProfesseur] = useState('');
    const [rechercheNiveau, setRechercheNiveau] = useState('');
    const [rechercheSalle, setRechercheSalle] = useState('');

    const { createSeance, deleteSeance, searchAndSort } = useSeance();

    // Enregistrement d'un cours
    const handleSubmit = () => {
        // Verification des données
        if (
            jours == '' ||
            date == '' ||
            heure_debut == '' ||
            heure_fin == '' ||
            professeur_id == '' ||
            cours_id == '' ||
            salle_id == '' ||
            niveau_id == ''
        ) {
            toast.error('Veuillez remplir tous les champs!');
            return;
        }

        // Création d'une seance
        createSeance({
            jours,
            date,
            heure_debut,
            heure_fin,
            professeur_id,
            cours_id,
            niveau_id,
            salle_id,
        });

        // Nettoyage de l'etat
        setJours('');
        setDate('');
        setHeureDebut('');
        setHeureFin('');
        setProfesseurId('');
        setCoursId('');
        setSalleId('');
        setNiveauId('');
    };

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
        });
    };

    return (
        <div>
            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="p-4">
                    {/* Entete et le bouton d'ajout */}
                    <div className="my-2 flex place-items-center justify-between">
                        <h1 className="text-2xl font-bold">Emploi du temps</h1>

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground"
                                >
                                    Ajouter une séance
                                </Button>
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>Nouvelle séance</SheetTitle>
                                </SheetHeader>
                                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                                    <div className="grid gap-3">
                                        <Label htmlFor="sheet-demo-name">
                                            Niveau
                                        </Label>
                                        <NativeSelect
                                            className="w-full"
                                            value={niveau_id}
                                            onChange={(e) =>
                                                setNiveauId(e.target.value)
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

                                    <div className="grid gap-3">
                                        <Label htmlFor="sheet-demo-name">
                                            Cours
                                        </Label>
                                        <NativeSelect
                                            className="w-full"
                                            value={cours_id}
                                            onChange={(e) =>
                                                setCoursId(e.target.value)
                                            }
                                        >
                                            <NativeSelectOption value="">
                                                {' '}
                                            </NativeSelectOption>

                                            {cours.data.map((cours) => (
                                                <NativeSelectOption
                                                    value={cours.id}
                                                >
                                                    {cours.nom}
                                                </NativeSelectOption>
                                            ))}
                                        </NativeSelect>
                                    </div>

                                    <div className="grid gap-3">
                                        <Label htmlFor="sheet-demo-name">
                                            Professeur
                                        </Label>
                                        <NativeSelect
                                            className="w-full"
                                            value={professeur_id}
                                            onChange={(e) =>
                                                setProfesseurId(e.target.value)
                                            }
                                        >
                                            <NativeSelectOption value="">
                                                {' '}
                                            </NativeSelectOption>

                                            {professeurs.data.map(
                                                (professeur) => (
                                                    <NativeSelectOption
                                                        value={professeur.id}
                                                    >
                                                        {professeur.nom}{' '}
                                                        {professeur.prenom}
                                                    </NativeSelectOption>
                                                ),
                                            )}
                                        </NativeSelect>
                                    </div>

                                    <div className="grid gap-3">
                                        <Label htmlFor="sheet-demo-name">
                                            Salle
                                        </Label>
                                        <NativeSelect
                                            className="w-full"
                                            value={salle_id}
                                            onChange={(e) =>
                                                setSalleId(e.target.value)
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

                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <Label htmlFor="sheet-demo-name">
                                            Jour
                                        </Label>
                                        <NativeSelect
                                            className="w-full"
                                            value={jours}
                                            onChange={(e) =>
                                                setJours(e.target.value)
                                            }
                                        >
                                            <NativeSelectOption value=""></NativeSelectOption>
                                            <NativeSelectOption value="Lundi">
                                                Lundi
                                            </NativeSelectOption>
                                            <NativeSelectOption value="Mardi">
                                                Mardi
                                            </NativeSelectOption>
                                            <NativeSelectOption value="Mercredi">
                                                Mercredi
                                            </NativeSelectOption>
                                            <NativeSelectOption value="Jeudi">
                                                Jeudi
                                            </NativeSelectOption>
                                            <NativeSelectOption value="Vendredi">
                                                Vendredi
                                            </NativeSelectOption>
                                            <NativeSelectOption value="Samedi">
                                                Samedi
                                            </NativeSelectOption>
                                            <NativeSelectOption value="Dimanche">
                                                Dimanche
                                            </NativeSelectOption>
                                        </NativeSelect>
                                        </div>

                                        <div>
                                            <Label>Date du programme</Label>
                                            <Input type='date' value={date} onChange={(e) => setDate(e.target.value)}/>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <Label htmlFor="sheet-demo-name">
                                                Heure Début
                                            </Label>
                                            <Input
                                                type="time"
                                                value={heure_debut}
                                                onChange={(e) =>
                                                    setHeureDebut(
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="sheet-demo-name">
                                                Heure Fin
                                            </Label>
                                            <Input
                                                type="time"
                                                value={heure_fin}
                                                onChange={(e) =>
                                                    setHeureFin(e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <SheetFooter>
                                    <Button
                                        onClick={handleSubmit}
                                        className="cursor-pointer"
                                    >
                                        Enregistrer
                                    </Button>
                                    <SheetClose asChild>
                                        <Button variant="outline">
                                            Fermer
                                        </Button>
                                    </SheetClose>
                                </SheetFooter>
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* Recherche et Filtrage */}
                    <Card className="mb-4">
                        <div className="flex place-items-center items-center gap-4 px-4">
                            <div>
                                <Label className="text-gray-500">Niveau</Label>
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
                                        <NativeSelectOption value={niveau.id}>
                                            {niveau.nom}
                                        </NativeSelectOption>
                                    ))}
                                </NativeSelect>
                            </div>

                            <div>
                                <Label className="text-gray-500">Salle</Label>
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
                                        <NativeSelectOption value={salle.id}>
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
                                        setRechercheProfesseur(e.target.value)
                                    }
                                >
                                    <NativeSelectOption value="">
                                        {' '}
                                    </NativeSelectOption>

                                    {professeurs.data.map((professeur) => (
                                        <NativeSelectOption
                                            value={professeur.id}
                                        >
                                            {professeur.nom} {professeur.prenom}
                                        </NativeSelectOption>
                                    ))}
                                </NativeSelect>
                            </div>

                            <button
                                onClick={handleSearch}
                                className="cursor-pointer rounded-md bg-blue-500 p-2 text-white hover:bg-blue-500/80"
                            >
                                <Search />
                            </button>
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
                                            Début
                                        </TableHead>
                                        <TableHead className="font-semibold">
                                            Fin
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
                                            <TableCell className="font-medium">
                                                {seance.jours}
                                            </TableCell>
                                              <TableCell className="font-medium">
                                                {new Date(seance.date).toLocaleDateString("fr-FR")}
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {seance.heure_debut}
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {seance.heure_fin}
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {seance.cours?.nom}
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {seance.professeur?.nom}{' '}
                                                {seance.professeur?.prenom}
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {seance.salle?.nom}
                                            </TableCell>
                                            <TableCell className="font-medium">
                                                {seance.niveau?.nom}
                                            </TableCell>
                                            <TableCell className="flex gap-2">
                                                <Link
                                                    href={`/seance/${seance.id}/edit`}
                                                >
                                                    <Edit
                                                        size={20}
                                                        className="cursor-pointer text-blue-600 hover:text-blue-800"
                                                    />
                                                </Link>

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

                        <PaginationLinks links={seances.meta.links} />
                    </Card>
                </div>
            </AppLayout>
        </div>
    );
};

export default Index;
