import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useSalle from '@/hooks/useSalle';
import useSite from '@/hooks/useSite';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Salle, Site } from '@/types';
import { usePage } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'site',
        href: '/site',
    },
    {
        title: 'Modification',
        href: '/edit',
    },
];


interface SiteProps {
    site: Site;
    [key: string]: unknown;
}

const Edit = () => {
    const { site } = usePage<SiteProps>().props;

    const [nom, setNom] = useState(site.nom);

    const { updateSite } = useSite();

    // Mise à jour d'un site
    const handleUpdate = (e: FormEvent) => {
        e.preventDefault();

        // Verification des données
        if (nom == '') {
            toast.error('Veuillez entrer le nom du site!');
            return;
        }

        // modification d'une  salle
        updateSite(site.id, {
            nom,
        });

        // Nettoye de l'etat du composant
        setNom('');
    };

    return (
        <div>
            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="p-4">
                    <Card className='p-4'>
                        <h1 className="mb-6 text-xl font-semibold">
                            Modification d'un site
                        </h1>

                        <form action="" className="space-y-6">
                            <div className="flex flex-col gap-4">
                                <Label className="text-md font-semibold">
                                    Nom du site
                                </Label>
                                <Input
                                    value={nom}
                                    onChange={(e) => setNom(e.target.value)}
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
