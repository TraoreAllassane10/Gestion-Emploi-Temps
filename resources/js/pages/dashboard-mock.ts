// data/dashboard-mock.ts

import { StatFinanciere } from "@/types"

export interface DernierPaiement {
  id: number
  etudiant: string
  ip: string
  montant: number
  type: string
  date: string
  niveau: string
}

export interface DerniereInscription {
  id: number
  etudiant: string
  ip: string
  niveau: string
  filiere: string
  annee: string
  date: string
}

export interface AlerteItem {
  id: number
  type: 'dette' | 'non_inscrit' | 'retard'
  etudiant: string
  ip: string
  detail: string
  montant?: number
}

export interface EvolutionMensuelle {
  mois: string
  paye: number
  attendu: number
}

export interface RepartitionNiveau {
  niveau: string
  inscrits: number
  couleur: string
}

export const STATS_GLOBALES = {
  totalEtudiants: 247,
  totalInscriptions: 231,
  totalEnseignants: 34,
  totalFilieres: 8,
  anneeEnCours: '2024-2025',
}

export const STAT_FINANCIERE: StatFinanciere = {
  totalAttendu: 112_500_000,
  totalPaye:     74_850_000,
  resteAPayer:   37_650_000,
  tauxRecouvrement: 66,
}

export const EVOLUTION_MENSUELLE: EvolutionMensuelle[] = [
  { mois: 'Sep',  paye: 18_200_000, attendu: 20_000_000 },
  { mois: 'Oct',  paye: 12_400_000, attendu: 15_000_000 },
  { mois: 'Nov',  paye: 11_800_000, attendu: 15_000_000 },
  { mois: 'Déc',  paye:  9_500_000, attendu: 12_000_000 },
  { mois: 'Jan',  paye: 10_200_000, attendu: 12_500_000 },
  { mois: 'Fév',  paye:  8_750_000, attendu: 10_000_000 },
  { mois: 'Mar',  paye:  4_000_000, attendu: 10_000_000 },
]

export const REPARTITION_NIVEAUX: RepartitionNiveau[] = [
  { niveau: 'L1', inscrits: 68, couleur: '#3b82f6' },
  { niveau: 'L2', inscrits: 54, couleur: '#8b5cf6' },
  { niveau: 'L3', inscrits: 47, couleur: '#06b6d4' },
  { niveau: 'M1', inscrits: 38, couleur: '#10b981' },
  { niveau: 'M2', inscrits: 24, couleur: '#f59e0b' },
]

export const DERNIERS_PAIEMENTS: DernierPaiement[] = [
  { id: 1, etudiant: 'Aminata Konaté',    ip: 'ETU-2024-001', montant: 50_000, type: 'Mensualité',           date: '2025-03-14', niveau: 'L2'    },
  { id: 2, etudiant: 'Ibrahim Coulibaly', ip: 'ETU-2024-002', montant: 75_000, type: "Frais d'inscription",  date: '2025-03-13', niveau: 'M1'    },
  { id: 3, etudiant: 'Oumar Diallo',      ip: 'ETU-2024-004', montant: 90_000, type: 'Mensualité',           date: '2025-03-12', niveau: 'DCEM2' },
  { id: 4, etudiant: 'Karidia Ouattara',  ip: 'ETU-2024-007', montant: 50_000, type: 'Paiement partiel',     date: '2025-03-11', niveau: 'L1'    },
  { id: 5, etudiant: 'Drissa Sanogo',     ip: 'ETU-2024-006', montant: 60_000, type: 'Mensualité',           date: '2025-03-10', niveau: 'L3'    },
  { id: 6, etudiant: 'Mariam Bamba',      ip: 'ETU-2024-005', montant: 50_000, type: 'Mensualité',           date: '2025-03-09', niveau: 'L3'    },
]

export const DERNIERES_INSCRIPTIONS = [
  { id: 5, etudiant: 'Mariam Bamba',      ip: 'ETU-2024-005', niveau: 'L3', filiere: 'Informatique', annee: '2024-2025', date: '2024-09-10' },
  { id: 3, etudiant: 'Fatoumata Traoré',  ip: 'ETU-2024-003', niveau: 'L1', filiere: 'Droit',        annee: '2024-2025', date: '2024-09-05' },
  { id: 2, etudiant: 'Ibrahim Coulibaly', ip: 'ETU-2024-002', niveau: 'M1', filiere: 'Gestion',      annee: '2024-2025', date: '2024-09-03' },
  { id: 1, etudiant: 'Aminata Konaté',    ip: 'ETU-2024-001', niveau: 'L2', filiere: 'Informatique', annee: '2024-2025', date: '2024-09-02' },
]

export const ALERTES: AlerteItem[] = [
  { id: 1, type: 'dette',       etudiant: 'Fatoumata Traoré', ip: 'ETU-2024-003', detail: 'Retard de 3 mois',           montant: 150_000 },
  { id: 2, type: 'dette',       etudiant: 'Mariam Bamba',     ip: 'ETU-2024-005', detail: 'Aucun paiement enregistré',   montant: 560_000 },
  { id: 3, type: 'dette',       etudiant: 'Karidia Ouattara', ip: 'ETU-2024-007', detail: 'Retard de 2 mois',           montant: 100_000 },
  { id: 4, type: 'non_inscrit', etudiant: 'Sékou Fofana',     ip: 'ETU-2023-089', detail: "Pas d'inscription 2024-2025" },
  { id: 5, type: 'non_inscrit', etudiant: 'Adjoa Mensah',     ip: 'ETU-2023-104', detail: "Pas d'inscription 2024-2025" },
]

export const fmt = (n: number) =>
  new Intl.NumberFormat('fr-CI', { style: 'currency', currency: 'XOF', maximumFractionDigits: 0 }).format(n)

