import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Field,
    FieldDescription,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useState } from 'react';

function champObligatoire() {
    return <span className="ml-1 text-red-500">*</span>;
}

function Create() {
    const [option, setOption] = useState('1');

    const [matricule, setMatricule] = useState('');
    const [nom_prenom, setNomPrenom] = useState('');
    const [sexe, setSexe] = useState('');
    const [date_naissance, setDateNaissance] = useState('');
    const [pays, setPays] = useState('');
    const [specialite, setSpecialite] = useState('');
    const [telephone, setTelephone] = useState('');
    const [diplome, setDiplome] = useState('');
    const [grade, setGrade] = useState('');
    const [statut, setStatut] = useState('');
    const [annee_prise_fonction, setAnneePriseFonction] = useState('');
    const [formation_continue, setFormationContinue] = useState('');
    const [nombre_heure_cours_prevue, setNombreHeurePrevue] = useState('');
    const [nombre_heure_cours_realise, setNombreHeureRealise] = useState('');

    const canRegister =
        matricule !== '' &&
        nom_prenom !== '' &&
        sexe !== '' &&
        date_naissance !== '' && 
        pays !== "" && 
        specialite !== "" && 
        diplome !== "" && 
        grade !== "" && 
        statut !== "" && 
        annee_prise_fonction !== "";

    return (
        <AppLayout>
            <Head title="Enseignant" />

            <div className="p-6">
                <div className="mb-6">
                    <Link
                        href="/professeur"
                        className="mb-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" /> Retour aux
                        enseignants
                    </Link>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Nouvel enseignant
                    </h1>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                        Remplissez les informations pour enregistrer un nouvel
                        enseignant.
                    </p>
                </div>

                <Card className="shadow-sm">
                    <CardHeader className="pb-4">
                        <CardTitle>Information de l'enseignant</CardTitle>
                        <CardDescription>
                            Renseigner les informations personnelle de
                            l'enseignant
                        </CardDescription>
                    </CardHeader>

                    <Separator />

                    {/* Option d'enregistrement */}
                    <CardContent className="pb-4">
                        <FieldSet className="w-full max-w-xs">
                            <FieldLegend variant="label">
                                Mode d'enregistrement
                            </FieldLegend>
                            <FieldDescription>
                                Choisissez une option d'enregistrement.
                            </FieldDescription>

                            <RadioGroup
                                defaultValue={option}
                                onValueChange={setOption}
                                className="mt-4"
                            >
                                <div className="flex flex-row items-center gap-3">
                                    <RadioGroupItem value="1" id="nouvel" />
                                    <Label htmlFor="nouvel">
                                        Nouvel enseignant
                                    </Label>
                                </div>
                                <div className="flex items-center gap-3">
                                    <RadioGroupItem value="2" id="existant" />
                                    <Label htmlFor="existant">
                                        Enseignant existant
                                    </Label>
                                </div>
                            </RadioGroup>
                        </FieldSet>
                    </CardContent>

                    <Separator />

                    {/* Choix de l'enseignement existant */}
                    <CardContent>
                        <Field className="w-full">
                            <FieldLabel>Enseignant</FieldLabel>
                            <Select disabled={option == '1'}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Choose department" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="engineering">
                                            Engineering
                                        </SelectItem>
                                        <SelectItem value="design">
                                            Design
                                        </SelectItem>
                                        <SelectItem value="marketing">
                                            Marketing
                                        </SelectItem>
                                        <SelectItem value="sales">
                                            Sales
                                        </SelectItem>
                                        <SelectItem value="support">
                                            Customer Support
                                        </SelectItem>
                                        <SelectItem value="hr">
                                            Human Resources
                                        </SelectItem>
                                        <SelectItem value="finance">
                                            Finance
                                        </SelectItem>
                                        <SelectItem value="operations">
                                            Operations
                                        </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <FieldDescription>
                                Selectionnez l'enseignant.
                            </FieldDescription>
                        </Field>
                    </CardContent>

                    <Separator />

                    {/* Informations Indentitaire */}
                    <CardContent>
                        <Field className="w-full">
                            <FieldLabel>Informations sur l'identité</FieldLabel>

                            <div>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                    <div>
                                        <Label>
                                            Matricule {champObligatoire()}
                                        </Label>
                                        <Input
                                            value={matricule}
                                            onChange={(e) =>
                                                setMatricule(e.target.value)
                                            }
                                            disabled={option == '2'}
                                        />
                                    </div>

                                    <div>
                                        <Label>
                                            Nom et Prenom {champObligatoire()}
                                        </Label>
                                        <Input
                                            value={nom_prenom}
                                            onChange={(e) =>
                                                setNomPrenom(e.target.value)
                                            }
                                            disabled={option == '2'}
                                        />
                                    </div>

                                    <div>
                                        <Label>Sexe {champObligatoire()}</Label>
                                        <Select
                                            value={sexe}
                                            onValueChange={setSexe}
                                            disabled={option == '2'}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Choisir un sexe" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="M">
                                                        M
                                                    </SelectItem>
                                                    <SelectItem value="F">
                                                        F
                                                    </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label>
                                            Date de naissance{' '}
                                            {champObligatoire()}
                                        </Label>
                                        <Input
                                            type="date"
                                            value={date_naissance}
                                            onChange={(e) =>
                                                setDateNaissance(e.target.value)
                                            }
                                            disabled={option == '2'}
                                        />
                                    </div>

                                    <div>
                                        <Label>Pays {champObligatoire()}</Label>
                                        <Input
                                            value={pays}
                                            onChange={(e) =>
                                                setPays(e.target.value)
                                            }
                                            disabled={option == '2'}
                                        />
                                    </div>

                                    <div>
                                        <Label>
                                            Spécialité {champObligatoire()}
                                        </Label>
                                        <Input
                                            value={specialite}
                                            onChange={(e) =>
                                                setSpecialite(e.target.value)
                                            }
                                            disabled={option == '2'}
                                        />
                                    </div>

                                    <div>
                                        <Label>Telephone</Label>
                                        <Input
                                            value={telephone}
                                            onChange={(e) =>
                                                setNomPrenom(e.target.value)
                                            }
                                            disabled={option == '2'}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Field>
                    </CardContent>

                    <Separator />

                    {/* Informations sur la fonction */}
                    <CardContent>
                        <Field className="w-full">
                            <FieldLabel>
                                Informations sur la fonction
                            </FieldLabel>

                            <div>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                    <div>
                                        <Label>
                                            Dernier diplôme {champObligatoire()}
                                        </Label>
                                        <Input
                                            value={diplome}
                                            onChange={(e) =>
                                                setDiplome(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div>
                                        <Label>grade{champObligatoire()}</Label>
                                        <Input
                                            type="number"
                                            value={grade}
                                            onChange={(e) =>
                                                setGrade(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div>
                                        <Label>
                                            Statut {champObligatoire()}
                                        </Label>
                                        <Input
                                            type="number"
                                            value={statut}
                                            onChange={(e) =>
                                                setStatut(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div>
                                        <Label>
                                            Année de prise de fonction{' '}
                                            {champObligatoire()}
                                        </Label>
                                        <Input
                                            type="number"
                                            value={annee_prise_fonction}
                                            onChange={(e) =>
                                                setAnneePriseFonction(
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>

                                    <div>
                                        <Label>Formation continue</Label>
                                        <Input
                                            type="number"
                                            value={formation_continue}
                                            onChange={(e) =>
                                                setFormationContinue(
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>

                                    <div>
                                        <Label>
                                            Nombre d'heure de cours prévues / An
                                        </Label>
                                        <Input
                                            type="number"
                                            value={nombre_heure_cours_prevue}
                                            onChange={(e) =>
                                                setNombreHeurePrevue(
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>

                                    <div>
                                        <Label>
                                            Nombre d'heure de cours réalisées /
                                            An
                                        </Label>
                                        <Input
                                            type="number"
                                            value={nombre_heure_cours_realise}
                                            onChange={(e) =>
                                                setNombreHeureRealise(
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </Field>
                    </CardContent>
                </Card>

                {/* Navigation */}
                <div className="mt-4 flex justify-between">
                    <Button variant="outline">
                        <Link href="/professeur">Retour</Link>
                    </Button>

                    <Button disabled={!canRegister}>
                        <CheckCircle />
                        Enregistrer
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}

export default Create;
