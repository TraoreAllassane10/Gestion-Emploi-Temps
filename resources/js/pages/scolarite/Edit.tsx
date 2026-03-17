import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    NativeSelect,
    NativeSelectOption,
} from '@/components/ui/native-select';
import useScolarite from '@/hooks/useScolarite';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, DataNiveau, Scolarite } from '@/types';
import { usePage } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'scolarite',
        href: '/scolarite',
    },
    {
        title: 'Modification',
        href: '/edit',
    },
];

interface ScolariteProps {
    scolarite: Scolarite;
    types: string[];
    niveaux: DataNiveau[];
    [key: string]: unknown;
}

const Edit = () => {
    const { scolarite, types, niveaux } = usePage<ScolariteProps>().props;

    const [niveau_id, SetNiveauId] = useState(String(scolarite.niveau_id));
    const [type, setType] = useState(String(scolarite.type));
    const [montant, setMontant] = useState(String(scolarite.montant));

    const { updateScolarite } = useScolarite();

    // Mise à jour d'une scolarite
    const handleUpdate = (e: FormEvent) => {
        e.preventDefault();

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

        // modification d'une nouvelle année
        updateScolarite(scolarite.id, {
            annee_id: scolarite.annee_universitaire_id,
            montant: Number(montant),
            type,
            niveau_id: Number(niveau_id),
        });

        // Nettoye de l'etat du composant

        setMontant('');
        setType('');
        SetNiveauId('');
    };

    return (
        <div>
            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="p-4">
                    <Card className="p-4">
                        <h1 className="mb-6 text-xl font-semibold">
                            Modification d'une année
                        </h1>

                        <form action="" className="space-y-6">
                            <div className="flex flex-col gap-4">
                                <Label htmlFor="sheet-demo-name">
                                    Annee Academique
                                </Label>
                                <Input
                                    value={scolarite.annee.libelle}
                                    disabled
                                />
                            </div>

                            <div className="flex flex-col gap-4">
                                <Label htmlFor="sheet-demo-username">
                                    Type de scolarite
                                </Label>
                                <NativeSelect
                                    className="w-full"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    disabled
                                >
                                    <NativeSelectOption value="" disabled>
                                        Selectionner le type de scolarite
                                    </NativeSelectOption>

                                    {types.map((type, index) => (
                                        <NativeSelectOption
                                            key={index}
                                            value={type}
                                            selected={type === scolarite.type}
                                        
                                        >
                                            {type}
                                        </NativeSelectOption>
                                    ))}
                                </NativeSelect>
                            </div>

                            <div className="flex flex-col gap-4">
                                <Label htmlFor="sheet-demo-username">
                                    Niveau
                                </Label>
                                <NativeSelect
                                    className="w-full"
                                    value={niveau_id}
                                    onChange={(e) =>
                                        SetNiveauId(e.target.value)
                                    }
                                    disabled
                                >
                                    <NativeSelectOption value="" disabled>
                                        Selectionner un niveau
                                    </NativeSelectOption>

                                    {niveaux.map((niveau) => (
                                        <NativeSelectOption value={niveau.id} selected={parseInt(niveau_id) == niveau.id}>
                                            {niveau.nom}
                                        </NativeSelectOption>
                                    ))}
                                </NativeSelect>
                            </div>

                            <div className="flex flex-col gap-4">
                                <Label htmlFor="sheet-demo-username">
                                    Montant
                                </Label>
                                <Input
                                    type="number"
                                    value={montant}
                                    onChange={(e) => setMontant(e.target.value)}
                                />
                            </div>

                            <Button
                                onClick={handleUpdate}
                                className="float-right cursor-pointer hover:bg-primary/80"
                            >
                                Mettre à jour
                            </Button>
                        </form>
                    </Card>
                </div>
            </AppLayout>
        </div>
    );
};

export default Edit;
