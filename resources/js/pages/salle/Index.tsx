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
import useSalle from '@/hooks/useSalle';
import AppLayout from '@/layouts/app-layout';
import { salle } from '@/routes';
import { BreadcrumbItem } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { Edit, Trash } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Salle',
        href: '/salle',
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

interface Salle {
    data: Data[];
    meta: Meta;
}

interface SalleProps {
    salles: Salle;
    [key: string]: unknown;
}

const Index = () => {
    const { salles } = usePage<SalleProps>().props;

    const [nom, setNom] = useState('');

    const { createSalle, deleteSalle } = useSalle();

    // Enregistrement d'une salle
    const handleSubmit = () => {
        // Verification des données
        if (nom == '') {
            toast.error('Veuillez entrer le nom de la salle!');
            return;
        }

        // Création d'une salle
        createSalle({ nom });

        // Nettoyage de l'etat
        setNom('');

        // Redirection vers la page d'affichage des filieres
        router.visit("/salle");
    };

    // Suppression d'une salle
    const handleDelete = (id: number) => {
        if (id) deleteSalle(id);
    };
    return (
        <div>
            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="p-4">
                    {/* Entete et le bouton d'ajout */}
                    <div className="my-2 flex place-items-center justify-between">
                        <h1 className="text-2xl font-bold">Salle</h1>

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground"
                                >
                                    Ajouter une salle
                                </Button>
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>Nouvelle Salle</SheetTitle>
                                    <SheetDescription>
                                        Ajouter une nouvelle salle
                                    </SheetDescription>
                                </SheetHeader>
                                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                                    <div className="grid gap-3">
                                        <Label htmlFor="sheet-demo-name">
                                            Nom de la salle
                                        </Label>
                                        <Input
                                            value={nom}
                                            onChange={(e) =>
                                                setNom(e.target.value)
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
                                        <TableHead>Nom de salles</TableHead>

                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {salles?.data.map((salle) => (
                                        <TableRow>
                                            <TableCell className="font-medium">
                                               {salle.nom}
                                            </TableCell>
                                            <TableCell className="flex gap-2">
                                                <Link href={`/salle/${salle.id}/edit`}>
                                                    <Edit
                                                        size={20}
                                                        className="cursor-pointer text-blue-600 hover:text-blue-800"
                                                    />
                                                </Link>

                                                <Link onClick={() => handleDelete(salle.id)}>
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

                        <PaginationLinks links={salles.meta.links} />
                    </Card>
                </div>
            </AppLayout>
        </div>
    );
};

export default Index;
