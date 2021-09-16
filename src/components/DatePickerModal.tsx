import { IonButton, IonContent, IonDatetime, IonModal, IonText, IonTitle } from "@ionic/react";
import { useEffect, useState } from "react";
import "./DatePickerModal.css"

interface DatePickerModalProps {
    startDate: string;
    endDate: string;
    setStartDate: React.Dispatch<React.SetStateAction<string>>
    setEndDate: React.Dispatch<React.SetStateAction<string>>
    setShowSettingsModal: React.Dispatch<React.SetStateAction<boolean>>
    setShouldRefresh: React.Dispatch<React.SetStateAction<boolean>>
    shouldShowModal: boolean
}

const DatePickerModal: React.FC<DatePickerModalProps> = (props: DatePickerModalProps) => {
    const [newStartDate, setNewStartDate] = useState<string>("")
    const [newEndDate, setNewEndDate] = useState<string>("")
    const [hasError, setHasError] = useState<boolean>(false)
    const [today, setToday] = useState("")

    const onSave = () => {
        if (newStartDate !== props.startDate || newEndDate !== props.endDate) {
            console.log("Saving new start and end dates", newStartDate, newEndDate)
            props.setStartDate(newStartDate)
            props.setEndDate(newEndDate)
            props.setShouldRefresh(true)
        }
        props.setShowSettingsModal(false)
    }

    useEffect(() => {
        let today = new Date()
        setToday(today.toISOString().substring(0, 10))
        console.log("Today", today.toISOString().substring(0, 10))
    }, [])

    useEffect(() => {
        console.log(Date.parse(newEndDate) - Date.parse(newStartDate), Date.now())
        if ((Date.parse(newEndDate) - Date.parse(newStartDate) < 0)
            || Date.now() - Date.parse(newEndDate) < 0) {
            console.log("Errro")
            setHasError(true)
        }
        else if (hasError) {
            setHasError(false)
        }
    }, [newStartDate, newEndDate])

    return (

        <IonModal
            isOpen={props.shouldShowModal}
            swipeToClose={true}
            showBackdrop={true}
            onDidDismiss={() => props.setShowSettingsModal(false)}>
            <IonContent>
                <IonTitle>Filter by Date:</IonTitle>
                <IonText>Starting Date</IonText>
                <IonDatetime displayFormat="YYYY-MM-DD"
                    placeholder="Select starting date"
                    onIonChange={e => setNewStartDate(e.detail.value ?? "")}
                    value={newStartDate}
                    max={today} />
                <IonText>Ending Date</IonText>
                <IonDatetime displayFormat="YYYY-MM-DD"
                    placeholder="Select ending date"
                    onIonChange={e => setNewEndDate(e.detail.value ?? "")}
                    value={newEndDate}
                    max={today} />
                {hasError && <IonText color={"danger"}>Date error, please double check before submitting</IonText>}
                <IonButton onClick={() => props.setShowSettingsModal(false)}>Cancel</IonButton>
                <IonButton onClick={onSave} disabled={hasError} >Ok</IonButton>
            </IonContent>
        </IonModal>

    )
}

export default DatePickerModal;
