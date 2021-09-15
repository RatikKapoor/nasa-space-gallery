import { useState } from "react";
import { ApiData } from "../data/interfaces";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { cameraOutline, car, personCircle } from "ionicons/icons";
import { useParams } from "react-router";
import "./ViewImage.css";
import NasaApi from "../data/NasaApi";

function ViewImage() {
  const [card, setCard] = useState<ApiData>();
  const params = useParams<{ date: string }>();

  useIonViewWillEnter(async () => {
    let api: NasaApi = new NasaApi()
    const data = await api.getDataForDate(params.date)
    setCard(data)
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
          <>
            <IonItem>
              <IonIcon icon={cameraOutline} color="primary"></IonIcon>
              <IonLabel className="ion-text-wrap">
                <h2>
                  {card.title}
                  <span className="date">
                    <IonNote>{card.date}</IonNote>
                  </span>
                </h2>
                <h1>{card.copyright}</h1>
              </IonLabel>
            </IonItem>
            <IonImg src={card.hdurl} />

            <div className="ion-padding">
              <p>{card.explanation}</p>
            </div>
          </>
        ) : (
          <div>Requested image not found</div>
        )}
      </IonContent>
    </IonPage>
  );
}

export default ViewImage;
