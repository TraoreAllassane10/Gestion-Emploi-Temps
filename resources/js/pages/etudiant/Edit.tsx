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
import { BreadcrumbItem, Etudiant } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { X } from 'lucide-react';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Etudiants',
        href: '/etudiants',
    },
    {
        title: 'Modification',
        href: '/etudiants/edit',
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

interface UpdateEtudiantProps {
    annees: Annee[];
    niveaux: Niveau[];
    etudiant: Etudiant;
    [key: string]: unknown;
}

const Edit = () => {
    const { annees, niveaux, etudiant } = usePage<UpdateEtudiantProps>().props;

    const [ip, setIp] = useState(etudiant.ip);
    const [nom, setNom] = useState(etudiant.nom);
    const [prenom, setPrenom] = useState(etudiant.prenom);
    const [date_naissance, setDate_naissance] = useState(
        etudiant.date_naissance,
    );
    const [lieu_naissance, setLieu_naissance] = useState(
        etudiant.lieu_naissance,
    );
    const [numero, setNumero] = useState(etudiant.numero);
    const [nom_parent, setNom_parent] = useState(etudiant.nom_parent);
    const [numero_parent, setNumero_parent] = useState(etudiant.numero_parent);
    const [niveau_id, setNiveauId] = useState<string[]>(
        etudiant.niveaux.map((niveau) => niveau.id),
    );
    const [annee_id, setAnneeId] = useState(
        etudiant.niveaux[0].pivot.annee_scolaire_id,
    );

    // Gestion des niveaux
    const addNiveaux = (niveauId: string) => {
        setNiveauId((prev) =>
            prev.includes(niveauId) ? prev : [...prev, niveauId],
        );
    };

    const deleteNiveau = (niveauId: string) => {
        setNiveauId((prev) => prev.filter((nv) => nv !== niveauId));
    };

    const { updateEtudiant } = useEtudiant();

    // Mise à jour d'une annné
    const handleUpdate = (e: FormEvent) => {
        e.preventDefault();

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

        // modification d'une nouvelle année
        updateEtudiant(ip, {
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

        // Nettoye de l'etat du composant
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
                            Modification d'un etudiant
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

                                        {niveaux?.map((niveau) => (
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

                                        {annees?.map((annee) => (
                                            <NativeSelectOption
                                                value={annee.id}
                                                selected={
                                                    annee.id == Number(annee_id)
                                                }
                                            >
                                                {annee.libelle}
                                            </NativeSelectOption>
                                        ))}
                                    </NativeSelect>
                                </div>
                            </div>

                            <Button
                                type="button"
                                onClick={handleUpdate}
                                className="float-right cursor-pointer hover:bg-primary/80"
                            >
                                Modifier
                            </Button>
                        </form>
                    </Card>
                </div>
            </AppLayout>
        </div>
    );
};

export default Edit;
