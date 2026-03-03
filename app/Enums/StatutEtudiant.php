<?php

namespace App\Enums;

enum StatutEtudiant: string
{
    case AFFECTE = "Affecté";
    case NAFF = "Naff";
    case REAFFECTE = "Réaffecté";
    case TRANSFERT = "Transfert";
}
