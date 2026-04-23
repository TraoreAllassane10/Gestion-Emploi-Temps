import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import {
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Edit,
    Mail,
    Phone,
    PlusCircle,
    Trash2,
    UserRound,
} from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Professeurs', href: '/professeur' },
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
    links: { active: boolean; label: string; page: number; url: string }[];
}

interface Professeur {
    data: Data[];
    meta: Meta;
}

interface ProfesseurProps {
    professeurs: Professeur;
    [key: string]: unknown;
}

// ── Avatar initiales ──────────────────────────────────────────────────────────

function Avatar({ nom, prenom }: { nom: string; prenom: string }) {
    return (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
            {prenom[0]?.toUpperCase()}
            {nom[0]?.toUpperCase()}
        </div>
    );
}

// ── Page ──────────────────────────────────────────────────────────────────────

const Index = () => {
    const { professeurs } = usePage<ProfesseurProps>().props;

    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const { createProfesseur, deleteProfesseur } = useProfesseur();

    const handleSubmit = () => {
        if (!nom || !prenom || !email || !telephone) {
            toast.error('Veuillez remplir tous les champs !');
            return;
        }
        createProfesseur({ nom, prenom, email, telephone });
        setNom('');
        setPrenom('');
        setEmail('');
        setTelephone('');
    };

    const handleDelete = () => {
        if (selectedId) {
            deleteProfesseur(selectedId);
            setSelectedId(null);
        }
    };

    const { meta } = professeurs;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="space-y-5 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Professeurs
                        </h1>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                            {professeurs.data.length} professeur
                            {professeurs.data.length !== 1 ? 's' : ''}{' '}
                            enregistré
                            {professeurs.data.length !== 1 ? 's' : ''}
                        </p>
                    </div>

                    <div>
                        <Link href="professeur/create">
                            <Button className="gap-2 transition duration-300 hover:bg-red-700">
                                <PlusCircle className="h-4 w-4" />
                                Ajouter un enseignant
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Tableau */}
                <Card className="overflow-hidden shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/40 hover:bg-muted/40">
                                <TableHead>Professeur</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Téléphone</TableHead>
                                <TableHead className="w-[80px]" />
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {professeurs.data.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="h-48 text-center"
                                    >
                                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                            <UserRound className="h-10 w-10 opacity-20" />
                                            <p className="text-sm">
                                                Aucun professeur enregistré.
                                            </p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                professeurs.data.map((prof) => (
                                    <TableRow key={prof.id} className="group">
                                        {/* Professeur */}
                                        <TableCell>
                                            <div className="flex items-center gap-2.5">
                                                <Avatar
                                                    nom={prof.nom}
                                                    prenom={prof.prenom}
                                                />
                                                <div>
                                                    <p className="text-sm leading-none font-medium">
                                                        {prof.prenom} {prof.nom}
                                                    </p>
                                                </div>
                                            </div>
                                        </TableCell>

                                        {/* Email */}
                                        <TableCell>
                                            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                                <Mail className="h-3.5 w-3.5 shrink-0" />
                                                {prof.email}
                                            </div>
                                        </TableCell>

                                        {/* Téléphone */}
                                        <TableCell>
                                            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                                <Phone className="h-3.5 w-3.5 shrink-0" />
                                                {prof.telephone}
                                            </div>
                                        </TableCell>

                                        {/* Actions */}
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
                                                            href={`/professeur/${prof.id}/edit`}
                                                            className="flex cursor-pointer items-center gap-2"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                            Modifier
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            setSelectedId(
                                                                prof.id,
                                                            )
                                                        }
                                                        className="cursor-pointer gap-2 text-destructive focus:text-destructive"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
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

                {/* Pagination */}
                {meta && meta.last_page > 1 && (
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>
                            Page {meta.current_page} sur {meta.last_page}
                        </span>
                        <div className="flex items-center gap-1">
                            {meta.links.map((link, i) => {
                                const isFirst = i === 0;
                                const isLast = i === meta.links.length - 1;

                                if (isFirst || isLast) {
                                    return (
                                        <Button
                                            key={i}
                                            variant="outline"
                                            size="sm"
                                            disabled={!link.url}
                                            asChild={!!link.url}
                                            className="h-8 w-8 p-0"
                                        >
                                            {link.url ? (
                                                <Link href={link.url}>
                                                    {isFirst ? (
                                                        <ChevronLeft className="h-4 w-4" />
                                                    ) : (
                                                        <ChevronRight className="h-4 w-4" />
                                                    )}
                                                </Link>
                                            ) : (
                                                <span>
                                                    {isFirst ? (
                                                        <ChevronLeft className="h-4 w-4" />
                                                    ) : (
                                                        <ChevronRight className="h-4 w-4" />
                                                    )}
                                                </span>
                                            )}
                                        </Button>
                                    );
                                }

                                return (
                                    <Button
                                        key={i}
                                        variant={
                                            link.active ? 'default' : 'outline'
                                        }
                                        size="sm"
                                        disabled={!link.url || link.active}
                                        asChild={!!link.url && !link.active}
                                        className="h-8 w-8 p-0"
                                    >
                                        {link.url && !link.active ? (
                                            <Link href={link.url}>
                                                {link.label}
                                            </Link>
                                        ) : (
                                            <span>{link.label}</span>
                                        )}
                                    </Button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* Dialog confirmation suppression */}
            <AlertDialog
                open={!!selectedId}
                onOpenChange={(open) => {
                    if (!open) setSelectedId(null);
                }}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Supprimer ce professeur ?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Cette action est irréversible. Les données liées à
                            ce professeur (séances, cours, etc.) pourraient
                            également être affectées.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Supprimer
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
};

export default Index;
