export function dataFood() {
  return [
    {
      position: [-6.843266+0.003, 34.007651+0.003],
      id: "plats1",
      NomPlat: "Spaghettito",
      LieuDate: "Rabat il ya 3 jours",
      Photo: [
        sourceImage.one1,
        sourceImage.one2,
        sourceImage.one3,
        sourceImage.two1,
        sourceImage.two2
      ],
      cooker: cookerImage.cooker1
    },
    {
      position: [-6.843266+0.001, 34.007651+0.001],
      id: "plats2",
      NomPlat: "Petit deuj",
      LieuDate: "Rabat il ya 1 jours",
      Photo: [sourceImage.two1, sourceImage.two2],
      cooker: cookerImage.cooker2
    }
  ];
}
export const sourceImage = {
  one1: require("../Images/healthy-and-indulgent-food-in-bed_925x.jpg"),
  one2: require("../Images/shellfish-pasta-pizza-and-italian-food_925x.jpg"),
  one3: require("../Images/seafood-feast-at-restaurant_925x.jpg"),
  two1: require("../Images/moroccan-meal-in-tagine_925x.jpg"),
  two2: require("../Images/fried-comfort-food-chicken_925x.jpg")
};

export const comIcon = require("../Images/iconfinder_234-man-raising-hand-1_3099355.png");

export const color = {
  addPlus: "#ecf0f1",
  orange: "#EE5A24",
  bleu: "#2897f3"
};
export const cookerImage = {
  cooker1: require("../Images/Cooker.png"),
  cooker2: require("../Images/cooker2.jpg")
};

export const dataOneAnnonce = [
  {
    Photo: [sourceImage.one1, sourceImage.one2],
    id: "plats1",
    pu: 35,
    quantite: 5,
    postTime: "4 h",
    cuName: "Alain Kabissa",
    description:
      " Vous ne connaissez pas le zegen !!! Dommage de vous le dire ,mais il vous le faux forcement.c'est le meilleur repas du monde",
    platP: [-6.843266, 34.007651],
    NomPlat: "Thé matinal",
    LieuDate: "Rabat",
    cooker: cookerImage.cooker1,
    vue: 200
  },
  {
    Photo: [sourceImage.one2, sourceImage.one2],
    id: "plats2",
    pu: 35,
    quantite: 9,
    postTime: "2 h",
    cuName: "Alain Kabissa",
    description: " trop doux ca ment pas ",
    platP: [-6.843266, 34.007651],
    NomPlat: "Riz gras ",
    LieuDate: "Rabat",
    cooker: cookerImage.cooker1,
    vue: 1200
  },
  {
    Photo: [sourceImage.one3, sourceImage.one2],
    id: "plats3",
    pu: 35,
    quantite: 5,
    postTime: "4 h",
    cuName: "Alain Kabissa",
    description: " Gouter voir ca ment pas ",
    platP: [-6.843266, 34.007651],
    NomPlat: "tchep ",
    LieuDate: "Rabat",
    cooker: cookerImage.cooker1,
    vue: 150
  },
  {
    Photo: [sourceImage.two1, sourceImage.one2],
    id: "plats4",
    pu: 39,
    quantite: 5,
    postTime: "4 h",
    cuName: "Alain Kabissa",
    description:
      " Vous ne connaissez pas le zegen !!! Dommage de vous le dire ,mais il vous le faux forcement.c'est le meilleur repas du monde",
    platP: [-6.843266, 34.007651],
    NomPlat: "Spaghetti",
    LieuDate: "Rabat",
    cooker: cookerImage.cooker1,
    vue: 345
  },
  {
    Photo: [sourceImage.two2, sourceImage.one2],
    id: "plats5",
    pu: 10,
    quantite: 50,
    postTime: "4 h",
    cuName: "Alain Kabissa",
    description: " tres bon je vous l'assure ",
    platP: [-6.843266, 34.007651],
    NomPlat: "yahourt",
    LieuDate: "Rabat",
    cooker: cookerImage.cooker1,
    vue: 1850
  }
];

export const dataRepasCommande = [
  {
    vue: false,
    id: "plats1",
    pu: 35,
    postTime: "4 h",
    comTime: "09:29AM",
    quantite: 5,
    cuP: [-6.8438266, 34.0097651],
    cuV: "rabat",
    cuName: "Alain Kabissa",
    platP: [-6.843266, 34.007651],
    NomPlat: "Thé matinal",
    LieuDate: "Rabat",
    Photo: [sourceImage.one1, sourceImage.one2],
    cooker: cookerImage.cooker1,
    description:
      " Vous ne connaissez pas le zegen !!! Dommage de vous le dire ,mais il vous le faux forcement.c'est le meilleur repas du monde"
  },
  {
    vue: true,
    id: "plats2",
    pu: 20,
    postTime: "4 h",
    comTime: "09:49AM",
    quantite: 40,
    cuP: [-6.8438266, 34.0097651],
    cuV: "rabat",
    cuName: "Drogba",
    platP: [-6.843266, 34.007651],
    NomPlat: "Tajine",
    LieuDate: "Rabat",
    Photo: [sourceImage.two1, , sourceImage.one2],
    cooker: cookerImage.cooker1,
    description:
      " Vous ne connaissez pas le zegen !!! Dommage de vous le dire ,mais il vous le faux forcement.c'est le meilleur repas du monde"
  },
  {
    vue: false,
    id: "plats3",
    pu: 70,
    postTime: "2 h",
    comTime: "09:02AM",
    quantite: 2,
    cuP: [-6.8438266, 34.0097651],
    cuV: "rabat",
    cuName: "Alain Kabissa",
    platP: [-6.843266, 34.007651],
    NomPlat: "Spaghetti",
    LieuDate: "Rabat",
    Photo: [sourceImage.one2, sourceImage.one2],
    cooker: cookerImage.cooker1,
    description:
      " Vous ne connaissez pas le zegen !!! Dommage de vous le dire ,mais il vous le faux forcement.c'est le meilleur repas du monde"
  }
];

export const tabImage = [
  sourceImage.one1,
  sourceImage.one2,
  sourceImage.one3,
  sourceImage.two1,
  sourceImage.two2
];
