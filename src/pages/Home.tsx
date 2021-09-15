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
import NasaApi from "../data/nasa";
import { selectData, setData } from "../store/NasaDataStore";
import { useDispatch, useSelector } from "react-redux";

const Home: React.FC = () => {
  // const cards: ApiData[] = useSelector(selectData)
  const [cards, setCards] = useState<ApiData[]>()
  const dispatch = useDispatch();

  const refresh = async (): Promise<void> => {
    console.log("HERE")
    let api: NasaApi = new NasaApi()
    const result = await api.getImagesForDates("2021-09-01", "2021-09-03")
    console.log(result)
    setCards(result)
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
          {cards && cards.map((m) => (
            <ImageListItem key={m.date} data={m} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
