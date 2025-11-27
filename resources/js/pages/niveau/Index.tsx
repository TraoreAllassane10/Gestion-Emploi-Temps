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
import useNiveau from '@/hooks/useNiveau';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Trash } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Niveau',
        href: '/niveau',
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

interface Niveau {
    data: Data[];
    meta: Meta;
}

// Type des données de la filiere
interface FiliereData {
    id: number;
    nom: string;
}

interface NiveauProps {
    niveaux: Niveau;
    filieres: {
        data:  FiliereData[];
    };
    [key: string]: unknown;
}

const Index = () => {
    const { niveaux, filieres } = usePage<NiveauProps>().props;

    const [nom, setNom] = useState('');
    const [filiere_id, setFiliereId] = useState('');

    const { createNiveau, deleteNiveau } = useNiveau();

    // Enregistrement d'un niveau
    const handleSubmit = () => {
        // Verification des données
        if (nom == '' || filiere_id == '') {
            toast.error('Veuillez remplir tous les champs!');
            return;
        }

        // Création d'un niveau
        createNiveau({ nom, filiere_id });

        // Nettoyage de l'etat
        setNom('');
        setFiliereId('');
    };

    // Suppression d'un niveau
    const handleDelete = (id: number) => {
        if (id) deleteNiveau(id);
    };

    return (
        <div>
            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="p-4">
                    {/* Entete et le bouton d'ajout */}
                    <div className="my-2 flex place-items-center justify-between">
                        <h1 className="text-2xl font-bold">Niveaux</h1>

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground"
                                >
                                    Ajouter un niveau
                                </Button>
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>Nouveau niveau</SheetTitle>
                                    <SheetDescription>
                                        Ajouter un niveau
                                    </SheetDescription>
                                </SheetHeader>
                                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                                    <div className="grid gap-3">
                                        <Label htmlFor="sheet-demo-name">
                                            Nom du niveau
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
                                            Filière
                                        </Label>
                                        <NativeSelect
                                            className="w-full"
                                            value={filiere_id}
                                            onChange={(e) =>
                                                setFiliereId(e.target.value)
                                            }
                                        >
                                            <NativeSelectOption value="">
                                                {' '}
                                            </NativeSelectOption>

                                            {filieres.data.map((filiere) => (
                                                <NativeSelectOption
                                                    value={filiere.id}
                                                >
                                                    {filiere.nom}
                                                </NativeSelectOption>
                                            ))}
                                        </NativeSelect>
                                    </div>
                                </div>
                                <SheetFooter>
                                    <Button onClick={handleSubmit}>
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

                    <Card>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted">
                                        <TableHead>Libellé</TableHead>
                                        <TableHead className='float-end pr-10'>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {niveaux.data.map((niveau) => (
                                        <TableRow>
                                            <TableCell >
                                                {niveau.nom}
                                            </TableCell>
                                            <TableCell className="flex place-items-center gap-2 float-end">

                                                <Link href={`/niveau/${niveau.id}/edit`}>
                                                    <Edit
                                                        size={20}
                                                        className="cursor-pointer text-blue-600 hover:text-blue-800"
                                                    />
                                                </Link>

                                                <Link
                                                    onClick={() =>
                                                        handleDelete(niveau.id)
                                                    }
                                                >
                                                    <Trash
                                                        size={20}
                                                        className="cursor-pointer text-red-600 hover:text-red-800"
                                                    />
                                                </Link>

                                                <Link href={`/niveau/${niveau.id}/emploi-du-temps`} className='p-1 bg-yellow-500 hover:bg-yellow-500/80 text-sm text-white rounded-md cursor-pointer'>Emploi Du Temps</Link>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>

                        {/* Systeme de pagination */}
                        <PaginationLinks links={niveaux.meta.links} />
                    </Card>
                </div>
            </AppLayout>
        </div>
    );
};

export default Index;
