import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useHoraire from '@/hooks/useHoraire';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Horaire } from '@/types';
import { usePage } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Horaire',
        href: '/horaire',
    },
    {
        title: 'Modification',
        href: '/edit',
    },
];

interface HoraireProps {
    horaire: Horaire;
    [key: string]: unknown;
}

const Edit = () => {
    const { horaire } = usePage<HoraireProps>().props;

    const [heure_debut, setHeureDebut] = useState(horaire.heure_debut);
    const [heure_fin, setHeureFin] = useState(horaire.heure_fin);
    const [index_order, setOrderIndex] = useState(String(horaire.index_order));

    const { updateHoraire } = useHoraire();

    // Mise à jour d'un horaire
    const handleUpdate = (e: FormEvent) => {
        e.preventDefault();
        // Verification des données
        if (heure_debut == '' || heure_fin == '' || index_order == '') {
            toast.error('Veuillez remplir tous les champs svp');
            return;
        }

        // modification d'une salle
        updateHoraire(horaire.id, {
            heure_debut,
            heure_fin,
            index_order: Number(index_order),
        });

        // Nettoye de l'etat du composant
        setHeureDebut('');
        setHeureFin('');
        setOrderIndex('');
    };

    return (
        <div>
            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="p-4">
                    <Card className="p-4">
                        <h1 className="mb-6 text-xl font-semibold">
                            Modification d'un horaire
                        </h1>

                        <form action="" className="space-y-6">
                            <div className="flex flex-col gap-4">
                                <Label htmlFor="sheet-demo-name">
                                    Heure debut
                                </Label>
                                <Input
                                    value={heure_debut}
                                    type="time"
                                    onChange={(e) =>
                                        setHeureDebut(e.target.value)
                                    }
                                />
                            </div>

                            <div className="flex flex-col gap-4">
                                <Label htmlFor="sheet-demo-name">
                                    Heure Fin
                                </Label>
                                <Input
                                    value={heure_fin}
                                    type="time"
                                    onChange={(e) =>
                                        setHeureFin(e.target.value)
                                    }
                                />
                            </div>

                            <div className="flex flex-col gap-4">
                                <Label htmlFor="sheet-demo-name">
                                    Ordre d'affichage
                                </Label>
                                <Input
                                    type="number"
                                    value={index_order}
                                    onChange={(e) =>
                                        setOrderIndex(e.target.value)
                                    }
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
