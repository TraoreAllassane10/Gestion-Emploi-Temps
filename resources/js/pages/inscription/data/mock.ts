// data/mock.ts  — données partagées entre les 3 pages

import { Statut, TypeInscription } from "@/types"



export interface Etudiant {
  id: number
  nom: string
  prenom: string
  matricule: string
  filiere: string
  email: string
  telephone: string
  dateNaissance: string
}

export interface Paiement {
  id: number
  date: string
  type: string
  montant: number
  reste: number
  reference: string
}

export interface ResultatUE {
  code: string
  intitule: string
  note: number
  credit: number
  statut: 'Validé' | 'Ajourné'
}

export interface Inscription {
  id: number
  etudiant: Etudiant
  annee: string
  niveau: string
  statut: Statut
  typeInscription: TypeInscription
  semestre: string
  fraisInscription: number
  totalScolarite: number
  montantPaye: number
  nombreMensualites: number
  paiements: Paiement[]
  resultats: {
    moyenneS1: number | null
    moyenneS2: number | null
    decision: string | null
    ues: ResultatUE[]
  }
  dateInscription: string
}

export const ETUDIANTS: Etudiant[] = [
  { id: 1, nom: 'Konaté',    prenom: 'Aminata',   matricule: 'ETU-2024-001', filiere: 'Informatique', email: 'aminata.konate@univ.ci',   telephone: '+225 07 12 34 56', dateNaissance: '2002-03-15' },
  { id: 2, nom: 'Coulibaly', prenom: 'Ibrahim',   matricule: 'ETU-2024-002', filiere: 'Gestion',      email: 'ibrahim.coulibaly@univ.ci', telephone: '+225 05 98 76 54', dateNaissance: '2001-11-08' },
  { id: 3, nom: 'Traoré',    prenom: 'Fatoumata', matricule: 'ETU-2024-003', filiere: 'Droit',        email: 'fatoumata.traore@univ.ci',  telephone: '+225 01 23 45 67', dateNaissance: '2003-06-22' },
  { id: 4, nom: 'Diallo',    prenom: 'Oumar',     matricule: 'ETU-2024-004', filiere: 'Médecine',     email: 'oumar.diallo@univ.ci',      telephone: '+225 07 77 88 99', dateNaissance: '2000-01-30' },
  { id: 5, nom: 'Bamba',     prenom: 'Mariam',    matricule: 'ETU-2024-005', filiere: 'Informatique', email: 'mariam.bamba@univ.ci',      telephone: '+225 05 44 33 22', dateNaissance: '2002-09-10' },
  { id: 6, nom: 'Sanogo',    prenom: 'Drissa',    matricule: 'ETU-2024-006', filiere: 'Gestion',      email: 'drissa.sanogo@univ.ci',     telephone: '+225 01 66 55 44', dateNaissance: '2001-04-18' },
]

export const ANNEES_UNIVERSITAIRES = ['2024-2025', '2023-2024', '2022-2023']

export const NIVEAUX_PAR_FILIERE: Record<string, string[]> = {
  Informatique: ['L1', 'L2', 'L3', 'M1', 'M2'],
  Gestion:      ['L1', 'L2', 'L3', 'M1', 'M2'],
  Droit:        ['L1', 'L2', 'L3', 'M1', 'M2'],
  Médecine:     ['PCEM1', 'PCEM2', 'DCEM1', 'DCEM2', 'DCEM3'],
}

export const FRAIS_PAR_NIVEAU: Record<string, { inscription: number; scolarite: number; mensualites: number }> = {
  L1:    { inscription: 50000,  scolarite: 450000,   mensualites: 9 },
  L2:    { inscription: 50000,  scolarite: 450000,   mensualites: 9 },
  L3:    { inscription: 60000,  scolarite: 500000,   mensualites: 9 },
  M1:    { inscription: 75000,  scolarite: 650000,   mensualites: 9 },
  M2:    { inscription: 75000,  scolarite: 700000,   mensualites: 9 },
  PCEM1: { inscription: 80000,  scolarite: 800000,   mensualites: 10 },
  PCEM2: { inscription: 80000,  scolarite: 800000,   mensualites: 10 },
  DCEM1: { inscription: 90000,  scolarite: 900000,   mensualites: 10 },
  DCEM2: { inscription: 90000,  scolarite: 950000,   mensualites: 10 },
  DCEM3: { inscription: 90000,  scolarite: 1000000,  mensualites: 10 },
}

export const INSCRIPTIONS: Inscription[] = [
  {
    id: 1,
    etudiant: ETUDIANTS[0],
    annee: '2024-2025', niveau: 'L2', statut: 'Actif',
    typeInscription: 'Nouvelle', semestre: 'Semestre 1',
    fraisInscription: 50000, totalScolarite: 500000, montantPaye: 250000, nombreMensualites: 9,
    dateInscription: '2024-09-02',
    paiements: [
      { id: 1, date: '2024-09-05', type: "Frais d'inscription", montant: 50000,  reste: 450000, reference: 'PAY-2024-001' },
      { id: 2, date: '2024-10-01', type: 'Mensualité',          montant: 50000,  reste: 400000, reference: 'PAY-2024-002' },
      { id: 3, date: '2024-11-03', type: 'Mensualité',          montant: 50000,  reste: 350000, reference: 'PAY-2024-003' },
      { id: 4, date: '2024-12-02', type: 'Mensualité',          montant: 50000,  reste: 300000, reference: 'PAY-2024-004' },
      { id: 5, date: '2025-01-06', type: 'Mensualité',          montant: 50000,  reste: 250000, reference: 'PAY-2024-005' },
    ],
    resultats: {
      moyenneS1: 14.25, moyenneS2: null, decision: null,
      ues: [
        { code: 'INF301', intitule: 'Programmation Web',  note: 15,   credit: 3, statut: 'Validé' },
        { code: 'INF302', intitule: 'Base de données',     note: 13.5, credit: 3, statut: 'Validé' },
        { code: 'INF303', intitule: 'Réseaux',             note: 14,   credit: 2, statut: 'Validé' },
        { code: 'MAT301', intitule: 'Mathématiques',       note: 16,   credit: 4, statut: 'Validé' },
        { code: 'ANG301', intitule: 'Anglais technique',   note: 12.5, credit: 2, statut: 'Validé' },
      ],
    },
  },
  {
    id: 2,
    etudiant: ETUDIANTS[1],
    annee: '2024-2025', niveau: 'M1', statut: 'Actif',
    typeInscription: 'Nouvelle', semestre: 'Semestre 2',
    fraisInscription: 75000, totalScolarite: 725000, montantPaye: 725000, nombreMensualites: 9,
    dateInscription: '2024-09-03',
    paiements: [],
    resultats: { moyenneS1: 15.8, moyenneS2: 16.2, decision: 'Admis(e)', ues: [] },
  },
  {
    id: 3,
    etudiant: ETUDIANTS[2],
    annee: '2024-2025', niveau: 'L1', statut: 'Suspendu',
    typeInscription: 'Redoublement', semestre: 'Semestre 1',
    fraisInscription: 50000, totalScolarite: 500000, montantPaye: 100000, nombreMensualites: 9,
    dateInscription: '2024-09-05',
    paiements: [],
    resultats: { moyenneS1: null, moyenneS2: null, decision: null, ues: [] },
  },
  {
    id: 4,
    etudiant: ETUDIANTS[3],
    annee: '2023-2024', niveau: 'DCEM2', statut: 'Terminé',
    typeInscription: 'Nouvelle', semestre: 'Semestre 2',
    fraisInscription: 90000, totalScolarite: 1040000, montantPaye: 1040000, nombreMensualites: 10,
    dateInscription: '2023-09-01',
    paiements: [],
    resultats: { moyenneS1: 13.4, moyenneS2: 14.1, decision: 'Admis(e)', ues: [] },
  },
  {
    id: 5,
    etudiant: ETUDIANTS[4],
    annee: '2024-2025', niveau: 'L3', statut: 'Actif',
    typeInscription: 'Transfert', semestre: 'Semestre 1',
    fraisInscription: 60000, totalScolarite: 560000, montantPaye: 0, nombreMensualites: 9,
    dateInscription: '2024-09-10',
    paiements: [],
    resultats: { moyenneS1: null, moyenneS2: null, decision: null, ues: [] },
  },
]

export const fmt = (n: number) =>
  new Intl.NumberFormat('fr-CI', { style: 'currency', currency: 'XOF', maximumFractionDigits: 0 }).format(n)

export const statutConfig: Record<Statut, { label: string; className: string; dotClass: string }> = {
  Actif:    { label: 'Actif',    className: 'bg-emerald-50 text-emerald-700 border border-emerald-200', dotClass: 'bg-emerald-500' },
  Suspendu: { label: 'Suspendu', className: 'bg-amber-50 text-amber-700 border border-amber-200',       dotClass: 'bg-amber-500'   },
  Terminé:  { label: 'Terminé',  className: 'bg-slate-100 text-slate-600 border border-slate-200',      dotClass: 'bg-slate-400'   },
}