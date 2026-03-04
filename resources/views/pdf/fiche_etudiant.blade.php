<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Fiche Identification Étudiant</title>

    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 12px;
            color: #333;
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
        }

        .header h1 {
            margin: 0;
            font-size: 22px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .section-title {
            background: #f2f2f2;
            padding: 8px;
            font-weight: bold;
            text-transform: uppercase;
            border: 1px solid #ddd;
            margin-top: 25px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }

        td {
            padding: 4px;
            border: 1px solid #ddd;
        }

        .label {
            font-weight: bold;
            width: 35%;
            background: #fafafa;
        }

        .value {
            width: 65%;
        }

        .two-columns td {
            width: 50%;
        }

        .footer {
            margin-top: 40px;
            text-align: right;
            font-size: 11px;
            color: #777;
        }
    </style>
</head>

<body>

    <div class="header">
        <h1>FICHE D'IDENTIFICATION ÉTUDIANT</h1>
    </div>

    {{-- ================= ETAT CIVIL ================= --}}
    <div class="section-title">État Civil</div>

    <table>
        <tr>
            <td class="label">Civilité</td>
            <td class="value">{{ $etudiant['civilite'] }}</td>
        </tr>
        <tr>
            <td class="label">Nom</td>
            <td class="value">{{ $etudiant['nom'] }}</td>
        </tr>
        <tr>
            <td class="label">Prénom</td>
            <td class="value">{{ $etudiant['prenom'] }}</td>
        </tr>
        <tr>
            <td class="label">Date de naissance</td>
            <td class="value">
                {{ \Carbon\Carbon::parse($etudiant['date_naissance'])->format('d/m/Y') }}
                à {{ $etudiant['lieu_naissance'] }}
            </td>
        </tr>
        <tr>
            <td class="label">Nationalité</td>
            <td class="value">{{ $etudiant['nationnalite'] }}</td>
        </tr>
        <tr>
            <td class="label">Pièce d'identité</td>
            <td class="value">
                {{ $etudiant['nature_piece'] }} - N° {{ $etudiant['numero_piece'] }}
            </td>
        </tr>
        <tr>
            <td class="label">Pays de résidence</td>
            <td class="value">{{ $etudiant['pays_residence'] }}</td>
        </tr>
        <tr>
            <td class="label">Contacts</td>
            <td class="value">{{ $etudiant['contacts'] }}</td>
        </tr>
        <tr>
            <td class="label">Email</td>
            <td class="value">{{ $etudiant['email'] }}</td>
        </tr>
    </table>

    {{-- ================= RESPONSABLE ================= --}}
    <div class="section-title">Responsable</div>

    <table>
        <tr>
            <td class="label">Type</td>
            <td class="value">{{ $etudiant['type_responsable'] }}</td>
        </tr>
        <tr>
            <td class="label">Nom & Prénom</td>
            <td class="value">{{ $etudiant['nom_responsable'] }}</td>
        </tr>
        <tr>
            <td class="label">Contact</td>
            <td class="value">{{ $etudiant['numero_responsable'] }}</td>
        </tr>
        <tr>
            <td class="label">Profession</td>
            <td class="value">{{ $etudiant['profession_responsable'] }}</td>
        </tr>
    </table>

    {{-- ================= FORMATION ================= --}}
    <div class="section-title">Formation Académique</div>

    <table>
        <tr>
            <td class="label">Série BAC</td>
            <td class="value">{{ $etudiant['serie_bac'] }}</td>
        </tr>
        <tr>
            <td class="label">Établissement d'origine</td>
            <td class="value">{{ $etudiant['etablissement_origine'] }}</td>
        </tr>
        <tr>
            <td class="label">Adresse géographique</td>
            <td class="value">{{ $etudiant['adresse_geographique'] }}</td>
        </tr>
        <tr>
            <td class="label">Matricule secondaire</td>
            <td class="value">{{ $etudiant['matricule_secondaire'] }}</td>
        </tr>
        <tr>
            <td class="label">N° Table BAC</td>
            <td class="value">{{ $etudiant['numero_table_bac'] }}</td>
        </tr>
        <tr>
            <td class="label">Identifiant Permanent (IP)</td>
            <td class="value">{{ $etudiant['ip'] }}</td>
        </tr>
        <tr>
            <td class="label">Année obtention BAC</td>
            <td class="value">{{ $etudiant['annee_obtention_bac'] }}</td>
        </tr>
        <tr>
            <td class="label">Statut</td>
            <td class="value" style="font-weight: bold;">
                {{ $etudiant['statut'] }}
            </td>
        </tr>
    </table>

    <div class="footer">
        Date d'inscription : {{ Carbon\Carbon::parse($etudiant['created_at'])->format("d-m-Y à H:i") }}
    </div>

</body>
</html>