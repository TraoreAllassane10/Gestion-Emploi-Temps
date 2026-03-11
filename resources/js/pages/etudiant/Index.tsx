import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    ChevronDown,
    Eye,
    Pencil,
    PlusCircle,
    Search,
    SlidersHorizontal,
    Trash2,
    Users,
    X,
} from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import Avatar from '@/components/etudiant/Avatar';
import EtudiantStats from '@/components/etudiant/EtudiantStats';
import StatutBadge from '@/components/etudiant/StatutBadge';
import PaginationLinks from '@/components/Pagination';
import { Etudiant, Meta, StatsEtudiant } from '@/types';
import { STATUTS } from './data/mock';

interface EtudiantData {
    data: Etudiant[];
    meta: Meta;
}

interface EtudiantProps {
    stats: StatsEtudiant;
    etudiants: EtudiantData;
    [key: string]: unknown;
}

export default function Index() {
    const { etudiants, stats } = usePage<EtudiantProps>().props;

    const [search, setSearch] = useState('');
    const [filtreStatut, setFiltreStatut] = useState('all');
    const [filtreGenre, setFiltreGenre] = useState('all');

    const filtered = etudiants.data.filter((e) => {
        const q = search.toLowerCase();
        const matchSearch =
            !q ||
            `${e.prenom} ${e.nom}`.toLowerCase().includes(q) ||
            e.ip.toLowerCase().includes(q) ||
            (e.email ?? '').toLowerCase().includes(q) ||
            e.lieu_naissance.toLowerCase().includes(q);
        return (
            matchSearch &&
            (filtreStatut === 'all' || e.statut === filtreStatut) &&
            (filtreGenre === 'all' || e.genre === filtreGenre)
        );
    });

    const hasFilters =
        search || filtreStatut !== 'all' || filtreGenre !== 'all';
    const reset = () => {
        setSearch('');
        setFiltreStatut('all');
        setFiltreGenre('all');
    };

    return (
        <AppLayout>
            <Head title="Étudiants" />

            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Étudiants
                        </h1>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                            Gérez le fichier des étudiants enregistrés.
                        </p>
                    </div>
                    <Link href="/etudiants/create">
                        <Button className="gap-2">
                            <PlusCircle className="h-4 w-4" />
                            Nouvel étudiant
                        </Button>
                    </Link>
                </div>

                {/* Stats */}
                <EtudiantStats stats={stats} />

                {/* Filtres */}
                <Card className="shadow-sm">
                    <CardContent className="flex flex-wrap items-center gap-3 p-4">
                        <div className="relative min-w-[220px] flex-1">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Nom, IP, email, lieu de naissance…"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-9"
                            />
                        </div>

                        <Select
                            value={filtreStatut}
                            onValueChange={setFiltreStatut}
                        >
                            <SelectTrigger className="w-[150px]">
                                <SelectValue placeholder="Statut" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    Tous statuts
                                </SelectItem>
                                {STATUTS.map((s) => (
                                    <SelectItem key={s} value={s}>
                                        {s}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select
                            value={filtreGenre}
                            onValueChange={setFiltreGenre}
                        >
                            <SelectTrigger className="w-[140px]">
                                <SelectValue placeholder="Genre" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tous genres</SelectItem>
                                <SelectItem value="Masculin">
                                    Masculin
                                </SelectItem>
                                <SelectItem value="Féminin">Féminin</SelectItem>
                            </SelectContent>
                        </Select>

                        {hasFilters && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={reset}
                                className="gap-1.5 text-muted-foreground"
                            >
                                <X className="h-3.5 w-3.5" /> Réinitialiser
                            </Button>
                        )}

                        <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
                            <SlidersHorizontal className="h-3.5 w-3.5" />
                            {filtered.length} résultat
                            {filtered.length !== 1 ? 's' : ''}
                        </span>
                    </CardContent>
                </Card>

                {/* Tableau */}
                <Card className="overflow-hidden shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/40 hover:bg-muted/40">
                                <TableHead>Étudiant</TableHead>
                                <TableHead>IP</TableHead>
                                <TableHead>Date de naissance</TableHead>
                                <TableHead>Lieu de naissance</TableHead>
                                <TableHead>Nationalité</TableHead>
                                <TableHead>Statut</TableHead>
                                <TableHead className="w-[80px]" />
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filtered.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="h-48 text-center"
                                    >
                                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                            <Users className="h-10 w-10 opacity-20" />
                                            <p className="text-sm">
                                                Aucun étudiant ne correspond à
                                                vos critères.
                                            </p>
                                            {hasFilters && (
                                                <Button
                                                    variant="link"
                                                    size="sm"
                                                    onClick={reset}
                                                >
                                                    Effacer les filtres
                                                </Button>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filtered.map((e) => (
                                    <TableRow key={e.ip} className="group">
                                        <TableCell>
                                            <div className="flex items-center gap-2.5">
                                                <Avatar
                                                    prenom={e.prenom}
                                                    nom={e.nom}
                                                    genre={e.genre}
                                                />
                                                <div>
                                                    <p className="text-sm leading-none font-semibold">
                                                        {e.civilite} {e.prenom}{' '}
                                                        {e.nom}
                                                    </p>
                                                    <p className="mt-0.5 text-xs text-muted-foreground">
                                                        {e.email ?? (
                                                            <span className="italic">
                                                                Pas d'email
                                                            </span>
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                                                {e.ip}
                                            </code>
                                        </TableCell>

                                        <TableCell className="text-sm text-muted-foreground tabular-nums">
                                            {new Date(
                                                e.date_naissance,
                                            ).toLocaleDateString('fr-FR')}
                                        </TableCell>

                                        <TableCell className="text-sm">
                                            {e.lieu_naissance}
                                        </TableCell>

                                        <TableCell className="text-sm">
                                            {e.nationnalite}
                                        </TableCell>

                                        <TableCell>
                                            <StatutBadge statut={e.statut} />
                                        </TableCell>

                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
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
                                                    className="w-44"
                                                >
                                                    <DropdownMenuItem asChild>
                                                        <Link
                                                            href={`/etudiants/${e.ip}/show`}
                                                            className="flex cursor-pointer items-center gap-2"
                                                        >
                                                            <Eye className="h-4 w-4" />{' '}
                                                            Voir le profil
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <Link
                                                            href={`/etudiants/${e.ip}/edit`}
                                                            className="flex cursor-pointer items-center gap-2"
                                                        >
                                                            <Pencil className="h-4 w-4" />{' '}
                                                            Modifier
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="cursor-pointer gap-2 text-destructive focus:text-destructive">
                                                        <Trash2 className="h-4 w-4" />{' '}
                                                        Supprimer
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
    );
}
