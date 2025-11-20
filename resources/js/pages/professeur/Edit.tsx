import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useProfesseur from '@/hooks/useProfesseur';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Professeur',
        href: '/professeur',
    },
    {
        title: 'Modification',
        href: '/edit',
    },
];

interface Professeur {
    id: string;
    nom: string;
    prenom: string;
     email: string;
      telephone: string;
}

interface ProfesseurProps {
    professeur: Professeur;
    [key: string]: unknown;
}

const Edit = () => {
    const { professeur } = usePage<ProfesseurProps>().props;

    const [nom, setNom] = useState(professeur.nom);
    const [prenom, setPrenom] = useState(professeur.prenom);
    const [email, setEmail] = useState(professeur.email);
    const [telephone, setTelephone] = useState(professeur.telephone);

    const { updateProfesseur } = useProfesseur();

    // Mise à jour d'une annné
    const handleUpdate = (e: FormEvent) => {
        e.preventDefault();

        // Verification des données
        if (nom == '' || prenom == '' || email == '' || telephone == '') {
            toast.error('Veuillez remplir tous les champs svp');
            return;
        }

        // modification d'un professeur
        updateProfesseur(professeur.id, {
            nom,
            prenom,
            email,
            telephone,
        });

        // Nettoye de l'etat du composant
        setNom('');
        setPrenom('');
        setEmail('');
        setTelephone('');
    };

    return (
        <div>
            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="p-4">
                    <h1 className="mb-6 text-xl font-semibold">
                        Modification d'une filière
                    </h1>

                    <form action="" className="space-y-6">
                        <div className="flex flex-col gap-4">
                            <Label className="text-md font-semibold">Nom</Label>
                            <Input
                                value={nom}
                                onChange={(e) => setNom(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-4">
                            <Label className="text-md font-semibold">
                                Prenom
                            </Label>
                            <Input
                                value={prenom}
                                onChange={(e) => setPrenom(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-4">
                            <Label className="text-md font-semibold">
                                Email
                            </Label>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-4">
                            <Label className="text-md font-semibold">
                                Telephone
                            </Label>
                            <Input
                                value={telephone}
                                onChange={(e) => setTelephone(e.target.value)}
                            />
                        </div>

                        <Button
                            onClick={handleUpdate}
                            className="float-right cursor-pointer hover:bg-primary/80"
                        >
                            Mettre à jour
                        </Button>
                    </form>
                </div>
            </AppLayout>
        </div>
    );
};

export default Edit;
