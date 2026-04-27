<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <title>Fiche identification étudiant</title>

    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 11px;
        }

        .header {
            text-align: center;
            margin-bottom: 10px;
        }

        .header h2 {
            margin: 0;
            font-size: 16px;
        }

        .header h3 {
            margin: 5px 0;
            font-size: 14px;
            text-decoration: underline;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        td {
            padding: 4px;
            vertical-align: top;
            font-size: 16px;
        }

        .line {
            border-bottom: 1px dotted #000;
        }

        .section {
            margin-top: 10px;
            font-weight: bold;
            text-decoration: underline;
        }

        .checkbox {
            display: inline-block;
            border: 1px solid #000;
            width: 10px;
            height: 10px;
            margin-right: 5px;
        }

        .footer {
            margin-top: 25px;
            text-align: right;
        }
    </style>

</head>

<body>

    <div class="header">

         <img src="{{ public_path('./images/logo_inec.jpg') }}" alt="INEC SA" width="55"
                                height="55" onerror="this.style.display='none'">
        <h2>INSTITUT NATIONAL D'INTELLIGENCE NUMÉRIQUE</h2>
        <h3>FICHE IDENTIFICATION DE L'ÉTUDIANT</h3>

        <table>
            <tr>
                <td>INEC - Daloa</td>
                <td style="text-align:right">
                    Année académique :
                </td>
            </tr>
        </table>

    </div>


    <div class="section">ÉTAT CIVIL DE L'ÉTUDIANT</div>

    <table>

        <tr>
            <td>
                Civilité :
                ☐ Madame
                ☐ Mademoiselle
                ☑ Monsieur
            </td>
        </tr>

        <tr>
            <td>
                Nom :
                <span class="line">{{ $etudiant['nom'] }}</span>
            </td>
        </tr>

        <tr>
            <td>
                Prénoms :
                <span class="line">{{ $etudiant['prenom'] }}</span>
            </td>
        </tr>

        <tr>
            <td>
                Date naissance :
                <span class="line">
                    {{ \Carbon\Carbon::parse($etudiant['date_naissance'])->format('d/m/Y') }}
                </span>
            </td>

            <td>
                Lieu naissance :
                <span class="line">{{ $etudiant['lieu_naissance'] }}</span>
            </td>
        </tr>

        <tr>
            <td>
                Nationalité :
                <span class="line">{{ $etudiant['nationnalite'] }}</span>
            </td>
        </tr>

        <tr>
            <td>
                Nature pièce :
                <span class="line">{{ $etudiant['nature_piece'] }}</span>
            </td>

            <td>
                Numéro :
                <span class="line">{{ $etudiant['numero_piece'] }}</span>
            </td>
        </tr>

        <tr>
            <td>
                Pays résidence :
                <span class="line">{{ $etudiant['pays_residence'] }}</span>
            </td>
        </tr>

        <tr>
            <td>
                Contact étudiant :
                <span class="line">{{ $etudiant['contacts'] }}</span>
            </td>
        </tr>

        <tr>
            <td>
                Email :
                <span class="line">{{ $etudiant['email'] }}</span>
            </td>
        </tr>

    </table>


    <div class="section">IDENTITÉ DU RESPONSABLE</div>

    <table>

        <tr>
            <td>
                Type :
                <span class="line">{{ $etudiant['type_responsable'] }}</span>
            </td>
        </tr>

        <tr>
            <td>
                Nom :
                <span class="line">{{ $etudiant['nom_responsable'] }}</span>
            </td>
        </tr>

        <tr>
            <td>
                Contact :
                <span class="line">{{ $etudiant['numero_responsable'] }}</span>
            </td>
        </tr>

        <tr>
            <td>
                Profession :
                <span class="line">{{ $etudiant['profession_responsable'] }}</span>
            </td>
        </tr>

    </table>


    <div class="section">FORMATION DU CANDIDAT</div>

    <table>

        <tr>
            <td>
                Série BAC :
                <span class="line">{{ $etudiant['serie_bac'] }}</span>
            </td>
        </tr>

        <tr>
            <td>
                Établissement d'origine :
                <span class="line">{{ $etudiant['etablissement_origine'] }}</span>
            </td>
        </tr>

        <tr>
            <td>
                Adresse établissement :
                <span class="line">{{ $etudiant['adresse_geographique'] }}</span>
            </td>
        </tr>

        <tr>
            <td>
                Année obtention BAC :
                <span class="line">{{ $etudiant['annee_obtention_bac'] }}</span>
            </td>
        </tr>

        <tr>
            <td>
                Matricule secondaire :
                <span class="line">{{ $etudiant['matricule_secondaire'] }}</span>
            </td>
        </tr>

        <tr>
            <td>
                N° table BAC :
                <span class="line">{{ $etudiant['numero_table_bac'] }}</span>
            </td>
        </tr>

        <tr>
            <td>
                Identifiant permanent (IP) :
                <span class="line">{{ $etudiant['ip'] }}</span>
            </td>
        </tr>

        <tr>
            <td>
                Statut :
                <span class="line">{{ $etudiant['statut'] }}</span>
            </td>
        </tr>

    </table>


    <div class="footer">

        Date d'inscription :
        {{ \Carbon\Carbon::parse($etudiant['created_at'])->format('d/m/Y') }}

    </div>


</body>

</html>
