import AppLayout from '@/layouts/app-layout'
import { Head, Link } from '@inertiajs/react'
import { useState } from 'react'
import {
  PlusCircle, Search, X, ChevronDown,
  Eye, Pencil, Trash2, Users, UserCheck,
  UserX, ArrowRightLeft, SlidersHorizontal,
} from 'lucide-react'

import { Button }                               from '@/components/ui/button'
import { Input }                                from '@/components/ui/input'
import { Badge }                                from '@/components/ui/badge'
import { Card, CardContent }                    from '@/components/ui/card'
import { Table, TableBody, TableCell,
         TableHead, TableHeader, TableRow }     from '@/components/ui/table'
import { Select, SelectContent, SelectItem,
         SelectTrigger, SelectValue }           from '@/components/ui/select'
import { DropdownMenu, DropdownMenuContent,
         DropdownMenuItem, DropdownMenuSeparator,
         DropdownMenuTrigger }                  from '@/components/ui/dropdown-menu'

import {
  ETUDIANTS, STATUTS, statutConfig,
  type StatutEtudiant, type Etudiant,
} from './data/mock'

// ── Composants locaux ─────────────────────────────────────────────────────────

function StatutBadge({ statut }: { statut: StatutEtudiant }) {
  const { className, dotClass } = statutConfig[statut]
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
      {statut}
    </span>
  )
}

function Avatar({ prenom, nom, genre }: { prenom: string; nom: string; genre: string }) {
  const isFemme = genre === 'Féminin'
  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0
      ${isFemme ? 'bg-pink-100 text-pink-700' : 'bg-blue-100 text-blue-700'}`}>
      {prenom[0]}{nom[0]}
    </div>
  )
}

function StatCard({
  label, value, icon: Icon, color, bg,
}: { label: string; value: number | string; icon: React.ComponentType<{ className?: string }>; color: string; bg: string }) {
  return (
    <Card className="shadow-sm">
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
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Index() {
  const [search,       setSearch]       = useState('')
  const [filtreStatut, setFiltreStatut] = useState('all')
  const [filtreGenre,  setFiltreGenre]  = useState('all')

  const filtered = ETUDIANTS.filter(e => {
    const q = search.toLowerCase()
    const matchSearch = !q
      || `${e.prenom} ${e.nom}`.toLowerCase().includes(q)
      || e.ip.toLowerCase().includes(q)
      || (e.email ?? '').toLowerCase().includes(q)
      || e.lieu_naissance.toLowerCase().includes(q)
    return (
      matchSearch &&
      (filtreStatut === 'all' || e.statut === filtreStatut) &&
      (filtreGenre  === 'all' || e.genre  === filtreGenre)
    )
  })

  const hasFilters = search || filtreStatut !== 'all' || filtreGenre !== 'all'
  const reset = () => { setSearch(''); setFiltreStatut('all'); setFiltreGenre('all') }

  const stats = {
    total:     ETUDIANTS.length,
    affectes:  ETUDIANTS.filter(e => e.statut === 'Affecté').length,
    naff:      ETUDIANTS.filter(e => e.statut === 'Naff').length,
    transferts: ETUDIANTS.filter(e => e.statut === 'Transfert').length,
  }

  return (
    <AppLayout>
      <Head title="Étudiants" />

      <div className="p-6 space-y-6">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Étudiants</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Gérez le fichier des étudiants enregistrés.
            </p>
          </div>
          <Link href="/etudiants/create">
            <Button className="gap-2">
              <PlusCircle className="w-4 h-4" />
              Nouvel étudiant
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total étudiants"  value={stats.total}     icon={Users}           color="text-blue-600"    bg="bg-blue-50"    />
          <StatCard label="Affectés"          value={stats.affectes}  icon={UserCheck}       color="text-emerald-600" bg="bg-emerald-50" />
          <StatCard label="Non affectés"      value={stats.naff}      icon={UserX}           color="text-rose-600"    bg="bg-rose-50"    />
          <StatCard label="Transferts"        value={stats.transferts} icon={ArrowRightLeft} color="text-amber-600"   bg="bg-amber-50"   />
        </div>

        {/* Filtres */}
        <Card className="shadow-sm">
          <CardContent className="p-4 flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[220px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Nom, IP, email, lieu de naissance…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>

            <Select value={filtreStatut} onValueChange={setFiltreStatut}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous statuts</SelectItem>
                {STATUTS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>

            <Select value={filtreGenre} onValueChange={setFiltreGenre}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous genres</SelectItem>
                <SelectItem value="Masculin">Masculin</SelectItem>
                <SelectItem value="Féminin">Féminin</SelectItem>
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
                <TableHead>IP</TableHead>
                <TableHead>Date de naissance</TableHead>
                <TableHead>Lieu de naissance</TableHead>
                <TableHead>Nationalité</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="w-[80px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-48 text-center">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <Users className="w-10 h-10 opacity-20" />
                      <p className="text-sm">Aucun étudiant ne correspond à vos critères.</p>
                      {hasFilters && (
                        <Button variant="link" size="sm" onClick={reset}>Effacer les filtres</Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map(e => (
                  <TableRow key={e.ip} className="group">

                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <Avatar prenom={e.prenom} nom={e.nom} genre={e.genre} />
                        <div>
                          <p className="text-sm font-semibold leading-none">
                            {e.civilite} {e.prenom} {e.nom}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {e.email ?? <span className="italic">Pas d'email</span>}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">
                        {e.ip}
                      </code>
                    </TableCell>

                    <TableCell className="text-sm tabular-nums text-muted-foreground">
                      {new Date(e.date_naissance).toLocaleDateString('fr-FR')}
                    </TableCell>

                    <TableCell className="text-sm">{e.lieu_naissance}</TableCell>

                    <TableCell className="text-sm">{e.nationnalite}</TableCell>

                    <TableCell>
                      <StatutBadge statut={e.statut} />
                    </TableCell>

                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost" size="sm"
                            className="h-8 gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            Actions <ChevronDown className="w-3 h-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuItem asChild>
                            <Link href={`/etudiants/${e.ip}/show`} className="flex items-center gap-2 cursor-pointer">
                              <Eye className="w-4 h-4" /> Voir le profil
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/etudiants/${e.ip}/edit`} className="flex items-center gap-2 cursor-pointer">
                              <Pencil className="w-4 h-4" /> Modifier
                            </Link>
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