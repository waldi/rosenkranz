export enum RosenkranzType {
  FREUDENREICHE_GEHEIMNISSE = 'FREUDENREICHE_GEHEIMNISSE',
  LICHTREICHE_GEHEIMNISSE = 'LICHTREICHE_GEHEIMNISSE',
  SCHMERZHAFTE_GEHEIMNISSE = 'SCHMERZHAFTE_GEHEIMNISSE',
  GLORREICHE_GEHEIMNISSE = 'GLORREICHE_GEHEIMNISSE',
}

export enum SectionType {
  INTRO = 'INTRO',
  CREDO = 'CREDO',
  GLORIA_PATRI = 'GLORIA_PATRI',
  PATER_NOSTER = 'PATER_NOSTER',
  AVE_MARIA = 'AVE_MARIA',
}

export type Section = {
  type: SectionType;
  text: string[];
};

const getIntro = (): Section => ({
  type: SectionType.INTRO,
  text: ['Im Namen des Vaters und des Sohnes und des Heiligen Geistes.', 'Amen.'],
});

const getCredo = (): Section => ({
  type: SectionType.CREDO,
  text: [
    'Ich glaube an Gott, den Vater, den Allmächtigen,',
    'den Schöpfer des Himmels und der Erde.',
    'Und an Jesus Christus,',
    'seinen eingeborenen Sohn, unsern Herrn,',
    'empfangen durch den Heiligen Geist,',
    'geboren von der Jungfrau Maria,',
    'gelitten unter Pontius Pilatus,',
    'gekreuzigt, gestorben und begraben,',
    'hinabgestiegen in das Reich des Todes,',
    'am dritten Tage auferstanden von den Toten,',
    'aufgefahren in den Himmel;',
    'er sitzt zur Rechten Gottes, des allmächtigen Vaters;',
    'von dort wird er kommen,',
    'zu richten die Lebenden und die Toten.',
    'Ich glaube an den Heiligen Geist,',
    'die heilige katholische Kirche,',
    'Gemeinschaft der Heiligen, Vergebung der Sünden,',
    'Auferstehung der Toten und das ewige Leben.',
    'Amen.',
  ],
});

const getGloriaPatri = (): Section => ({
  type: SectionType.GLORIA_PATRI,
  text: [
    'Ehre sei dem Vater',
    'und dem Sohn',
    'und dem Heiligen Geist,',
    'wie im Anfang,',
    'so auch jetzt',
    'und alle Zeit und in Ewigkeit.',
    'Amen.',
  ],
});

const getPaterNoster = (): Section => ({
  type: SectionType.PATER_NOSTER,
  text: [
    'Vater unser im Himmel,',
    'geheiligt werde dein Name.',
    'Dein Reich komme.',
    'Dein Wille geschehe,',
    'wie im Himmel so auf Erden.',
    'Unser tägliches Brot gib uns heute.',
    'Und vergib uns unsere Schuld,',
    'wie auch wir vergeben unsern Schuldigern.',
    'Und führe uns nicht in Versuchung,',
    'sondern erlöse uns von dem Bösen.',
    'Amen.',
  ],
});

const getAveMaria = (appendix: string): Section => ({
  type: SectionType.AVE_MARIA,
  text: [
    'Gegrüßet seist Du, Maria, voll der Gnade,',
    'der Herr ist mit Dir,',
    'Du bist gebenedeit unter den Frauen,',
    'und gebenedeit ist die Frucht Deines Leibes, Jesus,',
    appendix,
    'Heilige Maria, Mutter Gottes, bitte für uns Sünder',
    'jetzt und in der Stunde unseres Todes.',
    'Amen.',
  ],
});

const INTRO_AVE_MARIA_APPENDIXES = [
  'Der in uns den Glauben vermehre.',
  'Der in uns die Hoffnung stärke.',
  'Der in uns die Liebe entzünde.',
];

const ROSENKRANK_TYPE_TO_APPENDIXES_MAP = {
  [RosenkranzType.FREUDENREICHE_GEHEIMNISSE]: [
    'Den du, o Jungfrau, vom heiligen Geist empfangen hast.',
    'Den du, o Jungfrau, zu Elisabeth getragen hast.',
    'Den du, o Jungfrau, in Bethlehem geboren hast.',
    'Den du, o Jungfrau, im Tempel aufgeopfert hast.',
    'Den du, o Jungfrau, im Tempel wiedergefunden hast.',
  ],
  [RosenkranzType.LICHTREICHE_GEHEIMNISSE]: [
    'Der von Johannes getauft worden ist.',
    'Der sich bei der Hochzeit in Kana offenbart hat.',
    'Der uns das Reich Gottes verkündet hat.',
    'Der auf dem Berg verklärt worden ist.',
    'Der uns die Eucharistie geschenkt hat.',
  ],
  [RosenkranzType.SCHMERZHAFTE_GEHEIMNISSE]: [
    'Der für uns Blut geschwitzt hat.',
    'Der für uns gegeißelt worden ist.',
    'Der für uns mit Dornen gekrönt worden ist.',
    'Der für uns das schwere Kreuz getragen hat.',
    'Der für uns gekreuzigt worden ist.',
  ],
  [RosenkranzType.GLORREICHE_GEHEIMNISSE]: [
    'Der von den Toten auferstanden ist.',
    'Der in den Himmel aufgefahren ist.',
    'Der uns den Heiligen Geist gesandt hat.',
    'Der dich, o Jungfrau, in den Himmel aufgenommen hat.',
    'Der dich, o Jungfrau im Himmel gekrönt hat.',
  ],
};

const getAveMariasForIntro = (): Section[] => INTRO_AVE_MARIA_APPENDIXES.map((appendix) => getAveMaria(appendix));

const getAveMariasForRosenkranzType = (type: RosenkranzType): Section[] => {
  const appendixes = ROSENKRANK_TYPE_TO_APPENDIXES_MAP[type];
  return appendixes.map((appendix) => getAveMaria(appendix));
};

const getMainSectionsForRosenkranzType = (type: RosenkranzType): Section[] => {
  const aveMarias = getAveMariasForRosenkranzType(type);
  return aveMarias.reduce<Section[]>(
    (acc: any, aveMaria: any) => [...acc, getGloriaPatri(), getPaterNoster(), ...new Array(10).fill(aveMaria)],
    []
  );
};

export const getSectionsForRosenkranzType = (type: RosenkranzType): Section[] => [
  getIntro(),
  getCredo(),
  getGloriaPatri(),
  getPaterNoster(),

  ...getAveMariasForIntro(),

  ...getMainSectionsForRosenkranzType(type),

  getGloriaPatri(),
];
