<!DOCTYPE html>
<html lang="sq" class="h-full w-full overflow-hidden">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
    <meta name="theme-color" content="#0f172a">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="Lulzim ERP">
    <meta name="mobile-web-app-capable" content="yes">
    <link rel="manifest" href="/lulzim-manifest.json">
    <link rel="apple-touch-icon" href="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 180 180'><rect width='180' height='180' rx='40' fill='%23f59e0b'/><text x='90' y='118' font-size='90' font-family='Arial Black' text-anchor='middle' fill='white' font-weight='900'>LK</text></svg>">
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' rx='14' fill='%23f59e0b'/><text x='32' y='44' font-size='32' font-family='Arial Black' text-anchor='middle' fill='white' font-weight='900'>LK</text></svg>">
    <title>Lulzim Kompani - ERP Mobile</title>
    <!-- Tailwind CSS v4 Browser -->
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <!-- FontAwesome për ikona profesionale -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Html5Qrcode për skanimin e barkodeve -->
    <script src="https://unpkg.com/html5-qrcode"></script>
    <!-- Chart.js për diagrame profesionale -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <!-- html2pdf për ruajtjen direkte si PDF -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
    <style>
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }

        body {
            -webkit-tap-highlight-color: transparent;
            -webkit-touch-callout: none;
        }

        #barcode-reader video {
            object-fit: cover !important;
            width: 100% !important;
            height: 100% !important;
        }

        /* ================= PRINTIM A4 — VETËM FATURA, NJË FAQE ================= */
        @media print {
            @page {
                size: A4 portrait;
                margin: 12mm 12mm 12mm 12mm;
            }

            html, body {
                background: #ffffff !important;
                color: #000000 !important;
                margin: 0 !important;
                padding: 0 !important;
                width: 100% !important;
                height: auto !important;
                min-height: 0 !important;
                overflow: visible !important;
            }

            /* Kur jemi në modalitet printimi: fshih TË GJITHA fëmijët e drejtpërdrejtë të body-t */
            body.printing-mode > * {
                display: none !important;
                visibility: hidden !important;
            }

            /* Shfaq VETËM kontejnerin e printimit */
            body.printing-mode > #temp-print-container {
                display: block !important;
                visibility: visible !important;
                position: static !important;
                left: auto !important;
                right: auto !important;
                top: auto !important;
                width: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
                background: #ffffff !important;
                color: #000000 !important;
                font-family: 'Courier New', Courier, monospace !important;
                font-size: 11pt !important;
                z-index: auto !important;
            }

            body.printing-mode > #temp-print-container * {
                color: #000000 !important;
                background: transparent !important;
                box-shadow: none !important;
                visibility: visible !important;
                page-break-inside: avoid !important;
            }

            body.printing-mode #temp-print-container #invoice-title {
                display: inline-block !important;
                border: 2px solid #000000 !important;
                padding: 6px 14px !important;
                text-align: center !important;
                font-size: 13pt !important;
                font-weight: bold !important;
                margin: 8px auto !important;
                text-transform: uppercase !important;
            }

            body.printing-mode #temp-print-container table {
                width: 100% !important;
                border-collapse: collapse !important;
                margin: 10px 0 !important;
                font-size: 10pt !important;
                page-break-inside: avoid !important;
            }

            body.printing-mode #temp-print-container th,
            body.printing-mode #temp-print-container td {
                border-bottom: 1px solid #000000 !important;
                padding: 5px 4px !important;
            }

            body.printing-mode #temp-print-container th {
                border-bottom: 2px solid #000000 !important;
                font-weight: bold !important;
            }

            /* Fshih gjithmonë butonat edhe nëse nuk jemi në printing-mode */
            .no-print, .no-print * {
                display: none !important;
                visibility: hidden !important;
            }
        }
    </style>
</head>
<body class="bg-gray-50 font-sans antialiased text-gray-900 h-full w-full select-none overflow-hidden">

    <!-- ================= LOGIN ================= -->
    <div id="login-page" class="fixed inset-0 bg-slate-900 flex items-center justify-center z-50 p-6">
        <div class="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm border border-gray-100">
            <div class="text-center mb-6">
                <div class="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-3 text-white text-2xl shadow-md rotate-4">
                    <i class="fa-solid fa-layer-group"></i>
                </div>
                <h1 class="text-2xl font-black tracking-tight text-slate-900">LULZIM KOMPANI</h1>
                <p class="text-xs text-slate-500 font-medium">Sistemi i Menaxhimit • Kumanovë</p>
            </div>

            <form id="login-form" onsubmit="handleLogin(event)" class="space-y-4">
                <div>
                    <label class="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Përdoruesi (Username)</label>
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400"><i class="fa-solid fa-user"></i></span>
                        <input data-testid="login-username" type="text" id="username" required class="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm" value="admin">
                    </div>
                </div>
                <div>
                    <label class="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Fjalëkalimi (Password)</label>
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400"><i class="fa-solid fa-lock"></i></span>
                        <input data-testid="login-password" type="password" id="password" required class="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm" value="lulzim123">
                    </div>
                </div>
                <button data-testid="login-submit" type="submit" class="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition shadow-lg mt-2 active:scale-[0.98]">
                    Hyni si pronar
                </button>
            </form>
            <div class="text-center mt-6 text-[10px] text-slate-400 font-medium tracking-wide">OPERATIVE ERP SYSTEM v2.5</div>
        </div>
    </div>

    <!-- ================= APP ================= -->
    <div id="main-app" class="hidden h-full w-full flex flex-col overflow-hidden">

        <header class="bg-slate-900 text-white pt-2 sticky top-0 z-40 shadow-md shrink-0">
            <div class="px-4 py-3 flex justify-between items-center">
                <div>
                    <h2 class="text-sm font-black tracking-wider text-amber-400">LULZIM KOMPANI</h2>
                    <div class="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
                        <i class="fa-solid fa-user-tie text-amber-500"></i> Admin: Nasuf Asani
                    </div>
                </div>
                <button data-testid="btn-logout" onclick="logout()" class="w-9 h-9 rounded-xl bg-slate-800 text-slate-400 active:text-red-400 flex items-center justify-center transition active:scale-95">
                    <i class="fa-solid fa-power-off text-sm"></i>
                </button>
            </div>

            <nav class="flex border-t border-slate-800 bg-slate-950 text-[10px] font-bold uppercase tracking-wider">
                <button data-testid="tab-btn-dashboard" onclick="switchTab('dashboard')" id="btn-dashboard" class="tab-btn flex-1 py-3 text-center border-b-2 border-amber-500 text-amber-400 flex flex-col items-center gap-1 active:bg-slate-900">
                    <i class="fa-solid fa-chart-pie text-sm"></i> Panel
                </button>
                <button data-testid="tab-btn-stoku" onclick="switchTab('stoku')" id="btn-stoku" class="tab-btn flex-1 py-3 text-center border-b-2 border-transparent text-slate-400 flex flex-col items-center gap-1 active:bg-slate-900">
                    <i class="fa-solid fa-warehouse text-sm"></i> Depoja
                </button>
                <button data-testid="tab-btn-levizjet" onclick="switchTab('levizjet')" id="btn-levizjet" class="tab-btn flex-1 py-3 text-center border-b-2 border-transparent text-slate-400 flex flex-col items-center gap-1 active:bg-slate-900">
                    <i class="fa-solid fa-right-left text-sm"></i> Lëvizje
                </button>
                <button data-testid="tab-btn-faturat" onclick="switchTab('faturat')" id="btn-faturat" class="tab-btn flex-1 py-3 text-center border-b-2 border-transparent text-slate-400 flex flex-col items-center gap-1 active:bg-slate-900">
                    <i class="fa-solid fa-file-invoice text-sm"></i> Faturim
                </button>
                <button data-testid="tab-btn-profili" onclick="switchTab('profili')" id="btn-profili" class="tab-btn flex-1 py-3 text-center border-b-2 border-transparent text-slate-400 flex flex-col items-center gap-1 active:bg-slate-900">
                    <i class="fa-solid fa-user-gear text-sm"></i> Profili
                </button>
            </nav>
        </header>

        <main class="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-none pb-12">

            <!-- ================= DASHBOARD ================= -->
            <div id="tab-dashboard" class="tab-content space-y-4">
                <div class="grid grid-cols-2 gap-3">
                    <div class="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hyrje (Këtë muaj)</span>
                        <h3 id="dash-m-in" class="text-base font-black text-emerald-600 mt-1">0 MKD</h3>
                    </div>
                    <div class="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Dalje (Këtë muaj)</span>
                        <h3 id="dash-m-out" class="text-base font-black text-rose-600 mt-1">0 MKD</h3>
                    </div>
                </div>

                <div class="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                    <div class="flex justify-between items-center mb-3">
                        <h3 class="text-xs font-bold text-slate-700 uppercase tracking-wider">Ecuria Financiare (Vjetore 2026)</h3>
                        <span class="text-[10px] bg-slate-100 font-bold px-2 py-0.5 rounded text-slate-600">MKD</span>
                    </div>
                    <div class="relative w-full h-48">
                        <canvas id="financialChart"></canvas>
                    </div>
                </div>

                <div class="bg-slate-900 text-white p-4 rounded-xl shadow-sm space-y-2">
                    <h4 class="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">Bilanci Vjetor</h4>
                    <div class="flex justify-between text-xs border-b border-slate-800 pb-2">
                        <span class="text-slate-400">Totali i Furnizimeve (Hyrje):</span>
                        <span id="dash-y-in" class="font-bold text-emerald-400">0 MKD</span>
                    </div>
                    <div class="flex justify-between text-xs pt-1">
                        <span class="text-slate-400">Totali i Shitjeve (Dalje):</span>
                        <span id="dash-y-out" class="font-bold text-amber-400">0 MKD</span>
                    </div>
                </div>
            </div>

            <!-- ================= DEPOJA ================= -->
            <div id="tab-stoku" class="tab-content hidden space-y-4">
                <div class="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-3">
                    <button data-testid="toggle-add-material" onclick="toggleElement('add-material-form')" class="w-full flex justify-between items-center text-xs font-bold text-slate-700 uppercase tracking-wider py-1">
                        <span><i class="fa-solid fa-plus-circle text-amber-500 mr-1"></i> Shto Material të Ri</span>
                        <i class="fa-solid fa-chevron-down"></i>
                    </button>

                    <div id="add-material-form" class="hidden space-y-2 pt-2 border-t border-slate-100">
                        <input data-testid="new-material-name" type="text" id="new-name" placeholder="Emri i materialit (Psh: Zhavor)" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                        <div class="grid grid-cols-2 gap-2">
                            <input data-testid="new-material-barcode" type="text" id="new-barcode" placeholder="Barkodi" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono">
                            <input data-testid="new-material-unit" type="text" id="new-unit" placeholder="Njësia (m³, Copë, Thasë)" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                        </div>
                        <input data-testid="new-material-price" type="number" id="new-price" placeholder="Çmimi për njësi (MKD)" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                        <button data-testid="btn-create-material" onclick="addNewMaterial()" class="w-full py-3 bg-amber-500 text-slate-950 font-bold text-xs rounded-lg uppercase active:scale-95 transition">Krijo Kartelë Produkti</button>
                    </div>
                </div>

                <div class="space-y-2">
                    <h3 class="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">Gjendja e Artikujve</h3>
                    <div id="inventory-list" class="space-y-2"></div>
                </div>
            </div>

            <!-- ================= LËVIZJET ================= -->
            <div id="tab-levizjet" class="tab-content hidden space-y-4">
                <div class="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                    <div class="flex justify-between items-center mb-2">
                        <h3 class="text-xs font-bold text-slate-700 uppercase tracking-wider"><i class="fa-solid fa-camera text-amber-500 mr-1"></i>Skaneri</h3>
                        <span id="scanner-status" class="text-[10px] text-rose-500 font-bold flex items-center gap-1">Ndaluar</span>
                    </div>
                    <div id="barcode-reader" class="w-full h-48 overflow-hidden rounded-xl bg-slate-950 border border-slate-200"></div>
                </div>

                <div class="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-3">
                    <h3 class="text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2">Regjistro Ndryshimin</h3>
                    <div>
                        <label class="block text-[10px] font-bold text-slate-400 uppercase mb-1">Artikulli</label>
                        <select data-testid="transaction-material" id="transaction-material" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium"></select>
                    </div>
                    <div class="grid grid-cols-2 gap-2">
                        <div>
                            <label class="block text-[10px] font-bold text-slate-400 uppercase mb-1">Sasia</label>
                            <input data-testid="transaction-qty" type="number" id="transaction-qty" value="1" min="1" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold">
                        </div>
                        <div>
                            <label class="block text-[10px] font-bold text-slate-400 uppercase mb-1">Lloji</label>
                            <select data-testid="transaction-type" id="transaction-type" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-emerald-600">
                                <option value="Hyrje">+ HYRJE</option>
                                <option value="Dalje">- DALJE</option>
                            </select>
                        </div>
                    </div>
                    <button data-testid="btn-execute-transaction" onclick="executeTransaction()" class="w-full py-3 bg-slate-900 text-white font-bold text-xs uppercase tracking-wider rounded-lg active:scale-95 transition">Ekzekuto</button>
                </div>

                <div class="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                    <div class="flex justify-between items-center mb-2 gap-2">
                        <h3 class="text-xs font-bold text-slate-700 uppercase tracking-wider">Logu Operativ</h3>
                        <div class="flex gap-1">
                            <button data-testid="btn-export-csv" onclick="exportLogsCSV()" class="text-[10px] font-bold px-2.5 py-1.5 bg-emerald-100 text-emerald-700 rounded-lg active:scale-95 transition">
                                <i class="fa-solid fa-file-csv mr-1"></i> CSV
                            </button>
                            <button data-testid="btn-export-xls" onclick="exportLogsExcel()" class="text-[10px] font-bold px-2.5 py-1.5 bg-amber-100 text-amber-700 rounded-lg active:scale-95 transition">
                                <i class="fa-solid fa-file-excel mr-1"></i> Excel
                            </button>
                        </div>
                    </div>
                    <div class="flex gap-1 mb-2">
                        <input data-testid="log-search" id="log-search" oninput="renderLogs()" placeholder="Kërko material..." class="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-lg text-[11px]">
                        <select data-testid="log-filter-type" id="log-filter-type" onchange="renderLogs()" class="p-2 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold">
                            <option value="">Të gjitha</option>
                            <option value="Hyrje">Hyrje</option>
                            <option value="Dalje">Dalje</option>
                        </select>
                    </div>
                    <div id="recent-logs" class="divide-y divide-slate-100 max-h-60 overflow-y-auto text-xs scrollbar-none"></div>
                </div>
            </div>

            <!-- ================= FATURIMI ================= -->
            <div id="tab-faturat" class="tab-content hidden space-y-4">
                <div class="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-3">
                    <h3 class="text-xs font-bold text-slate-700 uppercase tracking-wider">Përgatit Faturën</h3>

                    <div>
                        <label class="block text-[10px] font-bold text-slate-400 uppercase mb-1">Klienti / Kompania</label>
                        <input data-testid="invoice-client" type="text" id="invoice-client" placeholder="Emri i blerësit" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs">
                    </div>

                    <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                        <span class="text-[10px] font-bold text-slate-500 uppercase tracking-wider block"><i class="fa-solid fa-cart-plus text-amber-500 mr-1"></i>Shto produkt</span>
                        <div>
                            <label class="block text-[9px] font-bold text-slate-400 uppercase mb-1">Produkti</label>
                            <select data-testid="invoice-material" id="invoice-material" onchange="syncInvoiceItemPrice()" class="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs"></select>
                        </div>
                        <div class="grid grid-cols-12 gap-2 items-end">
                            <div class="col-span-4">
                                <label class="block text-[9px] font-bold text-slate-400 uppercase mb-1">Sasia</label>
                                <input data-testid="invoice-qty" type="number" id="invoice-qty" value="1" min="1" class="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs text-center font-bold">
                            </div>
                            <div class="col-span-6">
                                <label class="block text-[9px] font-bold text-slate-400 uppercase mb-1">Çmimi (MKD) <span class="text-amber-600">(manual)</span></label>
                                <input data-testid="invoice-price" type="number" id="invoice-price" min="0" step="0.01" placeholder="0" class="w-full p-2 bg-white border border-amber-300 rounded-lg text-xs text-center font-bold text-amber-700">
                            </div>
                            <div class="col-span-2">
                                <button data-testid="btn-add-invoice-item" onclick="addItemToInvoice()" class="w-full h-9 bg-slate-900 text-white rounded-lg flex items-center justify-center active:scale-95 transition">
                                    <i class="fa-solid fa-plus text-xs"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-1">
                        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Artikujt e përzgjedhur:</span>
                        <div id="invoice-temporary-items" class="text-xs bg-white rounded-lg border border-slate-100 p-2 divide-y divide-slate-100 empty:before:content-['Asnjë_produkt_i_shtuar_ende...'] empty:before:text-slate-400 empty:before:italic empty:before:text-[11px]"></div>
                    </div>

                    <div>
                        <label class="block text-[10px] font-bold text-slate-400 uppercase mb-1">Zgjidh llojin e dokumentit</label>
                        <div class="grid grid-cols-2 gap-2">
                            <label class="flex items-center justify-center p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold cursor-pointer">
                                <input data-testid="doc-type-klient" type="radio" name="doc-type" value="klient" checked class="mr-2 accent-amber-500"> Faturë
                            </label>
                            <label class="flex items-center justify-center p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold cursor-pointer">
                                <input data-testid="doc-type-dergim" type="radio" name="doc-type" value="dergim" class="mr-2 accent-amber-500"> Fletë-Dërgim
                            </label>
                        </div>
                    </div>

                    <button data-testid="btn-generate-invoice" onclick="generateInvoice()" class="w-full py-3 bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm active:scale-95 transition">
                        Gjenero Dokumentin
                    </button>
                </div>

                <!-- HISTORIKU I FATURAVE ME KËRKIM/FILTRIM -->
                <div class="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-3">
                    <div class="flex justify-between items-center">
                        <h3 class="text-xs font-bold text-slate-700 uppercase tracking-wider">
                            <i class="fa-solid fa-clock-rotate-left text-amber-500 mr-1"></i> Faturat e Kaluara
                        </h3>
                        <span id="invoice-count-badge" class="text-[9px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">0</span>
                    </div>
                    <input data-testid="invoice-search" id="invoice-search" oninput="renderInvoiceHistory()" placeholder="Kërko: klient, nr. dokumenti, produkt..." class="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-[11px]">
                    <div class="grid grid-cols-2 gap-2">
                        <select data-testid="invoice-filter-type" id="invoice-filter-type" onchange="renderInvoiceHistory()" class="p-2 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold">
                            <option value="">Të gjitha llojet</option>
                            <option value="klient">Vetëm Fatura</option>
                            <option value="dergim">Vetëm Fletë-Dërgim</option>
                        </select>
                        <input data-testid="invoice-filter-date" id="invoice-filter-date" type="date" onchange="renderInvoiceHistory()" class="p-2 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold">
                    </div>
                    <div id="invoice-history-list" class="divide-y divide-slate-100 max-h-72 overflow-y-auto scrollbar-none"></div>
                </div>

                <!-- PREVIEW E FATURËS -->
                <div id="invoice-preview-container" class="hidden bg-white p-4 rounded-xl border border-slate-200 shadow-lg space-y-4 text-[11px] font-mono relative">
                    <button data-testid="btn-close-invoice" onclick="closeInvoicePreview()" class="no-print absolute top-3 right-3 text-slate-400 hover:text-slate-600 text-base p-2">
                        <i class="fa-solid fa-xmark"></i>
                    </button>

                    <div id="invoice-print-area" class="space-y-4 overflow-x-auto scrollbar-none">
                        <div class="text-center border-b pb-3 border-slate-200">
                            <h2 class="text-xs font-black tracking-wider text-slate-900">LULZIM KOMPANI DOOEL</h2>
                            <p class="text-[9px] text-slate-600">Rr. Josko Ilijevski, Kumanovë, Maqedonia e Veriut</p>
                            <p class="text-[9px] text-slate-600">EDB: 4017023XXXXXX | Tel: +389 70 529 767</p>
                            <h3 id="invoice-title" class="text-xs font-bold mt-1 inline-block border border-black px-2 py-0.5">FATURË FINANCIARE</h3>
                        </div>

                        <div class="invoice-meta-box text-[9px] text-slate-800 flex justify-between">
                            <div>
                                <p><strong>Data:</strong> <span id="inv-date"></span></p>
                                <p><strong>Dokumenti:</strong> #<span id="inv-num"></span></p>
                            </div>
                            <div class="text-right">
                                <p><strong>Mori:</strong> <span id="inv-client-name"></span></p>
                                <p><strong>Vendi:</strong> Kumanovë</p>
                            </div>
                        </div>

                        <table class="w-full text-slate-900 text-[10px]">
                            <thead>
                                <tr class="border-b-2 border-black font-bold">
                                    <th class="text-left py-1">Artikulli</th>
                                    <th class="text-center py-1">Sasia</th>
                                    <th class="text-right py-1">Çmimi</th>
                                    <th class="text-right py-1">Gjithsej</th>
                                </tr>
                            </thead>
                            <tbody id="invoice-print-tbody" class="divide-y divide-gray-200"></tbody>
                        </table>

                        <div class="space-y-1 text-right pt-2 border-t border-black text-slate-900">
                            <p id="tax-row" class="text-slate-800 text-[9px]">Neto: <span id="inv-neto">0 MKD</span> | TVSH (18%): <span id="inv-tvsh">0 MKD</span></p>
                            <p class="text-xs font-black text-slate-900">TOTALI: <span id="inv-final-total" class="text-slate-900">0 MKD</span></p>
                        </div>

                        <div class="flex justify-between uppercase tracking-wider text-slate-600 text-[8px] pt-4">
                            <div class="text-center w-[45%] border-t border-black pt-1">Përgjegjës:<br>Nasuf Asani</div>
                            <div class="text-center w-[45%] border-t border-black pt-1">Pranoi dhe verifikoi</div>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-2 mt-4 no-print">
                        <button data-testid="btn-print-invoice" onclick="printInvoice()" class="py-3 bg-slate-900 text-white font-bold rounded-lg text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 active:scale-95 transition">
                            <i class="fa-solid fa-print"></i> Printo
                        </button>
                        <button data-testid="btn-save-pdf" onclick="saveInvoiceAsPDF()" class="py-3 bg-rose-600 text-white font-bold rounded-lg text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 active:scale-95 transition">
                            <i class="fa-solid fa-file-pdf"></i> Ruaj PDF
                        </button>
                        <button data-testid="btn-whatsapp-invoice" onclick="whatsappInvoice()" class="py-3 bg-[#25D366] text-white font-bold rounded-lg text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 active:scale-95 transition">
                            <i class="fa-brands fa-whatsapp text-base"></i> WhatsApp
                        </button>
                        <button data-testid="btn-email-invoice" onclick="emailInvoice()" class="py-3 bg-emerald-600 text-white font-bold rounded-lg text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 active:scale-95 transition">
                            <i class="fa-solid fa-envelope"></i> Email
                        </button>
                        <button data-testid="btn-share-invoice" onclick="shareInvoice()" class="col-span-2 py-3 bg-amber-500 text-slate-950 font-bold rounded-lg text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 active:scale-95 transition">
                            <i class="fa-solid fa-share-nodes"></i> Ndaj / Eksporto (PDF)
                        </button>
                    </div>
                </div>
            </div>

            <!-- ================= PROFILI / NDRYSHO PIN ================= -->
            <div id="tab-profili" class="tab-content hidden space-y-4">
                <div class="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-3">
                    <h3 class="text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2">
                        <i class="fa-solid fa-download text-amber-500 mr-1"></i> Shkarko & Instalo në Telefon
                    </h3>

                    <button data-testid="btn-download-app" onclick="downloadAppFile()" class="w-full py-3.5 bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm active:scale-95 transition flex items-center justify-center gap-2">
                        <i class="fa-solid fa-cloud-arrow-down text-base"></i>
                        Shkarko Aplikacionin (.html)
                    </button>

                    <div class="bg-amber-50 p-3 rounded-xl border border-amber-200">
                        <p class="text-[11px] font-bold text-amber-900 mb-1.5">
                            <i class="fa-solid fa-mobile-screen-button mr-1"></i> Instalo në Home Screen
                        </p>
                        <div class="text-[10px] text-amber-800 leading-relaxed space-y-1">
                            <p><strong>📱 Android (Chrome):</strong></p>
                            <p class="pl-3">Menu (⋮) → <strong>"Add to Home screen"</strong> → Shto</p>
                            <p><strong>🍎 iPhone (Safari):</strong></p>
                            <p class="pl-3">Share (□↑) → <strong>"Add to Home Screen"</strong> → Add</p>
                        </div>
                        <p class="text-[10px] text-amber-900 mt-2 font-bold italic">
                            <i class="fa-solid fa-circle-info mr-1"></i> Pas instalimit hapet si app i vërtetë pa adresë URL!
                        </p>
                    </div>

                    <button data-testid="btn-share-app" onclick="shareApp()" class="w-full py-3 bg-slate-100 text-slate-800 font-bold text-xs uppercase tracking-wider rounded-xl active:scale-95 transition flex items-center justify-center gap-2">
                        <i class="fa-solid fa-share-nodes"></i> Ndaj linkun e aplikacionit
                    </button>
                </div>

                <div class="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-3">
                    <h3 class="text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2">
                        <i class="fa-solid fa-message text-amber-500 mr-1"></i> Template për Email & WhatsApp
                    </h3>

                    <div>
                        <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Numri WhatsApp i default-it (opsional)</label>
                        <input data-testid="tpl-whatsapp-number" type="text" id="tpl-whatsapp-number" placeholder="Psh: 38970529767 (pa +, pa hapësira)" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                        <p class="text-[9px] text-slate-400 mt-1 italic">Lëre bosh që të zgjedhësh kontaktin çdo herë.</p>
                    </div>

                    <div>
                        <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Email i default-it (opsional)</label>
                        <input data-testid="tpl-email-to" type="email" id="tpl-email-to" placeholder="klient@shembull.com" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                    </div>

                    <div>
                        <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Përshëndetja (në fillim të mesazhit)</label>
                        <input data-testid="tpl-greeting" type="text" id="tpl-greeting" placeholder="Përshëndetje, ju dërgojmë faturën e bashkëngjitur." class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                    </div>

                    <div>
                        <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Nënshkrimi (në fund të mesazhit)</label>
                        <textarea data-testid="tpl-signature" id="tpl-signature" rows="4" placeholder="Faleminderit për bashkëpunimin!
Lulzim Kompani DOOEL
Tel: +389 70 529 767
Kumanovë, MK" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs leading-relaxed"></textarea>
                    </div>

                    <button data-testid="btn-save-template" onclick="saveTemplate()" class="w-full py-3 bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl active:scale-95 transition">
                        <i class="fa-solid fa-floppy-disk mr-1"></i> Ruaj Template-in
                    </button>

                    <div id="template-saved-msg" class="hidden text-[11px] font-bold p-2 rounded-lg bg-emerald-50 text-emerald-700 text-center">
                        ✓ Template-i u ruajt!
                    </div>
                </div>

                <div class="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-3">
                    <h3 class="text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2">
                        <i class="fa-solid fa-shield-halved text-amber-500 mr-1"></i> Siguria & Llogaria
                    </h3>
                    <div class="bg-slate-50 p-3 rounded-xl border border-slate-200">
                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Përdoruesi aktual</p>
                        <p class="text-sm font-black text-slate-900 mt-0.5">admin</p>
                        <p class="text-[10px] text-slate-500 mt-1">Pronar: Nasuf Asani</p>
                    </div>
                </div>

                <div class="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-3">
                    <h3 class="text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2">
                        <i class="fa-solid fa-key text-amber-500 mr-1"></i> Ndrysho Fjalëkalimin (PIN)
                    </h3>

                    <div>
                        <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Fjalëkalimi aktual</label>
                        <input data-testid="pin-current" type="password" id="pin-current" placeholder="••••••••" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm">
                    </div>

                    <div>
                        <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Fjalëkalimi i ri</label>
                        <input data-testid="pin-new" type="password" id="pin-new" placeholder="Min. 4 karaktere" class="w-full p-3 bg-slate-50 border border-amber-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm font-bold text-amber-700">
                    </div>

                    <div>
                        <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Konfirmo fjalëkalimin e ri</label>
                        <input data-testid="pin-confirm" type="password" id="pin-confirm" placeholder="Përsërite fjalëkalimin" class="w-full p-3 bg-slate-50 border border-amber-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm font-bold text-amber-700">
                    </div>

                    <div id="pin-message" class="hidden text-[11px] font-bold p-2 rounded-lg"></div>

                    <button data-testid="btn-change-pin" onclick="changePin()" class="w-full py-3 bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm active:scale-95 transition">
                        <i class="fa-solid fa-floppy-disk mr-1"></i> Ruaj Fjalëkalimin e Ri
                    </button>

                    <p class="text-[10px] text-slate-400 italic pt-1">
                        <i class="fa-solid fa-circle-info mr-1"></i>
                        Fjalëkalimi ruhet në pajisje. Mos e ndani me persona të tjerë.
                    </p>
                </div>

                <div class="bg-slate-900 text-white p-4 rounded-xl shadow-sm">
                    <button data-testid="btn-logout-profili" onclick="logout()" class="w-full py-3 bg-rose-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl active:scale-95 transition">
                        <i class="fa-solid fa-power-off mr-1"></i> Dil nga llogaria
                    </button>
                </div>
            </div>

        </main>
    </div>

    <!-- ================= MODALI: NDRYSHIMI I ÇMIMIT TË MATERIALIT ================= -->
    <div id="edit-price-modal" class="hidden fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex items-center justify-center p-6">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-5 border border-slate-200">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-sm font-black uppercase tracking-wider text-slate-900">
                    <i class="fa-solid fa-tag text-amber-500 mr-1"></i> Ndrysho Çmimin
                </h3>
                <button data-testid="btn-close-edit-price" onclick="closeEditPriceModal()" class="text-slate-400 text-lg p-1"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div class="space-y-3">
                <div class="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Materiali</p>
                    <p id="edit-price-material-name" class="text-sm font-black text-slate-900 mt-0.5"></p>
                </div>
                <div>
                    <label class="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Çmimi i ri për njësi (MKD)</label>
                    <input data-testid="edit-price-input" type="number" id="edit-price-input" min="0" step="0.01" class="w-full p-3 bg-slate-50 border border-amber-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm font-bold text-amber-700">
                </div>
                <button data-testid="btn-save-price" onclick="saveEditedPrice()" class="w-full py-3 bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl active:scale-95 transition">
                    Ruaj Çmimin e Ri
                </button>
            </div>
        </div>
    </div>

    <!-- ================= JS LOGIC ================= -->
    <script>
        const STORAGE_KEY = 'lulzim_erp_data_v1';
        const PIN_KEY = 'lulzim_erp_pin_v1';
        const TEMPLATE_KEY = 'lulzim_erp_template_v1';
        const DEFAULT_PIN = 'lulzim123';

        const DEFAULT_TEMPLATE = {
            whatsappNumber: '',
            emailTo: '',
            greeting: 'Përshëndetje, ju dërgojmë dokumentin e mëposhtëm:',
            signature: 'Faleminderit për bashkëpunimin!\nLulzim Kompani DOOEL\nTel: +389 70 529 767\nKumanovë, MK'
        };

        function getTemplate() {
            try {
                const raw = localStorage.getItem(TEMPLATE_KEY);
                if (!raw) return { ...DEFAULT_TEMPLATE };
                return { ...DEFAULT_TEMPLATE, ...JSON.parse(raw) };
            } catch (e) { return { ...DEFAULT_TEMPLATE }; }
        }

        function setTemplate(tpl) {
            try { localStorage.setItem(TEMPLATE_KEY, JSON.stringify(tpl)); } catch (e) {}
        }

        function loadTemplateIntoForm() {
            const t = getTemplate();
            const wEl = document.getElementById('tpl-whatsapp-number');
            const eEl = document.getElementById('tpl-email-to');
            const gEl = document.getElementById('tpl-greeting');
            const sEl = document.getElementById('tpl-signature');
            if (wEl) wEl.value = t.whatsappNumber || '';
            if (eEl) eEl.value = t.emailTo || '';
            if (gEl) gEl.value = t.greeting || '';
            if (sEl) sEl.value = t.signature || '';
        }

        function saveTemplate() {
            const tpl = {
                whatsappNumber: (document.getElementById('tpl-whatsapp-number').value || '').replace(/[^0-9]/g, ''),
                emailTo: (document.getElementById('tpl-email-to').value || '').trim(),
                greeting: document.getElementById('tpl-greeting').value || '',
                signature: document.getElementById('tpl-signature').value || ''
            };
            setTemplate(tpl);
            const msg = document.getElementById('template-saved-msg');
            msg.classList.remove('hidden');
            setTimeout(() => msg.classList.add('hidden'), 2500);
        }

        function getStoredPin() {
            try {
                return localStorage.getItem(PIN_KEY) || DEFAULT_PIN;
            } catch (e) { return DEFAULT_PIN; }
        }

        function setStoredPin(pin) {
            try { localStorage.setItem(PIN_KEY, pin); } catch (e) {}
        }

        let stoku = {
            1: { id: 1, emri: "Rërë", sasia: 420, njesia: "m³", cmimi: 1250, barcode: "11111" },
            2: { id: 2, emri: "Tulla", sasia: 8500, njesia: "Copë", cmimi: 28, barcode: "22222" },
            3: { id: 3, emri: "Çimento", sasia: 600, njesia: "Thasë", cmimi: 390, barcode: "33333" }
        };

        let historikuLevizjeve = [
            { data: "2026-01-10", material: "Rërë", sasia: 100, lloji: "Hyrje", vlera: 125000, muaji: 0 },
            { data: "2026-02-15", material: "Tulla", sasia: 3000, lloji: "Dalje", vlera: 84000, muaji: 1 },
            { data: "2026-03-05", material: "Çimento", sasia: 200, lloji: "Hyrje", vlera: 78000, muaji: 2 },
            { data: "2026-04-12", material: "Rërë", sasia: 50, lloji: "Dalje", vlera: 62500, muaji: 3 }
        ];

        let faturat = []; // historiku i faturave të gjeneruara

        let shportaFatures = [];
        let financialChartInstance = null;
        let html5QrCode = null;
        let editingPriceForId = null;
        let currentlyDisplayedInvoice = null; // referenca te fatura aktualisht e shfaqur

        // ============ PERSISTENCE ============
        function saveState() {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify({ stoku, historikuLevizjeve, faturat }));
            } catch (e) { console.warn('Save failed', e); }
        }
        function loadState() {
            try {
                const raw = localStorage.getItem(STORAGE_KEY);
                if (!raw) return;
                const parsed = JSON.parse(raw);
                if (parsed.stoku) stoku = parsed.stoku;
                if (parsed.historikuLevizjeve) historikuLevizjeve = parsed.historikuLevizjeve;
                if (Array.isArray(parsed.faturat)) faturat = parsed.faturat;
            } catch (e) { console.warn('Load failed', e); }
        }

        // ============ LOGIN ============
        function handleLogin(event) {
            event.preventDefault();
            const enteredPin = document.getElementById('password').value;
            const validPin = getStoredPin();
            if(document.getElementById('username').value === "admin" && enteredPin === validPin) {
                document.getElementById('login-page').classList.add('hidden');
                document.getElementById('main-app').classList.remove('hidden');
                initApp();
            } else {
                alert("Kredencialet janë të gabuara!");
            }
        }

        function showPinMessage(text, type) {
            const el = document.getElementById('pin-message');
            el.classList.remove('hidden', 'bg-emerald-50', 'text-emerald-700', 'bg-rose-50', 'text-rose-700');
            if (type === 'success') el.classList.add('bg-emerald-50', 'text-emerald-700');
            else el.classList.add('bg-rose-50', 'text-rose-700');
            el.innerText = text;
        }

        function changePin() {
            const current = document.getElementById('pin-current').value;
            const newPin = document.getElementById('pin-new').value;
            const confirmPin = document.getElementById('pin-confirm').value;
            const validPin = getStoredPin();

            if (current !== validPin) {
                return showPinMessage('Fjalëkalimi aktual është i gabuar!', 'error');
            }
            if (!newPin || newPin.length < 4) {
                return showPinMessage('Fjalëkalimi i ri duhet të ketë të paktën 4 karaktere.', 'error');
            }
            if (newPin !== confirmPin) {
                return showPinMessage('Konfirmimi nuk përputhet me fjalëkalimin e ri.', 'error');
            }
            if (newPin === current) {
                return showPinMessage('Fjalëkalimi i ri duhet të jetë i ndryshëm.', 'error');
            }

            setStoredPin(newPin);
            document.getElementById('pin-current').value = '';
            document.getElementById('pin-new').value = '';
            document.getElementById('pin-confirm').value = '';
            showPinMessage('Fjalëkalimi u ndryshua me sukses!', 'success');
        }

        function logout() {
            stopScanner();
            document.getElementById('login-page').classList.remove('hidden');
            document.getElementById('main-app').classList.add('hidden');
        }

        function toggleElement(id) {
            document.getElementById(id).classList.toggle('hidden');
        }

        function switchTab(tabId) {
            document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('text-amber-400', 'border-amber-500');
                btn.classList.add('text-slate-400', 'border-transparent');
            });

            document.getElementById(`tab-${tabId}`).classList.remove('hidden');
            document.getElementById(`btn-${tabId}`).classList.add('text-amber-400', 'border-amber-500');
            document.getElementById(`btn-${tabId}`).classList.remove('text-slate-400', 'border-transparent');

            if (tabId === 'levizjet') startScanner();
            else stopScanner();

            if (tabId === 'dashboard') updateChart();
            if (tabId === 'faturat') { syncInvoiceItemPrice(); renderInvoiceHistory(); }
            if (tabId === 'profili') loadTemplateIntoForm();
        }

        function initApp() {
            loadState();
            populateDropdowns();
            renderStoku();
            renderLogs();
            updateChart();
            syncInvoiceItemPrice();
            renderInvoiceHistory();
        }

        function populateDropdowns() {
            const transSelect = document.getElementById('transaction-material');
            const invSelect = document.getElementById('invoice-material');
            transSelect.innerHTML = '';
            invSelect.innerHTML = '';

            Object.values(stoku).forEach(item => {
                const opt = `<option value="${item.id}">${item.emri} (${item.njesia})</option>`;
                transSelect.innerHTML += opt;
                invSelect.innerHTML += opt;
            });
        }

        // ============ DEPOJA ============
        function renderStoku() {
            const container = document.getElementById('inventory-list');
            container.innerHTML = Object.values(stoku).map(item => `
                <div class="bg-white p-3.5 rounded-xl border border-slate-100 flex justify-between items-center shadow-xs" data-testid="inventory-row-${item.id}">
                    <div class="flex-1 min-w-0">
                        <h4 class="font-bold text-slate-900 text-xs">${item.emri}</h4>
                        <p class="text-[10px] text-slate-400 font-mono">Barcode: ${item.barcode}</p>
                        <p class="text-[10px] font-semibold text-slate-600 mt-1" data-testid="inventory-price-${item.id}">
                            ${item.cmimi.toLocaleString()} MKD / ${item.njesia}
                        </p>
                    </div>
                    <div class="flex items-center gap-3">
                        <div class="text-right">
                            <span class="text-base font-black text-slate-900">${item.sasia}</span>
                            <span class="text-[9px] font-bold text-slate-400 uppercase block">${item.njesia}</span>
                        </div>
                        <button data-testid="btn-edit-price-${item.id}" onclick="openEditPriceModal(${item.id})"
                            class="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 active:scale-95 transition flex items-center justify-center"
                            title="Ndrysho çmimin manualisht">
                            <i class="fa-solid fa-pen-to-square text-xs"></i>
                        </button>
                    </div>
                </div>
            `).join('');
        }

        function openEditPriceModal(id) {
            const item = stoku[id];
            if (!item) return;
            editingPriceForId = id;
            document.getElementById('edit-price-material-name').innerText = `${item.emri} (${item.njesia})`;
            document.getElementById('edit-price-input').value = item.cmimi;
            document.getElementById('edit-price-modal').classList.remove('hidden');
            setTimeout(() => document.getElementById('edit-price-input').focus(), 50);
        }

        function closeEditPriceModal() {
            document.getElementById('edit-price-modal').classList.add('hidden');
            editingPriceForId = null;
        }

        function saveEditedPrice() {
            if (editingPriceForId === null) return;
            const val = parseFloat(document.getElementById('edit-price-input').value);
            if (isNaN(val) || val < 0) return alert("Vendosni një çmim valid!");
            stoku[editingPriceForId].cmimi = val;
            saveState();
            renderStoku();
            syncInvoiceItemPrice();
            closeEditPriceModal();
        }

        // ============ LOG ============
        function getFilteredLogs() {
            const search = (document.getElementById('log-search')?.value || '').toLowerCase().trim();
            const typeFilter = document.getElementById('log-filter-type')?.value || '';
            return historikuLevizjeve.filter(l => {
                if (typeFilter && l.lloji !== typeFilter) return false;
                if (search && !l.material.toLowerCase().includes(search)) return false;
                return true;
            });
        }

        function renderLogs() {
            const container = document.getElementById('recent-logs');
            const filtered = getFilteredLogs();
            container.innerHTML = filtered.slice(0, 100).map(log => `
                <div class="flex justify-between py-2 items-center">
                    <div>
                        <span class="font-bold text-slate-800 text-xs">${log.material}</span>
                        <span class="text-slate-400 font-medium">x${log.sasia}</span>
                        <p class="text-[9px] text-slate-400 font-mono">${log.data}</p>
                    </div>
                    <span class="font-bold text-xs ${log.lloji === 'Hyrje' ? 'text-emerald-600' : 'text-rose-500'}">
                        ${log.lloji === 'Hyrje' ? '+' : '-'} ${log.vlera.toLocaleString()} MKD
                    </span>
                </div>
            `).join('') || '<p class="text-[11px] text-slate-400 italic py-2">Asnjë lëvizje e gjetur...</p>';
        }

        function downloadFile(content, filename, mime) {
            const blob = new Blob([content], { type: mime });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setTimeout(() => URL.revokeObjectURL(url), 1000);
        }

        function buildLogsRows() {
            const rows = getFilteredLogs();
            return rows;
        }

        function exportLogsCSV() {
            const rows = buildLogsRows();
            if (rows.length === 0) return alert('Nuk ka të dhëna për eksport!');
            const header = ['Data', 'Materiali', 'Sasia', 'Lloji', 'Vlera (MKD)'];
            const lines = [header.join(',')];
            rows.forEach(r => {
                const cells = [
                    r.data,
                    `"${(r.material || '').replace(/"/g, '""')}"`,
                    r.sasia,
                    r.lloji,
                    r.vlera
                ];
                lines.push(cells.join(','));
            });
            // BOM për Excel të hapë saktë karakteret shqip
            const csv = '\uFEFF' + lines.join('\r\n');
            const stamp = new Date().toISOString().split('T')[0];
            downloadFile(csv, `lulzim-levizje-${stamp}.csv`, 'text/csv;charset=utf-8;');
        }

        function exportLogsExcel() {
            const rows = buildLogsRows();
            if (rows.length === 0) return alert('Nuk ka të dhëna për eksport!');
            const totalIn = rows.filter(r => r.lloji === 'Hyrje').reduce((s, r) => s + r.vlera, 0);
            const totalOut = rows.filter(r => r.lloji === 'Dalje').reduce((s, r) => s + r.vlera, 0);
            const trs = rows.map(r => `
                <tr>
                    <td>${r.data}</td>
                    <td>${r.material}</td>
                    <td style="text-align:right">${r.sasia}</td>
                    <td style="text-align:center;color:${r.lloji === 'Hyrje' ? '#059669' : '#e11d48'};font-weight:bold">${r.lloji}</td>
                    <td style="text-align:right">${r.vlera}</td>
                </tr>`).join('');
            const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
<head><meta charset="UTF-8"><style>
table{border-collapse:collapse;font-family:Arial,sans-serif;font-size:12px}
th,td{border:1px solid #94a3b8;padding:6px 10px}
th{background:#0f172a;color:#f59e0b;text-transform:uppercase;font-size:11px}
.tf{background:#fef3c7;font-weight:bold}
h2{font-family:Arial;color:#0f172a;margin:0 0 8px}
</style></head><body>
<h2>LULZIM KOMPANI – Historiku i Lëvizjeve</h2>
<p style="font-size:11px;color:#64748b">Eksportuar: ${new Date().toLocaleString('sq')}</p>
<table>
<thead><tr><th>Data</th><th>Materiali</th><th>Sasia</th><th>Lloji</th><th>Vlera (MKD)</th></tr></thead>
<tbody>${trs}</tbody>
<tfoot>
<tr class="tf"><td colspan="4" style="text-align:right">TOTAL HYRJE:</td><td style="text-align:right">${totalIn}</td></tr>
<tr class="tf"><td colspan="4" style="text-align:right">TOTAL DALJE:</td><td style="text-align:right">${totalOut}</td></tr>
</tfoot>
</table>
</body></html>`;
            const stamp = new Date().toISOString().split('T')[0];
            downloadFile(html, `lulzim-levizje-${stamp}.xls`, 'application/vnd.ms-excel');
        }

        // ============ HISTORIKU I FATURAVE ============
        function renderInvoiceHistory() {
            const container = document.getElementById('invoice-history-list');
            if (!container) return;
            const search = (document.getElementById('invoice-search')?.value || '').toLowerCase().trim();
            const typeFilter = document.getElementById('invoice-filter-type')?.value || '';
            const dateFilter = document.getElementById('invoice-filter-date')?.value || '';

            const filtered = faturat.filter(f => {
                if (typeFilter && f.docType !== typeFilter) return false;
                if (dateFilter && f.dateISO !== dateFilter) return false;
                if (search) {
                    const blob = [
                        f.client || '',
                        f.numri || '',
                        ...(f.items || []).map(i => i.emri)
                    ].join(' ').toLowerCase();
                    if (!blob.includes(search)) return false;
                }
                return true;
            });

            document.getElementById('invoice-count-badge').innerText = `${filtered.length}/${faturat.length}`;

            if (filtered.length === 0) {
                container.innerHTML = '<p class="text-[11px] text-slate-400 italic py-3 text-center">Asnjë faturë nuk u gjet.</p>';
                return;
            }

            container.innerHTML = filtered.map((f, idx) => {
                const realIdx = faturat.indexOf(f);
                const isFature = f.docType === 'klient';
                return `
                <div class="py-2.5 flex items-center justify-between gap-2" data-testid="invoice-history-row-${realIdx}">
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-2">
                            <span class="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${isFature ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">
                                ${isFature ? 'Faturë' : 'Fletë-Dërgim'}
                            </span>
                            <span class="text-[10px] font-mono text-slate-500">#${f.numri}</span>
                        </div>
                        <div class="font-bold text-xs text-slate-900 mt-0.5 truncate">${f.client}</div>
                        <div class="text-[10px] text-slate-500">${f.dateDisplay} • ${(f.items || []).length} artikuj</div>
                    </div>
                    <div class="text-right">
                        <div class="text-xs font-black text-slate-900">${isFature ? (f.total || 0).toLocaleString() + ' MKD' : '—'}</div>
                        <div class="flex gap-1 mt-1 justify-end">
                            <button data-testid="btn-view-invoice-${realIdx}" onclick="viewPastInvoice(${realIdx})" class="text-[10px] font-bold px-2 py-1 bg-slate-900 text-white rounded active:scale-95">
                                <i class="fa-solid fa-eye"></i>
                            </button>
                            <button data-testid="btn-delete-invoice-${realIdx}" onclick="deletePastInvoice(${realIdx})" class="text-[10px] font-bold px-2 py-1 bg-rose-100 text-rose-700 rounded active:scale-95">
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
                        </div>
                    </div>
                </div>`;
            }).join('');
        }

        function deletePastInvoice(idx) {
            if (!confirm('A jeni i sigurt që doni ta fshini këtë dokument? Stoku NUK do të kthehet automatikisht.')) return;
            faturat.splice(idx, 1);
            saveState();
            renderInvoiceHistory();
        }

        function viewPastInvoice(idx) {
            const f = faturat[idx];
            if (!f) return;
            currentlyDisplayedInvoice = f;

            document.getElementById('inv-date').innerText = f.dateDisplay;
            document.getElementById('inv-num').innerText = f.numri;
            document.getElementById('inv-client-name').innerText = f.client;

            const tbody = document.getElementById('invoice-print-tbody');
            tbody.innerHTML = '';
            (f.items || []).forEach(item => {
                const totaliArtikullit = item.sasia * item.cmimi;
                tbody.innerHTML += `
                    <tr>
                        <td class="py-1 text-left">${item.emri}</td>
                        <td class="py-1 text-center">${item.sasia} ${item.njesia}</td>
                        <td class="py-1 text-right">${f.docType === 'klient' ? item.cmimi.toLocaleString() + ' MKD' : '---'}</td>
                        <td class="py-1 text-right">${f.docType === 'klient' ? totaliArtikullit.toLocaleString() + ' MKD' : 'Në ngarkim'}</td>
                    </tr>`;
            });

            if (f.docType === 'klient') {
                document.getElementById('invoice-title').innerText = "FATURË FINANCIARE";
                document.getElementById('tax-row').style.display = 'block';
                document.getElementById('inv-neto').innerText = (f.neto || 0).toLocaleString() + " MKD";
                document.getElementById('inv-tvsh').innerText = (f.tvsh || 0).toLocaleString() + " MKD";
                document.getElementById('inv-final-total').innerText = (f.total || 0).toLocaleString() + " MKD";
            } else {
                document.getElementById('invoice-title').innerText = "FLETË-DËRGIMI I MATERIALIT";
                document.getElementById('tax-row').style.display = 'none';
                document.getElementById('inv-final-total').innerText = "LIVRUAR NË TRANSPORT";
            }

            document.getElementById('invoice-preview-container').classList.remove('hidden');
            document.getElementById('invoice-preview-container').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // ============ FATURIM ============
        function syncInvoiceItemPrice() {
            const sel = document.getElementById('invoice-material');
            const priceEl = document.getElementById('invoice-price');
            if (!sel || !priceEl) return;
            const matId = sel.value;
            if (stoku[matId]) {
                priceEl.value = stoku[matId].cmimi;
            } else {
                priceEl.value = '';
            }
        }

        function addItemToInvoice() {
            const matId = document.getElementById('invoice-material').value;
            const qty = parseInt(document.getElementById('invoice-qty').value, 10);
            const manualPrice = parseFloat(document.getElementById('invoice-price').value);

            if(!qty || qty <= 0) return alert("Vendosni sasi korrekte!");
            if(isNaN(manualPrice) || manualPrice < 0) return alert("Vendosni një çmim valid!");

            const produkti = stoku[matId];
            if (!produkti) return alert("Produkt i pavlefshëm!");

            // Çdo rresht në shportë mban çmimin e tij (mund të ndryshohet manualisht)
            shportaFatures.push({
                id: produkti.id,
                emri: produkti.emri,
                sasia: qty,
                njesia: produkti.njesia,
                cmimi: manualPrice
            });

            renderTemporaryInvoiceItems();
            document.getElementById('invoice-qty').value = 1;
            syncInvoiceItemPrice();
        }

        function removeProductFromCart(index) {
            shportaFatures.splice(index, 1);
            renderTemporaryInvoiceItems();
        }

        function updateCartItemPrice(index, newVal) {
            const v = parseFloat(newVal);
            if (isNaN(v) || v < 0) return;
            shportaFatures[index].cmimi = v;
            // rendero përsëri për të rifreskuar totalin
            renderTemporaryInvoiceItems();
        }

        function renderTemporaryInvoiceItems() {
            const container = document.getElementById('invoice-temporary-items');
            container.innerHTML = shportaFatures.map((item, idx) => `
                <div class="flex justify-between items-center py-2 gap-2" data-testid="cart-row-${idx}">
                    <div class="flex-1 min-w-0">
                        <div class="font-bold text-slate-800 truncate">${item.emri}</div>
                        <div class="text-[10px] text-slate-500">x${item.sasia} ${item.njesia}</div>
                    </div>
                    <div class="flex items-center gap-1">
                        <input type="number" min="0" step="0.01" value="${item.cmimi}"
                            onchange="updateCartItemPrice(${idx}, this.value)"
                            data-testid="cart-price-${idx}"
                            class="w-16 p-1 text-[10px] text-right border border-amber-300 rounded bg-amber-50 text-amber-800 font-bold" />
                        <span class="text-[9px] text-slate-400">MKD</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="font-semibold text-slate-700 text-[11px] w-20 text-right">${(item.sasia * item.cmimi).toLocaleString()} MKD</span>
                        <button onclick="removeProductFromCart(${idx})" data-testid="cart-remove-${idx}" class="text-rose-500 p-1"><i class="fa-solid fa-trash-can"></i></button>
                    </div>
                </div>
            `).join('');
        }

        function generateInvoice() {
            if(shportaFatures.length === 0) return alert("Ju lutem shtoni të paktën një produkt në faturë!");

            const client = document.getElementById('invoice-client').value || "Blerës i Jashtëm";
            const docType = document.querySelector('input[name="doc-type"]:checked').value;
            const now = new Date();
            const numri = Math.floor(100000 + Math.random() * 900000);
            const dateDisplay = now.toLocaleDateString('mk-MK');
            const dateISO = now.toISOString().split('T')[0];

            document.getElementById('inv-date').innerText = dateDisplay;
            document.getElementById('inv-num').innerText = numri;
            document.getElementById('inv-client-name').innerText = client;

            const tbody = document.getElementById('invoice-print-tbody');
            tbody.innerHTML = '';

            let totaliPerGjitheFaturen = 0;

            shportaFatures.forEach(item => {
                const totaliArtikullit = item.sasia * item.cmimi;
                totaliPerGjitheFaturen += totaliArtikullit;

                tbody.innerHTML += `
                    <tr>
                        <td class="py-1 text-left">${item.emri}</td>
                        <td class="py-1 text-center">${item.sasia} ${item.njesia}</td>
                        <td class="py-1 text-right">${docType === 'klient' ? item.cmimi.toLocaleString() + ' MKD' : '---'}</td>
                        <td class="py-1 text-right">${docType === 'klient' ? totaliArtikullit.toLocaleString() + ' MKD' : 'Në ngarkim'}</td>
                    </tr>
                `;
            });

            // Ruaj snapshot të faturës në histori
            const itemsSnapshot = shportaFatures.map(i => ({ ...i }));
            let neto = 0, tvsh = 0;

            if(docType === 'klient') {
                document.getElementById('invoice-title').innerText = "FATURË FINANCIARE";
                neto = Math.round(totaliPerGjitheFaturen / 1.18);
                tvsh = totaliPerGjitheFaturen - neto;

                document.getElementById('tax-row').style.display = 'block';
                document.getElementById('inv-neto').innerText = neto.toLocaleString() + " MKD";
                document.getElementById('inv-tvsh').innerText = tvsh.toLocaleString() + " MKD";
                document.getElementById('inv-final-total').innerText = totaliPerGjitheFaturen.toLocaleString() + " MKD";

                shportaFatures.forEach(item => {
                    historikuLevizjeve.unshift({
                        data: dateISO,
                        material: item.emri,
                        sasia: item.sasia,
                        lloji: "Dalje",
                        vlera: item.sasia * item.cmimi,
                        muaji: now.getMonth()
                    });
                    if(stoku[item.id]) stoku[item.id].sasia -= item.sasia;
                });
            } else {
                document.getElementById('invoice-title').innerText = "FLETË-DËRGIMI I MATERIALIT";
                document.getElementById('tax-row').style.display = 'none';
                document.getElementById('inv-final-total').innerText = "LIVRUAR NË TRANSPORT";

                shportaFatures.forEach(item => {
                    if(stoku[item.id]) stoku[item.id].sasia -= item.sasia;
                });
            }

            faturat.unshift({
                numri,
                client,
                docType,
                dateISO,
                dateDisplay,
                items: itemsSnapshot,
                total: totaliPerGjitheFaturen,
                neto,
                tvsh,
                createdAt: now.toISOString()
            });
            currentlyDisplayedInvoice = faturat[0];
            saveState();
            renderInvoiceHistory();

            document.getElementById('invoice-preview-container').classList.remove('hidden');
            document.getElementById('invoice-preview-container').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        function closeInvoicePreview() {
            document.getElementById('invoice-preview-container').classList.add('hidden');
            shportaFatures = [];
            document.getElementById('invoice-client').value = '';
            renderTemporaryInvoiceItems();
            renderStoku();
            renderLogs();
            updateChart();
        }

        // ============ SHTO MATERIAL ============
        function addNewMaterial() {
            const name = document.getElementById('new-name').value.trim();
            const barcode = document.getElementById('new-barcode').value.trim();
            const unit = document.getElementById('new-unit').value.trim();
            const price = parseFloat(document.getElementById('new-price').value);

            if(!name || !barcode || !unit || isNaN(price)) return alert("Plotësoni të gjitha fushat!");

            const currentIds = Object.keys(stoku).map(Number);
            const nextId = currentIds.length > 0 ? Math.max(...currentIds) + 1 : 1;

            stoku[nextId] = { id: nextId, emri: name, sasia: 0, njesia: unit, cmimi: price, barcode: barcode };
            saveState();

            alert("Materiali u shtua me sukses!");
            document.getElementById('add-material-form').classList.add('hidden');

            document.getElementById('new-name').value = '';
            document.getElementById('new-barcode').value = '';
            document.getElementById('new-unit').value = '';
            document.getElementById('new-price').value = '';

            populateDropdowns();
            renderStoku();
            syncInvoiceItemPrice();
        }

        // ============ LËVIZJET ============
        function executeTransaction() {
            const matId = document.getElementById('transaction-material').value;
            const qty = parseInt(document.getElementById('transaction-qty').value, 10);
            const type = document.getElementById('transaction-type').value;

            if(!qty || qty <= 0) return alert("Shënoni një sasi valide!");
            const material = stoku[matId];
            if (!material) return alert("Material i pavlefshëm!");

            if(type === "Dalje" && material.sasia < qty) return alert("Sasi e pamjaftueshme në depo!");

            material.sasia = (type === "Hyrje") ? (material.sasia + qty) : (material.sasia - qty);

            const sot = new Date();
            historikuLevizjeve.unshift({
                data: sot.toISOString().split('T')[0],
                material: material.emri,
                sasia: qty,
                lloji: type,
                vlera: qty * material.cmimi,
                muaji: sot.getMonth()
            });

            saveState();
            renderStoku();
            renderLogs();
            updateChart();
            alert("Operacioni u krye me sukses.");
        }

        // ============ CHART ============
        function updateChart() {
            const muajsh_hyrje = Array(12).fill(0);
            const muajsh_dalje = Array(12).fill(0);
            let mIn = 0, mOut = 0, yIn = 0, yOut = 0;
            const muajiAktual = new Date().getMonth();

            historikuLevizjeve.forEach(log => {
                if(log.lloji === "Hyrje") {
                    muajsh_hyrje[log.muaji] += log.vlera;
                    yIn += log.vlera;
                    if(log.muaji === muajiAktual) mIn += log.vlera;
                } else {
                    muajsh_dalje[log.muaji] += log.vlera;
                    yOut += log.vlera;
                    if(log.muaji === muajiAktual) mOut += log.vlera;
                }
            });

            document.getElementById('dash-m-in').innerText = mIn.toLocaleString() + " MKD";
            document.getElementById('dash-m-out').innerText = mOut.toLocaleString() + " MKD";
            document.getElementById('dash-y-in').innerText = yIn.toLocaleString() + " MKD";
            document.getElementById('dash-y-out').innerText = yOut.toLocaleString() + " MKD";

            const canvasEl = document.getElementById('financialChart');
            if(!canvasEl) return;
            const ctx = canvasEl.getContext('2d');
            if (financialChartInstance) financialChartInstance.destroy();

            financialChartInstance = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Shk', 'Mar', 'Pri', 'Maj', 'Qer', 'Kor', 'Gus', 'Sht', 'Tet', 'Nën', 'Dhj'],
                    datasets: [
                        {
                            label: 'Hyrje',
                            data: muajsh_hyrje,
                            backgroundColor: 'rgba(16,185,129,0.85)',
                            borderRadius: 4,
                            barPercentage: 0.7
                        },
                        {
                            label: 'Dalje',
                            data: muajsh_dalje,
                            backgroundColor: 'rgba(245,158,11,0.85)',
                            borderRadius: 4,
                            barPercentage: 0.7
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: { boxWidth: 10, font: { size: 10, weight: 'bold' }, color: '#475569' }
                        }
                    },
                    scales: {
                        x: { grid: { display: false }, ticks: { color: '#94a3b8', font: { size: 9 } } },
                        y: {
                            grid: { color: '#f1f5f9' },
                            ticks: {
                                color: '#94a3b8',
                                font: { size: 9 },
                                callback: v => v >= 1000 ? (v/1000) + 'k' : v
                            }
                        }
                    }
                }
            });
        }

        // ============ SKANERI ============
        function startScanner() {
            const statusEl = document.getElementById('scanner-status');
            if (html5QrCode && html5QrCode._isScanning) return;
            try {
                html5QrCode = new Html5Qrcode("barcode-reader");
                html5QrCode.start(
                    { facingMode: "environment" },
                    { fps: 10, qrbox: { width: 220, height: 120 } },
                    onScanSuccess
                ).then(() => {
                    statusEl.innerText = 'Aktiv';
                    statusEl.classList.remove('text-rose-500');
                    statusEl.classList.add('text-emerald-500');
                }).catch(err => {
                    statusEl.innerText = 'I padisponueshëm';
                });
            } catch (e) {
                statusEl.innerText = 'Gabim';
            }
        }

        function stopScanner() {
            const statusEl = document.getElementById('scanner-status');
            if (html5QrCode && html5QrCode._isScanning) {
                html5QrCode.stop().then(() => {
                    statusEl.innerText = 'Ndaluar';
                    statusEl.classList.add('text-rose-500');
                    statusEl.classList.remove('text-emerald-500');
                }).catch(() => {});
            }
        }

        function onScanSuccess(decodedText) {
            const match = Object.values(stoku).find(s => s.barcode === decodedText);
            if (match) {
                document.getElementById('transaction-material').value = match.id;
                document.getElementById('transaction-qty').focus();
            }
        }

        // ============ SHKARKO APP-IN ============
        async function downloadAppFile() {
            try {
                const resp = await fetch(window.location.href);
                const html = await resp.text();
                const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'Lulzim-Kompani-ERP.html';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                setTimeout(() => URL.revokeObjectURL(url), 1500);
            } catch (e) {
                alert('Shkarkimi dështoi. Provo edhe një herë.');
                console.error(e);
            }
        }

        async function shareApp() {
            const shareData = {
                title: 'Lulzim Kompani ERP',
                text: 'Aplikacioni i menaxhimit të depos – Lulzim Kompani',
                url: window.location.href
            };
            try {
                if (navigator.share) {
                    await navigator.share(shareData);
                } else if (navigator.clipboard) {
                    await navigator.clipboard.writeText(shareData.url);
                    alert('Linku u kopjua në clipboard!\n\n' + shareData.url);
                } else {
                    prompt('Kopjo linkun e mëposhtëm:', shareData.url);
                }
            } catch (e) {
                // user canceled or error – ignore silently
            }
        }

        // ============ INVOICE ACTIONS: PRINT / PDF / EMAIL / SHARE ============
        function buildPrintableHtml() {
            const original = document.getElementById('invoice-print-area');
            if (!original) return null;
            const invoiceHtml = original.outerHTML;
            return `<!DOCTYPE html><html lang="sq"><head>
<meta charset="UTF-8">
<title>Faturë — Lulzim Kompani</title>
<style>
@page { size: A4 portrait; margin: 12mm 12mm 12mm 12mm; }
* { box-sizing: border-box; }
html, body {
    margin: 0; padding: 0; background: #ffffff; color: #000000;
    font-family: 'Courier New', Courier, monospace;
    font-size: 11pt; line-height: 1.35;
}
#invoice-print-area { width: 100%; }
.text-center { text-align: center !important; }
.text-right { text-align: right !important; }
.text-left { text-align: left !important; }
.border-b { border-bottom: 1px solid #000; }
.border-t { border-top: 1px solid #000; }
.font-black, .font-bold, strong, th { font-weight: 700; }
table { width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 10pt; page-break-inside: avoid; }
th, td { border-bottom: 1px solid #000; padding: 6px 4px; vertical-align: top; }
thead tr { border-bottom: 2px solid #000; }
th { border-bottom: 2px solid #000; }
#invoice-title {
    display: inline-block; border: 2px solid #000; padding: 6px 16px;
    text-align: center; font-size: 13pt; font-weight: 700;
    margin: 10px auto; text-transform: uppercase;
}
.invoice-meta-box { display: flex; justify-content: space-between; width: 100%; margin: 12px 0; font-size: 10pt; }
.invoice-meta-box > div { font-size: 10pt; }
.invoice-meta-box .text-right { text-align: right; }
h2 { font-size: 12pt; margin: 4px 0; font-weight: 800; letter-spacing: 1px; }
h3 { margin: 6px 0; }
p { margin: 2px 0; font-size: 10pt; }
.tracking-wider { letter-spacing: 1px; }
button, .fa-xmark { display: none !important; }
.flex.justify-between.uppercase {
    display: flex; justify-content: space-between;
    margin-top: 40px; font-size: 9pt;
}
.flex.justify-between.uppercase > div {
    text-align: center; width: 45%;
    border-top: 1px solid #000; padding-top: 6px;
}
.space-y-1 > * + * { margin-top: 2px; }
.pt-2 { padding-top: 8px; }
.pt-4 { padding-top: 16px; }
.pb-3 { padding-bottom: 12px; }
.mt-1 { margin-top: 4px; }
.text-xs, .text-\\[11px\\], .text-\\[10px\\], .text-\\[9px\\], .text-\\[8px\\] { font-size: 10pt; }
.text-base { font-size: 12pt; }
.divide-y > * + * { border-top: 1px solid #e5e7eb; }
.font-mono { font-family: 'Courier New', monospace; }
</style>
</head><body>${invoiceHtml}</body></html>`;
        }

        function printInvoice() {
            const preview = document.getElementById('invoice-preview-container');
            if (preview.classList.contains('hidden')) {
                return alert('Hap fillimisht një faturë për printim.');
            }
            const original = document.getElementById('invoice-print-area');
            if (!original) return alert('Fatura nuk u gjet.');

            const invoiceHtml = original.outerHTML;
            const originalBody = document.body.innerHTML;
            const originalBodyClass = document.body.className;
            const originalTitle = document.title;
            const scrollY = window.scrollY;

            // Stilet inline për printim — VETËM fatura
            const printStyles = `
<style id="__print_styles__">
@page { size: A4 portrait; margin: 12mm 12mm 12mm 12mm; }
* { box-sizing: border-box; }
html, body {
    margin: 0 !important; padding: 0 !important;
    background: #ffffff !important; color: #000000 !important;
    font-family: 'Courier New', Courier, monospace !important;
    font-size: 11pt !important; line-height: 1.4 !important;
    width: 100% !important; height: auto !important;
    overflow: visible !important;
}
#invoice-print-area { width: 100%; padding: 0; margin: 0; background: #fff; color: #000; }
#invoice-print-area * { color: #000 !important; background: transparent !important; box-shadow: none !important; }
table { width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 10pt; page-break-inside: avoid; }
th, td { border-bottom: 1px solid #000; padding: 6px 4px; vertical-align: top; }
thead tr, th { border-bottom: 2px solid #000; font-weight: 700; }
#invoice-title { display: inline-block; border: 2px solid #000; padding: 6px 16px; text-align: center; font-size: 13pt; font-weight: 700; margin: 10px auto; text-transform: uppercase; }
.text-center { text-align: center !important; }
.text-right { text-align: right !important; }
.text-left { text-align: left !important; }
.invoice-meta-box { display: flex; justify-content: space-between; width: 100%; margin: 12px 0; font-size: 10pt; }
h2 { font-size: 12pt; margin: 4px 0; font-weight: 800; letter-spacing: 1px; }
p { margin: 2px 0; font-size: 10pt; }
.font-mono, .font-bold, .font-black, strong { font-weight: 700; }
button, .fa-xmark, .no-print { display: none !important; }
.flex.justify-between.uppercase { display: flex; justify-content: space-between; margin-top: 40px; font-size: 9pt; }
.flex.justify-between.uppercase > div { text-align: center; width: 45%; border-top: 1px solid #000; padding-top: 6px; }
.divide-y > * + * { border-top: 1px solid #ddd; }
.space-y-1 > * + * { margin-top: 2px; }
.pt-2 { padding-top: 8px; } .pt-4 { padding-top: 16px; } .pb-3 { padding-bottom: 12px; }
.mt-1 { margin-top: 4px; } .text-base { font-size: 12pt; }
</style>`;

            // ZËVENDËSO TËRËSISHT trupin e faqes me vetëm faturën
            document.title = 'Faturë — Lulzim Kompani';
            document.body.className = '';
            document.body.style.cssText = 'background:#fff;color:#000;margin:0;padding:0;';
            document.body.innerHTML = printStyles + invoiceHtml;

            // Funksioni i rikthimit të faqes
            const restore = () => {
                document.body.innerHTML = originalBody;
                document.body.className = originalBodyClass;
                document.body.style.cssText = '';
                document.title = originalTitle;
                window.scrollTo(0, scrollY);

                // Rifresko shfaqjet dinamike (event handlers janë inline onclick, mbeten)
                try {
                    populateDropdowns();
                    renderStoku();
                    renderLogs();
                    updateChart();
                    renderInvoiceHistory();
                    renderTemporaryInvoiceItems();
                    syncInvoiceItemPrice();
                    // Rikthe tab-in faturim aktiv
                    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
                    const fat = document.getElementById('tab-faturat');
                    if (fat) fat.classList.remove('hidden');
                    document.querySelectorAll('.tab-btn').forEach(btn => {
                        btn.classList.remove('text-amber-400', 'border-amber-500');
                        btn.classList.add('text-slate-400', 'border-transparent');
                    });
                    const btnFat = document.getElementById('btn-faturat');
                    if (btnFat) {
                        btnFat.classList.add('text-amber-400', 'border-amber-500');
                        btnFat.classList.remove('text-slate-400', 'border-transparent');
                    }
                } catch (e) { console.warn(e); }

                window.removeEventListener('afterprint', restore);
            };
            window.addEventListener('afterprint', restore);

            // Hap dialog-un e printimit
            setTimeout(() => {
                window.print();
                // Fallback nëse `afterprint` nuk firohet (Android Chrome)
                setTimeout(() => {
                    if (document.getElementById('__print_styles__')) {
                        restore();
                    }
                }, 1500);
            }, 100);
        }

        function getInvoiceFilename(ext) {
            const f = currentlyDisplayedInvoice;
            const numri = f?.numri || 'dokument';
            const client = (f?.client || 'klient').replace(/[^a-zA-Z0-9ëçËÇ ]/g, '').replace(/\s+/g, '-');
            return `Fature-${numri}-${client}.${ext}`;
        }

        function saveInvoiceAsPDF() {
            const preview = document.getElementById('invoice-preview-container');
            if (preview.classList.contains('hidden')) {
                return alert('Hap fillimisht një faturë.');
            }
            const original = document.getElementById('invoice-print-area');
            if (!original) return alert('Fatura nuk u gjet.');

            const filename = getInvoiceFilename('pdf');
            const invoiceHtml = original.outerHTML;
            const originalBody = document.body.innerHTML;
            const originalBodyClass = document.body.className;
            const originalBodyStyle = document.body.getAttribute('style') || '';
            const originalTitle = document.title;
            const scrollY = window.scrollY;

            const printStyles = `
<style id="__print_styles__">
* { box-sizing: border-box; }
html, body {
    margin: 0 !important; padding: 0 !important;
    background: #ffffff !important; color: #000000 !important;
    font-family: 'Courier New', Courier, monospace !important;
    font-size: 11pt !important; line-height: 1.4 !important;
}
#invoice-print-area { width: 100%; padding: 8px; margin: 0; background: #fff; color: #000; }
#invoice-print-area * { color: #000 !important; background: transparent !important; box-shadow: none !important; }
table { width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 10pt; }
th, td { border-bottom: 1px solid #000; padding: 6px 4px; vertical-align: top; }
thead tr, th { border-bottom: 2px solid #000; font-weight: 700; }
#invoice-title { display: inline-block; border: 2px solid #000; padding: 6px 16px; text-align: center; font-size: 13pt; font-weight: 700; margin: 10px auto; text-transform: uppercase; }
.text-center { text-align: center !important; }
.text-right { text-align: right !important; }
.text-left { text-align: left !important; }
.invoice-meta-box { display: flex; justify-content: space-between; width: 100%; margin: 12px 0; font-size: 10pt; }
h2 { font-size: 12pt; margin: 4px 0; font-weight: 800; letter-spacing: 1px; }
p { margin: 2px 0; font-size: 10pt; }
.font-mono, .font-bold, .font-black, strong { font-weight: 700; }
button, .fa-xmark, .no-print { display: none !important; }
.flex.justify-between.uppercase { display: flex; justify-content: space-between; margin-top: 40px; font-size: 9pt; }
.flex.justify-between.uppercase > div { text-align: center; width: 45%; border-top: 1px solid #000; padding-top: 6px; }
.divide-y > * + * { border-top: 1px solid #ddd; }
.space-y-1 > * + * { margin-top: 2px; }
.pt-2 { padding-top: 8px; } .pt-4 { padding-top: 16px; } .pb-3 { padding-bottom: 12px; }
.mt-1 { margin-top: 4px; } .text-base { font-size: 12pt; }
</style>`;

            // Zëvendëso TËRËSISHT trupin e faqes me vetëm faturën
            document.title = filename;
            document.body.className = '';
            document.body.style.cssText = 'background:#fff;color:#000;margin:0;padding:0;';
            document.body.innerHTML = printStyles + invoiceHtml;

            const restore = () => {
                document.body.innerHTML = originalBody;
                document.body.className = originalBodyClass;
                if (originalBodyStyle) document.body.setAttribute('style', originalBodyStyle);
                else document.body.removeAttribute('style');
                document.title = originalTitle;
                window.scrollTo(0, scrollY);

                try {
                    populateDropdowns();
                    renderStoku();
                    renderLogs();
                    updateChart();
                    renderInvoiceHistory();
                    renderTemporaryInvoiceItems();
                    syncInvoiceItemPrice();
                    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
                    const fat = document.getElementById('tab-faturat');
                    if (fat) fat.classList.remove('hidden');
                    document.querySelectorAll('.tab-btn').forEach(btn => {
                        btn.classList.remove('text-amber-400', 'border-amber-500');
                        btn.classList.add('text-slate-400', 'border-transparent');
                    });
                    const btnFat = document.getElementById('btn-faturat');
                    if (btnFat) {
                        btnFat.classList.add('text-amber-400', 'border-amber-500');
                        btnFat.classList.remove('text-slate-400', 'border-transparent');
                    }
                } catch (e) { console.warn(e); }
            };

            const target = document.getElementById('invoice-print-area');
            const opt = {
                margin:       [10, 10, 10, 10],
                filename:     filename,
                image:        { type: 'jpeg', quality: 0.98 },
                html2canvas:  { scale: 2, useCORS: true, backgroundColor: '#ffffff' },
                jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
                pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
            };

            html2pdf().from(target).set(opt).save()
                .then(() => restore())
                .catch(err => {
                    console.error(err);
                    restore();
                    alert('Gabim gjatë krijimit të PDF-së.');
                });
        }

        function buildInvoiceTextBody() {
            const f = currentlyDisplayedInvoice;
            if (!f) return '';
            const tpl = getTemplate();
            const lines = [];
            if (tpl.greeting) {
                lines.push(tpl.greeting);
                lines.push('');
            }
            lines.push('LULZIM KOMPANI DOOEL');
            lines.push('Rr. Josko Ilijevski, Kumanovë');
            lines.push('Tel: +389 70 529 767');
            lines.push('');
            lines.push((f.docType === 'klient' ? 'FATURË FINANCIARE' : 'FLETË-DËRGIMI I MATERIALIT'));
            lines.push('Dokumenti #' + f.numri);
            lines.push('Data: ' + f.dateDisplay);
            lines.push('Mori: ' + f.client);
            lines.push('-----------------------------------------');
            lines.push('ARTIKUJT:');
            (f.items || []).forEach(it => {
                const total = (it.sasia * it.cmimi).toLocaleString();
                if (f.docType === 'klient') {
                    lines.push(`  • ${it.emri} — ${it.sasia} ${it.njesia} x ${it.cmimi.toLocaleString()} MKD = ${total} MKD`);
                } else {
                    lines.push(`  • ${it.emri} — ${it.sasia} ${it.njesia}`);
                }
            });
            lines.push('-----------------------------------------');
            if (f.docType === 'klient') {
                lines.push('Neto:  ' + (f.neto || 0).toLocaleString() + ' MKD');
                lines.push('TVSH (18%): ' + (f.tvsh || 0).toLocaleString() + ' MKD');
                lines.push('TOTALI: ' + (f.total || 0).toLocaleString() + ' MKD');
            } else {
                lines.push('Status: LIVRUAR NË TRANSPORT');
            }
            if (tpl.signature) {
                lines.push('');
                lines.push(tpl.signature);
            }
            return lines.join('\n');
        }

        function emailInvoice() {
            const f = currentlyDisplayedInvoice;
            if (!f) return alert('Hap fillimisht një faturë.');
            const tpl = getTemplate();
            const subject = `${f.docType === 'klient' ? 'Faturë' : 'Fletë-Dërgim'} #${f.numri} — Lulzim Kompani`;
            const body = buildInvoiceTextBody() + '\n\n(Bashkëngjit PDF-në e ruajtur nëse dëshiron ta dërgosh.)';
            const to = tpl.emailTo || '';
            const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            const a = document.createElement('a');
            a.href = mailto;
            a.target = '_self';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }

        function whatsappInvoice() {
            const f = currentlyDisplayedInvoice;
            if (!f) return alert('Hap fillimisht një faturë.');
            const tpl = getTemplate();
            const text = buildInvoiceTextBody();
            const phone = (tpl.whatsappNumber || '').replace(/[^0-9]/g, '');
            // wa.me funksionon në mobile (hap WhatsApp app) dhe në desktop (hap WhatsApp Web)
            const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
            window.open(url, '_blank');
        }

        async function shareInvoice() {
            const f = currentlyDisplayedInvoice;
            if (!f) return alert('Hap fillimisht një faturë.');

            const subject = `${f.docType === 'klient' ? 'Faturë' : 'Fletë-Dërgim'} #${f.numri} — Lulzim Kompani`;
            const text = buildInvoiceTextBody();

            if (navigator.share) {
                try {
                    await navigator.share({ title: subject, text: text });
                    return;
                } catch (e) {
                    // user canceled
                    return;
                }
            }

            try {
                await navigator.clipboard.writeText(text);
                alert('Përmbajtja e faturës u kopjua në clipboard!\nMund ta ngjisësh në WhatsApp, Viber, ose kudo tjetër.');
            } catch (e) {
                prompt('Kopjo manualisht:', text);
            }
        }
    </script>
<script defer src="https://static.cloudflareinsights.com/beacon.min.js/v833ccba57c9e4d2798f2e76cebdd09a11778172276447" integrity="sha512-57MDmcccJXYtNnH+ZiBwzC4jb2rvgVCEokYN+L/nLlmO8rfYT/gIpW2A569iJ/3b+0UEasghjuZH/ma3wIs/EQ==" data-cf-beacon='{"version":"2024.11.0","token":"7f7b0fd8732c4326aae4b9d58d5c514a","server_timing":{"name":{"cfCacheStatus":true,"cfEdge":true,"cfExtPri":true,"cfL4":true,"cfOrigin":true,"cfSpeedBrain":true},"location_startswith":null}}' crossorigin="anonymous"></script>
</body>
</html>
