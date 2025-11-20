import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useSalle from '@/hooks/useSalle';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import {  usePage } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Salle',
        href: '/salle',
    },
    {
        title: 'Modification',
        href: '/edit',
    },
];

interface Salle {
    id: number;
    nom: string;
}

interface salleProps {
    salle: Salle;
    [key: string] : unknown;
}

const Edit = () => {
    const { salle } = usePage<salleProps>().props;

    const [nom, setNom] = useState(salle.nom);

    const {updateSalle} = useSalle();

    // Mise à jour d'une salee
    const handleUpdate = (e: FormEvent) => {

        e.preventDefault();

         // Verification des données
        if (nom == '') {
            toast.error('Veuillez entrer le nom de la salle!');
            return;
        }

        // modification d'une  salle
        updateSalle(salle.id, {
            nom
        });

        // Nettoye de l'etat du composant
        setNom('');
    }

    return (
        <div>
            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="p-4">

                    <h1 className='text-xl font-semibold mb-6'>Modification d'une Salle</h1>

                    <form action="" className="space-y-6">
                        <div className="flex flex-col gap-4">
                            <Label className="text-md font-semibold">
                                Nom de la salle
                            </Label>
                            <Input
                                value={nom}
                                onChange={(e) => setNom(e.target.value)}
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
