import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { dashboard, seance } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    BookOpen,
    Building2,
    Clock,
    GraduationCap,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

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

interface Seance {
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

interface DashboardProps {
    seances: Seance[];
    nombreCours: number;
    nombreFiliere: number;
    nombreSalle: number;
    [key: string] : unknown;
}

export default function Dashboard() {
    const { seances, nombreCours, nombreFiliere, nombreSalle } =
        usePage<DashboardProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="p-4">
                {/* Statistiques */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <Card className="shadow-sm transition hover:shadow-md">
                        <CardContent className="flex flex-col items-center py-6">
                            <GraduationCap
                                className="mb-2 text-primary"
                                size={32}
                            />
                            <h3 className="text-lg font-semibold">
                                Nombre de filières
                            </h3>
                            <span className="text-2xl font-bold text-primary">
                                {nombreFiliere}
                            </span>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm transition hover:shadow-md">
                        <CardContent className="flex flex-col items-center py-6">
                            <Building2
                                className="mb-2 text-blue-500"
                                size={32}
                            />
                            <h3 className="text-lg font-semibold">
                                Nombre de salles
                            </h3>
                            <span className="text-2xl font-bold text-blue-500">
                                {nombreSalle}
                            </span>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm transition hover:shadow-md">
                        <CardContent className="flex flex-col items-center py-6">
                            <BookOpen
                                className="mb-2 text-green-600"
                                size={32}
                            />
                            <h3 className="text-lg font-semibold">
                                Nombre de cours
                            </h3>
                            <span className="text-2xl font-bold text-green-600">
                                {nombreCours}
                            </span>
                        </CardContent>
                    </Card>
                </div>

                {/* ________ Last Seances Section _________ */}
                <Card className="shadow-sm">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <h2 className="flex items-center gap-2 text-xl font-semibold">
                                <Clock size={20} /> 5 dernières séances
                                enregistrées
                            </h2>

                            <Link
                                href={seance()}
                                className="flex items-center gap-1 rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground hover:bg-primary/90"
                            >
                                Voir plus <ArrowRight size={18} />
                            </Link>
                        </div>
                    </CardHeader>

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
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {seances?.map((seance) => (
                                    <TableRow key={seance.id}>
                                        <TableCell className="font-medium">
                                            {seance.jours}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {new Date(
                                                seance.date,
                                            ).toLocaleDateString('fr-FR')}
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
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
