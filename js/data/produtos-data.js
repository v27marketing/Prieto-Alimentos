// ============================================
// PRIETO ALIMENTOS - Produtos Data
// Fictional products for demonstration
// ============================================

const PRODUCT_CATEGORIES = [
    { id: 'todos', name: 'Todos', icon: 'grid' },
    { id: 'natalinos', name: 'Natalinos', icon: 'natalinos' },
    { id: 'linguicas', name: 'Linguiças', icon: 'linguicas' },
    { id: 'feijoada', name: 'Feijoada', icon: 'feijoada' },
    { id: 'embutidos', name: 'Embutidos', icon: 'embutidos' },
    { id: 'defumados', name: 'Defumados', icon: 'defumados' },
    { id: 'cortes-suinos', name: 'Cortes Suínos', icon: 'cortes-suinos' },
    { id: 'bacon', name: 'Bacon', icon: 'bacon' }
];

const PRODUCTS = [
    // === NATALINOS ===
    {
        id: 1,
        name: 'Tender Natalino Defumado',
        slug: 'tender-natalino-defumado',
        category: 'natalinos',
        description: 'Tender suíno defumado artesanalmente, ideal para a ceia de Natal. Temperado com especiarias selecionadas e defumado lentamente por 12 horas.',
        shortDescription: 'Tender defumado artesanal para ceia de Natal.',
        weight: '3,5 kg',
        emoji: '🎄',
        preparation: 'Retire da embalagem e aqueça em forno pré-aquecido a 180°C por 40 minutos. Regue com calda de frutas a gosto.',
        nutrition: { calories: '145 kcal', protein: '18g', fat: '7g', carbs: '2g', sodium: '890mg' },
        isPremium: false,
        tags: ['natal', 'tender', 'defumado', 'ceia']
    },
    {
        id: 2,
        name: 'Pernil Temperado Natalino',
        slug: 'pernil-temperado-natalino',
        category: 'natalinos',
        description: 'Pernil suíno cuidadosamente temperado com alho, ervas finas e especiarias. Pronto para assar, garantindo uma ceia memorável.',
        shortDescription: 'Pernil suíno temperado pronto para assar.',
        weight: '4,0 kg',
        emoji: '🍖',
        preparation: 'Asse em forno pré-aquecido a 200°C por aproximadamente 3 horas, regando com o próprio suco a cada 30 minutos.',
        nutrition: { calories: '165 kcal', protein: '22g', fat: '8g', carbs: '1g', sodium: '720mg' },
        isPremium: false,
        tags: ['natal', 'pernil', 'temperado', 'assado']
    },
    {
        id: 3,
        name: 'Chester Prieto Especial',
        slug: 'chester-prieto-especial',
        category: 'natalinos',
        description: 'Ave especial temperada com ervas provençais e manteiga temperada. Perfeita para quem busca uma alternativa sofisticada na ceia natalina.',
        shortDescription: 'Ave especial com ervas provençais para o Natal.',
        weight: '3,0 kg',
        emoji: '🦃',
        preparation: 'Asse em forno a 200°C por 2h30, cobrindo com papel alumínio na primeira hora.',
        nutrition: { calories: '130 kcal', protein: '24g', fat: '4g', carbs: '0g', sodium: '650mg' },
        isPremium: false,
        tags: ['natal', 'chester', 'ave', 'ceia']
    },

    // === LINGUIÇAS ===
    {
        id: 4,
        name: 'Linguiça Calabresa Defumada',
        slug: 'linguica-calabresa-defumada',
        category: 'linguicas',
        description: 'Linguiça calabresa defumada com pimenta calabresa selecionada. Receita tradicional espanhola adaptada ao paladar brasileiro. Ideal para churrasco.',
        shortDescription: 'Calabresa defumada com receita tradicional espanhola.',
        weight: '1,0 kg',
        emoji: '🌶️',
        preparation: 'Grelhe em churrasqueira ou frigideira em fogo médio por 15-20 minutos, virando frequentemente.',
        nutrition: { calories: '280 kcal', protein: '16g', fat: '23g', carbs: '1g', sodium: '1150mg' },
        isPremium: false,
        tags: ['linguiça', 'calabresa', 'defumada', 'churrasco']
    },
    {
        id: 5,
        name: 'Linguiça Toscana Fresca',
        slug: 'linguica-toscana-fresca',
        category: 'linguicas',
        description: 'Linguiça toscana fresca com cortes suínos selecionados e temperada com alho, salsa e especiarias naturais. Textura e sabor incomparáveis.',
        shortDescription: 'Toscana fresca com tempero artesanal.',
        weight: '1,0 kg',
        emoji: '🌭',
        preparation: 'Grelhe em brasa ou frigideira por 20-25 minutos até dourar por igual.',
        nutrition: { calories: '260 kcal', protein: '15g', fat: '22g', carbs: '0g', sodium: '980mg' },
        isPremium: false,
        tags: ['linguiça', 'toscana', 'fresca', 'churrasco']
    },
    {
        id: 6,
        name: 'Linguiça de Pernil com Queijo',
        slug: 'linguica-pernil-queijo',
        category: 'linguicas',
        description: 'Linguiça artesanal de pernil suíno recheada com queijo provolone. Uma combinação irresistível para o churrasco em família.',
        shortDescription: 'Linguiça de pernil recheada com provolone.',
        weight: '800g',
        emoji: '🧀',
        preparation: 'Grelhe em fogo médio-baixo por 20 minutos, cuidando para não furar a tripa.',
        nutrition: { calories: '295 kcal', protein: '18g', fat: '24g', carbs: '2g', sodium: '1050mg' },
        isPremium: false,
        tags: ['linguiça', 'pernil', 'queijo', 'recheada']
    },

    // === FEIJOADA ===
    {
        id: 7,
        name: 'Kit Feijoada Completa',
        slug: 'kit-feijoada-completa',
        category: 'feijoada',
        description: 'Kit completo com todos os cortes para uma feijoada autêntica: costela, paio, carne seca, orelha, pé e rabo defumados. Serve até 8 pessoas.',
        shortDescription: 'Kit completo de feijoada para 8 pessoas.',
        weight: '2,5 kg',
        emoji: '🫘',
        preparation: 'Dessalgue as carnes em água por 12 horas, trocando a água 3 vezes. Cozinhe em panela de pressão por 40 minutos.',
        nutrition: { calories: '310 kcal', protein: '25g', fat: '22g', carbs: '3g', sodium: '1380mg' },
        isPremium: false,
        tags: ['feijoada', 'kit', 'completa', 'defumados']
    },
    {
        id: 8,
        name: 'Paio para Feijoada',
        slug: 'paio-feijoada',
        category: 'feijoada',
        description: 'Paio defumado artesanalmente, corte essencial para uma feijoada tradicional. Sabor intenso e textura firme que se desfaz no cozimento.',
        shortDescription: 'Paio defumado artesanal para feijoada.',
        weight: '500g',
        emoji: '🥩',
        preparation: 'Dessalgue por 8 horas e cozinhe junto com o feijão por 30 minutos.',
        nutrition: { calories: '340 kcal', protein: '20g', fat: '28g', carbs: '1g', sodium: '1480mg' },
        isPremium: false,
        tags: ['feijoada', 'paio', 'defumado']
    },
    {
        id: 9,
        name: 'Costelinha Defumada para Feijoada',
        slug: 'costelinha-defumada-feijoada',
        category: 'feijoada',
        description: 'Costelinha suína defumada com osso, especialmente preparada para agregar sabor e corpo à feijoada. Defumação artesanal por 8 horas.',
        shortDescription: 'Costelinha defumada para feijoada autêntica.',
        weight: '700g',
        emoji: '🍖',
        preparation: 'Dessalgue e cozinhe em panela de pressão por 35 minutos até ficar macia.',
        nutrition: { calories: '290 kcal', protein: '19g', fat: '23g', carbs: '0g', sodium: '1250mg' },
        isPremium: false,
        tags: ['feijoada', 'costelinha', 'defumada']
    },

    // === EMBUTIDOS ===
    {
        id: 10,
        name: 'Presunto Cozido Prieto',
        slug: 'presunto-cozido',
        category: 'embutidos',
        description: 'Presunto cozido de alta qualidade, elaborado com pernil suíno selecionado. Fatiado na medida certa, perfeito para sanduíches e lanches.',
        shortDescription: 'Presunto cozido premium fatiado.',
        weight: '200g',
        emoji: '🥪',
        preparation: 'Pronto para consumo. Mantenha refrigerado entre 0°C e 4°C.',
        nutrition: { calories: '110 kcal', protein: '18g', fat: '3g', carbs: '2g', sodium: '820mg' },
        isPremium: false,
        tags: ['presunto', 'cozido', 'fatiado', 'embutido']
    },
    {
        id: 11,
        name: 'Mortadela Bologna Prieto',
        slug: 'mortadela-bologna',
        category: 'embutidos',
        description: 'Mortadela tipo bologna, produzida com carnes selecionadas e pistache. Sabor suave e textura aveludada, ideal para sanduíches gourmet.',
        shortDescription: 'Mortadela bologna com pistache.',
        weight: '500g',
        emoji: '🫒',
        preparation: 'Pronto para consumo. Pode ser fatiada fina ou grossa conforme preferência.',
        nutrition: { calories: '240 kcal', protein: '14g', fat: '19g', carbs: '3g', sodium: '1050mg' },
        isPremium: false,
        tags: ['mortadela', 'bologna', 'fatiado', 'embutido']
    },
    {
        id: 12,
        name: 'Lombo Canadense',
        slug: 'lombo-canadense',
        category: 'embutidos',
        description: 'Lombo suíno defumado no estilo canadense, magro e saboroso. Cortado em fatias uniformes para sanduíches e saladas.',
        shortDescription: 'Lombo canadense defumado e fatiado.',
        weight: '300g',
        emoji: '🥓',
        preparation: 'Pronto para consumo. Ideal para compor sanduíches e tábuas de frios.',
        nutrition: { calories: '120 kcal', protein: '20g', fat: '4g', carbs: '1g', sodium: '780mg' },
        isPremium: false,
        tags: ['lombo', 'canadense', 'defumado', 'embutido']
    },
    {
        id: 13,
        name: 'Salsicha Frankfurt Premium',
        slug: 'salsicha-frankfurt-premium',
        category: 'embutidos',
        description: 'Salsicha tipo Frankfurt produzida com carne suína de primeira e defumada naturalmente. Crocante por fora, suculenta por dentro.',
        shortDescription: 'Salsicha Frankfurt defumada naturalmente.',
        weight: '500g',
        emoji: '🌭',
        preparation: 'Cozinhe em água fervente por 5 minutos ou grelhe até dourar.',
        nutrition: { calories: '220 kcal', protein: '12g', fat: '18g', carbs: '2g', sodium: '950mg' },
        isPremium: false,
        tags: ['salsicha', 'frankfurt', 'embutido', 'hot-dog']
    },

    // === DEFUMADOS ===
    {
        id: 14,
        name: 'Costela Suína Defumada',
        slug: 'costela-suina-defumada',
        category: 'defumados',
        description: 'Costela suína defumada lentamente em madeira de cerejeira por 10 horas. Carne macia que se solta do osso com facilidade.',
        shortDescription: 'Costela defumada em madeira de cerejeira.',
        weight: '1,2 kg',
        emoji: '🔥',
        preparation: 'Aqueça em forno a 160°C por 30 minutos coberta com papel alumínio.',
        nutrition: { calories: '250 kcal', protein: '18g', fat: '19g', carbs: '0g', sodium: '890mg' },
        isPremium: false,
        tags: ['costela', 'defumada', 'churrasco']
    },
    {
        id: 15,
        name: 'Paleta Suína Defumada',
        slug: 'paleta-suina-defumada',
        category: 'defumados',
        description: 'Paleta suína defumada inteira com osso. Ideal para desfiado ou assada. Processo de defumação artesanal que garante sabor incomparável.',
        shortDescription: 'Paleta defumada inteira com osso.',
        weight: '2,0 kg',
        emoji: '💨',
        preparation: 'Cozinhe em panela de pressão por 45 minutos ou asse em forno a 180°C por 2 horas.',
        nutrition: { calories: '195 kcal', protein: '20g', fat: '12g', carbs: '0g', sodium: '950mg' },
        isPremium: false,
        tags: ['paleta', 'defumada', 'desfiado']
    },

    // === CORTES SUÍNOS ===
    {
        id: 16,
        name: 'Pernil Suíno sem Osso',
        slug: 'pernil-suino-sem-osso',
        category: 'cortes-suinos',
        description: 'Pernil suíno limpo, sem osso e sem pele. Peça inteira para assar ou fatiar conforme desejado. Carne suína de primeira qualidade.',
        shortDescription: 'Pernil limpo sem osso para assar.',
        weight: '3,0 kg',
        emoji: '🐖',
        preparation: 'Tempere a gosto e asse em forno a 200°C por aproximadamente 2h30.',
        nutrition: { calories: '180 kcal', protein: '24g', fat: '9g', carbs: '0g', sodium: '55mg' },
        isPremium: false,
        tags: ['pernil', 'suíno', 'sem osso', 'assado']
    },
    {
        id: 17,
        name: 'Bisteca Suína',
        slug: 'bisteca-suina',
        category: 'cortes-suinos',
        description: 'Bisteca suína com osso, corte nobre ideal para grelhar. Carne macia e suculenta da lombar suína, porcionada uniformemente.',
        shortDescription: 'Bisteca com osso para grelhar.',
        weight: '1,0 kg',
        emoji: '🥩',
        preparation: 'Grelhe em fogo alto por 4-5 minutos de cada lado.',
        nutrition: { calories: '200 kcal', protein: '26g', fat: '10g', carbs: '0g', sodium: '60mg' },
        isPremium: false,
        tags: ['bisteca', 'suíno', 'grelhado', 'churrasco']
    },
    {
        id: 18,
        name: 'Lombo Suíno Inteiro',
        slug: 'lombo-suino-inteiro',
        category: 'cortes-suinos',
        description: 'Lombo suíno inteiro, o corte mais magro e versátil do porco. Perfeito para rechear, assar inteiro ou fatiar em medalhões.',
        shortDescription: 'Lombo inteiro versátil e magro.',
        weight: '1,5 kg',
        emoji: '🍴',
        preparation: 'Asse inteiro a 180°C por 1h ou fatie em medalhões e grelhe por 5 minutos cada lado.',
        nutrition: { calories: '140 kcal', protein: '26g', fat: '3.5g', carbs: '0g', sodium: '50mg' },
        isPremium: false,
        tags: ['lombo', 'suíno', 'inteiro', 'magro']
    },

    // === BACON ===
    {
        id: 19,
        name: 'Bacon Fatiado Premium',
        slug: 'bacon-fatiado-premium',
        category: 'bacon',
        description: 'Bacon fatiado em fatias finas e uniformes, curado e defumado artesanalmente. Crocante na medida certa para café da manhã ou receitas.',
        shortDescription: 'Bacon fatiado fino defumado artesanal.',
        weight: '250g',
        emoji: '🥓',
        preparation: 'Frite em frigideira sem óleo em fogo médio até atingir a crocância desejada.',
        nutrition: { calories: '370 kcal', protein: '14g', fat: '35g', carbs: '0g', sodium: '1200mg' },
        isPremium: false,
        tags: ['bacon', 'fatiado', 'defumado', 'café da manhã']
    },
    {
        id: 20,
        name: 'Bacon em Manta',
        slug: 'bacon-em-manta',
        category: 'bacon',
        description: 'Bacon em peça inteira (manta) para você fatiar na espessura desejada. Curado por 15 dias e defumado em madeira de macieira.',
        shortDescription: 'Bacon em manta para corte personalizado.',
        weight: '1,0 kg',
        emoji: '🔪',
        preparation: 'Fatie na espessura desejada e prepare em frigideira, no forno ou na churrasqueira.',
        nutrition: { calories: '350 kcal', protein: '15g', fat: '32g', carbs: '0g', sodium: '1150mg' },
        isPremium: false,
        tags: ['bacon', 'manta', 'inteiro', 'defumado']
    },
    {
        id: 21,
        name: 'Bacon em Cubos',
        slug: 'bacon-cubos',
        category: 'bacon',
        description: 'Bacon cortado em cubos uniformes, prático para adicionar em massas, saladas, sopas e omeletes. Defumação natural.',
        shortDescription: 'Bacon em cubos prático para receitas.',
        weight: '200g',
        emoji: '🧊',
        preparation: 'Frite diretamente na panela ou frigideira até dourar.',
        nutrition: { calories: '350 kcal', protein: '14g', fat: '33g', carbs: '0g', sodium: '1100mg' },
        isPremium: false,
        tags: ['bacon', 'cubos', 'prático', 'receitas']
    }
];

// Etiqueta Negra Premium Products
const EN_PRODUCTS = [
    {
        id: 101,
        name: 'Presunto Parma Reserva Especial',
        slug: 'presunto-parma-reserva',
        category: 'embutidos',
        description: 'Presunto curado por 18 meses em câmara climatizada. Fatiado à mão em lâminas translúcidas que derretem na boca. Edição limitada.',
        shortDescription: 'Presunto curado 18 meses, fatiado à mão.',
        weight: '150g',
        emoji: '👑',
        isPremium: true,
        tags: ['premium', 'presunto', 'parma', 'curado']
    },
    {
        id: 102,
        name: 'Linguiça Ibérica de Bellota',
        slug: 'linguica-iberica-bellota',
        category: 'linguicas',
        description: 'Linguiça artesanal inspirada na tradição ibérica, com carne suína de raça especial alimentada com castanhas. Textura e aroma incomparáveis.',
        shortDescription: 'Linguiça artesanal de tradição ibérica.',
        weight: '400g',
        emoji: '🏅',
        isPremium: true,
        tags: ['premium', 'linguiça', 'ibérica', 'artesanal']
    },
    {
        id: 103,
        name: 'Lombo Curado Etiqueta Negra',
        slug: 'lombo-curado-etiqueta-negra',
        category: 'embutidos',
        description: 'Lombo suíno curado em sal marinho e pimenta preta por 90 dias. Defumado com madeiras nobres selecionadas. Sabor profundo e complexo.',
        shortDescription: 'Lombo curado 90 dias com madeiras nobres.',
        weight: '300g',
        emoji: '🖤',
        isPremium: true,
        tags: ['premium', 'lombo', 'curado', 'defumado']
    },
    {
        id: 104,
        name: 'Bacon Artesanal Defumado em Carvalho',
        slug: 'bacon-artesanal-carvalho',
        category: 'bacon',
        description: 'Bacon premium defumado em barris de carvalho europeu por 72 horas. Curado com ervas frescas e especiarias importadas. Para verdadeiros apreciadores.',
        shortDescription: 'Bacon defumado em carvalho europeu.',
        weight: '200g',
        emoji: '✨',
        isPremium: true,
        tags: ['premium', 'bacon', 'carvalho', 'artesanal']
    }
];
