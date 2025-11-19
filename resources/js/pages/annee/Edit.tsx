import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useAnnee from '@/hooks/useAnnee';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'annee',
        href: '/annee',
    },
    {
        title: 'Modification',
        href: '/edit',
    },
];

interface Annee {
    id: number;
    libelle: string;
    date_debut: string;
    date_fin: string;
}

interface AnneeProps {
    annee: Annee;
    [key: string] : unknown;
}

const Edit = () => {
    const { annee } = usePage<AnneeProps>().props;

    const [libelle, setLibelle] = useState(annee.libelle);
    const [date_debut, setDateDebut] = useState(annee.date_debut);
    const [date_fin, setDateFin] = useState(annee.date_fin);

    const {updateAnnee} = useAnnee();

    // Mise à jour d'une annné
    const handleUpdate = (e: FormEvent) => {

        e.preventDefault();

         // Verification des données
        if (libelle == '' || date_debut == undefined || date_fin == undefined) {
            toast.error('Veuillez remplir tous les champs svp !');
            return;
        }

        // modification d'une nouvelle année
        updateAnnee(annee.id, {
            libelle,
            date_debut: new Date(date_debut),
            date_fin: new Date(date_fin),
        });

        // Nettoye de l'etat du composant
        setLibelle('');
        setDateDebut('');
        setDateFin('');
    }

    return (
        <div>
            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="p-4">

                    <h1 className='text-xl font-semibold mb-6'>Modification d'une année</h1>

                    <form action="" className="space-y-6">
                        <div className="flex flex-col gap-4">
                            <Label className="text-md font-semibold">
                                Libelle
                            </Label>
                            <Input
                                value={libelle}
                                onChange={(e) => setLibelle(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-4">
                            <Label className="text-md font-semibold">
                                Date de Debut
                            </Label>
                            <Input
                                type="date"
                                value={date_debut}
                                onChange={(e) =>
                                    setDateDebut(e.currentTarget.value)
                                }
                            />
                        </div>

                        <div className="flex flex-col gap-4">
                            <Label className="text-md font-semibold">
                                Date de Fin
                            </Label>
                            <Input
                                type="date"
                                value={date_fin}
                                onChange={(e) =>
                                    setDateFin(e.currentTarget.value)
                                }
                            />
                        </div>

                        <Button onClick={handleUpdate} className="float-right cursor-pointer hover:bg-primary/80">
                            Mettre à jour
                        </Button>
                    </form>
                </div>
            </AppLayout>
        </div>
    );
};

export default Edit;
