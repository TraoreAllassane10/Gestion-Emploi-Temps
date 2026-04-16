<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Récapitulatif des paiements</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
            font-size: 12px;
            color: #000;
            padding: 30px;
            background: #fff;
        }

        /* ===== EN-TÊTE ===== */
        .header-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }

        .header-table td {
            border: none;
            padding: 0;
            vertical-align: top;
        }

        .header-left p {
            font-size: 10px;
            line-height: 1.6;
        }

        .logo-zone-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 6px;
        }

        .logo-zone-table td {
            border: none;
            padding: 0;
            vertical-align: middle;
        }

        .header-right {
            text-align: right;
        }

        .header-right p {
            font-size: 10px;
            margin-bottom: 3px;
        }

        .filiere-box {
            border: 1px solid #000;
            display: inline-block;
            padding: 3px 12px;
            font-weight: bold;
            font-size: 11px;
        }

        /* ===== TITRE ===== */
        .titre-section {
            margin-bottom: 16px;
        }

        .titre-section h3 {
            font-size: 14px;
            font-weight: bold;
            text-transform: uppercase;
            border-bottom: 2px solid #000;
            padding-bottom: 6px;
            margin-bottom: 8px;
        }

        .info-etudiant-table {
            width: 100%;
            border-collapse: collapse;
        }

        .info-etudiant-table td {
            border: none;
            font-size: 11px;
            padding: 2px 6px 2px 0;
        }

        .info-etudiant-table .label {
            font-weight: bold;
            width: 120px;
        }

        /* ===== TABLEAU PAIEMENTS ===== */
        table.paiements {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }

        table.paiements thead tr {
            background-color: #2c2c2c;
            color: #fff;
        }

        table.paiements thead th {
            padding: 7px 8px;
            font-size: 11px;
            text-align: left;
            border: 1px solid #2c2c2c;
        }

        table.paiements tbody tr {
            border-bottom: 1px solid #ddd;
        }

        table.paiements tbody tr:nth-child(even) {
            background-color: #f5f5f5;
        }

        table.paiements tbody td {
            padding: 6px 8px;
            font-size: 11px;
            border: 1px solid #ccc;
        }

        table.paiements tfoot tr {
            background-color: #ececec;
        }

        table.paiements tfoot td {
            padding: 7px 8px;
            font-size: 11px;
            font-weight: bold;
            border: 1px solid #ccc;
        }

        .montant {
            text-align: right;
            white-space: nowrap;
        }

        /* ===== PIED DE PAGE ===== */
        .footer {
            margin-top: 30px;
            font-size: 10px;
            color: #555;
            text-align: right;
        }

        .footer .signature-zone {
            margin-top: 40px;
            text-align: right;
            font-size: 11px;
        }

        .footer .signature-zone p {
            margin-bottom: 4px;
        }
    </style>
</head>

<body>

    {{-- ===== EN-TÊTE INEC ===== --}}
    <table class="header-table">
        <tr>
            <td class="header-left" style="width:55%;">
                <p>
                    Ministère de l'Enseignement Supérieur et de<br>
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
            <td class="header-right" style="width:45%;">
                <p>Année Académique {{ $annee_academique ?? '2025 - 2026' }}</p>
                <div class="filiere-box">{{ $filiere ?? 'FC 1' }}</div>
                <br><br>
                <p>Imprimé le : {{ \Carbon\Carbon::now()->format('d/m/Y à H:i') }}</p>
            </td>
        </tr>
    </table>

    {{-- ===== TITRE + INFOS ÉTUDIANT ===== --}}
    <div class="titre-section">
        <h3>Récapitulatif des paiements</h3>
        <table class="info-etudiant-table">
            <tr>
                <td class="label">Étudiant</td>
                <td>: {{$etudiant->nom }} {{ $etudiant->prenom }}</td>
                <td class="label">Identifiant permanent</td>
                <td>: {{ $etudiant->ip ?? '—' }}</td>
            </tr>
            <tr>
                <td class="label">Filière</td>
                <td>: {{ $niveaux[0]->filiere->nom ?? '—' }}</td>
                <td class="label">Classe</td>
                <td>:
                    @foreach ($niveaux as $niveau)
                       <span style="margin-right: 2px"> {{ $niveau->nom ?? '—' }}</span>
                    @endForeach
                </td>

            </tr>
        </table>
    </div>

    {{-- ===== TABLEAU DES PAIEMENTS ===== --}}
    <table class="paiements">
        <thead>
            <tr>
                <th style="width:30px;">N°</th>
                <th>Référence</th>
                <th>Date</th>
                <th>Méthode</th>
                <th style="text-align:right;">Montant (FCFA)</th>

            </tr>
        </thead>
        <tbody>
            @forelse ($paiements as $index => $paiement)
                <tr>
                    <td style="text-align:center;">{{ $index + 1 }}</td>
                    <td><strong>{{ $paiement->reference }}</strong></td>
                    <td>{{ \Carbon\Carbon::parse($paiement->date_paiement)->format('d/m/Y') }}</td>
                    <td>

                        <span>{{ $paiement->methode_paiement }}</span>
                    </td>
                    <td class="montant">{{ number_format($paiement->montant, 0, ',', ' ') }}</td>

                </tr>
            @empty
                <tr>
                    <td colspan="6" style="text-align:center; padding:12px; color:#999;">
                        Aucun paiement enregistré.
                    </td>
                </tr>
            @endforelse
        </tbody>
        <tfoot>
            <tr>
                <td colspan="4" style="text-align:right;">TOTAL</td>
                <td class="montant">{{ number_format($paiements->sum('montant'), 0, ',', ' ') }} FCFA</td>
                <td></td>
            </tr>
        </tfoot>
    </table>

    {{-- ===== PIED DE PAGE ===== --}}
    <div class="footer">
        <div class="signature-zone">
            <p>Signature de la caisse</p>

        </div>
    </div>

</body>

</html>
