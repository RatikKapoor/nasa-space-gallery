import { useState } from "react";
import { ApiData } from "../data/interfaces";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { car, personCircle } from "ionicons/icons";
import { useParams } from "react-router";
import "./ViewMessage.css";

function ViewMessage() {
  const [card, setCard] = useState<ApiData>();
  const params = useParams<{ date: string }>();

  useIonViewWillEnter(() => {
    console.log(params.date);
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
              <IonIcon icon={personCircle} color="primary"></IonIcon>
              <IonLabel className="ion-text-wrap">
                <h2>
                  {card.title}
                  <span className="date">
                    <IonNote>{card.date}</IonNote>
                  </span>
                </h2>
                <h3>
                  To: <IonNote>Me</IonNote>
                </h3>
              </IonLabel>
            </IonItem>

            <div className="ion-padding">
              <h1>{card.copyright}</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </>
        ) : (
          <div>Message not found</div>
        )}
      </IonContent>
    </IonPage>
  );
}

export default ViewMessage;
