<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <title>Liste de Classe - FC1</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
            font-size: 11px;
            padding: 20px;
            color: #000;
        }

        /* ===== EN-TÊTE ===== */
        .header-table {
            width: 100%;
            margin-bottom: 15px;
            border-collapse: collapse;
        }

        .header-table td {
            vertical-align: top;
            padding: 0;
            border: none;
        }

        .header-left p {
            font-size: 10px;
            line-height: 1.6;
        }


        .header-left p {
            font-size: 10px;
            line-height: 1.5;
        }

        .logo-zone-table {
            width: 100%;
            margin-top: 8px;
            border-collapse: collapse;
        }

        .logo-zone-table td {
            vertical-align: middle;
            padding: 0;
            border: none;
        }

        .header-right {
            width: 45%;
            text-align: right;
        }

        .header-right p {
            font-size: 10px;
            margin-bottom: 4px;
        }

        .filiere-box {
            border: 1px solid #000;
            display: inline-block;
            padding: 3px 10px;
            font-weight: bold;
            font-size: 11px;
            margin-bottom: 8px;
        }

        .info-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 2px;
        }

        .info-table td {
            font-size: 10px;
            padding: 1px 0;
            border: none;
            text-align: right;
        }

        .info-table .label {
            font-weight: bold;
            width: 80px;
        }

        /* ===== STATISTIQUES ===== */
        .stats {
            display: flex;
            justify-content: flex-end;
            gap: 20px;
            font-size: 10px;
            margin-bottom: 2px;
        }

        /* ===== TABLEAU ===== */
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }

        thead tr th {
            border: 1px solid #000;
            padding: 5px 4px;
            text-align: center;
            font-size: 10px;
            font-weight: bold;

        }

        tbody tr td {
            border: 1px solid #000;
            padding: 4px 4px;
            font-size: 10px;
        }

        tbody tr td:first-child {
            text-align: center;
            width: 30px;
        }

        tbody tr td:nth-child(2) {
            text-transform: uppercase;
        }

        tbody tr td:nth-child(3),
        tbody tr td:nth-child(4) {
            text-align: center;
            width: 45px;
        }

        /* Colonnes Interrogations (3 sous-colonnes) */
        .col-interro {
            text-align: center;
            width: 35px;
        }

        /* Colonnes Devoirs (3 sous-colonnes) */
        .col-devoir {
            text-align: center;
            width: 35px;
        }

        .col-moy {
            text-align: center;
            width: 45px;
        }

        .col-sign {
            text-align: center;
            width: 50px;
        }

        tbody tr:nth-child(even) {
            /* background-color: #fafafa; */
        }

        /* Sous-en-tête pour Interrogations et Devoirs */
        .subheader th {
            font-size: 9px;
            /* background-color: #e8e8e8; */
        }
    </style>
</head>

<body>
    <table class="header-table">
        <tr>
            <td class="header-left" style="width:65%;">
                <p>
                    Ministère de l'Enseignement Supérieur et de<br />
                    la Recherche Scientifique - MESRS
                </p>
                <table class="logo-zone-table">
                    <tr>
                        <td style="width:65px;">
                            <img src="{{ public_path('./images/logo_inec.jpg') }}" alt="INEC SA" width="55"
                                height="55" onerror="this.style.display='none'">
                        </td>
                        <td style="padding-left:8px; font-size:10px; line-height:1.6;">
                            Institut National d'Intelligence Numérique<br>
                            Économique et Commerciale - INEC Daloa
                        </td>
                    </tr>
                </table>
            </td>

            <td style="width: 30%">
                <p>Année Académique {{ $annee_academique ?? '' }}</p>

                <div class="filiere-box">Filière : {{ $filiere ?? '' }}</div>
                <p>Matière : </p>
                <p>Enseignant : </p>
                <p style="margin-bottom: 10px;">Coefficient : </p>

                <div style="margin-bottom: 10px;">
                    <span style="margin-right: 10px">M : {{ $liste->where('genre', 'Masculin')->count() }}</span>
                    <span style="margin-right: 10px">F : {{ $liste->where('genre', 'Féminin')->count() }}</span>
                    <span>Total : {{ $liste->count() }}</span>
                </div>

                <div>
                    <span style="margin-right: 10px">Aff : {{ $liste->where('statut', 'Affecté')->count() }}</span>
                    <span style="margin-right: 10px">Naff : {{ $liste->where('statut', 'Naff')->count() }}</span>
                    <span>Total : {{ $liste->count() }} </span>
                </div>

            </td>
        </tr>
    </table>


    {{-- ===== TABLEAU ===== --}}
    <table>
        <thead>
            <tr>
                <th rowspan="2">N°</th>
                <th rowspan="2">NOM ET PRÉNOMS</th>
                <th rowspan="2">Statut</th>
                <th rowspan="2">Genre</th>
                <th colspan="3">Interrogations</th>
                <th colspan="3">Devoirs</th>
                <th rowspan="2">Moy</th>
                <th rowspan="2">Sign</th>
            </tr>
            <tr class="subheader">
                <th>I1</th>
                <th>I2</th>
                <th>I3</th>
                <th>D1</th>
                <th>D2</th>
                <th>D3</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($liste as $index => $etudiant)
                <tr>
                    <td>{{ $index + 1 }}</td>
                    <td>{{ strtoupper($etudiant->nom) }} {{ $etudiant->prenom }}</td>
                    <td style="text-align:center;">
                        {{ $etudiant->statut === 'Affecté' || $etudiant->statut === 'Transfert' ? 'AFF' : 'NAFF' }}
                    </td>
                    <td style="text-align:center;">{{ $etudiant->genre === 'Masculin' ? 'M' : 'F' }}</td>

                    {{-- Interrogations --}}
                    <td class="col-interro"></td>
                    <td class="col-interro"></td>
                    <td class="col-interro"></td>

                    {{-- Devoirs --}}
                    <td class="col-devoir"></td>
                    <td class="col-devoir"></td>
                    <td class="col-devoir"></td>

                    {{-- Moyenne --}}
                    <td class="col-moy"></td>

                    {{-- Signature --}}
                    <td class="col-sign"></td>
                </tr>
            @empty
                <tr>
                    <td colspan="12" style="text-align:center; padding: 10px; color: #999;">
                        Aucun étudiant trouvé.
                    </td>
                </tr>
            @endforelse
        </tbody>
    </table>

</body>

</html>
