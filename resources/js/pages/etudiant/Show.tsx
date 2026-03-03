import AppLayout from '@/layouts/app-layout'
import { Head, Link } from '@inertiajs/react'
import { useState } from 'react'
import {
  ArrowLeft, Pencil, User, BookOpen,
  Phone, Users, GraduationCap,
  Mail, MapPin, Hash, Calendar,
  Globe, Shield, FileText, Briefcase,
  Clock,
} from 'lucide-react'

import { Button }                               from '@/components/ui/button'
import { Badge }                                from '@/components/ui/badge'
import { Card, CardContent, CardHeader,
         CardTitle }                            from '@/components/ui/card'
import { Separator }                            from '@/components/ui/separator'
import { Alert, AlertDescription }             from '@/components/ui/alert'

import { ETUDIANTS, INSCRIPTIONS as INS_MOCK,
         statutConfig, type StatutEtudiant }   from './data/mock'

// on réutilise les inscriptions du module inscriptions pour la démo
// en prod, elles viendraient des props
import type { Inscription } from '../inscription/data/mock'
import { INSCRIPTIONS, fmt, statutConfig as insStatutConfig }
  from '../inscription/data/mock'

// ── Mock ──────────────────────────────────────────────────────────────────────
const MOCK_IP = 'ETU-2024-001'

// ── Helpers ───────────────────────────────────────────────────────────────────

function StatutBadge({ statut }: { statut: StatutEtudiant }) {
  const { className, dotClass } = statutConfig[statut]
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
      {statut}
    </span>
  )
}

function InfoRow({
  icon: Icon, label, value,
}: { icon: React.ComponentType<{ className?: string }>; label: string; value: string | null | undefined }) {
  if (!value) return null
  return (
    <div className="flex items-start gap-3 py-2.5 border-b last:border-0">
      <div className="p-1.5 bg-muted rounded-md shrink-0 mt-0.5">
        <Icon className="w-3.5 h-3.5 text-muted-foreground" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] text-muted-foreground uppercase tracking-wide font-semibold">{label}</p>
        <p className="text-sm font-medium mt-0.5 break-words">{value}</p>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">{title}</p>
      <Card className="shadow-sm overflow-hidden">
        <CardContent className="p-4 divide-y-0">
          {children}
        </CardContent>
      </Card>
    </div>
  )
}

// ── Onglets ───────────────────────────────────────────────────────────────────

type Tab = 'profil' | 'academique' | 'contact' | 'responsable' | 'inscriptions'

const TABS: { id: Tab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'profil',       label: 'Profil',        icon: User          },
  { id: 'academique',   label: 'Académique',    icon: BookOpen      },
  { id: 'contact',      label: 'Contact',       icon: Phone         },
  { id: 'responsable',  label: 'Responsable',   icon: Users         },
  { id: 'inscriptions', label: 'Inscriptions',  icon: GraduationCap },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Show() {
  // En production : const { etudiant } = usePage<{ etudiant: Etudiant }>().props
  const etudiant = ETUDIANTS.find(e => e.ip === MOCK_IP)!
  const inscriptions = INSCRIPTIONS.filter(i => i.etudiant.ip === MOCK_IP ||
    // fallback mock: afficher la première inscription pour la démo
    (MOCK_IP === 'ETU-2024-001' && i.id === 1)
  )

  const [activeTab, setActiveTab] = useState<Tab>('profil')

  const age = new Date().getFullYear() - new Date(etudiant.date_naissance).getFullYear()

  return (
    <AppLayout>
      <Head title={`${etudiant.prenom} ${etudiant.nom}`} />

      <div className="p-6 space-y-6">

        {/* Breadcrumb */}
        <Link
          href="/etudiants"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Retour aux étudiants
        </Link>

        {/* Header */}
        <Card className="shadow-sm overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-primary to-primary/30" />
          <CardContent className="p-5">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Avatar */}
              <div className={`
                w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold shrink-0
                ${etudiant.genre === 'Féminin' ? 'bg-pink-100 text-pink-700' : 'bg-blue-100 text-blue-700'}
              `}>
                {etudiant.prenom[0]}{etudiant.nom[0]}
              </div>

              {/* Infos principales */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1 className="text-xl font-bold tracking-tight">
                    {etudiant.civilite} {etudiant.prenom} {etudiant.nom}
                  </h1>
                  <StatutBadge statut={etudiant.statut} />
                  <Badge variant="outline" className="text-xs">
                    {etudiant.genre}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Hash className="w-3 h-3" />
                    <code className="font-mono text-xs">{etudiant.ip}</code>
                  </span>
                  {etudiant.email && (
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3" /> {etudiant.email}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(etudiant.date_naissance).toLocaleDateString('fr-FR')} ({age} ans)
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="shrink-0">
                <Link href={`/etudiants/${etudiant.ip}/edit`}>
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <Pencil className="w-3.5 h-3.5" /> Modifier
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Onglets */}
        <div className="border-b flex gap-0 overflow-x-auto">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`
                inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px whitespace-nowrap
                transition-colors
                ${activeTab === id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'}
              `}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* ─── Onglet Profil ──────────────────────────────────────────── */}
        {activeTab === 'profil' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Section title="État civil">
              <InfoRow icon={User}     label="Nom complet"      value={`${etudiant.civilite} ${etudiant.prenom} ${etudiant.nom}`} />
              <InfoRow icon={Calendar} label="Date de naissance" value={new Date(etudiant.date_naissance).toLocaleDateString('fr-FR')} />
              <InfoRow icon={MapPin}   label="Lieu de naissance" value={etudiant.lieu_naissance} />
              <InfoRow icon={Globe}    label="Nationalité"       value={etudiant.nationnalite} />
              <InfoRow icon={Globe}    label="Pays de résidence" value={etudiant.pays_residence} />
            </Section>

            <Section title="Identifiant">
              <InfoRow icon={Hash}     label="IP (identifiant permanent)" value={etudiant.ip} />
              <InfoRow icon={Hash}     label="Matricule secondaire"        value={etudiant.matricule_secondaire} />
              <InfoRow icon={User}     label="Statut"                      value={etudiant.statut} />
              <InfoRow icon={Clock}    label="Enregistré le"
                value={new Date(etudiant.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })} />
            </Section>
          </div>
        )}

        {/* ─── Onglet Académique ──────────────────────────────────────── */}
        {activeTab === 'academique' && (
          <div className="space-y-6">
            <Section title="Baccalauréat">
              <InfoRow icon={BookOpen}  label="Établissement d'origine" value={etudiant.etablissement_origine} />
              <InfoRow icon={FileText}  label="Série"                   value={etudiant.serie_bac} />
              <InfoRow icon={Calendar}  label="Année d'obtention"       value={etudiant.annee_obtention_bac} />
              <InfoRow icon={Hash}      label="N° de table"             value={etudiant.numero_table_bac} />
            </Section>

            {!etudiant.etablissement_origine && !etudiant.serie_bac && (
              <Alert className="bg-muted/40 border-muted">
                <BookOpen className="w-4 h-4" />
                <AlertDescription className="text-sm text-muted-foreground">
                  Aucune information académique renseignée.{' '}
                  <Link href={`/etudiants/${etudiant.ip}/edit`} className="underline">
                    Compléter le profil
                  </Link>
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        {/* ─── Onglet Contact ─────────────────────────────────────────── */}
        {activeTab === 'contact' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Section title="Coordonnées">
              <InfoRow icon={Mail}   label="Email"    value={etudiant.email} />
              <InfoRow icon={Phone}  label="Téléphone / Contacts" value={etudiant.contacts} />
              <InfoRow icon={MapPin} label="Adresse géographique" value={etudiant.adresse_geographique} />
            </Section>

            <Section title="Pièce d'identité">
              <InfoRow icon={Shield}   label="Nature de la pièce"   value={etudiant.nature_piece} />
              <InfoRow icon={Hash}     label="Numéro de la pièce"   value={etudiant.numero_piece} />
            </Section>
          </div>
        )}

        {/* ─── Onglet Responsable ─────────────────────────────────────── */}
        {activeTab === 'responsable' && (
          <div className="space-y-6">
            {etudiant.nom_responsable ? (
              <Section title="Contact d'urgence">
                <InfoRow icon={Users}     label="Type"       value={etudiant.type_responsable} />
                <InfoRow icon={User}      label="Nom"        value={etudiant.nom_responsable} />
                <InfoRow icon={Phone}     label="Téléphone"  value={etudiant.numero_responsable} />
                <InfoRow icon={Briefcase} label="Profession" value={etudiant.profession_responsable} />
              </Section>
            ) : (
              <Alert className="bg-muted/40 border-muted">
                <Users className="w-4 h-4" />
                <AlertDescription className="text-sm text-muted-foreground">
                  Aucun responsable renseigné.{' '}
                  <Link href={`/etudiants/${etudiant.ip}/edit`} className="underline">
                    Ajouter un responsable
                  </Link>
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        {/* ─── Onglet Inscriptions ────────────────────────────────────── */}
        {activeTab === 'inscriptions' && (
          <div className="space-y-4">
            {inscriptions.length === 0 ? (
              <Alert className="bg-muted/40 border-muted">
                <GraduationCap className="w-4 h-4" />
                <AlertDescription className="text-sm text-muted-foreground">
                  Aucune inscription enregistrée pour cet étudiant.{' '}
                  <Link href="/inscriptions/create" className="underline">
                    Inscrire l'étudiant
                  </Link>
                </AlertDescription>
              </Alert>
            ) : (
              inscriptions.map(ins => {
                const pct = ins.totalScolarite > 0
                  ? Math.round((ins.montantPaye / ins.totalScolarite) * 100) : 0
                const { className: sc, dotClass: sd } = insStatutConfig[ins.statut]
                return (
                  <Card key={ins.id} className="shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-semibold text-sm">{ins.annee}</span>
                            <Badge variant="secondary" className="font-bold">{ins.niveau}</Badge>
                            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold ${sc}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${sd}`} />
                              {ins.statut}
                            </span>
                            <span className="text-xs text-muted-foreground">{ins.typeInscription}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Payé : {fmt(ins.montantPaye)} / {fmt(ins.totalScolarite)} · {pct}%
                          </p>
                        </div>
                        <Link href={`/inscriptions/${ins.id}`}>
                          <Button variant="outline" size="sm" className="gap-1.5">
                            Voir l'inscription
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                )
              })
            )}

            <div className="text-center pt-2">
              <Link href="/inscriptions/create">
                <Button variant="outline" size="sm" className="gap-1.5">
                  <GraduationCap className="w-4 h-4" />
                  Nouvelle inscription
                </Button>
              </Link>
            </div>
          </div>
        )}

      </div>
    </AppLayout>
  )
}