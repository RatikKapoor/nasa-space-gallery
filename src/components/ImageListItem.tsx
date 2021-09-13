import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonImg,
  IonItem,
  IonLabel,
  IonNote,
} from "@ionic/react";
import { CardContent } from "../data/messages";
import "./ImageListItem.css";

interface MessageListItemProps {
  card: CardContent;
}

const ImageListItem: React.FC<MessageListItemProps> = ({ card }) => {
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
    <IonCard routerLink={`/date/${card.date}`}>
      <IonCardHeader>
        <IonCardTitle>{card.title}</IonCardTitle>
        <IonCardSubtitle>{card.copyright}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <IonImg src={card.url} />
      </IonCardContent>
    </IonCard>
    // </IonItem>
  );
};

export default ImageListItem;
