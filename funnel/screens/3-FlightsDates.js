import React, {useState, useRef, useEffect } from 'react';
import { Animated, Text, View, StyleSheet, Alert} from 'react-native';
import * as Font from 'expo-font';
import AnimatedProgressWheel from 'react-native-progress-wheel';
import { Button } from 'react-native-elements';
import  moment  from  "moment";
import DateRangePicker from "react-native-daterange-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const FadeInView = (props) => {

  const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

  useEffect(() =>{

    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 2000,
      }
    ).start();
  }, [])
 
  return (
    <Animated.View                 // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim,         // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
}


// You can then use your `FadeInView` in place of a `View` in your components:
export default ({navigation}) => {

  const profile = navigation.getParam('profile');
  const [fontLoaded, setFontLoaded] = useState(false)
  const currentProgressPer = 33;
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [displayedDate, setDisplayDate] = useState(moment());
  const todayDate = moment();
  const [showText, setShowText] = useState(false)
  const [esitmateMonth, setEstimateMonth] = useState(todayDate);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [showBtnContinue, setShowBtnContinue] = useState(false)

 const apiUrl = 'http://proj.ruppin.ac.il/bgroup10/PROD/api/Tourist/FlightsDates'

 //show date picker
 const showDatePicker = () => {
  setShowText(false)
  setDatePickerVisibility(true);
  setStartDate(null)
  setEndDate(null)
};

//hide date picker
const hideDatePicker = () => {
  setDatePickerVisibility(false);
};

//on confirm press
const handleConfirm = date => {
  setEstimateMonth(date)
  hideDatePicker();
  setShowBtnContinue(true);
};
 //function that set up the dates that picked by the user
 const setDates = dates => {
  
   if(dates.displayedDate !== undefined){
     //move to next month
    if(moment(displayedDate).add(1, 'months').format('M') == moment(dates.displayedDate).format('M')){
      setDisplayDate(moment(displayedDate).add(1, 'months'))
 
    }
    else{
      //move to previous month
      setDisplayDate(moment(displayedDate).subtract(1, 'months'))
    }
   }
   else{
   if(dates.startDate !== undefined){
     //pick start date
    setStartDate(dates.startDate)

   }
   else{
     //pick end date
    setEndDate(dates.endDate)
   }
   }

   if(startDate !==null){
    setShowBtnContinue(true);
   }

};
 
//load the font before loading the whole page
  useEffect(() => {
    async function loadFont() {
      loadContent();
      
    };
      loadFont();
    }, [])

    //font load
    const loadContent =  () =>{
      
      Font.loadAsync({
        'ComicNeue-Bold': require('../fonts/ComicNeue-Bold.ttf')
      }).then(() => setFontLoaded(true))

    }

    //user set up before fetch
 const fetchAndContinue = () =>{

  if(startDate === null && endDate === null){
    setStartDate(null)
    setEndDate(null)

    const user = {
      Email: profile.Email,
      FromDate: startDate,
      ToDate: endDate,
      EstimateDate: moment(esitmateMonth).format('YYYY-MM-DD')
    }
    console.warn(user)
    fetchToDB(user)
  }
  else{

    const user = {
      Email: profile.Email,
      FromDate: moment(startDate).format('YYYY-MM-DD'),
      ToDate: moment(endDate).format('YYYY-MM-DD'),
      EstimateDate: null
    }
    console.warn(user)
    fetchToDB(user)
  }
 }
    //fetch to DB and continue to next page
 const fetchToDB = (user) =>{
  fetch(apiUrl, {
    method: 'PUT',
    body: JSON.stringify(user),
    headers: new Headers({
      'Content-type': 'application/json; charset=UTF-8' //very important to add the 'charset=UTF-8'!!!!
    })
    
  })
    .then(res => {
     console.warn('res=', JSON.stringify(res));
      return res.json()
    })
    .then(
      (result) => {
      console.warn("fetch POST= ", JSON.stringify(result));

    //list from fetch:
    //0 = db error
    //1= fetch succeeded

        switch(result){
          case 0:
            Alert.alert(
              'Error',
              'An Error has occured, please try again',
              [
                {text: 'OK'},
              ],
              { cancelable: false }
            )
            break;

            case 1:
                          
              navigation.navigate('Budget', {profile: profile})             
            break;
              default:

                Alert.alert(
                  'Error',
                  'An Error has occured, please try again',
                  [
                    {text: 'OK'},
                  ],
                  { cancelable: false }
                )
                break;
        }
       },
      (error) => {
        console.warn("err post=", error);
      });
 }

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
        <View style={{marginTop: '15%'}}>
        <AnimatedProgressWheel 
          size={120} 
          width={15} 
          color={'#0080ff'}
          progress={currentProgressPer}
          backgroundColor={'#E0E0E0'}
          animateFromValue={0}
          duration={2500}
          
          />

        </View>
        <FadeInView style={{width: 350, height: 100,  marginTop: 50}}>
          {fontLoaded && <Text style={styles.title}>Which dates do you plan your trip?</Text> }
        </FadeInView>
        <FadeInView style={{ flex: 0.8}}>
          <View style={{flex: 0.8}}>
          <Button
            title="I know my dates"
            type="outline"
            buttonStyle={styles.knowDatesBtn}
            titleStyle={{color: 'white'}}
            onPress={() => setShowText(true)}
          />
          
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            <DateRangePicker
              onChange={setDates}
              endDate={endDate}
              startDate={startDate}
              displayedDate={displayedDate}
              range
              minDate={todayDate}
              
            >
              {showText && <Text style={styles.pickDatetxt}>Pick Dates</Text>}
            </DateRangePicker>
            <Button
            title="I dont know yet"
            type="outline"
            buttonStyle={styles.dontKnowBtn}
            titleStyle={{color: 'white'}}
            onPress={showDatePicker}
          />
        </View>
        
      </View>
         
        </FadeInView>
        {showBtnContinue &&  <Button
            title="Continue"
            type="outline"
            buttonStyle={styles.continueBtn}
            titleStyle={{color: 'white'}}
            onPress={fetchAndContinue}
          />}
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          headerTextIOS='Pick an estimate date'
        />
    </View>
  )
}

const styles = StyleSheet.create({
  
  title: {
    fontSize: 28, 
    textAlign: 'center', 
    fontFamily: 'ComicNeue-Bold'
  },

  knowDatesBtn: {
    backgroundColor: '#2196f3', 
    marginTop: 40, 
    width: 180, 
    height: 50, 
    borderColor: '#2196f3', 
    borderRadius: 10,
  },
  dontKnowBtn: {
    backgroundColor: '#2196f3', 
    marginBottom: 20, 
    width: 180, 
    height: 50, 
    borderColor: '#2196f3', 
    borderRadius: 10,
  },
  pickDatetxt: {
    marginBottom: 50,
    fontWeight: "bold",
    fontSize: 20
  },
  continueBtn: {
    backgroundColor: '#ade6d8', 
    marginTop: 70, 
    width: 140, 
    height: 50, 
    borderColor: '#ade6d8', 
    borderRadius: 10,
    alignSelf: 'center'
  }
  
  
})

