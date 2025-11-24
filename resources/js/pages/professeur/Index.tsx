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
import useProfesseur from '@/hooks/useProfesseur';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Trash } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Professeur',
        href: '/professeur',
    },
];

interface Data {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
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

interface Professeur {
    data: Data[];
    meta: Meta;
}

interface ProfesseurProps {
    professeurs: Professeur;
    [key: string]: unknown;
}

const Index = () => {
    const { professeurs } = usePage<ProfesseurProps>().props;

    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');

    const { createProfesseur, deleteProfesseur } = useProfesseur();

    // Enregistrement d'un professeur
    const handleSubmit = () => {
        // Verification des données
        if (nom == '' || prenom == '' || email == '' || telephone == '') {
            toast.error('Veuillez remplir tous les champs!');
            return;
        }

        // Création d'un professeur
        createProfesseur({ nom, prenom, email, telephone });

        // Nettoyage de l'etat
        setNom('');
        setPrenom('');
        setEmail('');
        setTelephone('');
    };

    // Suppression d'un professeur
    const handleDelete = (id: number) => {
        if (id) deleteProfesseur(id);
    };

    return (
        <div>
            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="p-4">
                    {/* Entete et le bouton d'ajout */}
                    <div className="my-2 flex place-items-center justify-between">
                        <h1 className="text-2xl font-bold">Professeur</h1>

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground"
                                >
                                    Ajouter un professeur
                                </Button>
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>Nouveau professeur</SheetTitle>
                                    <SheetDescription>
                                        Ajouter une nouveau professeur
                                    </SheetDescription>
                                </SheetHeader>
                                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                                    <div className="grid gap-3">
                                        <Label htmlFor="sheet-demo-name">
                                            Nom
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
                                            Prenom
                                        </Label>
                                        <Input
                                            value={prenom}
                                            onChange={(e) =>
                                                setPrenom(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="grid gap-3">
                                        <Label htmlFor="sheet-demo-name">
                                            Email
                                        </Label>
                                        <Input
                                            type="email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className="grid gap-3">
                                        <Label htmlFor="sheet-demo-name">
                                            Telephone
                                        </Label>
                                        <Input
                                            value={telephone}
                                            onChange={(e) =>
                                                setTelephone(e.target.value)
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
                                        <TableHead>Nom</TableHead>
                                        <TableHead>Prenom</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Télephone</TableHead>

                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {professeurs?.data.map((prof) => (
                                        <TableRow key={prof.id}>
                                            <TableCell >
                                                {prof.nom}
                                            </TableCell>
                                            <TableCell>
                                                {prof.prenom}
                                            </TableCell>
                                            <TableCell>
                                                {prof.email}
                                            </TableCell>
                                            <TableCell>
                                                {prof.telephone}
                                            </TableCell>

                                            <TableCell className="flex gap-2">
                                                <Link
                                                    href={`professeur/${prof.id}/edit`}
                                                >
                                                    <Edit
                                                        size={20}
                                                        className="cursor-pointer text-blue-600 hover:text-blue-800"
                                                    />
                                                </Link>

                                                <Link
                                                    onClick={() =>
                                                        handleDelete(prof.id)
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

                        {/* Systeme de pagination */}
                        <PaginationLinks links={professeurs.meta.links} />
                    </Card>
                </div>
            </AppLayout>
        </div>
    );
};

export default Index;
