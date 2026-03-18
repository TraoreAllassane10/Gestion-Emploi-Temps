import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    NativeSelect,
    NativeSelectOption,
} from '@/components/ui/native-select';
import { Separator } from '@/components/ui/separator';
import useSeance from '@/hooks/useSeance';
import AppLayout from '@/layouts/app-layout';
import { Cours, DataNiveau, Horaire, Professeur, Salle, Semaine } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';


interface SeanceProps {
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
        data: DataNiveau[];
    };
    semaines: {
        data: Semaine[];
    };
    horaires: {
        data: Horaire[];
    };
    joursDeLaSemaine: any[];
    [key: string]: unknown;
}
const Create = () => {
    const {
        professeurs,
        cours,
        salles,
        niveaux,
        horaires,
        semaines,
        joursDeLaSemaine,
    } = usePage<SeanceProps>().props;

    const [jours, setJours] = useState('');
    const [date, setDate] = useState('');
    const [cours_id, setCoursId] = useState('');
    const [professeur_id, setProfesseurId] = useState('');
    const [salle_id, setSalleId] = useState('');
    const [niveau_id, setNiveauId] = useState('');
    const [semaine_id, setSemaineId] = useState('');
    const [horaire_id, setHoraireId] = useState('');

    const { createSeance } = useSeance();

    // Enregistrement d'un cours
    const handleSubmit = () => {
        // Verification des données
        if (
            jours == '' ||
            date == '' ||
            professeur_id == '' ||
            cours_id == '' ||
            salle_id == '' ||
            niveau_id == ''
        ) {
            toast.error('Veuillez remplir tous les champs!');
            return;
        }

        // Création d'une seance
        createSeance({
            jour: jours,
            date,
            professeur_id,
            cours_id,
            niveau_id,
            salle_id,
            horaire_id,
            semaine_id
        });

        // Nettoyage de l'etat
        setJours('');
        setDate('');
        setProfesseurId('');
        setCoursId('');
        setSalleId('');
        setNiveauId('');
        setHoraireId('');
        setSemaineId('');
    };

    return (
        <AppLayout>
            <Head title="Nouvelle séance" />

            <div className="p-6">
                <div className="mb-6">
                    <Link
                        href="/seance"
                        className="mb-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" /> Retour aux séances
                    </Link>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Nouvelle séance
                    </h1>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                        Remplissez les informations pour enregistrer une
                        nouvelle séance.
                    </p>
                </div>

                <div className="space-y-4">
                    <Card className="shadow-sm">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-base">
                                Création d'une nouvelle séance
                            </CardTitle>
                            <CardDescription>
                                Saissisez les informations concernant la séance
                                à ajoutée
                            </CardDescription>
                        </CardHeader>
                        <Separator />
                        <CardContent className="pt-5">
                            <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                                <div className="min-w-0">
                                    <Label htmlFor="sheet-demo-name">
                                        Niveau
                                    </Label>
                                    <NativeSelect
                                        className="w-full"
                                        value={niveau_id}
                                        onChange={(e) =>
                                            setNiveauId(e.target.value)
                                        }
                                    >
                                        <NativeSelectOption value="">
                                            {' '}
                                        </NativeSelectOption>

                                        {niveaux.data.map((niveau) => (
                                            <NativeSelectOption
                                                value={niveau.id}
                                            >
                                                {niveau.nom}
                                            </NativeSelectOption>
                                        ))}
                                    </NativeSelect>
                                </div>

                                <div>
                                    <Label htmlFor="sheet-demo-name">
                                        Salle
                                    </Label>
                                    <NativeSelect
                                        className="w-full"
                                        value={salle_id}
                                        onChange={(e) =>
                                            setSalleId(e.target.value)
                                        }
                                    >
                                        <NativeSelectOption value="">
                                            {' '}
                                        </NativeSelectOption>

                                        {salles.data.map((salle) => (
                                            <NativeSelectOption
                                                value={salle.id}
                                            >
                                                {salle.nom}
                                            </NativeSelectOption>
                                        ))}
                                    </NativeSelect>
                                </div>

                                <div>
                                    <Label htmlFor="sheet-demo-name">
                                        Cours
                                    </Label>
                                    <NativeSelect
                                        className="w-full"
                                        value={cours_id}
                                        onChange={(e) =>
                                            setCoursId(e.target.value)
                                        }
                                    >
                                        <NativeSelectOption value="">
                                            {' '}
                                        </NativeSelectOption>

                                        {cours.data.map((cours) => (
                                            <NativeSelectOption
                                                value={cours.id}
                                            >
                                                {cours.nom}
                                            </NativeSelectOption>
                                        ))}
                                    </NativeSelect>
                                </div>

                                <div>
                                    <Label htmlFor="sheet-demo-name">
                                        Professeur
                                    </Label>
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

                                        {professeurs.data.map((professeur) => (
                                            <NativeSelectOption
                                                value={professeur.id}
                                            >
                                                {professeur.nom}{' '}
                                                {professeur.prenom}
                                            </NativeSelectOption>
                                        ))}
                                    </NativeSelect>
                                </div>

                                <div>
                                    <Label htmlFor="sheet-demo-name">
                                        Jour
                                    </Label>
                                    <NativeSelect
                                        className="w-full"
                                        value={jours}
                                        onChange={(e) =>
                                            setJours(e.target.value)
                                        }
                                    >
                                        <NativeSelectOption value=""></NativeSelectOption>
                                        {joursDeLaSemaine.map((jour) => (
                                            <NativeSelectOption value={jour}>
                                                {jour}
                                            </NativeSelectOption>
                                        ))}
                                    </NativeSelect>
                                </div>

                                <div>
                                    <Label>Date du programme</Label>
                                    <Input
                                        type="date"
                                        value={date}
                                        onChange={(e) =>
                                            setDate(e.target.value)
                                        }
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="sheet-demo-name">
                                        Semaine
                                    </Label>
                                    <NativeSelect
                                        className="w-full"
                                        value={semaine_id}
                                        onChange={(e) =>
                                            setSemaineId(e.target.value)
                                        }
                                    >
                                        <NativeSelectOption value="">
                                            {' '}
                                        </NativeSelectOption>

                                        {semaines.data.map((semaine) => (
                                            <NativeSelectOption
                                                value={semaine.id}
                                            >
                                                {semaine.libelle}
                                            </NativeSelectOption>
                                        ))}
                                    </NativeSelect>
                                </div>

                                <div>
                                    <Label htmlFor="sheet-demo-name">
                                        Horaire
                                    </Label>
                                    <NativeSelect
                                        className="w-full"
                                        value={horaire_id}
                                        onChange={(e) =>
                                            setHoraireId(e.target.value)
                                        }
                                    >
                                        <NativeSelectOption value="">
                                            {' '}
                                        </NativeSelectOption>

                                        {horaires.data.map((horaire) => (
                                            <NativeSelectOption
                                                value={horaire.id}
                                            >
                                                {horaire.heure_debut} -{' '}
                                                {horaire.heure_fin}
                                            </NativeSelectOption>
                                        ))}
                                    </NativeSelect>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Navigation */}
                    <div className="flex justify-between">
                        <Link href="/seance">
                            <Button variant="outline">Annuler</Button>
                        </Link>

                        <Button onClick={handleSubmit}>Enregistrer</Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Create;
