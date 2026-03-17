import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import useHoraire from '@/hooks/useHoraire';
import useSemaine from '@/hooks/useSemaine';
import AppLayout from '@/layouts/app-layout';
import ConfigurationLayout from '@/layouts/configurations/ConfigurationLayout';
import { horaire, semaine } from '@/routes';
import { BreadcrumbItem, Horaire, Semaine } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { Edit, Trash } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Semaine',
        href: '/semaine',
    },
];

interface SemaineProps {
    semaines: Semaine[];
    [key: string]: unknown;
}

const Index = () => {
    const { semaines } = usePage<SemaineProps>().props;

    const [libelle, setLibelle] = useState('');
    const [date_debut, setDateDebut] = useState('');
    const [date_fin, setDateFin] = useState('');

    const { createSemaine, deleteSemaine } = useSemaine();

    // Enregistrement d'une semaine
    const handleSubmit = () => {
        // Verification des données
        if (libelle == '' || date_debut == '' || date_fin == '') {
            toast.error('Veuillez remplir tous les champs svp');
            return;
        }

        // Création d'une semaine
        createSemaine({
            libelle,
            date_debut,
            date_fin,
        });

        // Nettoyage de l'etat
        setLibelle('');
        setDateDebut('');
        setDateFin('');

        // Redirection vers la page d'affichage des semaines
        router.visit(semaine());
    };

    // Suppression d'une semaine
    const handleDelete = (id: number) => {
        if (id) deleteSemaine(id);
    };

    return (
        <div>
            <AppLayout breadcrumbs={breadcrumbs}>
                <ConfigurationLayout>
                    <div>
                        {/* Entete et le bouton d'ajout */}
                        <div className="my-2 flex place-items-center justify-between">
                            <h1 className="text-2xl font-bold">
                                Gestion des semaines
                            </h1>

                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground"
                                    >
                                        Ajouter une semaine
                                    </Button>
                                </SheetTrigger>
                                <SheetContent>
                                    <SheetHeader>
                                        <SheetTitle>
                                            Nouvelle semaine
                                        </SheetTitle>
                                        <SheetDescription>
                                            Ajouter une nouvelle semaine
                                        </SheetDescription>
                                    </SheetHeader>
                                    <div className="grid flex-1 auto-rows-min gap-6 px-4">
                                        <div className="grid gap-3">
                                            <Label htmlFor="sheet-demo-name">
                                                Libellé
                                            </Label>
                                            <Input
                                                value={libelle}
                                                onChange={(e) =>
                                                    setLibelle(
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>

                                        <div className="grid gap-3">
                                            <Label htmlFor="sheet-demo-name">
                                                Date Début
                                            </Label>
                                            <Input
                                                value={date_debut}
                                                type="date"
                                                onChange={(e) =>
                                                    setDateDebut(e.target.value)
                                                }
                                            />
                                        </div>

                                       <div className="grid gap-3">
                                            <Label htmlFor="sheet-demo-name">
                                                Date Fin
                                            </Label>
                                            <Input
                                                value={date_fin}
                                                type="date"
                                                onChange={(e) =>
                                                    setDateFin(e.target.value)
                                                }
                                            />
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
                                            <TableHead>Date Debut</TableHead>
                                            <TableHead>Date fin</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {semaines.map((semaine) => (
                                            <TableRow>
                                                <TableCell>
                                                    {semaine.libelle}
                                                </TableCell>
                                                <TableCell>
                                                    {semaine.date_debut}
                                                </TableCell>
                                                <TableCell>
                                                    {semaine.date_fin}
                                                </TableCell>
                                                <TableCell className="flex gap-2">
                                                    <Link
                                                        href={`semaine/${semaine.id}/edit`}
                                                    >
                                                        <Edit
                                                            size={20}
                                                            className="cursor-pointer text-blue-600 hover:text-blue-800"
                                                        />
                                                    </Link>

                                                    <Link
                                                        onClick={() =>
                                                            handleDelete(
                                                                semaine.id,
                                                            )
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
                </ConfigurationLayout>
            </AppLayout>
        </div>
    );
};

export default Index;
