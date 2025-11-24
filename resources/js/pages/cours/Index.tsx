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
    SheetDescription,
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
import useCours from '@/hooks/useCours';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Trash } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cours',
        href: '/cours',
    },
];

interface Data {
    id: number;
    nom: string;
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

interface Cours {
    data: Data[];
    meta: Meta;
}

// Type des données du professeur
interface Professeur {
    id: number;
    nom: string;
    prenom: string;
}

interface CoursProps {
    cours: Cours;
    professeurs: {
        data: Professeur[];
    };
    [key: string]: unknown;
}

const Index = () => {
    const { cours, professeurs } = usePage<CoursProps>().props;

    const [nom, setNom] = useState('');
    const [professeur_id, setProfesseurId] = useState('');

    const { createCours, deleteCours } = useCours();

    // Enregistrement d'un cours
    const handleSubmit = () => {
        // Verification des données
        if (nom == '' || professeur_id == '') {
            toast.error('Veuillez remplir tous les champs!');
            return;
        }

        // Création d'un cours
        createCours({ nom, professeur_id });

        // Nettoyage de l'etat
        setNom('');
        setProfesseurId('');
    };

    // Suppression d'un cours
    const handleDelete = (id: number) => {
        if (id) deleteCours(id);
    };

    return (
        <div>
            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="p-4">
                    {/* Entete et le bouton d'ajout */}
                    <div className="my-2 flex place-items-center justify-between">
                        <h1 className="text-2xl font-bold">Cours</h1>

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground"
                                >
                                    Ajouter un cours
                                </Button>
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>Nouveau cours</SheetTitle>
                                    <SheetDescription>
                                        Ajouter un nouveau cours
                                    </SheetDescription>
                                </SheetHeader>
                                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                                    <div className="grid gap-3">
                                        <Label htmlFor="sheet-demo-name">
                                            Nom du cours
                                        </Label>
                                        <Input
                                            value={nom}
                                            onChange={(e) =>
                                                setNom(e.target.value)
                                            }
                                        />
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

                                            {professeurs.data.map((prof) => (
                                                <NativeSelectOption
                                                    value={prof.id}
                                                >
                                                    {prof.nom} {prof.prenom}
                                                </NativeSelectOption>
                                            ))}
                                        </NativeSelect>
                                    </div>
                                </div>
                                <SheetFooter>
                                    <Button onClick={handleSubmit}>Enregistrer</Button>
                                    <SheetClose asChild>
                                        <Button variant="outline">
                                            Fermer
                                        </Button>
                                    </SheetClose>
                                </SheetFooter>
                            </SheetContent>
                        </Sheet>
                    </div>

                    <Card>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted">
                                        <TableHead>Nom de cours</TableHead>

                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {cours?.data.map((cours) => (
                                        <TableRow key={cours.id}>
                                            <TableCell>
                                                {cours.nom}
                                            </TableCell>
                                            <TableCell className="flex gap-2">
                                                <Link href={`/cours/${cours.id}/edit`}>
                                                    <Edit
                                                        size={20}
                                                        className="cursor-pointer text-blue-600 hover:text-blue-800"
                                                    />
                                                </Link>

                                                <Link onClick={() => handleDelete(cours.id)}>
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

                        {/* Systeme de pagination */}
                        <PaginationLinks links={cours.meta.links} />
                    </Card>
                </div>
            </AppLayout>
        </div>
    );
};

export default Index;
