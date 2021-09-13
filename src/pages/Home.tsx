import ImageListItem from "../components/ImageListItem";
import { useState } from "react";
import { CardContent, getCards } from "../data/messages";
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import "./Home.css";

const Home: React.FC = () => {
  const [cards, setCards] = useState<CardContent[]>([]);

  useIonViewWillEnter(() => {
    const cards = getCards();
    setCards(cards);
  });

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>NASA Astronomy Picture of the Day</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonList>
          {cards.map((m) => (
            <ImageListItem key={m.copyright} card={m} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
