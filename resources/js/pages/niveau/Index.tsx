import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import { BreadcrumbItem, FiliereData, Niveau } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    CalendarDaysIcon,
    ChevronDown,
    Edit,
    GraduationCap,
    Trash2,
} from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Niveau',
        href: '/niveau',
    },
];

interface NiveauProps {
    niveaux: Niveau;
    filieres: {
        data: FiliereData[];
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

                    <Card className="overflow-hidden shadow-sm">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/40 hover:bg-muted/40">
                                    <TableHead>Niveaux</TableHead>
                                    <TableHead>Filière</TableHead>

                                    <TableHead className="w-[100px]" />
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {niveaux.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={7}
                                            className="h-48 text-center"
                                        >
                                            <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                                <GraduationCap className="h-10 w-10 opacity-20" />
                                                <p className="text-sm">
                                                    Aucune inscription trouvée.
                                                </p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    niveaux.data.map((niveau) => (
                                        <TableRow
                                            key={niveau.id}
                                            className="group"
                                        >
                                            <TableCell className="space-x-1">
                                                {niveau.nom}
                                            </TableCell>

                                            <TableCell>
                                                {niveau.filiere.nom}
                                            </TableCell>

                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger
                                                        asChild
                                                    >
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-8 gap-1 opacity-0 transition-opacity group-hover:opacity-100"
                                                        >
                                                            Actions{' '}
                                                            <ChevronDown className="h-3 w-3" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent
                                                        align="end"
                                                        className="w-48"
                                                    >
                                                        <DropdownMenuItem
                                                            asChild
                                                        >
                                                            <Link
                                                                href={`/niveau/${niveau.id}/edit`}
                                                                className="flex cursor-pointer items-center gap-2"
                                                            >
                                                                <Edit className="h-4 w-4" />{' '}
                                                                Modifier
                                                            </Link>
                                                        </DropdownMenuItem>

                                                        <DropdownMenuItem className="cursor-pointer gap-2">
                                                            <CalendarDaysIcon className="h-4 w-4" />{' '}
                                                            Liste de classe
                                                        </DropdownMenuItem>

                                                        <DropdownMenuItem className="cursor-pointer gap-2">
                                                            <Link
                                                                href={`/niveau/${niveau.id}/emploi-du-temps`}
                                                                className="flex cursor-pointer items-center gap-2"
                                                            >
                                                                <CalendarDaysIcon className="h-4 w-4" />{' '}
                                                                Emploi du temps
                                                            </Link>
                                                        </DropdownMenuItem>

                                                        <DropdownMenuSeparator />

                                                        <DropdownMenuItem className="cursor-pointer gap-2 text-destructive focus:text-destructive">
                                                            <Link
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        niveau.id,
                                                                    )
                                                                }
                                                                className="flex cursor-pointer items-center gap-2"
                                                            >
                                                                <Trash2
                                                                    size={20}
                                                                    className="cursor-pointer text-red-600 hover:text-red-800"
                                                                />
                                                                Supprimer
                                                            </Link>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </Card>
                </div>
            </AppLayout>
        </div>
    );
};

export default Index;
