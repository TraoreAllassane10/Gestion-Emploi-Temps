import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    NativeSelect,
    NativeSelectOption,
} from '@/components/ui/native-select';
import useSeance from '@/hooks/useSeance';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Emploi du temps',
        href: '/seance',
    },
    {
        title: 'Modification',
        href: '/edit',
    },
];

interface Seance {
    id: string;
    jours: string;
    heure_debut: string;
    heure_fin: string;
    professeur_id: string;
    cours_id: string;
    salle_id: string;
    niveau_id: string;
}

// Type des données du professeur
interface Professeur {
    id: number;
    nom: string;
    prenom: string;
}

interface Cours {
    id: number;
    nom: string;
}

interface Salle {
    id: number;
    nom: string;
}

interface Niveau {
    id: number;
    nom: string;
}

interface SeanceProps {
    seance: Seance;
    professeurs: {
        data: Professeur[];
    };
    cours: {
        data: Cours[];
    };
    salles: {
        data: Salle[];
    };
    niveaux: {
        data: Niveau[];
    };
    [key: string]: unknown;
}

const Edit = () => {
    const { seance, professeurs, cours, salles, niveaux } =
        usePage<SeanceProps>().props;

    const [jours, setJours] = useState(seance.jours);
    const [heure_debut, setHeureDebut] = useState(seance.heure_debut);
    const [heure_fin, setHeureFin] = useState(seance.heure_fin);
    const [cours_id, setCoursId] = useState(seance.cours_id);
    const [professeur_id, setProfesseurId] = useState(seance.professeur_id);
    const [salle_id, setSalleId] = useState(seance.salle_id);
    const [niveau_id, setNiveauId] = useState(seance.niveau_id);

    const { updateSeance } = useSeance();

    const joursDelaSemaine = [
        'Lundi',
        'Mardi',
        'Mercredi',
        'Jeudi',
        'Vendredi',
        'Samedi',
        'Dimanche',
    ];

    // Mise à jour d'un cours
    const handleUpdate = (e: FormEvent) => {
        e.preventDefault();

        // Verification des données
        if (
            jours == '' ||
            heure_debut == '' ||
            heure_fin == '' ||
            professeur_id == '' ||
            cours_id == '' ||
            salle_id == '' ||
            niveau_id == ''
        ) {
            toast.error('Veuillez remplir tous les champs!');
            return;
        }

        // modification d'une seance
        updateSeance(seance.id, {
            jours,
            heure_debut,
            heure_fin,
            professeur_id,
            cours_id,
            niveau_id,
            salle_id,
        });

        // Nettoyage de l'etat
        setJours('');
        setHeureDebut('');
        setHeureFin('');
        setProfesseurId('');
        setCoursId('');
        setSalleId('');
        setNiveauId('');
    };

    return (
        <div>
            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="p-4">
                    <h1 className="mb-6 text-xl font-semibold">
                        Modification d'une séance
                    </h1>

                    <form action="" className="space-y-6">
                        <div className="grid gap-3">
                            <Label htmlFor="sheet-demo-name">Jour</Label>
                            <NativeSelect
                                className="w-full"
                                value={jours}
                                onChange={(e) => setJours(e.target.value)}
                            >
                                <NativeSelectOption value=""></NativeSelectOption>
                                {joursDelaSemaine.map((jours) => (
                                    <NativeSelectOption
                                        value={jours}
                                        selected={jours === seance.jours}
                                    >
                                        {jours}
                                    </NativeSelectOption>
                                ))}
                            </NativeSelect>
                        </div>

                        <div className="flex flex-col gap-4">
                            <Label className="text-md font-semibold">
                                Heure Debut
                            </Label>
                            <Input
                                type="time"
                                value={heure_debut}
                                onChange={(e) => setHeureDebut(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-4">
                            <Label className="text-md font-semibold">
                                Heure Fin
                            </Label>
                            <Input
                                type="time"
                                value={heure_fin}
                                onChange={(e) => setHeureFin(e.target.value)}
                            />
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="sheet-demo-name">Cours</Label>
                            <NativeSelect
                                className="w-full"
                                value={cours_id}
                                onChange={(e) => setCoursId(e.target.value)}
                            >
                                <NativeSelectOption value="">
                                    {' '}
                                </NativeSelectOption>

                                {cours?.data.map((cours) => (
                                    <NativeSelectOption
                                        selected={
                                            parseInt(cours_id) == cours.id
                                        }
                                        value={cours.id}
                                    >
                                        {cours.nom}
                                    </NativeSelectOption>
                                ))}
                            </NativeSelect>
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="sheet-demo-name">Professeur</Label>
                            <NativeSelect
                                className="w-full"
                                value={professeur_id}
                                onChange={(e) =>
                                    setProfesseurId(e.target.value)
                                }
                            >
                                <NativeSelectOption value="">
                                    {' '}
                                </NativeSelectOption>

                                {professeurs?.data.map((prof) => (
                                    <NativeSelectOption
                                        selected={
                                            parseInt(professeur_id) == prof.id
                                        }
                                        value={prof.id}
                                    >
                                        {prof.nom} {prof.prenom}
                                    </NativeSelectOption>
                                ))}
                            </NativeSelect>
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="sheet-demo-name">Salle</Label>
                            <NativeSelect
                                className="w-full"
                                value={salle_id}
                                onChange={(e) => setSalleId(e.target.value)}
                            >
                                <NativeSelectOption value="">
                                    {' '}
                                </NativeSelectOption>

                                {salles?.data.map((salle) => (
                                    <NativeSelectOption
                                        selected={
                                            parseInt(salle_id) == salle.id
                                        }
                                        value={salle.id}
                                    >
                                        {salle.nom}
                                    </NativeSelectOption>
                                ))}
                            </NativeSelect>
                        </div>

                        <div className="grid gap-3">
                            <Label htmlFor="sheet-demo-name">Niveau</Label>
                            <NativeSelect
                                className="w-full"
                                value={niveau_id}
                                onChange={(e) => setNiveauId(e.target.value)}
                            >
                                <NativeSelectOption value="">
                                    {' '}
                                </NativeSelectOption>

                                {niveaux?.data.map((niveau) => (
                                    <NativeSelectOption
                                        selected={
                                            parseInt(niveau_id) == niveau.id
                                        }
                                        value={niveau.id}
                                    >
                                        {niveau.nom}
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
                </div>
            </AppLayout>
        </div>
    );
};

export default Edit;
