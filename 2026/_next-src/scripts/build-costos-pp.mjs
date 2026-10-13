/**
 * Genera `2026/perfumes/costos-perfumes.json`: el costo de cada perfume del
 * catálogo de previo pago, tomado de Originales.pdf.
 *
 * Uso:  node scripts/build-costos-pp.mjs
 *
 * Por qué un archivo aparte y no leer el PDF en cada build:
 * los costos son DATO COMERCIAL, no dato del catálogo. El Excel del catálogo
 * no los trae, y cruzarlos automáticamente con el PDF no es confiable
 * (las series Hawas / Asad / Yara / Club de Nuit se pisan entre sí y dan
 * precios del frasco equivocado). El mapeo queda escrito a mano acá, con la
 * línea del PDF de la que sale cada costo, para que sea auditable.
 *
 * El id es el mismo slug que usa src/lib/perfumes-previo-pago-data.js.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, '..', '..', 'perfumes', 'costos-perfumes.json');

/**
 * id del producto -> { costo, pdf: línea del PDF de la que sale }
 *
 * Marcados como `confirmado: false` los dos que se resolvieron por
 * recomendación y pueden cambiar: son los únicos que hay que tocar si
 * el costo real es otro.
 */
export const COSTOS = {
  // ------------------------------------------------------------ Armaf
  'armaf--club-de-nuit-sillage': { costo: 55000, pdf: 'Club de Nuit Sillage 105ml' },
  'armaf--club-de-nuit-iconic': { costo: 65000, pdf: 'Club de Nuit Iconic 105ml' },
  'armaf--club-de-nuit-woman': { costo: 50000, pdf: 'Club de Nuit Woman 105ml' },
  'armaf--club-de-nuit-untold': { costo: 65000, pdf: 'Club de Nuit Untold 105ml' },
  'armaf--club-de-nuit-oud': { costo: 80000, pdf: 'Club de Nuit Oud 105ml' },
  'armaf--club-de-nuit-milestone': { costo: 60000, pdf: 'Club de Nuit Milestone 105ml' },
  'armaf--club-de-nuit-urban-man-elixir': { costo: 70000, pdf: 'Club de Nuit Urban Elixir 105ml' },
  'armaf--club-de-nuit-lionheart-woman': { costo: 60000, pdf: 'Club De Nuit Lionheart Woman 100ml' },
  'armaf--club-de-nuit-lionheart-man': { costo: 70000, pdf: 'Club De Nuit Lionheart Man 100ml' },
  'armaf--club-de-nuit-intense-woman': { costo: 50000, pdf: 'Club de Nuit Intense Woman 105' },
  'armaf--club-de-nuit-intense-man-edt': { costo: 60000, pdf: 'Club de Nuit Intense Man 105ml' },
  'armaf--club-de-nuit-maleka': { costo: 65000, pdf: 'Club de Nuit Maleka 105ml' },
  // el PDF lo escribe "Precioux" (sin la e) y sin la "I" final
  'armaf--club-de-nuit-precieux-i': { costo: 80000, pdf: 'Club de Nuit Precioux 55ml' },

  'armaf--odyssey-go-mango': { costo: 65000, pdf: 'Odyssey Go Mango 100ml' },
  'armaf--odyssey-mandarin-sky': { costo: 50000, pdf: 'Odyssey Mandarin Sky 100ml' },
  'armaf--odyssey-candee': { costo: 45000, pdf: 'Odyssey Candee 100ml' },
  'armaf--odyssey-ba-ha-mas-bahamas': { costo: 65000, pdf: 'Odyssey BA HA MAS 100ml' },
  'armaf--odyssey-homme-white-edition': { costo: 45000, pdf: 'Odyssey Homme White Edition 100ml' },
  'armaf--odyssey-aqua': { costo: 60000, pdf: 'Odyssey Aqua Edition 100ml' },

  // ------------------------------------------------------------ Al Haramain
  'al-haramain--amber-oud-gold-edition': { costo: 80000, pdf: 'Amber Oud Gold Edition 120ml.' },

  // ------------------------------------------------------------ Maison Alhambra
  'maison-alhambra--eternal-touch': { costo: 35000, pdf: 'Eternal Touch 80ml' },
  'maison-alhambra--glacier-ultra': { costo: 35000, pdf: 'Glacier Ultra 100ml' },
  'maison-alhambra--la-rouge-baroque-extreme': { costo: 35000, pdf: 'La Rouge Baroque Extreme 100ml' },
  'maison-alhambra--la-vivacite-intensa': { costo: 35000, pdf: 'La Vivacite Intensa 100ml' },

  // ------------------------------------------------------------ Afnan
  'afnan--9am': { costo: 50000, pdf: '9am 100ml' },
  'afnan--9am-pour-femme': { costo: 60000, pdf: '9am Pour Femme 100ml' },
  'afnan--9pm': { costo: 55000, pdf: '9pm 100ml' },
  'afnan--9pm-pour-femme': { costo: 55000, pdf: '9pm Pour Femme 100ml' },
  'afnan--9pm-rebel': { costo: 60000, pdf: '9pm Rebel 100ml' },
  'afnan--9pm-elixir': { costo: 65000, pdf: '9pm Elixir 100ml' },
  'afnan--9pm-night-out': { costo: 90000, pdf: '9pm Night Out 100ml' },
  'afnan--turathi-electric': { costo: 60000, pdf: 'Turathi Electric 100ml' },
  'afnan--turathi-blue': { costo: 60000, pdf: 'Turathi Blue 90ml' },

  // ------------------------------------------------------------ Rasasi
  'rasasi--hawas-for-him-original': { costo: 50000, pdf: 'Hawas for Him 100ml' },
  'rasasi--hawas-for-her-original': { costo: 45000, pdf: 'Hawas for Her 100ml' },
  'rasasi--hawas-for-him-kobra': { costo: 80000, pdf: 'Hawas Kobra 100ml' },
  'rasasi--hawas-for-him-malibu': { costo: 85000, pdf: 'Hawas Malibu 100ml' },
  'rasasi--hawas-for-him-fire': { costo: 65000, pdf: 'Hawas Fire 100ml' },
  'rasasi--hawas-black-for-him': { costo: 50000, pdf: 'Hawas Black 100ml' },
  'rasasi--hawas-ice-for-him': { costo: 70000, pdf: 'Hawas ICE 100ml' },
  'rasasi--hawas-verde': { costo: 75000, pdf: 'Hawas Verde 100ml' },
  'rasasi--hawas-tropical': { costo: 80000, pdf: 'Hawas Tropical 100ml' },
  'rasasi--hawas-elixir': { costo: 60000, pdf: 'Hawas Elixir 100ml' },
  'rasasi--hawas-for-her-eclat': { costo: 50000, pdf: 'Hawas for Her Éclat 100ml' },
  'rasasi--hawas-for-her-diva': { costo: 80000, pdf: 'Hawas Diva 100ml' },
  // el PDF lo llama "Hawas Pink", sin el "For Her"
  'rasasi--hawas-pink-for-her': { costo: 80000, pdf: 'Hawas Pink 100ml' },

  // ------------------------------------------------------------ Lattafa
  'lattafa--haya': { costo: 40000, pdf: 'Haya 100ml' },
  'lattafa--victoria': { costo: 50000, pdf: 'Victoria 100ml' },
  'lattafa--her-confession': { costo: 55000, pdf: 'Her Confession 100ml' },
  'lattafa--his-confession': { costo: 55000, pdf: 'His Confession 100ml' },
  'lattafa--yara-pink': { costo: 40000, pdf: 'Yara 100ml' },
  'lattafa--yara-tous': { costo: 40000, pdf: 'Yara Tous 100ml' },
  'lattafa--yara-moi': { costo: 40000, pdf: 'Yara Moi 100ml' },
  'lattafa--yara-candy': { costo: 40000, pdf: 'Yara Candy 100ml' },
  'lattafa--asad-elixir': { costo: 60000, pdf: 'Asad Elixir 100ml' },
  'lattafa--asad-bourbon': { costo: 60000, pdf: 'Asad Bourbon 100ml' },
  'lattafa--asad-zanzibar': { costo: 35000, pdf: 'Asad Zanzibar 100ml' },

  // ------------------------------------------------------------ otros
  'bharara--king': { costo: 90000, pdf: 'Bharara King 100ml' },
  'lattafa-pride--pisa': { costo: 65000, pdf: 'Pisa 100ml' },

  // ------------------------------------------------------------ SIN CONFIRMAR
  // El PDF tiene dos "Now" y ninguno aclara la marca. Se tomó el Black porque
  // el catálogo lo tiene como Masculino. Si el Now de RAVE es otro, es este
  // número el que hay que cambiar.
  'rave-lattafa--now': { costo: 35000, pdf: 'Now Black 100ml', confirmado: false },

  // El PDF tiene cuatro Asad y tres los usan otros productos del catálogo.
  // El único nombre libre es "Asad Negro", que es como Lattafa renombró el
  // Asad original. Si el Asad del catálogo es otro, es este número.
  'lattafa--asad': { costo: 40000, pdf: 'Asad Negro 100ml', confirmado: false },
};

/** El ratio de venta sale del ejemplo del usuario: costo 55.000 -> venta 124.900. */
export const RATIO = 124900 / 55000;
export const CBU_DISCOUNT = 0.9;

const round100 = (v) => Math.round(v / 100) * 100;
export const venta = (costo) => round100(costo * RATIO);
export const cbu = (precio) => round100(precio * CBU_DISCOUNT);

const salida = {
  _nota:
    'Generado por scripts/build-costos-pp.mjs. Los costos salen de Originales.pdf ' +
    '(columna "Precio x Uni. Perfume Arabe"). El precio de venta se calcula con el ' +
    'ratio del ejemplo: costo 55.000 -> 124.900, redondeado a los $100. El CBU es ' +
    'el 10% menos, también redondeado a los $100. Editar este archivo NO es necesario: ' +
    'para cambiar algo se edita COSTOS en el script y se corre de nuevo.',
  ratio: RATIO,
  cbuDiscount: CBU_DISCOUNT,
  costos: Object.fromEntries(
    Object.entries(COSTOS).map(([id, v]) => [
      id,
      { costo: v.costo, venta: venta(v.costo), cbu: cbu(venta(v.costo)), pdf: v.pdf, ...(v.confirmado === false ? { confirmado: false } : {}) },
    ]),
  ),
};

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(salida, null, 2) + '\n', 'utf8');

const sinConfirmar = Object.keys(COSTOS).filter((id) => COSTOS[id].confirmado === false);
const costos = Object.values(COSTOS).map((c) => c.costo);
console.log('escrito', OUT);
console.log('productos con costo:', Object.keys(COSTOS).length);
console.log('sin confirmar:', sinConfirmar.length ? sinConfirmar.join(', ') : 'ninguno');
console.log(
  `costo ${Math.min(...costos).toLocaleString('es-AR')} - ${Math.max(...costos).toLocaleString('es-AR')}` +
    `  ->  venta ${venta(Math.min(...costos)).toLocaleString('es-AR')} - ${venta(Math.max(...costos)).toLocaleString('es-AR')}`,
);