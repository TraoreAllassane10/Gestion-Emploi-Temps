import AppLayout from '@/layouts/app-layout'
import { Head, Link } from '@inertiajs/react'
import { useState } from 'react'
import {
  ArrowLeft, User, Wallet, BarChart2,
  PlusCircle, CheckCircle2, Clock,
  Mail, Phone, Calendar, Hash,
  TrendingUp, AlertTriangle, Download,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Card, CardContent, CardHeader, CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogFooter,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from '@/components/ui/select'
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow,
} from '@/components/ui/table'
import { Alert, AlertDescription } from '@/components/ui/alert'

import {
  INSCRIPTIONS, fmt, statutConfig,
  type Statut, type Inscription,
} from './data/mock'

// ── Helpers ───────────────────────────────────────────────────────────────────

// En vrai, l'id viendrait des props Inertia : usePage().props
const MOCK_ID = 1

function StatutBadge({ statut }: { statut: Statut }) {
  const { className, dotClass, label } = statutConfig[statut]
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
      {label}
    </span>
  )
}

function InfoField({ icon: Icon, label, value }: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/40">
      <div className="p-1.5 bg-background rounded-md border">
        <Icon className="w-3.5 h-3.5 text-muted-foreground" />
      </div>
      <div>
        <p className="text-[11px] text-muted-foreground uppercase tracking-wide font-semibold">{label}</p>
        <p className="text-sm font-medium mt-0.5">{value}</p>
      </div>
    </div>
  )
}

// ── Modal Ajout Paiement ──────────────────────────────────────────────────────

function ModalPaiement({
  open, onClose, resteAPayer,
}: { open: boolean; onClose: () => void; resteAPayer: number }) {
  const [montant, setMontant] = useState('')
  const [type,    setType]    = useState('Mensualité')

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Enregistrer un paiement</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="p-3 rounded-lg bg-muted/50 text-sm flex justify-between">
            <span className="text-muted-foreground">Reste à payer</span>
            <span className="font-bold text-rose-600">{fmt(resteAPayer)}</span>
          </div>

          <div className="space-y-2">
            <Label>Type de paiement</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["Frais d'inscription", 'Mensualité', 'Paiement partiel', 'Solde total'].map(t => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Montant (FCFA)</Label>
            <Input
              type="number"
              placeholder="Ex : 50 000"
              value={montant}
              onChange={e => setMontant(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Annuler</Button>
          <Button
            onClick={onClose}
            disabled={!montant || Number(montant) <= 0}
            className="gap-2"
          >
            <CheckCircle2 className="w-4 h-4" /> Confirmer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// ── Onglets ───────────────────────────────────────────────────────────────────

type Tab = 'general' | 'financier' | 'resultats'

const TABS: { id: Tab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'general',   label: 'Informations générales', icon: User     },
  { id: 'financier', label: 'Situation financière',    icon: Wallet   },
  { id: 'resultats', label: 'Résultats académiques',   icon: BarChart2 },
]

// ── Onglet 1 ──────────────────────────────────────────────────────────────────

function TabGeneral({ ins }: { ins: Inscription }) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
          Informations personnelles
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <InfoField icon={User}     label="Nom complet"    value={`${ins.etudiant.prenom} ${ins.etudiant.nom}`} />
          <InfoField icon={Hash}     label="Matricule"      value={ins.etudiant.matricule} />
          <InfoField icon={Mail}     label="Email"          value={ins.etudiant.email} />
          <InfoField icon={Phone}    label="Téléphone"      value={ins.etudiant.telephone} />
          <InfoField icon={Calendar} label="Date naissance" value={ins.etudiant.dateNaissance} />
          <InfoField icon={User}     label="Filière"        value={ins.etudiant.filiere} />
        </div>
      </div>

      <Separator />

      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
          Informations académiques
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <InfoField icon={Calendar} label="Année universitaire" value={ins.annee} />
          <InfoField icon={Hash}     label="Niveau"              value={ins.niveau} />
          <InfoField icon={User}     label="Type d'inscription"  value={ins.typeInscription} />
          <InfoField icon={Clock}    label="Semestre"            value={ins.semestre} />
          <InfoField icon={Calendar} label="Date d'inscription"  value={ins.dateInscription} />
          <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/40">
            <div className="p-1.5 bg-background rounded-md border">
              <CheckCircle2 className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-[11px] text-muted-foreground uppercase tracking-wide font-semibold">Statut</p>
              <div className="mt-1">
                <StatutBadge statut={ins.statut} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Onglet 2 ──────────────────────────────────────────────────────────────────

function TabFinancier({ ins }: { ins: Inscription }) {
  const [modalOpen, setModalOpen] = useState(false)
  const pct  = ins.totalScolarite > 0
    ? Math.round((ins.montantPaye / ins.totalScolarite) * 100)
    : 0
  const reste = ins.totalScolarite - ins.montantPaye

  return (
    <div className="space-y-6">
      {/* KPI cards */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total à payer',  value: fmt(ins.totalScolarite), color: 'text-blue-600',   bg: 'bg-blue-50'   },
          { label: 'Montant payé',   value: fmt(ins.montantPaye),    color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Reste à payer',  value: fmt(reste),              color: reste > 0 ? 'text-rose-600' : 'text-emerald-600', bg: reste > 0 ? 'bg-rose-50' : 'bg-emerald-50' },
        ].map(item => (
          <div key={item.label} className={`rounded-xl p-4 ${item.bg} text-center`}>
            <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wide mb-1">{item.label}</p>
            <p className={`text-lg font-bold ${item.color}`}>{item.value}</p>
          </div>
        ))}
      </div>

      {/* Barre de progression */}
      <Card>
        <CardContent className="p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Progression des paiements</span>
            <span className={`font-bold tabular-nums ${pct >= 100 ? 'text-emerald-600' : 'text-primary'}`}>
              {pct}%
            </span>
          </div>
          <Progress value={pct} className="h-2.5" />
          <p className="text-xs text-muted-foreground">
            {ins.nombreMensualites} mensualités · {fmt(Math.round(ins.totalScolarite / ins.nombreMensualites))} / mois
          </p>
        </CardContent>
      </Card>

      {/* Historique */}
      <Card>
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-semibold">Historique des paiements</CardTitle>
          <Button size="sm" className="gap-1.5 h-8" onClick={() => setModalOpen(true)}>
            <PlusCircle className="w-3.5 h-3.5" /> Ajouter
          </Button>
        </CardHeader>
        <Separator />
        {ins.paiements.length === 0 ? (
          <CardContent className="py-8 text-center text-sm text-muted-foreground">
            Aucun paiement enregistré.
          </CardContent>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead>Référence</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Montant</TableHead>
                <TableHead className="text-right">Reste</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ins.paiements.map(p => (
                <TableRow key={p.id}>
                  <TableCell className="text-xs font-mono text-muted-foreground">{p.reference}</TableCell>
                  <TableCell className="text-sm tabular-nums">{p.date}</TableCell>
                  <TableCell className="text-sm">{p.type}</TableCell>
                  <TableCell className="text-right text-sm font-semibold text-emerald-600 tabular-nums">
                    +{fmt(p.montant)}
                  </TableCell>
                  <TableCell className="text-right text-sm text-muted-foreground tabular-nums">
                    {fmt(p.reste)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>

      <ModalPaiement
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        resteAPayer={reste}
      />
    </div>
  )
}

// ── Onglet 3 ──────────────────────────────────────────────────────────────────

function TabResultats({ ins }: { ins: Inscription }) {
  const { moyenneS1, moyenneS2, decision, ues } = ins.resultats

  const moyenneColor = (m: number | null) => {
    if (m === null) return 'text-muted-foreground'
    return m >= 10 ? 'text-emerald-600' : 'text-rose-600'
  }

  return (
    <div className="space-y-6">
      {/* KPI moyennes */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Moyenne S1', value: moyenneS1 !== null ? `${moyenneS1}/20` : '—', color: moyenneColor(moyenneS1) },
          { label: 'Moyenne S2', value: moyenneS2 !== null ? `${moyenneS2}/20` : '—', color: moyenneColor(moyenneS2) },
          { label: 'Décision',   value: decision ?? '—', color: decision === 'Admis(e)' ? 'text-emerald-600' : decision ? 'text-rose-600' : 'text-muted-foreground' },
        ].map(item => (
          <Card key={item.label}>
            <CardContent className="p-4 text-center">
              <p className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wide mb-1">
                {item.label}
              </p>
              <p className={`text-xl font-bold ${item.color}`}>{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Détail UEs */}
      {ues.length > 0 ? (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Détail par UE — Semestre 1</CardTitle>
          </CardHeader>
          <Separator />
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead>Code</TableHead>
                <TableHead>Intitulé</TableHead>
                <TableHead className="text-center">Crédits</TableHead>
                <TableHead className="text-right">Note</TableHead>
                <TableHead className="text-center">Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ues.map(ue => (
                <TableRow key={ue.code}>
                  <TableCell className="text-xs font-mono text-muted-foreground">{ue.code}</TableCell>
                  <TableCell className="text-sm">{ue.intitule}</TableCell>
                  <TableCell className="text-center text-sm">{ue.credit}</TableCell>
                  <TableCell className="text-right">
                    <span className={`text-sm font-bold tabular-nums ${ue.note >= 10 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {ue.note}/20
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={ue.statut === 'Validé' ? 'default' : 'destructive'}
                      className="text-xs"
                    >
                      {ue.statut}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      ) : (
        <Alert>
          <Clock className="w-4 h-4" />
          <AlertDescription className="text-sm">
            Les résultats académiques ne sont pas encore disponibles pour cette inscription.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}

// ── Page principale ───────────────────────────────────────────────────────────

export default function Show() {
  // En production : const { inscription } = usePage<{ inscription: Inscription }>().props
  const ins = INSCRIPTIONS.find(i => i.id === MOCK_ID)!

  const [activeTab, setActiveTab] = useState<Tab>('general')

  const pct = ins.totalScolarite > 0
    ? Math.round((ins.montantPaye / ins.totalScolarite) * 100)
    : 0

  return (
    <AppLayout>
      <Head title={`Inscription — ${ins.etudiant.prenom} ${ins.etudiant.nom}`} />

      <div className="p-6  space-y-6">

        {/* Breadcrumb */}
        <Link
          href="/inscriptions"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Retour aux inscriptions
        </Link>

        {/* Header carte étudiant */}
        <Card className="shadow-sm overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-primary to-primary/40" />
          <CardContent className="p-5">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Avatar */}
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary text-lg font-bold shrink-0">
                {ins.etudiant.prenom[0]}{ins.etudiant.nom[0]}
              </div>

              {/* Infos */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-0.5">
                  <h1 className="text-xl font-bold tracking-tight">
                    {ins.etudiant.prenom} {ins.etudiant.nom}
                  </h1>
                  <StatutBadge statut={ins.statut} />
                  <Badge variant="secondary" className="font-bold">{ins.niveau}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {ins.etudiant.matricule} · {ins.etudiant.filiere} · {ins.annee}
                </p>
              </div>

              {/* Mini progression */}
              <div className="sm:text-right shrink-0">
                <p className="text-xs text-muted-foreground mb-1">Recouvrement</p>
                <p className={`text-lg font-bold tabular-nums ${pct >= 100 ? 'text-emerald-600' : 'text-primary'}`}>
                  {pct}%
                </p>
                <Progress value={pct} className="h-1.5 w-24 mt-1" />
              </div>

              {/* Actions */}
              <div className="flex gap-2 shrink-0">
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Download className="w-3.5 h-3.5" /> Bulletin
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Onglets */}
        <div className="border-b flex gap-0">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`
                inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px
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

        {/* Contenu onglet */}
        <div>
          {activeTab === 'general'   && <TabGeneral    ins={ins} />}
          {activeTab === 'financier' && <TabFinancier  ins={ins} />}
          {activeTab === 'resultats' && <TabResultats  ins={ins} />}
        </div>

      </div>
    </AppLayout>
  )
}