import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonNote,
  IonRouterLink,
  IonThumbnail,
} from "@ionic/react";
import { ApiData } from "../data/interfaces";
import { LocalData } from "../data/LocalData"
import "./ImageListItem.css";
import styled from "styled-components";
import { heart, heartOutline } from "ionicons/icons";
import { useEffect, useState } from "react";

interface MessageListItemProps {
  data: ApiData;
}

const ImageListItem: React.FC<MessageListItemProps> = ({ data }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false)

  useEffect(() => {
    let localData: LocalData = new LocalData()
    const result: boolean = localData.getIsLiked(data.date)
    setIsLiked(result)
  }, [])

  const toggleIsLiked = (e: React.MouseEvent<HTMLIonButtonElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    let localData: LocalData = new LocalData()
    localData.setIsLiked(data.date, !isLiked)
    setIsLiked(!isLiked)
  }

  return (
    <IonCard routerLink={`/date/${data.date}`}>
      <IonRouterLink>
        <IonImg src={data.url} />
      </IonRouterLink>
      <IonCardHeader>
        <div>
          <IonCardTitle>{data.title}</IonCardTitle>
          <IonCardSubtitle>{data.copyright}</IonCardSubtitle>
          <IonNote>{data.date}</IonNote>
        </div>
        <IonButton onClick={toggleIsLiked}>
          <IonIcon icon={isLiked ? heart : heartOutline} />
        </IonButton>
      </IonCardHeader>
      <IonCardContent></IonCardContent>
    </IonCard>
  );
};

export default ImageListItem;
