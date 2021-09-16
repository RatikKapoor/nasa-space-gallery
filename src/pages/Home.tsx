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
  useIonLoading,
} from "@ionic/react";
import "./Home.css";
import NasaApi from "../data/NasaApi";
import { refresh as refreshIcon, settings } from 'ionicons/icons'
import DatePickerModal from "../components/DatePickerModal";

const Home: React.FC = () => {
  const [present, dismiss] = useIonLoading()
  const [cards, setCards] = useState<ApiData[]>()
  const [shouldRefresh, setShouldRefresh] = useState<boolean>(false)
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false)
  const [startingDate, setStartingDate] = useState<string>("")
  const [endingDate, setEndingDate] = useState<string>("")

  const refresh = async (): Promise<void> => {
    if (startingDate.length < 1 || endingDate.length < 1) {
      return
    }
    let api: NasaApi = new NasaApi()
    try {
      console.log("Fetching new data")
      present()
      const result = await api.getDataForDates(startingDate.substring(0, 10), endingDate.substring(0, 10))
      setCards(result.reverse())
      dismiss()
    } catch (e) {
      console.error(e)
    }
  }

  const refresh_pull = (e: CustomEvent) => {
    refresh().then(() => e.detail.complete());
  };

  const toggleSettingsModal = () => {
    setShowSettingsModal(!showSettingsModal)
  }

  useEffect(() => {
    if (startingDate.length < 1 || endingDate.length << 1) {
      setShowSettingsModal(true)
    }
    else
      refresh()
  }, [])

  useEffect(() => {
    if (shouldRefresh) {
      refresh()
      setShouldRefresh(false)
    }
  }, [shouldRefresh])

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle slot="start">NASA Astronomy Picture of the Day</IonTitle>
          <IonButton style={{ marginRight: 15 }} slot="end" fill="outline" onClick={toggleSettingsModal}><IonIcon icon={settings}></IonIcon></IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh_pull}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonList>
          {cards ? cards.map((m) => (
            <ImageListItem key={m.date} data={m} />
          )) :
            <IonTitle color="medium">
              Please select a date range to show images
            </IonTitle>}
        </IonList>
      </IonContent>
      <IonFab vertical="bottom" horizontal="end">
        <IonFabButton onClick={refresh}>
          <IonIcon icon={refreshIcon} />
        </IonFabButton>
      </IonFab>
      <DatePickerModal startDate={startingDate}
        endDate={endingDate}
        setStartDate={setStartingDate}
        setEndDate={setEndingDate}
        shouldShowModal={showSettingsModal}
        setShowSettingsModal={setShowSettingsModal}
        setShouldRefresh={setShouldRefresh} />
    </IonPage>
  );
};

export default Home;
