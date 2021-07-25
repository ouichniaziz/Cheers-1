import { IonContent, IonHeader, IonPage, IonCardHeader,IonCard, IonToolbar, IonIcon, IonSearchbar, IonFooter,IonList, IonListHeader,IonLabel,IonCardSubtitle, IonCardTitle,IonDatetime,IonCol,IonRow,IonGrid } from '@ionic/react';
import React, { useState } from 'react';
import './Tab3.scss'

interface searchProps {
  events:Array<any>;
}
  
  const Tab5: React.FC<searchProps> = ({events}) => {
    const [searchText, setSearchText] = useState('');


    return (
      <IonPage>
      <IonHeader>
        <IonListHeader>
        <IonLabel className="favorite_title_size"  color="primary" >
             Search
         </IonLabel>
         </IonListHeader>
      </IonHeader>
     
      <IonToolbar>
      &nbsp;
        <IonSearchbar value={searchText} type="search" spellcheck={true} onIonChange={e => setSearchText(e.detail.value!)}></IonSearchbar>
      </IonToolbar>
      <IonContent>
      {events.filter((item) => {
        let search = searchText.toLocaleLowerCase()
         return item.location.includes(search)   || item.title.includes(search) || item.category === search || item.price === search
        }).map((item,index) => {
          if (searchText ) {            
         return (
            <IonCard key={index}>
            <img src={item.image} alt=""  className="favorite_img_size" />
        <IonCardHeader>
        <IonGrid>
            <IonCardSubtitle>{item.title}</IonCardSubtitle>
            <IonCardTitle className="event_title">{item.location}</IonCardTitle>
            <IonRow>
            <IonDatetime className="event_time" value={item.start_time} display-timezone="utc" disabled={true}></IonDatetime>
            </IonRow>
            <IonRow>
            <IonCol size="10.5">
            <IonLabel id="price_favorite_size">{item.price=== "Free"? "Free" : item.price +'Dt'}</IonLabel>
          </IonCol>
            </IonRow>
            </IonGrid>     
        </IonCardHeader>
        </IonCard>
          ) } else if (!searchText.length){
            return ('')
          } 
        })}
    </IonContent>
    </IonPage>
    );
  };
  
  export default Tab5;
  