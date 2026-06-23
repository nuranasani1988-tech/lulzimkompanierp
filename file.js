// ============================================================
// storage.js — Ruajtja e të dhënave (localStorage) + State
// Lulzim Kompani ERP v2.5
// ============================================================

const STORAGE_KEY   = 'lulzim_erp_data_v1';
const PIN_KEY       = 'lulzim_erp_pin_v1';
const TEMPLATE_KEY  = 'lulzim_erp_template_v1';
const DEFAULT_PIN   = 'lulzim123';

// ---- State global ----
let stoku = {
    1: { id: 1, emri: "Rërë",    sasia: 420,  njesia: "m³",   cmimi: 1250, barcode: "11111" },
    2: { id: 2, emri: "Tulla",   sasia: 8500, njesia: "Copë",  cmimi: 28,   barcode: "22222" },
    3: { id: 3, emri: "Çimento", sasia: 600,  njesia: "Thasë", cmimi: 390,  barcode: "33333" }
};

let historikuLevizjeve = [
    { data: "2026-01-10", material: "Rërë",    sasia: 100,  lloji: "Hyrje", vlera: 125000, muaji: 0 },
    { data: "2026-02-15", material: "Tulla",   sasia: 3000, lloji: "Dalje", vlera: 84000,  muaji: 1 },
    { data: "2026-03-05", material: "Çimento", sasia: 200,  lloji: "Hyrje", vlera: 78000,  muaji: 2 },
    { data: "2026-04-12", material: "Rërë",    sasia: 50,   lloji: "Dalje", vlera: 62500,  muaji: 3 }
];

let faturat         = [];   // historiku i faturave të gjeneruara
let shportaFatures  = [];   // shporta aktuale e faturimit
let editingPriceForId = null;
let currentlyDisplayedInvoice = null;

// ---- PIN ----
function getStoredPin() {
    try { return localStorage.getItem(PIN_KEY) || DEFAULT_PIN; }
    catch (e) { return DEFAULT_PIN; }
}

function setStoredPin(pin) {
    try { localStorage.setItem(PIN_KEY, pin); } catch (e) {}
}

// ---- Template (WhatsApp / Email) ----
const DEFAULT_TEMPLATE = {
    whatsappNumber: '',
    emailTo: '',
    greeting:  'Përshëndetje, ju dërgojmë dokumentin e mëposhtëm:',
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

// ---- Ruajtja / Ngarkimi i state-it ----
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
        if (parsed.stoku)              stoku              = parsed.stoku;
        if (parsed.historikuLevizjeve) historikuLevizjeve = parsed.historikuLevizjeve;
        if (Array.isArray(parsed.faturat)) faturat        = parsed.faturat;
    } catch (e) { console.warn('Load failed', e); }
}
