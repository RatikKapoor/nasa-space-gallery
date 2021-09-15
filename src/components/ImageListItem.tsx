import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonNote,
  IonThumbnail,
} from "@ionic/react";
import { ApiData } from "../data/interfaces";
import "./ImageListItem.css";
import styled from "styled-components";
import { heartOutline } from "ionicons/icons";

interface MessageListItemProps {
  data: ApiData;
}

const ListCard = styled(IonCard)``;

const ImageListItem: React.FC<MessageListItemProps> = ({ data }) => {
  return (
    // <IonItem routerLink={`/message/${card.copyright}`} detail={false}>
    //   <div slot="start" className="dot dot-unread"></div>
    //   <IonLabel className="ion-text-wrap">
    //     <h2>
    //       {card.title}
    //       <span className="date">
    //         <IonNote>{card.date}</IonNote>
    //       </span>
    //     </h2>
    //     <h3>{card.copyright}</h3>
    //     <p>
    //       Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
    //       eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
    //       minim veniam, quis nostrud exercitation ullamco laboris nisi ut
    //       aliquip ex ea commodo consequat. Duis aute irure dolor in
    //       reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
    //       pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
    //       culpa qui officia deserunt mollit anim id est laborum.
    //     </p>
    //   </IonLabel>
    //   <IonImg src={card.url} />
    // </IonItem>
    // <IonItem routerLink={`/date/${card.date}`} detail={false}>
    <IonCard routerLink={`/date/${data.date}`}>
      <IonImg src={data.url} />
      <IonCardHeader>
        <IonCardTitle>{data.title}</IonCardTitle>
        <IonCardSubtitle>{data.copyright}</IonCardSubtitle>
        <IonNote>{data.date}</IonNote>
        <IonIcon icon={heartOutline} />
      </IonCardHeader>
      <IonCardContent></IonCardContent>
    </IonCard>
    // </IonItem>
  );
};

export default ImageListItem;
