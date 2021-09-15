import ImageListItem from "../components/ImageListItem";
import { useEffect, useState } from "react";
import { ApiData } from "../data/interfaces";
import {
  IonButton,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Home.css";
import NasaApi from "../data/NasaApi";
import { refresh as refreshIcon } from 'ionicons/icons'

const Home: React.FC = () => {
  // const cards: ApiData[] = useSelector(selectData)
  const [cards, setCards] = useState<ApiData[]>()

  const refresh = async (): Promise<void> => {
    let api: NasaApi = new NasaApi()
    try {
      const result = await api.getDataForDates("2021-08-01", "2021-09-03")
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
      <IonFab vertical="bottom" horizontal="end">
        <IonFabButton>
          <IonIcon icon={refreshIcon} />
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default Home;
