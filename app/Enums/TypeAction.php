<?php

namespace App\Enums;

enum TypeAction: string
{
    case CREATION = "Création";
    case MODIFICATION = "Modification";
    case SUPPRESSION = "Suppression";
}
