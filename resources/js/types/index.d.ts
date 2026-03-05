import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export type Statut = 'Actif' | 'Suspendu' | 'Terminé'
export type TypeInscription = 'Nouvelle' | 'Redoublement' | 'Transfert'


export interface Etudiant {
  ip: string
  civilite: Civilite
  genre: Genre
  nom: string
  prenom: string
  date_naissance: string
  lieu_naissance: string
  nationnalite: string
  statut: StatutEtudiant

  email: string | null
  pays_residence: string | null
  etablissement_origine: string | null
  annee_obtention_bac: string | null
  serie_bac: string | null
  numero_table_bac: string | null
  contacts: string | null
  nature_piece: NaturePiece | null
  numero_piece: string | null
  adresse_geographique: string | null
  matricule_secondaire: string | null

  type_responsable: string | null
  nom_responsable: string | null
  numero_responsable: string | null
  profession_responsable: string | null

  created_at: string
  updated_at: string
}

export type EtudiantFormData = Omit<Etudiant, 'created_at' | 'updated_at'>

export interface StatsEtudiant {
    total :number;
    affecte: number;
    naff: number;
    reaffecte: number;
    transfert: number
}

export interface Meta {
    current_page: number;
    from: number;
    last_page: number;
    links: {
        active: boolean;
        label: string;
        page: number;
        url: string;
    }[];
}


// Types Annee
export interface Annee {
    id: number;
    libelle: string;
    date_debut: string;
    date_fin: string;
}

export interface Annees {
    data: Annee[];
    meta: Meta;
}


// Types Niveau
export interface DataNiveau {
    id: number;
    nom: string;
    filiere: {nom: string}
}

export interface Niveau {
    data: DataNiveau[];
    meta: Meta;
}
export interface FiliereData {
    id: number;
    nom: string;
}

// Types Sites
export interface Site {
    id: number;
    nom: string;
}

// Types salle
export interface Salle {
    id: number;
    nom: string;
}



export interface Student {
  id: number
  first_name: string
  last_name: string
  matricule: string
}

export interface Inscription {
  id: number
  student: Student
  annee: string
  niveau: string
  statut: "En cours" | "Soldé"
  total: number
  total_paye: number
}