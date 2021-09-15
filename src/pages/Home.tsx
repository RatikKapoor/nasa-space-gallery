import ImageListItem from "../components/ImageListItem";
import { useEffect, useState } from "react";
import { ApiData } from "../data/interfaces";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Home.css";
import NasaApi from "../data/NasaApi";

const Home: React.FC = () => {
  // const cards: ApiData[] = useSelector(selectData)
  const [cards, setCards] = useState<ApiData[]>()

  const refresh = async (): Promise<void> => {
    let api: NasaApi = new NasaApi()
    try {
      const result = await api.getDataForDates("2021-09-01", "2021-09-03")
      console.log("Got data", result)
      setCards(result)
    } catch (e) {
      console.error(e)
    }
  }

  const refresh_pull = (e: CustomEvent) => {
    refresh().then(() => e.detail.complete());
  };

  useEffect(() => {
    refresh()
  }, [])

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>NASA Astronomy Picture of the Day</IonTitle>
          <IonButton onClick={() => refresh()}>Refresh</IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh_pull}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonList>
          {cards ? cards.map((m) => (
            <ImageListItem key={m.date} data={m} />
          )) : <div>Loading</div>}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
