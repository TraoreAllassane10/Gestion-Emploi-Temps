import AppLayout from '@/layouts/app-layout'
import { Head, Link } from '@inertiajs/react'
import { useState } from 'react'
import {
  PlusCircle, Search, SlidersHorizontal, Eye,
  FileText, Trash2, GraduationCap, TrendingUp,
  Users, AlertCircle, ChevronDown, X,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow,
} from '@/components/ui/table'
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

import {
  INSCRIPTIONS, ANNEES_UNIVERSITAIRES,
  fmt, statutConfig,
  type Statut, type Inscription,
} from './data/mock'

// ── Composants locaux ─────────────────────────────────────────────────────────

function StatutBadge({ statut }: { statut: Statut }) {
  const { className, dotClass, label } = statutConfig[statut]
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
      {label}
    </span>
  )
}

function ProgressFinanciere({ paye, total }: { paye: number; total: number }) {
  const pct = total > 0 ? Math.round((paye / total) * 100) : 0
  const color = pct >= 100 ? 'text-emerald-600' : pct >= 50 ? 'text-amber-600' : 'text-rose-600'
  return (
    <div className="w-36">
      <div className="flex justify-between mb-1">
        <span className="text-xs text-muted-foreground">{fmt(paye)}</span>
        <span className={`text-xs font-bold ${color}`}>{pct}%</span>
      </div>
      <Progress value={pct} className="h-1.5" />
      <p className="text-[11px] text-muted-foreground mt-0.5">
        Reste : {fmt(total - paye)}
      </p>
    </div>
  )
}

function Avatar({ prenom, nom }: { prenom: string; nom: string }) {
  return (
    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold shrink-0">
      {prenom[0]}{nom[0]}
    </div>
  )
}

function StatCards({ list }: { list: Inscription[] }) {
  const actifs    = list.filter(i => i.statut === 'Actif').length
  const suspendus = list.filter(i => i.statut === 'Suspendu').length
  const totalPaye = list.reduce((s, i) => s + i.montantPaye, 0)
  const totalDu   = list.reduce((s, i) => s + i.totalScolarite, 0)
  const taux      = totalDu > 0 ? Math.round((totalPaye / totalDu) * 100) : 0

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: 'Total inscriptions',     value: list.length,  Icon: Users,        bg: 'bg-blue-50',    color: 'text-blue-600'    },
        { label: 'Étudiants actifs',        value: actifs,       Icon: GraduationCap, bg: 'bg-emerald-50', color: 'text-emerald-600' },
        { label: 'Comptes suspendus',       value: suspendus,    Icon: AlertCircle,   bg: 'bg-amber-50',   color: 'text-amber-600'   },
        { label: 'Taux de recouvrement',    value: `${taux}%`,   Icon: TrendingUp,    bg: 'bg-violet-50',  color: 'text-violet-600'  },
      ].map(({ label, value, Icon, bg, color }) => (
        <Card key={label} className="border shadow-sm">
          <CardContent className="p-4 flex items-center gap-3">
            <div className={`p-2 rounded-lg ${bg}`}>
              <Icon className={`w-4 h-4 ${color}`} />
            </div>
            <div>
              <p className="text-xl font-bold tracking-tight">{value}</p>
              <p className="text-xs text-muted-foreground leading-tight">{label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Index() {
  const [search,        setSearch]        = useState('')
  const [filtreAnnee,   setFiltreAnnee]   = useState('all')
  const [filtreNiveau,  setFiltreNiveau]  = useState('all')
  const [filtreStatut,  setFiltreStatut]  = useState('all')

  const niveaux = [...new Set(INSCRIPTIONS.map(i => i.niveau))].sort()

  const filtered = INSCRIPTIONS.filter(i => {
    const q = search.toLowerCase()
    const match = !q || `${i.etudiant.prenom} ${i.etudiant.nom}`.toLowerCase().includes(q)
                     || i.etudiant.matricule.toLowerCase().includes(q)
    return (
      match &&
      (filtreAnnee  === 'all' || i.annee  === filtreAnnee)  &&
      (filtreNiveau === 'all' || i.niveau === filtreNiveau) &&
      (filtreStatut === 'all' || i.statut === filtreStatut)
    )
  })

  const hasFilters = search || filtreAnnee !== 'all' || filtreNiveau !== 'all' || filtreStatut !== 'all'

  const reset = () => {
    setSearch(''); setFiltreAnnee('all')
    setFiltreNiveau('all'); setFiltreStatut('all')
  }

  return (
    <AppLayout>
      <Head title="Inscriptions" />

      <div className="p-6  space-y-6">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Inscriptions</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Gérez les inscriptions des étudiants.
            </p>
          </div>
          <Link href="/inscriptions/create">
            <Button className="gap-2">
              <PlusCircle className="w-4 h-4" />
              Nouvelle inscription
            </Button>
          </Link>
        </div>

        <StatCards list={INSCRIPTIONS} />

        {/* Filtres */}
        <Card className="shadow-sm">
          <CardContent className="p-4 flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[220px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Nom, prénom ou matricule…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>

            <Select value={filtreAnnee} onValueChange={setFiltreAnnee}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Année" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les années</SelectItem>
                {ANNEES_UNIVERSITAIRES.map(a => (
                  <SelectItem key={a} value={a}>{a}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filtreNiveau} onValueChange={setFiltreNiveau}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Niveau" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous niveaux</SelectItem>
                {niveaux.map(n => (
                  <SelectItem key={n} value={n}>{n}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filtreStatut} onValueChange={setFiltreStatut}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous statuts</SelectItem>
                {(['Actif', 'Suspendu', 'Terminé'] as Statut[]).map(s => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {hasFilters && (
              <Button variant="ghost" size="sm" onClick={reset} className="gap-1.5 text-muted-foreground">
                <X className="w-3.5 h-3.5" /> Réinitialiser
              </Button>
            )}

            <span className="ml-auto text-xs text-muted-foreground flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              {filtered.length} résultat{filtered.length !== 1 ? 's' : ''}
            </span>
          </CardContent>
        </Card>

        {/* Tableau */}
        <Card className="shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead>Étudiant</TableHead>
                <TableHead>Année</TableHead>
                <TableHead>Niveau</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Situation financière</TableHead>
                <TableHead className="w-[100px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-48 text-center">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <GraduationCap className="w-10 h-10 opacity-20" />
                      <p className="text-sm">Aucune inscription trouvée.</p>
                      {hasFilters && (
                        <Button variant="link" size="sm" onClick={reset}>
                          Effacer les filtres
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map(ins => (
                  <TableRow key={ins.id} className="group">

                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <Avatar prenom={ins.etudiant.prenom} nom={ins.etudiant.nom} />
                        <div>
                          <p className="text-sm font-medium leading-none">
                            {ins.etudiant.prenom} {ins.etudiant.nom}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {ins.etudiant.matricule} · {ins.etudiant.filiere}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="text-sm font-medium tabular-nums">
                      {ins.annee}
                    </TableCell>

                    <TableCell>
                      <Badge variant="secondary" className="font-bold">
                        {ins.niveau}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <span className="text-xs text-muted-foreground">
                        {ins.typeInscription}
                      </span>
                    </TableCell>

                    <TableCell>
                      <StatutBadge statut={ins.statut} />
                    </TableCell>

                    <TableCell>
                      <ProgressFinanciere paye={ins.montantPaye} total={ins.totalScolarite} />
                    </TableCell>

                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            Actions <ChevronDown className="w-3 h-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem asChild>
                            <Link href={`/inscriptions/${ins.id}`} className="flex items-center gap-2 cursor-pointer">
                              <Eye className="w-4 h-4" /> Voir les détails
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 cursor-pointer">
                            <FileText className="w-4 h-4" /> Générer le bulletin
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="gap-2 cursor-pointer text-destructive focus:text-destructive">
                            <Trash2 className="w-4 h-4" /> Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>

                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>

      </div>
    </AppLayout>
  )
}