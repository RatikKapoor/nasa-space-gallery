export interface CardContent {
  copyright: string;
  title: string;
  date: string;
  url: string;
  hd_url: string;
  explanation?: string;
}

const cards: CardContent[] = [
  {
    copyright: "Davide Necchi",
    date: "2021-09-12",
    explanation:
      "What's happened to the sky? Aurora! Captured in 2015, this aurora was noted by Icelanders for its great brightness and quick development. The aurora resulted from a solar storm, with high energy particles bursting out from the Sun and through a crack in Earth's protective magnetosphere a few days later. Although a spiral pattern can be discerned, creative humans might imagine the complex glow as an atmospheric apparition of any number of common icons. In the foreground of the featured image is the Ölfusá River while the lights illuminate a bridge in Selfoss City. Just beyond the low clouds is a nearly full Moon. The liveliness of the Sun -- and likely the resulting auroras on Earth -- is slowly increasing as the Sun emerges from a Solar minimum, a historically quiet period in its 11-year cycle.",
    hd_url:
      "https://apod.nasa.gov/apod/image/2109/AuroraIceland_Necchi_1280.jpg",
    title: "A Spiral Aurora over Iceland",
    url: "https://apod.nasa.gov/apod/image/2109/AuroraIceland_Necchi_960.jpg",
  },
];

export const getCards = () => cards;

export const getCard = (date: string) => cards.find((m) => m.date === date);
