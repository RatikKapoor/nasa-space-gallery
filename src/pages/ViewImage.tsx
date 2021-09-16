import { useState } from "react";
import { ApiData } from "../data/interfaces";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  useIonLoading,
  useIonViewWillEnter,
} from "@ionic/react";
import { cameraOutline, heart, heartOutline } from "ionicons/icons";
import { useParams } from "react-router";
import "./ViewImage.css";
import NasaApi from "../data/NasaApi";
import LocalData from "../data/LocalData";

/**
 * ViewImage
 * 
 * Single page view for a specific date
 * 
 * @returns Functional component
 */
const ViewImage: React.FC = () => {
  const [present, dismiss] = useIonLoading()
  const [card, setCard] = useState<ApiData>();
  const [isLiked, setIsLiked] = useState<boolean>(false)
  const [hasError, setHasError] = useState<boolean>(false)
  const params = useParams<{ date: string }>();

  /**
   * On load get API data and like state
   */
  useIonViewWillEnter(async () => {
    present()
    try {
      let api: NasaApi = new NasaApi()
      const data = await api.getDataForDate(params.date)
      if (data && data.code && data.code !== 200) {
        throw data
      }
      setCard(data)
      let localData: LocalData = new LocalData()
      const result: boolean = localData.getIsLiked(data.date)
      setIsLiked(result)
    } catch (e) {
      console.error(e)
      setHasError(true)
    }
    dismiss()
  });

  return (
    <IonPage id="view-message-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Back" defaultHref="/home"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {card ? (
          <div>
            <IonGrid style={{ marginTop: "0.5vh" }}>
              <IonRow>
                <IonIcon style={{ marginLeft: 10 }} icon={cameraOutline} color="primary" size="large" />
                <IonTitle>{card.title}</IonTitle>
                <IonText style={{ marginRight: 20 }}>{card.copyright}</IonText>
                <IonText style={{ marginRight: 20 }}>{card.date}</IonText>
                <IonIcon style={{ marginRight: 10 }} icon={isLiked ? heart : heartOutline} size="large" color={isLiked ? "danger" : ""} />
              </IonRow>
            </IonGrid>
            <IonImg style={{ maxWidth: "80vw", margin: "auto" }} src={card.hdurl} />
            <IonGrid style={{ padding: "0.5vw 2vw" }}>
              <IonTitle style={{ padding: 0, marginBottom: 5 }}>Explanation</IonTitle>
              <IonText>{card.explanation}</IonText>
            </IonGrid>
          </div>
        ) : (
          <IonTitle className="errorText">{hasError ? "Requested image not found" : ""}</IonTitle>
        )}
      </IonContent>
    </IonPage>
  );
}

export default ViewImage;
