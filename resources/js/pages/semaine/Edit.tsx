import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useSemaine from '@/hooks/useSemaine';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Semaine } from '@/types';
import { usePage } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Semaine',
        href: '/semaine',
    },
    {
        title: 'Modification',
        href: '/edit',
    },
];

interface SemaineProps {
    semaine: Semaine;
    [key: string]: unknown;
}

const Edit = () => {
    const { semaine } = usePage<SemaineProps>().props;

    const [libelle, setLibelle] = useState(semaine.libelle);
    const [date_debut, setDateDebut] = useState(semaine.date_debut);
    const [date_fin, setDateFin] = useState(semaine.date_fin);

    const { updateSemaine } = useSemaine();

    // Mise à jour d'une semaine
    const handleUpdate = (e: FormEvent) => {
        e.preventDefault();
        // Verification des données
        if (libelle == '' || date_debut == '' || date_fin == '') {
            toast.error('Veuillez remplir tous les champs svp');
            return;
        }

        // modification d'une salle
        updateSemaine(semaine.id, {
            libelle,
            date_debut,
            date_fin,
        });

        // Nettoye de l'etat du composant
        setLibelle('');
        setDateDebut('');
        setDateFin('');
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
                                <Label htmlFor="sheet-demo-name">Libelle</Label>
                                <Input
                                    value={libelle}
                                    onChange={(e) => setLibelle(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col gap-4">
                                <Label htmlFor="sheet-demo-name">
                                    Date debut
                                </Label>
                                <Input
                                    value={date_debut}
                                    type="date"
                                    onChange={(e) =>
                                        setDateDebut(e.target.value)
                                    }
                                />
                            </div>

                          <div className="flex flex-col gap-4">
                                <Label htmlFor="sheet-demo-name">
                                    Date fin
                                </Label>
                                <Input
                                    value={date_fin}
                                    type="date"
                                    onChange={(e) =>
                                        setDateFin(e.target.value)
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
