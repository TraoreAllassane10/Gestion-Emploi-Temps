import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useAnnee from '@/hooks/useAnnee';
import useFiliere from '@/hooks/useFiliere';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Filiere',
        href: '/filiere',
    },
    {
        title: 'Modification',
        href: '/edit',
    },
];

interface Filiere {
    id: number;
    nom: string;
}

interface FiliereProps {
    filiere: Filiere;
    [key: string] : unknown;
}

const Edit = () => {
    const { filiere } = usePage<FiliereProps>().props;

    const [nom, setNom] = useState(filiere.nom);

    const {updateFiliere} = useFiliere();

    // Mise à jour d'une annné
    const handleUpdate = (e: FormEvent) => {

        e.preventDefault();

         // Verification des données
        if (nom == '') {
            toast.error('Veuillez entrer le nom de la filière!');
            return;
        }

        // modification d'une nouvelle année
        updateFiliere(filiere.id, {
            nom
        });

        // Nettoye de l'etat du composant
        setNom('');
    }

    return (
        <div>
            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="p-4">

                    <h1 className='text-xl font-semibold mb-6'>Modification d'une filière</h1>

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
