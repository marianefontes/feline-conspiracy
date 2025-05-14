export const catNames = [
  "Gato do Vaticano",        
  "Gato da Casa Branca",     
  "Gato Espião do Kremlin",  
  "Gata Influencer de Milão",
  "Gato Aristocrata de Paris",
  "Gato Alienígena do Atacama",
  "Gato Samurai de Tóquio",  
  "Gato Guardião da Muralha",
  "Gato Tuaregue de Marrakesh",
  "Gato Astrônomo de Sidney"
];

export type Edge = { from: number, to: number, weight: number };

export const edges: Edge[] = [
  { from: 0, to: 1, weight: 80 },
  { from: 0, to: 2, weight: 70 },
  { from: 0, to: 3, weight: 10 },
  { from: 0, to: 4, weight: 15 },
  { from: 1, to: 5, weight: 65 },
  { from: 1, to: 6, weight: 90 },
  { from: 2, to: 7, weight: 30 },
  { from: 3, to: 4, weight: 12 },
  { from: 6, to: 7, weight: 18 },
  { from: 8, to: 0, weight: 40 },
  { from: 8, to: 5, weight: 75 },
  { from: 7, to: 9, weight: 55 },
  { from: 5, to: 9, weight: 35 }
];
