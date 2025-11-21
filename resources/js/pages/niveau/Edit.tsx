import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import useNiveau from '@/hooks/useNiveau';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Niveau',
        href: '/niveau',
    },
    {
        title: 'Modification',
        href: '/edit',
    },
];

interface Niveau {
    id: string;
    nom: string;
    filiere_id: string;
}

// Type des données de la filiere
interface FiliereData {
    id: number;
    nom: string;
}

interface NiveauProps {
    niveau: Niveau;
    filieres: {
        data:  FiliereData[];
    };
    [key: string]: unknown;
}

const Edit = () => {
    const { niveau, filieres } = usePage<NiveauProps>().props;

    const [nom, setNom] = useState(niveau.nom);
    const [filiere_id, setFiliereId] = useState(niveau.filiere_id);

    const { updateNiveau } = useNiveau();

    // Mise à jour d'une annné
    const handleUpdate = (e: FormEvent) => {
        e.preventDefault();

        // Verification des données
        if (nom == '') {
            toast.error('Veuillez entrer le nom du niveau');
            return;
        }

        // modification d'un niveau
        updateNiveau(niveau.id, {
            nom,
            filiere_id,
        });

        // Nettoye de l'etat du composant
        setNom('');
        setFiliereId('');
    };


    return (
        <div>
            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="p-4">
                    <Card className='p-4'>
                        <h1 className="mb-6 text-xl font-semibold">
                        Modification d'une filière
                    </h1>

                    <form action="" className="space-y-6">
                        <div className="flex flex-col gap-4">
                            <Label className="text-md font-semibold">
                                Nom de la filière
                            </Label>
                            <Input
                                value={nom}
                                onChange={(e) => setNom(e.target.value)}
                            />
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="sheet-demo-name">Filière</Label>
                            <NativeSelect
                                className="w-full"
                                value={filiere_id}
                                onChange={(e) => setFiliereId(e.target.value)}
                            >
                                <NativeSelectOption value="">
                                    {' '}
                                </NativeSelectOption>

                                {filieres?.data.map((filiere) => (
                                    <NativeSelectOption selected={parseInt(filiere_id) == filiere.id} value={filiere.id}>
                                        {filiere.nom}
                                    </NativeSelectOption>
                                ))}
                            </NativeSelect>
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
