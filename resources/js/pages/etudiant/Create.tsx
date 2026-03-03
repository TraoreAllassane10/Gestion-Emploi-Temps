import AppLayout from '@/layouts/app-layout'
import { Head, Link, router } from '@inertiajs/react'
import { ArrowLeft } from 'lucide-react'

import { EtudiantForm, type EtudiantFormData } from '@/components/etudiant/EtudiantForm'

export default function Create() {
  const handleSubmit = (data: EtudiantFormData) => {
    // TODO: router.post('/etudiants', data)
    console.log('Créer étudiant', data)
    router.visit('/etudiants')
  }

  return (
    <AppLayout>
      <Head title="Nouvel étudiant" />

      <div className="p-6">
        <div className="mb-6">
          <Link
            href="/etudiants"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-3"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Retour aux étudiants
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">Nouvel étudiant</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Remplissez les informations pour enregistrer un nouvel étudiant.
          </p>
        </div>

        <EtudiantForm
          onSubmit={handleSubmit}
          onCancel={() => router.visit('/etudiants')}
        />
      </div>
    </AppLayout>
  )
}