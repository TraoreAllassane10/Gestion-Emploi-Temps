import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    NativeSelect,
    NativeSelectOption,
} from '@/components/ui/native-select';
import useEtudiant from '@/hooks/useEtudiant';
import AppLayout from '@/layouts/app-layout';
import { etudiants } from '@/routes';
import { BreadcrumbItem } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { X } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Etudiants',
        href: '/etudiants',
    },
    {
        title: 'creation',
        href: '/etudiants/create',
    },
];

interface Annee {
    id: number;
    libelle: string;
}

interface Niveau {
    id: number;
    nom: string;
}

interface CreateEtudiantProps {
    annees: Annee[];
    niveaux: Niveau[];
    [key: string]: unknown;
}

const Create = () => {
    const { annees, niveaux } = usePage<CreateEtudiantProps>().props;

    const [ip, setIp] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [date_naissance, setDate_naissance] = useState('');
    const [lieu_naissance, setLieu_naissance] = useState('');
    const [numero, setNumero] = useState('');
    const [nom_parent, setNom_parent] = useState('');
    const [numero_parent, setNumero_parent] = useState('');
    const [niveau_id, setNiveauId] = useState<string[]>([]);
    const [annee_id, setAnneeId] = useState('');

    const { createEtudiant } = useEtudiant();

    // Gestion des niveaux
    const addNiveaux = (niveauId: string) => {
        setNiveauId((prev) =>
            prev.includes(niveauId) ? prev : [...prev, niveauId],
        );
    };

    const deleteNiveau = (niveauId: string) => {
        setNiveauId((prev) => prev.filter((nv) => nv !== niveauId));
    };

    // Enregistrement d'un etudiant
    const handleSubmit = () => {
        // Verification des données
        if (
            ip == '' ||
            nom == '' ||
            prenom == '' ||
            date_naissance == '' ||
            lieu_naissance == '' ||
            numero?.toString() == '' ||
            nom_parent == '' ||
            numero_parent?.toString() == '' ||
            niveau_id.length == 0 ||
            annee_id == ''
        ) {
            toast.error('Veuillez remplir tous les champs!');
            return;
        }

        // Création d'une seance
        createEtudiant({
            ip,
            nom,
            prenom,
            date_naissance,
            lieu_naissance,
            numero: Number(numero),
            nom_parent,
            numero_parent: Number(numero_parent),
            niveau_id,
            annee_id,
        });

        // Nettoyage de l'etat
        setIp('');
        setNom('');
        setPrenom('');
        setDate_naissance('');
        setLieu_naissance('');
        setNumero('');
        setNom_parent('');
        setNumero_parent('');
        setNiveauId([]);
        setAnneeId('');

        //Redirection sur la page d'affiche
        router.visit(etudiants());
    };

    return (
        <div>
            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="p-4">
                    <Card className="p-4">
                        <h1 className="mb-6 text-xl font-semibold">
                            Creation d'un nouvel etudiant
                        </h1>

                        {/* Formulaire d'ajout */}
                        <form action="" className="space-y-6">
                            <div className="flex flex-col gap-4">
                                <Label className="text-md font-semibold">
                                    Identifiant Permanent (IP)
                                </Label>
                                <Input
                                    value={ip}
                                    onChange={(e) => setIp(e.target.value)}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-4">
                                    <Label className="text-md font-semibold">
                                        Nom
                                    </Label>
                                    <Input
                                        type="text"
                                        value={nom}
                                        onChange={(e) => setNom(e.target.value)}
                                    />
                                </div>

                                <div className="flex flex-col gap-4">
                                    <Label className="text-md font-semibold">
                                        Prenom
                                    </Label>
                                    <Input
                                        type="text"
                                        value={prenom}
                                        onChange={(e) =>
                                            setPrenom(e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-4">
                                    <Label className="text-md font-semibold">
                                        Date de naissance
                                    </Label>
                                    <Input
                                        type="date"
                                        value={date_naissance}
                                        onChange={(e) =>
                                            setDate_naissance(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="flex flex-col gap-4">
                                    <Label className="text-md font-semibold">
                                        Lieu de naissane
                                    </Label>
                                    <Input
                                        type="text"
                                        value={lieu_naissance}
                                        onChange={(e) =>
                                            setLieu_naissance(e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-4">
                                    <Label className="text-md font-semibold">
                                        Numero de téléphone
                                    </Label>
                                    <Input
                                        type="number"
                                        value={numero}
                                        onChange={(e) =>
                                            setNumero(e.target.value)
                                        }
                                    />
                                </div>

                                <div className="flex flex-col gap-4">
                                    <Label className="text-md font-semibold">
                                        Nom du père / Mère / Tuteur
                                    </Label>
                                    <Input
                                        type="text"
                                        value={nom_parent}
                                        onChange={(e) =>
                                            setNom_parent(e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <Label className="text-md font-semibold">
                                    Numéro parent
                                </Label>
                                <Input
                                    type="number"
                                    value={numero_parent}
                                    onChange={(e) =>
                                        setNumero_parent(e.target.value)
                                    }
                                />
                            </div>

                            <div className="">
                                <div>
                                    <Label htmlFor="sheet-demo-name">
                                        Niveau
                                    </Label>
                                    <NativeSelect
                                        className="w-full"
                                        value={niveau_id}
                                        onChange={(e) =>
                                            addNiveaux(e.target.value)
                                        }
                                    >
                                        <NativeSelectOption value="">
                                            {' '}
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

                                {/* Liste des niveaux selectionnés */}
                                <div className="mt-2 flex gap-2">
                                    {niveau_id.map((niveauId) => {
                                        const niveau = niveaux.find(
                                            (nv) => String(nv.id) == niveauId,
                                        );

                                        return (
                                            <span
                                                key={niveauId}
                                                className="flex place-items-center gap-1 rounded-sm bg-gray-200 px-2 py-1 text-sm font-medium"
                                            >
                                                {niveau?.nom}{' '}
                                                <span
                                                    onClick={() =>
                                                        deleteNiveau(niveauId)
                                                    }
                                                >
                                                    <X size={14} />
                                                </span>
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="">
                                <div>
                                    <Label htmlFor="sheet-demo-name">
                                        Année scolaire
                                    </Label>
                                    <NativeSelect
                                        className="w-full"
                                        value={annee_id}
                                        onChange={(e) =>
                                            setAnneeId(e.target.value)
                                        }
                                    >
                                        <NativeSelectOption value="">
                                            {' '}
                                        </NativeSelectOption>

                                        {annees.map((niveau) => (
                                            <NativeSelectOption
                                                value={niveau.id}
                                            >
                                                {niveau.libelle}
                                            </NativeSelectOption>
                                        ))}
                                    </NativeSelect>
                                </div>
                            </div>

                            <Button
                                type="button"
                                onClick={handleSubmit}
                                className="float-right cursor-pointer hover:bg-primary/80"
                            >
                                Enregister
                            </Button>
                        </form>
                    </Card>
                </div>
            </AppLayout>
        </div>
    );
};

export default Create;
