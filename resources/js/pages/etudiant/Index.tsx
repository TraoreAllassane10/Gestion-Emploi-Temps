import PaginationLinks from '@/components/Pagination';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import useEtudiant from '@/hooks/useEtudiant';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Eye, Trash } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Etudiants',
        href: '/etudiants',
    },
];

interface Etudiant {
    ip: number;
    nom: string;
    prenom: string;
    date_naissance: string;
    lieu_naissance: string;
    numero: number;
    nom_parent: string;
    numero_parent: number;
    niveaux: { id: string; nom: string }[];
    niveau_id: string;
    annee_id: string;
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

interface Etudiants {
    data: Etudiant[];
    meta: Meta;
}

interface EtudiantProps {
    etudiants: Etudiants;
    [key: string]: unknown;
}

const Index = () => {
    const { etudiants } = usePage<EtudiantProps>().props;

    const { deleteEtudiant } = useEtudiant();

    // Suppression d'un etudiant
    const handleDelete = (id: number) => {
        if (id) deleteEtudiant(id);
    };

    return (
        <div>
            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="p-4">
                    {/* Entete et le bouton d'ajout */}
                    <div className="my-2 flex place-items-center justify-between">
                        <h1 className="text-2xl font-bold">Etudiants</h1>

                        <Link href="/etudiants/create">
                            <Button
                                variant="outline"
                                className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground"
                            >
                                Nouvel Etudiant
                            </Button>
                        </Link>
                    </div>

                    <Card>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted">
                                        <TableHead>IP</TableHead>
                                        <TableHead>Nom</TableHead>
                                        <TableHead>Prenom</TableHead>
                                        <TableHead>Niveaux</TableHead>
                                        <TableHead>Date de naissance</TableHead>
                                        <TableHead>Lieu de naissane</TableHead>
                                        <TableHead>
                                            Numero de telephone
                                        </TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {etudiants?.data.map((etudiant) => (
                                        <TableRow key={etudiant.ip}>
                                            <TableCell>{etudiant.ip}</TableCell>
                                            <TableCell>
                                                {etudiant.nom}
                                            </TableCell>
                                            <TableCell>
                                                {etudiant.prenom}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex gap-1">
                                                    {etudiant.niveaux?.map(
                                                        (niveau) => (
                                                            <span className="rounded-sm bg-gray-200 px-2 py-1 text-sm font-medium">
                                                                {niveau.nom}
                                                            </span>
                                                        ),
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {etudiant.date_naissance}
                                            </TableCell>
                                            <TableCell>
                                                {etudiant.lieu_naissance}
                                            </TableCell>
                                            <TableCell>
                                                {etudiant.numero}
                                            </TableCell>
                                            <TableCell className="flex gap-4">
                                                <Link
                                                    href={`/etudiants/${etudiant.ip}/show`}
                                                >
                                                    <Eye
                                                        size={20}
                                                        className="cursor-pointer text-green-600 hover:text-green-800"
                                                    />
                                                </Link>

                                                <Link
                                                    href={`/etudiants/${etudiant.ip}/edit`}
                                                >
                                                    <Edit
                                                        size={20}
                                                        className="cursor-pointer text-blue-600 hover:text-blue-800"
                                                    />
                                                </Link>

                                                <Link
                                                    onClick={() =>
                                                        handleDelete(
                                                            etudiant.ip,
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

                            {/* Systeme de pagination */}
                            <PaginationLinks links={etudiants.meta.links} />
                        </CardContent>
                    </Card>
                </div>
            </AppLayout>
        </div>
    );
};

export default Index;
