import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowLeft,
    BarChart2,
    Calendar,
    CheckCircle2,
    Clock,
    Download,
    Hash,
    Mail,
    Phone,
    PlusCircle,
    User,
    Wallet,
} from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import Avatar from '@/components/etudiant/Avatar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Inscription } from '@/types';
import { fmt } from '@/utils/util';

// ── Helpers ───────────────────────────────────────────────────────────────────

// En vrai, l'id viendrait des props Inertia : usePage().props
const MOCK_ID = 1;

function StatutBadge({ statut }: { statut: string }) {
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold`}
        >
            <span className={`h-1.5 w-1.5 rounded-full`} />
            {statut}
        </span>
    );
}

function InfoField({
    icon: Icon,
    label,
    value,
}: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-start gap-3 rounded-lg bg-muted/40 p-3">
            <div className="rounded-md border bg-background p-1.5">
                <Icon className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <div>
                <p className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                    {label}
                </p>
                <p className="mt-0.5 text-sm font-medium">{value}</p>
            </div>
        </div>
    );
}

// ── Modal Ajout Paiement ──────────────────────────────────────────────────────

function ModalPaiement({
    open,
    onClose,
    resteAPayer,
}: {
    open: boolean;
    onClose: () => void;
    resteAPayer: number;
}) {
    const [montant, setMontant] = useState('');
    const [type, setType] = useState('Mensualité');

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Enregistrer un paiement</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-2">
                    <div className="flex justify-between rounded-lg bg-muted/50 p-3 text-sm">
                        <span className="text-muted-foreground">
                            Reste à payer
                        </span>
                        <span className="font-bold text-rose-600">
                            {fmt(resteAPayer)}
                        </span>
                    </div>

                    <div className="space-y-2">
                        <Label>Type de paiement</Label>
                        <Select value={type} onValueChange={setType}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {[
                                    "Frais d'inscription",
                                    'Mensualité',
                                    'Paiement partiel',
                                    'Solde total',
                                ].map((t) => (
                                    <SelectItem key={t} value={t}>
                                        {t}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Montant (FCFA)</Label>
                        <Input
                            type="number"
                            placeholder="Ex : 50 000"
                            value={montant}
                            onChange={(e) => setMontant(e.target.value)}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Annuler
                    </Button>
                    <Button
                        onClick={onClose}
                        disabled={!montant || Number(montant) <= 0}
                        className="gap-2"
                    >
                        <CheckCircle2 className="h-4 w-4" /> Confirmer
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

// ── Onglets ───────────────────────────────────────────────────────────────────

type Tab = 'general' | 'financier' | 'resultats';

const TABS: {
    id: Tab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
}[] = [
    { id: 'general', label: 'Informations générales', icon: User },
    { id: 'financier', label: 'Situation financière', icon: Wallet },
    { id: 'resultats', label: 'Résultats académiques', icon: BarChart2 },
];

// ── Onglet 1 ──────────────────────────────────────────────────────────────────

function TabGeneral({ ins }: { ins: Inscription }) {
    return (
        <div className="space-y-6">
            <div>
                <p className="mb-3 text-xs font-bold tracking-wider text-muted-foreground uppercase">
                    Informations personnelles
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <InfoField
                        icon={User}
                        label="Nom complet"
                        value={`${ins.etudiant?.prenom} ${ins.etudiant?.nom}`}
                    />
                    <InfoField
                        icon={Hash}
                        label="Matricule"
                        value={ins.etudiant?.ip}
                    />
                    <InfoField
                        icon={Mail}
                        label="Email"
                        value={ins.etudiant?.email ?? 'aucun'}
                    />
                    <InfoField
                        icon={Phone}
                        label="Téléphone"
                        value={ins.etudiant?.contacts ?? ''}
                    />
                    <InfoField
                        icon={Calendar}
                        label="Date naissance"
                        value={ins.etudiant?.date_naissance}
                    />
                    <InfoField
                        icon={User}
                        label="Filière"
                        value={ins.niveaux && ins.niveaux[0].filiere.nom}
                    />
                </div>
            </div>

            <Separator />

            <div>
                <p className="mb-3 text-xs font-bold tracking-wider text-muted-foreground uppercase">
                    Informations académiques
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <InfoField
                        icon={Calendar}
                        label="Année universitaire"
                        value={ins.annee.libelle}
                    />
                    {ins.niveaux.map((niveau) => (
                        <InfoField
                            icon={Hash}
                            label="Niveau"
                            value={niveau.nom}
                        />
                    ))}
                    <InfoField
                        icon={User}
                        label="Type d'inscription"
                        value={ins.type_inscription}
                    />
                    <InfoField
                        icon={Calendar}
                        label="Date d'inscription"
                        value={ins.date}
                    />
                    <div className="flex items-start gap-3 rounded-lg bg-muted/40 p-3">
                        <div className="rounded-md border bg-background p-1.5">
                            <CheckCircle2 className="h-3.5 w-3.5 text-muted-foreground" />
                        </div>
                        <div>
                            <p className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                                Statut
                            </p>
                            <div className="mt-1">
                                <StatutBadge statut={ins.status ?? 'Aucun'} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ── Onglet 2 ──────────────────────────────────────────────────────────────────

function TabFinancier({ ins }: { ins: Inscription }) {
    const [modalOpen, setModalOpen] = useState(false);

    const progression =
        ins.montant_total > 0
            ? Math.round(
                  (Number(ins.total_paiements) / ins.montant_total) * 100,
              )
            : 0;
    const reste = ins.montant_scolarite - Number(ins.total_paiements);

    return (
        <div className="space-y-6">
            {/* KPI cards */}
            <div className="grid grid-cols-3 gap-3">
                {[
                    {
                        label: 'Total à payer',
                        value: fmt(ins.montant_total),
                        color: 'text-blue-600',
                        bg: 'bg-blue-50',
                    },
                    {
                        label: 'Montant payé',
                        value: fmt(Number(ins.total_paiements)),
                        color: 'text-emerald-600',
                        bg: 'bg-emerald-50',
                    },
                    {
                        label: 'Reste à payer',
                        value: fmt(reste),
                        color: reste > 0 ? 'text-rose-600' : 'text-emerald-600',
                        bg: reste > 0 ? 'bg-rose-50' : 'bg-emerald-50',
                    },
                ].map((item) => (
                    <div
                        key={item.label}
                        className={`rounded-xl p-4 ${item.bg} text-center`}
                    >
                        <p className="mb-1 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                            {item.label}
                        </p>
                        <p className={`text-lg font-bold ${item.color}`}>
                            {item.value}
                        </p>
                    </div>
                ))}
            </div>

            {/* Barre de progression */}
            <Card>
                <CardContent className="space-y-2 p-4">
                    <div className="flex justify-between text-sm">
                        <span className="font-medium">
                            Progression des paiements
                        </span>
                        <span
                            className={`font-bold tabular-nums ${progression >= 100 ? 'text-emerald-600' : 'text-primary'}`}
                        >
                            {progression}%
                        </span>
                    </div>
                    <Progress value={progression} className="h-2.5" />
                </CardContent>
            </Card>

            {/* Historique */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                    <CardTitle className="text-sm font-semibold">
                        Historique des paiements
                    </CardTitle>
                    <Button
                        size="sm"
                        className="h-8 gap-1.5"
                        onClick={() => setModalOpen(true)}
                    >
                        <PlusCircle className="h-3.5 w-3.5" /> Ajouter
                    </Button>
                </CardHeader>
                <Separator />
                {ins.paiements.length === 0 ? (
                    <CardContent className="py-8 text-center text-sm text-muted-foreground">
                        Aucun paiement enregistré.
                    </CardContent>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/30 hover:bg-muted/30">
                                <TableHead>Référence</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Mode de paiement</TableHead>
                                <TableHead className="text-right">
                                    Montant
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {ins.paiements.map((p) => (
                                <TableRow key={p.id}>
                                    <TableCell className="font-mono text-xs text-muted-foreground">
                                        {p.reference}
                                    </TableCell>
                                    <TableCell className="text-sm tabular-nums">
                                        {p.date_paiement}
                                    </TableCell>
                                    <TableCell className="text-sm">
                                        {p.methode_paiement}
                                    </TableCell>
                                    <TableCell className="text-right text-sm font-semibold text-emerald-600 tabular-nums">
                                        +{fmt(p.montant)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </Card>

            <ModalPaiement
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                resteAPayer={reste}
            />
        </div>
    );
}

// ── Onglet 3 ──────────────────────────────────────────────────────────────────

function TabResultats({ ins }: { ins: Inscription }) {
    // const { moyenneS1, moyenneS2, decision, ues } = ins.resultats;

    // const moyenneColor = (m: number | null) => {
    //     if (m === null) return 'text-muted-foreground';
    //     return m >= 10 ? 'text-emerald-600' : 'text-rose-600';
    // };

    return (
        <div className="space-y-6">
            <Alert>
                <Clock className="h-4 w-4" />
                <AlertDescription className="text-md">
                    Fonctionnalités à venir.
                </AlertDescription>
            </Alert>
            {/* KPI moyennes */}
            {/* <div className="grid grid-cols-3 gap-3">
                {[
                    {
                        label: 'Moyenne S1',
                        value: moyenneS1 !== null ? `${moyenneS1}/20` : '—',
                        color: moyenneColor(moyenneS1),
                    },
                    {
                        label: 'Moyenne S2',
                        value: moyenneS2 !== null ? `${moyenneS2}/20` : '—',
                        color: moyenneColor(moyenneS2),
                    },
                    {
                        label: 'Décision',
                        value: decision ?? '—',
                        color:
                            decision === 'Admis(e)'
                                ? 'text-emerald-600'
                                : decision
                                  ? 'text-rose-600'
                                  : 'text-muted-foreground',
                    },
                ].map((item) => (
                    <Card key={item.label}>
                        <CardContent className="p-4 text-center">
                            <p className="mb-1 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                                {item.label}
                            </p>
                            <p className={`text-xl font-bold ${item.color}`}>
                                {item.value}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div> */}

            {/* Détail UEs */}
            {/* {ues.length > 0 ? (
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-semibold">
                            Détail par UE — Semestre 1
                        </CardTitle>
                    </CardHeader>
                    <Separator />
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/30 hover:bg-muted/30">
                                <TableHead>Code</TableHead>
                                <TableHead>Intitulé</TableHead>
                                <TableHead className="text-center">
                                    Crédits
                                </TableHead>
                                <TableHead className="text-right">
                                    Note
                                </TableHead>
                                <TableHead className="text-center">
                                    Statut
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {ues.map((ue) => (
                                <TableRow key={ue.code}>
                                    <TableCell className="font-mono text-xs text-muted-foreground">
                                        {ue.code}
                                    </TableCell>
                                    <TableCell className="text-sm">
                                        {ue.intitule}
                                    </TableCell>
                                    <TableCell className="text-center text-sm">
                                        {ue.credit}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <span
                                            className={`text-sm font-bold tabular-nums ${ue.note >= 10 ? 'text-emerald-600' : 'text-rose-600'}`}
                                        >
                                            {ue.note}/20
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Badge
                                            variant={
                                                ue.statut === 'Validé'
                                                    ? 'default'
                                                    : 'destructive'
                                            }
                                            className="text-xs"
                                        >
                                            {ue.statut}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            ) : (
                <Alert>
                    <Clock className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                        Les résultats académiques ne sont pas encore disponibles
                        pour cette inscription.
                    </AlertDescription>
                </Alert>
            )} */}
        </div>
    );
}

// ── Page principale ───────────────────────────────────────────────────────────

export default function Show() {
    const { inscription } = usePage<{ inscription: Inscription }>().props;

    const [activeTab, setActiveTab] = useState<Tab>('general');

    const pct =
        inscription.montant_total > 0
            ? Math.round(
                  (Number(inscription.total_paiements) /
                      inscription.montant_total) *
                      100,
              )
            : 0;

    return (
        <AppLayout>
            <Head
                title={`Inscription — ${inscription.etudiant?.prenom} ${inscription.etudiant?.nom}`}
            />

            <div className="space-y-6 p-6">
                {/* Breadcrumb */}
                <Link
                    href="/inscriptions"
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                    <ArrowLeft className="h-3.5 w-3.5" /> Retour aux
                    inscriptions
                </Link>

                {/* Header carte étudiant */}
                <Card className="overflow-hidden shadow-sm">
                    <div className="h-1.5 bg-gradient-to-r from-primary to-primary/40" />
                    <CardContent className="p-5">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                            <Avatar
                                nom={inscription.etudiant?.nom}
                                prenom={inscription.etudiant?.prenom}
                                genre="ee"
                            />

                            {/* Infos */}
                            <div className="min-w-0 flex-1">
                                <div className="mb-0.5 flex flex-wrap items-center gap-2">
                                    <h1 className="text-xl font-bold tracking-tight">
                                        {inscription.etudiant?.prenom}{' '}
                                        {inscription.etudiant?.nom}
                                    </h1>
                                    <StatutBadge statut="Actif" />
                                    {inscription.niveaux?.map((niveau) => (
                                        <Badge
                                            variant="secondary"
                                            className="font-bold"
                                        >
                                            {niveau.nom}
                                        </Badge>
                                    ))}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    {inscription.etudiant?.ip} ·{' '}
                                    {inscription.niveaux &&
                                        inscription.niveaux[0].filiere.nom}{' '}
                                    · {inscription.annee?.libelle}
                                </p>
                            </div>

                            {/* Mini progression */}
                            <div className="shrink-0 sm:text-right">
                                <p className="mb-1 text-xs text-muted-foreground">
                                    Recouvrement
                                </p>
                                <p
                                    className={`text-lg font-bold tabular-nums ${pct >= 100 ? 'text-emerald-600' : 'text-primary'}`}
                                >
                                    {pct}%
                                </p>
                                <Progress
                                    value={pct}
                                    className="mt-1 h-1.5 w-24"
                                />
                            </div>

                            {/* Actions */}
                            <div className="flex shrink-0 gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="gap-1.5"
                                >
                                    <Download className="h-3.5 w-3.5" />{' '}
                                    Bulletin
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Onglets */}
                <div className="flex gap-0 border-b">
                    {TABS.map(({ id, label, icon: Icon }) => (
                        <button
                            key={id}
                            onClick={() => setActiveTab(id)}
                            className={`-mb-px inline-flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
                                activeTab === id
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-muted-foreground hover:border-border hover:text-foreground'
                            } `}
                        >
                            <Icon className="h-4 w-4" />
                            {label}
                        </button>
                    ))}
                </div>

                {/* Contenu onglet */}
                <div>
                    {activeTab === 'general' && (
                        <TabGeneral ins={inscription} />
                    )}
                    {activeTab === 'financier' && (
                        <TabFinancier ins={inscription} />
                    )}
                    {activeTab === 'resultats' && (
                        <TabResultats ins={inscription} />
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
