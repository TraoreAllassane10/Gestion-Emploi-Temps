import AppLayout from '@/layouts/app-layout'
import { Head, Link, router } from '@inertiajs/react'
import { useState } from 'react'
import {
  Search, ChevronRight, CheckCircle2, Circle,
  ArrowLeft, User, BookOpen, Wallet,
  RefreshCw, ArrowRightLeft, GraduationCap,
  AlertTriangle,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'

import {
  ETUDIANTS, ANNEES_UNIVERSITAIRES, NIVEAUX_PAR_FILIERE,
  FRAIS_PAR_NIVEAU, fmt,
  type Etudiant, type TypeInscription,
} from './data/mock'

// ── Stepper ───────────────────────────────────────────────────────────────────

const STEPS = [
  { id: 1, label: 'Étudiant',   description: 'Sélectionnez l\'étudiant',    icon: User      },
  { id: 2, label: 'Académique', description: 'Informations académiques',     icon: BookOpen  },
  { id: 3, label: 'Financier',  description: 'Paramètres financiers',        icon: Wallet    },
]

function Stepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-center mb-8">
      {STEPS.map((step, idx) => {
        const done   = currentStep > step.id
        const active = currentStep === step.id
        const Icon   = step.icon

        return (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                ${done   ? 'bg-primary text-primary-foreground'   : ''}
                ${active ? 'bg-primary text-primary-foreground ring-4 ring-primary/20' : ''}
                ${!done && !active ? 'bg-muted text-muted-foreground' : ''}
              `}>
                {done
                  ? <CheckCircle2 className="w-5 h-5" />
                  : <Icon className="w-4 h-4" />
                }
              </div>
              <div className="text-center">
                <p className={`text-xs font-semibold ${active ? 'text-primary' : done ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {step.label}
                </p>
                <p className="text-[10px] text-muted-foreground hidden sm:block">{step.description}</p>
              </div>
            </div>
            {idx < STEPS.length - 1 && (
              <div className={`h-px w-16 sm:w-24 mx-3 mb-5 transition-colors ${currentStep > step.id ? 'bg-primary' : 'bg-border'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ── Étape 1 : Sélection étudiant ──────────────────────────────────────────────

function Step1({
  selected, onSelect,
}: { selected: Etudiant | null; onSelect: (e: Etudiant) => void }) {
  const [query, setQuery] = useState('')

  const results = ETUDIANTS.filter(e => {
    if (!query) return true
    const q = query.toLowerCase()
    return `${e.prenom} ${e.nom}`.toLowerCase().includes(q)
      || e.matricule.toLowerCase().includes(q)
      || e.filiere.toLowerCase().includes(q)
  })

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          autoFocus
          placeholder="Rechercher par nom, matricule ou filière…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="border rounded-lg divide-y overflow-hidden">
        {results.length === 0 && (
          <div className="p-8 text-center text-sm text-muted-foreground">
            Aucun étudiant trouvé.
          </div>
        )}
        {results.map(etudiant => {
          const isSelected = selected?.id === etudiant.id
          return (
            <button
              key={etudiant.id}
              type="button"
              onClick={() => onSelect(etudiant)}
              className={`
                w-full flex items-center justify-between px-4 py-3 text-left
                transition-colors hover:bg-muted/50
                ${isSelected ? 'bg-primary/5 hover:bg-primary/5' : ''}
              `}
            >
              <div className="flex items-center gap-3">
                <div className={`
                  w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0
                  ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
                `}>
                  {etudiant.prenom[0]}{etudiant.nom[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold">
                    {etudiant.prenom} {etudiant.nom}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {etudiant.matricule} · {etudiant.filiere}
                  </p>
                </div>
              </div>
              {isSelected && <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />}
            </button>
          )
        })}
      </div>

      {selected && (
        <Alert className="border-primary/30 bg-primary/5">
          <CheckCircle2 className="w-4 h-4 text-primary" />
          <AlertDescription className="text-sm">
            <span className="font-semibold">{selected.prenom} {selected.nom}</span>{' '}
            sélectionné(e) — {selected.filiere}
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}

// ── Étape 2 : Informations académiques ───────────────────────────────────────

const TYPE_OPTIONS: { value: TypeInscription; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { value: 'Nouvelle',     label: 'Nouvelle inscription', icon: GraduationCap  },
  { value: 'Redoublement', label: 'Redoublement',         icon: RefreshCw      },
  { value: 'Transfert',    label: 'Transfert',            icon: ArrowRightLeft },
]

function Step2({
  filiere, annee, niveau, typeInscription,
  setAnnee, setNiveau, setTypeInscription,
}: {
  filiere: string
  annee: string; niveau: string; typeInscription: TypeInscription
  setAnnee: (v: string) => void
  setNiveau: (v: string) => void
  setTypeInscription: (v: TypeInscription) => void
}) {
  const niveaux = NIVEAUX_PAR_FILIERE[filiere] ?? []

  return (
    <div className="space-y-6">
      <div className="p-3 rounded-lg bg-muted/50 flex items-center gap-2 text-sm">
        <BookOpen className="w-4 h-4 text-muted-foreground" />
        Filière détectée : <span className="font-semibold">{filiere}</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Année universitaire <span className="text-destructive">*</span></Label>
          <Select value={annee} onValueChange={setAnnee}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une année" />
            </SelectTrigger>
            <SelectContent>
              {ANNEES_UNIVERSITAIRES.map(a => (
                <SelectItem key={a} value={a}>{a}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Niveau <span className="text-destructive">*</span></Label>
          <Select value={niveau} onValueChange={setNiveau}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un niveau" />
            </SelectTrigger>
            <SelectContent>
              {niveaux.map(n => (
                <SelectItem key={n} value={n}>{n}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Semestre</Label>
        <Input value="Semestre 1 (automatique)" disabled className="bg-muted text-muted-foreground" />
      </div>

      <div className="space-y-2">
        <Label>Type d'inscription <span className="text-destructive">*</span></Label>
        <div className="grid grid-cols-3 gap-3">
          {TYPE_OPTIONS.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => setTypeInscription(value)}
              className={`
                flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all
                ${typeInscription === value
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border text-muted-foreground hover:border-muted-foreground/50'}
              `}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-semibold text-center leading-tight">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Étape 3 : Paramètres financiers ──────────────────────────────────────────

function Step3({
  etudiant, annee, niveau, typeInscription,
}: {
  etudiant: Etudiant; annee: string; niveau: string; typeInscription: TypeInscription
}) {
  const frais = FRAIS_PAR_NIVEAU[niveau]

  if (!frais) return (
    <div className="text-center text-muted-foreground py-8">
      Aucune donnée financière pour ce niveau.
    </div>
  )

  const mensualite = Math.round(frais.scolarite / frais.mensualites)

  return (
    <div className="space-y-6">
      {/* Cartes financières */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Frais d'inscription", value: fmt(frais.inscription), color: 'text-violet-600', bg: 'bg-violet-50' },
          { label: 'Total scolarité',      value: fmt(frais.scolarite),   color: 'text-blue-600',   bg: 'bg-blue-50'   },
          { label: 'Nb. mensualités',      value: `${frais.mensualites} mois`, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Montant / mois',       value: fmt(mensualite),        color: 'text-emerald-600', bg: 'bg-emerald-50' },
        ].map(item => (
          <div key={item.label} className={`rounded-xl p-4 ${item.bg}`}>
            <p className={`text-xs font-semibold uppercase tracking-wide mb-1 ${item.color}`}>
              {item.label}
            </p>
            <p className={`text-xl font-bold ${item.color}`}>{item.value}</p>
          </div>
        ))}
      </div>

      <Alert className="border-amber-200 bg-amber-50">
        <AlertTriangle className="w-4 h-4 text-amber-600" />
        <AlertDescription className="text-amber-700 text-sm">
          Les montants sont définis par les règles financières de l'établissement et ne sont pas modifiables.
        </AlertDescription>
      </Alert>

      {/* Récapitulatif */}
      <div className="rounded-lg border bg-muted/30 overflow-hidden">
        <div className="px-4 py-2.5 bg-muted/60 border-b">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Récapitulatif de l'inscription
          </p>
        </div>
        <div className="divide-y">
          {[
            ['Étudiant',  `${etudiant.prenom} ${etudiant.nom}`],
            ['Matricule', etudiant.matricule],
            ['Filière',   etudiant.filiere],
            ['Année',     annee],
            ['Niveau',    niveau],
            ['Type',      typeInscription],
            ['Semestre',  'Semestre 1'],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between px-4 py-2.5 text-sm">
              <span className="text-muted-foreground">{k}</span>
              <span className="font-medium">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Page principale ───────────────────────────────────────────────────────────

export default function Create() {
  const [step,              setStep]              = useState(1)
  const [etudiant,          setEtudiant]          = useState<Etudiant | null>(null)
  const [annee,             setAnnee]             = useState('2024-2025')
  const [niveau,            setNiveau]            = useState('')
  const [typeInscription,   setTypeInscription]   = useState<TypeInscription>('Nouvelle')

  const canNext = () => {
    if (step === 1) return !!etudiant
    if (step === 2) return !!annee && !!niveau
    return true
  }

  const handleSubmit = () => {
    // TODO: router.post('/inscriptions', { ... })
    router.visit('/inscriptions')
  }

  return (
    <AppLayout>
      <Head title="Nouvelle inscription" />

      <div className="p-6">

        {/* Header */}
        <div className="mb-6">
          <Link
            href="/inscriptions"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-3"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Retour aux inscriptions
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">Nouvelle inscription</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Suivez les étapes pour inscrire un étudiant.
          </p>
        </div>

        <Stepper currentStep={step} />

        {/* Contenu de l'étape */}
        <Card className="shadow-sm mb-4">
          <CardHeader className="pb-4">
            <CardTitle className="text-base">
              {step === 1 && 'Sélectionner un étudiant'}
              {step === 2 && 'Informations académiques'}
              {step === 3 && 'Paramètres financiers'}
            </CardTitle>
            <CardDescription>
              {step === 1 && 'Recherchez et sélectionnez l\'étudiant à inscrire.'}
              {step === 2 && 'Renseignez les informations académiques pour cette inscription.'}
              {step === 3 && 'Vérifiez les paramètres financiers calculés automatiquement.'}
            </CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="pt-5">
            {step === 1 && (
              <Step1 selected={etudiant} onSelect={setEtudiant} />
            )}
            {step === 2 && etudiant && (
              <Step2
                filiere={etudiant.filiere}
                annee={annee}
                niveau={niveau}
                typeInscription={typeInscription}
                setAnnee={setAnnee}
                setNiveau={setNiveau}
                setTypeInscription={setTypeInscription}
              />
            )}
            {step === 3 && etudiant && (
              <Step3
                etudiant={etudiant}
                annee={annee}
                niveau={niveau}
                typeInscription={typeInscription}
              />
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => step === 1 ? router.visit('/inscriptions') : setStep(s => s - 1)}
          >
            {step === 1 ? 'Annuler' : (
              <><ArrowLeft className="w-4 h-4 mr-1.5" /> Précédent</>
            )}
          </Button>

          <Button
            onClick={() => step < 3 ? setStep(s => s + 1) : handleSubmit()}
            disabled={!canNext()}
          >
            {step < 3 ? (
              <>Suivant <ChevronRight className="w-4 h-4 ml-1" /></>
            ) : (
              <><CheckCircle2 className="w-4 h-4 mr-1.5" /> Confirmer l'inscription</>
            )}
          </Button>
        </div>

      </div>
    </AppLayout>
  )
}