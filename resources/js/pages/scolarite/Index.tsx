import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    NativeSelect,
    NativeSelectOption,
} from '@/components/ui/native-select';
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
import useScolarite from '@/hooks/useScolarite';
import AppLayout from '@/layouts/app-layout';
import ConfigurationLayout from '@/layouts/configurations/ConfigurationLayout';
import {
    Annee,
    BreadcrumbItem,
    DataNiveau,
    Scolarite,
    TypeScolarite,
} from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { Edit, Trash } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Scolarite',
        href: '/scolarite',
    },
];

interface ScolariteProps {
    scolarites: Scolarite[];
    niveaux: DataNiveau[];
    annee: Annee;
    types: string[];
    [key: string]: unknown;
}

const typeConfig: Record<TypeScolarite, string> = {
    Affecté: 'bg-blue-50 text-blue-700 border border-blue-200',
    Naff: 'bg-rose-50 text-rose-700 border border-rose-200',
    Licence: 'bg-green-50 text-green-700 border border-green-200',
};

function typeBadge( type: TypeScolarite) {
    const className = typeConfig[type];
    console.log(className);
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${className}`}
        >
            {type}
        </span>
    );
}

const Index = () => {
    const { scolarites, niveaux, annee, types } =
        usePage<ScolariteProps>().props;

    const [niveau_id, SetNiveauId] = useState('');
    const [type, setType] = useState('');
    const [montant, setMontant] = useState('');

    const { createScolarite, deleteScolarite } = useScolarite();

    // Enregistrement d'une scolarite
    const handleSubmit = () => {
        // Verification des données
        if (
            type == '' ||
            montant == '' ||
            Number(montant) <= 0 ||
            niveau_id == ''
        ) {
            toast.error('Veuillez remplir tous les champs svp !');
            return;
        }

        // Creation d'une nouvelle scolarite
        createScolarite({
            annee_id: annee.id,
            montant: Number(montant),
            type,
            niveau_id: Number(niveau_id),
        });

        // Nettoye de l'etat du composant
        setMontant('');
        setType('');
        SetNiveauId('');

        //Redirection sur la page d'affiche
        router.visit('/scolarite');
    };

    // Suppression d'une scolarite
    const handleDelete = (id: number) => {
        if (id) deleteScolarite(id);
    };

    return (
        <div>
            <AppLayout breadcrumbs={breadcrumbs}>
                <ConfigurationLayout>
                    <div>
                        {/* Entete et le bouton d'ajout */}
                        <div className="my-2 flex place-items-center justify-between">
                            <h1 className="text-2xl font-bold">
                                Gestion des scolarites
                            </h1>

                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground"
                                    >
                                        Nouvelle scolarite
                                    </Button>
                                </SheetTrigger>
                                <SheetContent>
                                    <SheetHeader>
                                        <SheetTitle>
                                            Nouvelle Scolarite
                                        </SheetTitle>
                                        <SheetDescription>
                                            Ajouter une scolarite
                                        </SheetDescription>
                                    </SheetHeader>
                                    <div className="grid flex-1 auto-rows-min gap-6 px-4">
                                        <div className="grid gap-3">
                                            <Label htmlFor="sheet-demo-name">
                                                Annee Academique
                                            </Label>
                                            <Input
                                                value={annee.libelle}
                                                disabled
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="sheet-demo-username">
                                                Type de scolarite
                                            </Label>
                                            <NativeSelect
                                                className="w-full"
                                                value={type}
                                                onChange={(e) =>
                                                    setType(e.target.value)
                                                }
                                            >
                                                <NativeSelectOption
                                                    value=""
                                                    disabled
                                                >
                                                    Selectionner le type de
                                                    scolarite
                                                </NativeSelectOption>

                                                {types.map((type, index) => (
                                                    <NativeSelectOption
                                                        key={index}
                                                        value={type}
                                                    >
                                                        {type}
                                                    </NativeSelectOption>
                                                ))}
                                            </NativeSelect>
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="sheet-demo-username">
                                                Niveau
                                            </Label>
                                            <NativeSelect
                                                className="w-full"
                                                value={niveau_id}
                                                onChange={(e) =>
                                                    SetNiveauId(e.target.value)
                                                }
                                            >
                                                <NativeSelectOption
                                                    value=""
                                                    disabled
                                                >
                                                    Selectionner un niveau
                                                </NativeSelectOption>

                                                {niveaux.map((niveau) => (
                                                    <NativeSelectOption
                                                        value={niveau.id}
                                                    >
                                                        {niveau.nom}
                                                    </NativeSelectOption>
                                                ))}
                                            </NativeSelect>
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="sheet-demo-username">
                                                Montant
                                            </Label>
                                            <Input
                                                type="number"
                                                value={montant}
                                                onChange={(e) =>
                                                    setMontant(e.target.value)
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
                                            <TableHead>Annee</TableHead>
                                            <TableHead>classe</TableHead>
                                            <TableHead>Montant</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {
                                            scolarites.length == 0 ? (<span>Aucune scolarité enregistrée</span>) : (scolarites.map((scolarite) => (
                                            <TableRow key={scolarite.id}>
                                                <TableCell>
                                                    {scolarite.annee.libelle}
                                                </TableCell>
                                                <TableCell>
                                                    {scolarite.niveau.nom}
                                                </TableCell>
                                                <TableCell>
                                                    {scolarite.montant}
                                                </TableCell>
                                                <TableCell>
                                                    {typeBadge(scolarite.type)}
                                                </TableCell>
                                                <TableCell className="flex gap-2">
                                                    <Link
                                                        href={`scolarite/${scolarite.id}/edit`}
                                                    >
                                                        <Edit
                                                            size={20}
                                                            className="cursor-pointer text-blue-600 hover:text-blue-800"
                                                        />
                                                    </Link>

                                                    <Link
                                                        onClick={() =>
                                                            handleDelete(
                                                                scolarite.id,
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
                                        )))
                                        }
                                        {}
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
