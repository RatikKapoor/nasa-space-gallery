import { IonButton, IonContent, IonDatetime, IonModal, IonPage, IonText, IonTitle } from "@ionic/react";
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

/**
 * Date picker (settings screen)
 * @param props Contains start and end dates as well as SetStateAction callbacks
 * @returns Functional component
 */
const DatePickerModal: React.FC<DatePickerModalProps> = (props: DatePickerModalProps) => {
    const [newStartDate, setNewStartDate] = useState<string>("")
    const [newEndDate, setNewEndDate] = useState<string>("")
    const [hasError, setHasError] = useState<boolean>(false)
    const [today, setToday] = useState("")

    /**
     * Save selected dates
     */
    const onSave = () => {
        if (newStartDate !== props.startDate || newEndDate !== props.endDate) {
            console.log("Saving new start and end dates", newStartDate, newEndDate)
            props.setStartDate(newStartDate)
            props.setEndDate(newEndDate)
            props.setShouldRefresh(true)
        }
        props.setShowSettingsModal(false)
    }

    /**
     * On load figure out what day it is today
     */
    useEffect(() => {
        let today = new Date()
        setToday(today.toISOString().substring(0, 10))
        console.log("Today", today.toISOString().substring(0, 10))
    }, [])

    /**
     * Validate input
     */
    useEffect(() => {
        console.log(Date.parse(newEndDate) - Date.parse(newStartDate), Date.now())
        if ((Date.parse(newEndDate) - Date.parse(newStartDate) < 0)
            || Date.now() - Date.parse(newEndDate) < 0) {
            console.log("Error detected")
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
            <IonPage style={{ padding: 10 }}>
                <IonContent>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <IonTitle style={{ padding: 0, marginBottom: 10, textAlign: "center" }}>Filter by Date</IonTitle>
                        <IonText style={{ textAlign: "center", width: "100%" }}>Starting Date</IonText>
                        <IonDatetime displayFormat="YYYY-MM-DD"
                            placeholder="Select starting date"
                            onIonChange={e => setNewStartDate(e.detail.value ?? "")}
                            value={newStartDate}
                            max={today}
                        />
                        <IonText>Ending Date</IonText>
                        <IonDatetime displayFormat="YYYY-MM-DD"
                            placeholder="Select ending date"
                            onIonChange={e => setNewEndDate(e.detail.value ?? "")}
                            value={newEndDate}
                            max={today} />
                    </div>
                    <div style={{ textAlign: "center" }}>
                        {hasError && <IonText color={"danger"}>Date error, please double check before submitting</IonText>}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-around", paddingTop: hasError ? 0 : 20 }}>
                        <IonButton onClick={() => props.setShowSettingsModal(false)}>Cancel</IonButton>
                        <IonButton onClick={onSave} disabled={hasError} >Ok</IonButton>
                    </div>
                </IonContent>
            </IonPage>
        </IonModal>
    )
}

export default DatePickerModal;
