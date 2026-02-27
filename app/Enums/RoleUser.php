<?php

namespace App\Enums;

enum RoleUser: string
{
    case ADMINISTRATEUR = "Administrateur";
    case INSPECTEUR_PEDAGOGIQUE = "Inspecteur pedagogique";
    case ENSEIGNANT = "Enseignant";
    case SCOLARITE = "Scolarite";
}
