// ============================================
// PRIETO ALIMENTOS - Supabase Client
// Connects to Supabase for product data
// ============================================

const SUPABASE_URL = 'https://mfzkirqvbuklyifqcsto.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1memtpcnF2YnVrbHlpZnFjc3RvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwNDMwNTQsImV4cCI6MjA4NzYxOTA1NH0.i7Aar8JRyyT-QU_jLyPsMoVUCTQQl_wVUbbPfvM8xHk';

// ============================================
// SUPABASE FETCH HELPERS
// ============================================

async function supabaseFetch(endpoint, params = '') {
    const url = `${SUPABASE_URL}/rest/v1/${endpoint}${params ? '?' + params : ''}`;
    const response = await fetch(url, {
        headers: {
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error(`Supabase error: ${response.status} ${response.statusText}`);
    }
    return response.json();
}

/**
 * Fetch all products from Supabase
 */
async function fetchAllProdutos() {
    const data = await supabaseFetch('produtos', 'select=*&order=nome.asc');
    return data.map(normalizeProduto);
}

/**
 * Fetch a single product by SKU
 */
async function fetchProdutoBySku(sku) {
    const data = await supabaseFetch('produtos', `select=*&sku=eq.${sku}`);
    if (data.length === 0) return null;
    return normalizeProduto(data[0]);
}

// ============================================
// DATA NORMALIZATION
// ============================================

/**
 * Normalize a Supabase product row to the format used by the site
 */
function normalizeProduto(row) {
    // Column in Supabase is "photo" (not "foto")
    const photoUrl = row.photo || row.foto || null;
    return {
        id: row.sku,
        sku: row.sku,
        name: row.nome,
        slug: slugify(row.nome),
        category: detectCategory(row.nome),
        description: cleanDescription(row.descricao),
        shortDescription: truncateText(cleanDescription(row.descricao), 120),
        image: normalizeImageUrl(photoUrl),
        hasImage: !!photoUrl,
        tags: generateTags(row.nome)
    };
}

/**
 * Normalize the image URL (add https:// if missing)
 */
function normalizeImageUrl(foto) {
    if (!foto) return null;
    foto = foto.trim();
    if (foto.startsWith('http://') || foto.startsWith('https://')) {
        return foto;
    }
    return 'https://' + foto;
}

/**
 * Clean description text (remove numeric-only strings, URLs, etc.)
 */
function cleanDescription(desc) {
    if (!desc) return '';
    // If the description is just a number, it's not a real description
    if (/^\d+$/.test(desc.trim())) return '';
    // If the description is a URL, it's not a real description
    if (desc.trim().startsWith('http')) return '';
    return desc.trim();
}

/**
 * Truncate text with ellipsis
 */
function truncateText(text, maxLen) {
    if (!text || text.length <= maxLen) return text || '';
    return text.substring(0, maxLen).replace(/\s+\S*$/, '') + '…';
}

/**
 * Generate a URL slug from a product name
 */
function slugify(text) {
    if (!text) return '';
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

// ============================================
// AUTO-CATEGORIZATION from product name
// ============================================

const SUPABASE_CATEGORIES = [
    { id: 'todos', name: 'Todos' },
    { id: 'linguicas', name: 'Linguiças' },
    { id: 'bacon', name: 'Bacon' },
    { id: 'defumados', name: 'Defumados' },
    { id: 'embutidos', name: 'Embutidos' },
    { id: 'salgados', name: 'Salgados' },
    { id: 'temperados', name: 'Temperados' },
    { id: 'cortes', name: 'Cortes' },
    { id: 'feijoada', name: 'Feijoada' }
];

function detectCategory(nome) {
    if (!nome) return 'outros';
    const n = nome.toLowerCase();

    if (/lingu[ií][çc]a|calabresa/.test(n)) return 'linguicas';
    if (/bacon/.test(n)) return 'bacon';
    if (/salgad[oa]/.test(n)) return 'salgados';
    if (/feijoada/.test(n)) return 'feijoada';
    if (/temperad[oa]/.test(n)) return 'temperados';
    if (/defumad[oa]/.test(n)) return 'defumados';
    if (/presunto|salsicha|apresuntado|mortadela|paio\b/.test(n)) return 'embutidos';
    if (/tender/.test(n)) return 'embutidos';
    if (/lombo|pernil|costela|picanha|panceta|filé|copa|orelha|rabo|pé suíno|carne su|jerke?e?d/.test(n)) return 'cortes';
    if (/peito de frango/.test(n)) return 'defumados';
    if (/paleta/.test(n)) return 'defumados';

    return 'cortes';
}

function generateTags(nome) {
    if (!nome) return [];
    return nome
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .split(/\s+/)
        .filter(w => w.length > 2 && !['com', 'sem', 'para', 'tipo', 'sabor', 'uma'].includes(w));
}
