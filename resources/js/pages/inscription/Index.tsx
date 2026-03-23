import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    ChevronDown,
    Eye,
    FileText,
    GraduationCap,
    PlusCircle,
    Search,
    SlidersHorizontal,
    Trash2,
    X,
} from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
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
import ProgressFinanciere from '@/components/inscription/ProgressFinancier';
import StatCardsInscription from '@/components/inscription/StatCardsInscription';
import { Annee, Auth, DataNiveau, Inscription, User } from '@/types';

interface InscriptionProps {
    annees: Annee[];
    niveaux: DataNiveau[];
    inscriptions: Inscription[];
    stats: {
        total_inscription: number;
        total_inscription_annee: number;
    };
    auth: Auth;
    [key: string]: unknown;
}

export default function Index() {
    const { annees, niveaux, inscriptions, stats, auth } =
        usePage<InscriptionProps>().props;

    const isAdmin = auth.user?.roles?.some((role) => role.name == 'Administrateur');

    const [search, setSearch] = useState('');
    const [filtreAnnee, setFiltreAnnee] = useState('all');
    const [filtreNiveau, setFiltreNiveau] = useState('all');
    const [filtreStatut, setFiltreStatut] = useState('all');

    const filtered = inscriptions.filter((inscription) => {
        const q = search.toLowerCase();
        const match =
            !q ||
            `${inscription.etudiant.prenom} ${inscription.etudiant.nom}`
                .toLowerCase()
                .includes(q) ||
            inscription.etudiant.ip.toLowerCase().includes(q);
        return (
            match &&
            (filtreAnnee === 'all' ||
                inscription.annee.libelle == filtreAnnee) &&
            (filtreNiveau === 'all' ||
                inscription.niveaux.some((n) =>
                    n.nom.includes(filtreNiveau),
                )) &&
            (filtreStatut === 'all' || inscription.status === filtreStatut)
        );
    });

    const hasFilters =
        search ||
        filtreAnnee !== 'all' ||
        filtreNiveau !== 'all' ||
        filtreStatut !== 'all';

    const reset = () => {
        setSearch('');
        setFiltreAnnee('all');
        setFiltreNiveau('all');
        setFiltreStatut('all');
    };

    return (
        <AppLayout>
            <Head title="Inscriptions" />

            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-xl font-bold tracking-tight">
                            Inscriptions
                        </h1>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                            Gérez les inscriptions des étudiants.
                        </p>
                    </div>
                    <Link href="/inscriptions/create">
                        <Button className="gap-2">
                            <PlusCircle className="h-4 w-4" />
                            Nouvelle inscription
                        </Button>
                    </Link>
                </div>

                <StatCardsInscription stats={stats} isAdmin={isAdmin} />

                {/* Filtres */}
                <Card className="shadow-sm">
                    <CardContent className="flex flex-wrap items-center gap-3 p-4">
                        <div className="relative min-w-[220px] flex-1">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Nom, prénom ou matricule…"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-9"
                            />
                        </div>

                        <Select
                            value={filtreAnnee}
                            onValueChange={setFiltreAnnee}
                        >
                            <SelectTrigger className="w-[160px]">
                                <SelectValue placeholder="Année" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    Toutes les années
                                </SelectItem>
                                {annees.map((a) => (
                                    <SelectItem key={a.id} value={a.libelle}>
                                        {a.libelle}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select
                            value={filtreNiveau}
                            onValueChange={setFiltreNiveau}
                        >
                            <SelectTrigger className="w-[130px]">
                                <SelectValue placeholder="Niveau" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    Tous niveaux
                                </SelectItem>
                                {niveaux.map((n) => (
                                    <SelectItem key={n.id} value={n.nom}>
                                        {n.nom}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select
                            value={filtreStatut}
                            onValueChange={setFiltreStatut}
                        >
                            <SelectTrigger className="w-[140px]">
                                <SelectValue placeholder="Statut" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    Tous statuts
                                </SelectItem>
                                {['Solde', 'Bon'].map((s) => (
                                    <SelectItem key={s} value={s}>
                                        {s}
                                    </SelectItem>
                                ))}
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
                                <TableHead>Année</TableHead>
                                <TableHead>Niveau</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Statut</TableHead>
                                {isAdmin && (
                                    <TableHead>Situation financière</TableHead>
                                )}
                                <TableHead className="w-[100px]" />
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
                                            <GraduationCap className="h-10 w-10 opacity-20" />
                                            <p className="text-sm">
                                                Aucune inscription trouvée.
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
                                filtered.map((ins) => (
                                    <TableRow key={ins.id} className="group">
                                        <TableCell>
                                            <div className="flex items-center gap-2.5">
                                                <Avatar
                                                    prenom={ins.etudiant.prenom}
                                                    nom={ins.etudiant.nom}
                                                    genre={ins.etudiant.genre}
                                                />
                                                <div>
                                                    <p className="text-sm leading-none font-medium">
                                                        {ins.etudiant.prenom}{' '}
                                                        {ins.etudiant.nom}
                                                    </p>
                                                    <p className="mt-0.5 text-xs text-muted-foreground">
                                                        {ins.etudiant.ip} ·{' '}
                                                        {
                                                            ins.niveaux[0]
                                                                .filiere.nom
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell className="text-sm font-medium tabular-nums">
                                            {ins.annee.libelle}
                                        </TableCell>

                                        <TableCell className="space-x-1">
                                            {ins.niveaux.map((niveau) => (
                                                <Badge
                                                    variant="secondary"
                                                    className="font-bold"
                                                >
                                                    {niveau.nom}
                                                </Badge>
                                            ))}
                                        </TableCell>

                                        <TableCell>
                                            <span className="text-xs text-muted-foreground">
                                                {ins.type_inscription}
                                            </span>
                                        </TableCell>

                                        <TableCell>
                                            <span
                                                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold`}
                                            >
                                                <span
                                                    className={`h-1.5 w-1.5 rounded-full`}
                                                />
                                                {ins.status ?? 'Aucun'}
                                            </span>
                                        </TableCell>

                                        {isAdmin && (
                                            <TableCell>
                                                <ProgressFinanciere
                                                    paye={Number(
                                                        ins.total_paiements,
                                                    )}
                                                    total={ins.montant_total}
                                                />
                                            </TableCell>
                                        )}

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
                                                    className="w-48"
                                                >
                                                    <DropdownMenuItem asChild>
                                                        <Link
                                                            href={`/inscriptions/${ins.id}`}
                                                            className="flex cursor-pointer items-center gap-2"
                                                        >
                                                            <Eye className="h-4 w-4" />{' '}
                                                            Voir les détails
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="cursor-pointer gap-2">
                                                        <FileText className="h-4 w-4" />{' '}
                                                        Générer le bulletin
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
