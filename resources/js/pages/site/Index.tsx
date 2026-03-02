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
import useSite from '@/hooks/useSite';
import AppLayout from '@/layouts/app-layout';
import ConfigurationLayout from '@/layouts/configurations/ConfigurationLayout';
import { BreadcrumbItem, Meta } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { Edit, Trash } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'site',
        href: '/site',
    },
];

interface Data {
    id: number;
    nom: string;
}


interface Salle {
    data: Data[];
    meta: Meta;
}

interface SalleProps {
    sites: Salle;
    [key: string]: unknown;
}

const Index = () => {
    const { sites } = usePage<SalleProps>().props;

    const [nom, setNom] = useState('');

    const { createSite, deleteSite } = useSite();

    // Enregistrement du site
    const handleSubmit = () => {
        // Verification des données
        if (nom == '') {
            toast.error('Veuillez entrer le nom du site!');
            return;
        }

        // Création d'un site
        createSite({ nom });

        // Nettoyage de l'etat
        setNom('');

        // Redirection vers la page d'affichage des filieres
        router.visit('/site');
    };

    // Suppression du site
    const handleDelete = (id: number) => {
        if (id) deleteSite(id);
    };
    return (
        <div>
            <AppLayout breadcrumbs={breadcrumbs}>
                <ConfigurationLayout>
                    <div>
                        {/* Entete et le bouton d'ajout */}
                        <div className="my-2 flex place-items-center justify-between">
                            <h1 className="text-2xl font-bold">Site</h1>

                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground"
                                    >
                                        Ajouter un site
                                    </Button>
                                </SheetTrigger>
                                <SheetContent>
                                    <SheetHeader>
                                        <SheetTitle>Nouveau site</SheetTitle>
                                        <SheetDescription>
                                            Ajouter une nouveau site
                                        </SheetDescription>
                                    </SheetHeader>
                                    <div className="grid flex-1 auto-rows-min gap-6 px-4">
                                        <div className="grid gap-3">
                                            <Label htmlFor="sheet-demo-name">
                                                Nom du site
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
                                            <TableHead>Nom des sites</TableHead>

                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {sites?.data.map((site) => (
                                            <TableRow>
                                                <TableCell>
                                                    {site.nom}
                                                </TableCell>
                                                <TableCell className="flex gap-2">
                                                    <Link
                                                        href={`/site/${site.id}/edit`}
                                                    >
                                                        <Edit
                                                            size={20}
                                                            className="cursor-pointer text-blue-600 hover:text-blue-800"
                                                        />
                                                    </Link>

                                                    <Link
                                                        onClick={() =>
                                                            handleDelete(
                                                                site.id,
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

                            <PaginationLinks links={sites.meta.links} />
                        </Card>
                    </div>
                </ConfigurationLayout>
            </AppLayout>
        </div>
    );
};

export default Index;
