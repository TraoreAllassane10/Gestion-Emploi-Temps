import PaginationLinks from '@/components/Pagination';
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
import useFiliere from '@/hooks/useFiliere';
import useHoraire from '@/hooks/useHoraire';
import AppLayout from '@/layouts/app-layout';
import ConfigurationLayout from '@/layouts/configurations/ConfigurationLayout';
import { filiere, horaire } from '@/routes';
import { BreadcrumbItem, Horaire } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { Edit, Trash } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Horaire',
        href: '/horaire',
    },
];

interface HoraireProps {
    horaires: Horaire[];
    [key: string]: unknown;
}

const Index = () => {
    const { horaires } = usePage<HoraireProps>().props;

    const [heure_debut, setHeureDebut] = useState('');
    const [heure_fin, setHeureFin] = useState('');
    const [index_order, setOrderIndex] = useState("");

    const { createHoraire, deleteHoraire } = useHoraire();

    // Enregistrement d'un horaire
    const handleSubmit = () => {
        // Verification des données
        if (heure_debut == '' || heure_fin == '' || index_order == '') {
            toast.error('Veuillez remplir tous les champs svp');
            return;
        }

        // Création d'un horaire
        createHoraire({ heure_debut, heure_fin, index_order: Number(index_order) });

        // Nettoyage de l'etat
        setHeureDebut('');
        setHeureFin('');
        setOrderIndex('');

        // Redirection vers la page d'affichage des horaires
        router.visit(horaire());
    };

    // Suppression d'un horaire
    const handleDelete = (id: number) => {
        if (id) deleteHoraire(id);
    };

    return (
        <div>
            <AppLayout breadcrumbs={breadcrumbs}>
                <ConfigurationLayout>
                    <div>
                        {/* Entete et le bouton d'ajout */}
                        <div className="my-2 flex place-items-center justify-between">
                            <h1 className="text-2xl font-bold">
                                Gestion des horaires
                            </h1>

                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground"
                                    >
                                        Ajouter un horaire
                                    </Button>
                                </SheetTrigger>
                                <SheetContent>
                                    <SheetHeader>
                                        <SheetTitle>Nouvel Horaire</SheetTitle>
                                        <SheetDescription>
                                            Ajouter un nouvel horaire
                                        </SheetDescription>
                                    </SheetHeader>
                                    <div className="grid flex-1 auto-rows-min gap-6 px-4">
                                        <div className="grid gap-3">
                                            <Label htmlFor="sheet-demo-name">
                                                Heure debut
                                            </Label>
                                            <Input
                                                value={heure_debut}
                                                type="time"
                                                onChange={(e) =>
                                                    setHeureDebut(
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>

                                        <div className="grid gap-3">
                                            <Label htmlFor="sheet-demo-name">
                                                Heure Fin
                                            </Label>
                                            <Input
                                                value={heure_fin}
                                                type="time"
                                                onChange={(e) =>
                                                    setHeureFin(e.target.value)
                                                }
                                            />
                                        </div>

                                        <div className="grid gap-3">
                                            <Label htmlFor="sheet-demo-name">
                                                Ordre d'affichage
                                            </Label>
                                            <Input
                                                type="number"
                                                value={index_order}
                                                onChange={(e) =>
                                                    setOrderIndex(
                                                        e.target.value,
                                                    )
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
                                            <TableHead>Heure Debut</TableHead>
                                            <TableHead>Heure Fin</TableHead>
                                            <TableHead>Ordre</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {horaires.map((horaire) => (
                                            <TableRow>
                                                <TableCell>
                                                    {horaire.heure_debut}
                                                </TableCell>
                                                 <TableCell>
                                                    {horaire.heure_debut}
                                                </TableCell>
                                                 <TableCell>
                                                    {horaire.index_order}
                                                </TableCell>
                                                <TableCell className="flex gap-2">
                                                    <Link
                                                        href={`horaire/${horaire.id}/edit`}
                                                    >
                                                        <Edit
                                                            size={20}
                                                            className="cursor-pointer text-blue-600 hover:text-blue-800"
                                                        />
                                                    </Link>

                                                    <Link
                                                        onClick={() =>
                                                            handleDelete(
                                                                horaire.id,
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
