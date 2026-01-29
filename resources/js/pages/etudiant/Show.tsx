import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Etudiant } from '@/types';
import { usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Etudiants',
        href: '/etudiants',
    },
    {
        title: 'Visualisation',
        href: '/etudiants/show',
    },
];

const Show = () => {
    const { etudiant } = usePage<{ etudiant: Etudiant }>().props;

    return (
        <div>
            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="p-4">
                    <Card className="p-6">
                        <h1 className="mb-6 text-lg font-semibold text-gray-800">
                            Informations de l’étudiant
                            <span className="ml-2 text-sm font-normal text-gray-500">
                                #{etudiant.ip}
                            </span>
                        </h1>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            <div>
                                <p className="text-sm text-gray-500">Nom</p>
                                <p className="font-medium text-gray-800">
                                    {etudiant.nom}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">Prénom</p>
                                <p className="font-medium text-gray-800">
                                    {etudiant.prenom}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Date de naissance
                                </p>
                                <p className="font-medium text-gray-800">
                                    {etudiant.date_naissance}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Lieu de naissance
                                </p>
                                <p className="font-medium text-gray-800">
                                    {etudiant.lieu_naissance}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">Contact</p>
                                <p className="font-medium text-gray-800">
                                    {etudiant.numero}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Nom du père / mère / tuteur
                                </p>
                                <p className="font-medium text-gray-800">
                                    {etudiant.nom_parent}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Contact du parent
                                </p>
                                <p className="font-medium text-gray-800">
                                    {etudiant.numero_parent}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Fillière
                                </p>
                                <p className="font-medium text-gray-800">
                                    {etudiant.niveaux[0]?.filiere.nom}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Niveau(x) d'etude
                                </p>
                                <div className='flex gap-2'>
                                    {etudiant.niveaux.map((niveau) => (
                                        <p  className="flex place-items-center gap-1 rounded-sm bg-gray-200 px-2 py-1 text-sm font-medium">
                                            {niveau.nom}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </AppLayout>
        </div>
    );
};

export default Show;
