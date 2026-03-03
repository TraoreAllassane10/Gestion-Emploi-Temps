import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

import { EtudiantForm } from '@/components/etudiant/EtudiantForm';
import useEtudiant from '@/hooks/useEtudiant';
import { Etudiant, EtudiantFormData } from '@/types';

const MOCK_IP = 'ETU-2024-001';

export default function Edit() {
    const { etudiant } = usePage<{ etudiant: Etudiant }>().props;

    // const etudiant = ETUDIANTS.find((e) => e.ip === MOCK_IP)!;

    const { updateEtudiant, isLoading } = useEtudiant();

    // On exclut created_at / updated_at pour correspondre à EtudiantFormData
    const { created_at, updated_at, ...initialData } = etudiant;

    const handleSubmit = (data: EtudiantFormData) => {
        updateEtudiant(data.ip, data);
    };

    return (
        <AppLayout>
            <Head title={`Modifier — ${etudiant.prenom} ${etudiant.nom}`} />

            <div className="p-6">
                <div className="mb-6">
                    <Link
                        href={`/etudiants/${etudiant.ip}`}
                        className="mb-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" /> Retour au profil
                    </Link>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Modifier — {etudiant.civilite} {etudiant.prenom}{' '}
                        {etudiant.nom}
                    </h1>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                        Mettez à jour les informations de l'étudiant.
                    </p>
                </div>

                <EtudiantForm
                    initialData={initialData}
                    isEdit
                    onSubmit={handleSubmit}
                    onCancel={() => router.visit(`/etudiants/${etudiant.ip}`)}
                    isLoading
                />
            </div>
        </AppLayout>
    );
}
