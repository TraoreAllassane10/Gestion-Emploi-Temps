// data/mock.ts — données mockées pour la gestion des étudiants

import { Etudiant } from "@/types"

export type Civilite = 'M.' | 'Mme' | 'Mlle'
export type Genre = 'Masculin' | 'Féminin'
export type StatutEtudiant = 'Affecté' | 'Naff' | 'Réaffecté' | 'Transfert'
export type NaturePiece = 'CNI' | 'Passeport' | 'Titre de séjour' | 'Carte consulaire'

export const ETUDIANTS: Etudiant[] = [
  {
    ip: 'ETU-2024-001',
    civilite: 'Mme', genre: 'Féminin', nom: 'KONATÉ', prenom: 'Aminata',
    date_naissance: '2002-03-15', lieu_naissance: 'Abidjan', nationnalite: 'Ivoirienne',
    statut: 'Affecté',
    email: 'aminata.konate@univ.ci', pays_residence: "Côte d'Ivoire",
    etablissement_origine: 'Lycée Sainte-Marie de Cocody', annee_obtention_bac: '2021',
    serie_bac: 'D', numero_table_bac: '21-0045-A',
    contacts: '+225 07 12 34 56', nature_piece: 'CNI', numero_piece: 'CI-24-0123456',
    adresse_geographique: 'Cocody Angré, Rue des Jardins', matricule_secondaire: 'SEC-2021-0045',
    type_responsable: 'Père', nom_responsable: 'Konaté Sékou',
    numero_responsable: '+225 07 98 00 11', profession_responsable: 'Ingénieur',
    created_at: '2024-09-01T08:00:00Z', updated_at: '2024-09-01T08:00:00Z',
  },
  {
    ip: 'ETU-2024-002',
    civilite: 'M.', genre: 'Masculin', nom: 'COULIBALY', prenom: 'Ibrahim',
    date_naissance: '2001-11-08', lieu_naissance: 'Bouaké', nationnalite: 'Ivoirienne',
    statut: 'Affecté',
    email: 'ibrahim.coulibaly@univ.ci', pays_residence: "Côte d'Ivoire",
    etablissement_origine: 'Lycée Moderne de Bouaké', annee_obtention_bac: '2020',
    serie_bac: 'A2', numero_table_bac: '20-0112-B',
    contacts: '+225 05 98 76 54', nature_piece: 'CNI', numero_piece: 'CI-23-0654321',
    adresse_geographique: 'Bouaké Centre, Quartier Commerce', matricule_secondaire: 'SEC-2020-0112',
    type_responsable: 'Mère', nom_responsable: 'Coulibaly Mariam',
    numero_responsable: '+225 01 44 22 33', profession_responsable: 'Commerçante',
    created_at: '2024-09-02T09:00:00Z', updated_at: '2024-09-02T09:00:00Z',
  },
  {
    ip: 'ETU-2024-003',
    civilite: 'Mlle', genre: 'Féminin', nom: 'TRAORÉ', prenom: 'Fatoumata',
    date_naissance: '2003-06-22', lieu_naissance: 'Daloa', nationnalite: 'Ivoirienne',
    statut: 'Naff',
    email: 'fatoumata.traore@univ.ci', pays_residence: "Côte d'Ivoire",
    etablissement_origine: 'Lycée Classique de Daloa', annee_obtention_bac: '2022',
    serie_bac: 'C', numero_table_bac: '22-0234-C',
    contacts: '+225 01 23 45 67', nature_piece: 'Passeport', numero_piece: 'A12345678',
    adresse_geographique: 'Daloa, Quartier Lobia', matricule_secondaire: null,
    type_responsable: 'Tuteur', nom_responsable: 'Traoré Hamidou',
    numero_responsable: '+225 07 55 66 77', profession_responsable: 'Enseignant',
    created_at: '2024-09-03T10:00:00Z', updated_at: '2024-09-03T10:00:00Z',
  },
  {
    ip: 'ETU-2024-004',
    civilite: 'M.', genre: 'Masculin', nom: 'DIALLO', prenom: 'Oumar',
    date_naissance: '2000-01-30', lieu_naissance: 'Korhogo', nationnalite: 'Ivoirienne',
    statut: 'Réaffecté',
    email: 'oumar.diallo@univ.ci', pays_residence: "Côte d'Ivoire",
    etablissement_origine: 'Lycée Technique de Korhogo', annee_obtention_bac: '2019',
    serie_bac: 'D', numero_table_bac: '19-0078-D',
    contacts: '+225 07 77 88 99', nature_piece: 'CNI', numero_piece: 'CI-22-0789012',
    adresse_geographique: 'Korhogo, Résidence Universitaire', matricule_secondaire: 'SEC-2019-0078',
    type_responsable: 'Père', nom_responsable: 'Diallo Mamadou',
    numero_responsable: '+225 05 11 22 00', profession_responsable: 'Médecin',
    created_at: '2024-09-04T11:00:00Z', updated_at: '2024-09-04T11:00:00Z',
  },
  {
    ip: 'ETU-2024-005',
    civilite: 'Mme', genre: 'Féminin', nom: 'BAMBA', prenom: 'Mariam',
    date_naissance: '2002-09-10', lieu_naissance: 'San-Pédro', nationnalite: 'Ivoirienne',
    statut: 'Affecté',
    email: 'mariam.bamba@univ.ci', pays_residence: "Côte d'Ivoire",
    etablissement_origine: 'Lycée Moderne de San-Pédro', annee_obtention_bac: '2021',
    serie_bac: 'D', numero_table_bac: '21-0156-E',
    contacts: '+225 05 44 33 22', nature_piece: 'CNI', numero_piece: 'CI-24-0456789',
    adresse_geographique: "San-Pédro, Cité de l'Université", matricule_secondaire: null,
    type_responsable: null, nom_responsable: null, numero_responsable: null, profession_responsable: null,
    created_at: '2024-09-05T08:30:00Z', updated_at: '2024-09-05T08:30:00Z',
  },
  {
    ip: 'ETU-2024-006',
    civilite: 'M.', genre: 'Masculin', nom: 'SANOGO', prenom: 'Drissa',
    date_naissance: '2001-04-18', lieu_naissance: 'Man', nationnalite: 'Ivoirienne',
    statut: 'Transfert',
    email: 'drissa.sanogo@univ.ci', pays_residence: "Côte d'Ivoire",
    etablissement_origine: 'Lycée de Man', annee_obtention_bac: '2020',
    serie_bac: 'B', numero_table_bac: '20-0334-F',
    contacts: '+225 01 66 55 44', nature_piece: 'CNI', numero_piece: 'CI-23-0321654',
    adresse_geographique: 'Man, Quartier Belle-Ville', matricule_secondaire: 'SEC-2020-0334',
    type_responsable: 'Mère', nom_responsable: 'Sanogo Aïcha',
    numero_responsable: '+225 07 00 99 88', profession_responsable: 'Infirmière',
    created_at: '2024-09-06T09:00:00Z', updated_at: '2024-09-06T09:00:00Z',
  },
  {
    ip: 'ETU-2024-007',
    civilite: 'Mlle', genre: 'Féminin', nom: 'OUATTARA', prenom: 'Karidia',
    date_naissance: '2003-12-01', lieu_naissance: 'Yamoussoukro', nationnalite: 'Ivoirienne',
    statut: 'Naff',
    email: null, pays_residence: "Côte d'Ivoire",
    etablissement_origine: 'Lycée Scientifique de Yamoussoukro', annee_obtention_bac: '2022',
    serie_bac: 'C', numero_table_bac: '22-0412-G',
    contacts: '+225 05 12 13 14', nature_piece: 'Passeport', numero_piece: 'B98765432',
    adresse_geographique: 'Yamoussoukro, Boulevard Houphouët', matricule_secondaire: null,
    type_responsable: 'Père', nom_responsable: 'Ouattara Souleymane',
    numero_responsable: '+225 07 55 44 33', profession_responsable: 'Fonctionnaire',
    created_at: '2024-09-07T10:00:00Z', updated_at: '2024-09-07T10:00:00Z',
  },
]

// ── Config affichage statuts ──────────────────────────────────────────────────

export const statutConfig: Record<StatutEtudiant, { className: string; dotClass: string }> = {
  Affecté:   { className: 'bg-emerald-50 text-emerald-700 border border-emerald-200', dotClass: 'bg-emerald-500' },
  Naff:      { className: 'bg-rose-50 text-rose-700 border border-rose-200',          dotClass: 'bg-rose-500'    },
  Réaffecté: { className: 'bg-blue-50 text-blue-700 border border-blue-200',          dotClass: 'bg-blue-500'    },
  Transfert: { className: 'bg-amber-50 text-amber-700 border border-amber-200',       dotClass: 'bg-amber-500'   },
}

export const CIVILITES: Civilite[]           = ['M.', 'Mme', 'Mlle']
export const GENRES: Genre[]                 = ['Masculin', 'Féminin']
export const STATUTS: StatutEtudiant[]       = ['Affecté', 'Naff', 'Réaffecté', 'Transfert']
export const SERIES_BAC                      = ['A1', 'A2', 'B', 'C', 'D', 'E', 'G1', 'G2', 'G3', 'T1', 'T2']
export const NATURES_PIECE: NaturePiece[]    = ['CNI', 'Passeport', 'Titre de séjour', 'Carte consulaire']
export const TYPES_RESPONSABLE               = ['Père', 'Mère', 'Tuteur', 'Autre']
export const NATIONALITES                    = ["Ivoirienne", "Burkinabè", "Malienne", "Guinéenne", "Sénégalaise", "Togolaise", "Béninoise", "Nigériane", "Ghanéenne", "Autre"]
export const PAYS                            = ["Côte d'Ivoire", "Burkina Faso", "Mali", "Guinée", "Sénégal", "Togo", "Bénin", "Nigeria", "Ghana", "France", "Autre"]