import React, {Component} from 'react';

import {CalendarList} from 'react-native-calendars';
import {View} from 'react-native';
import moment from 'moment';

const _format = 'YYYY-MM-DD'
const _today = moment().format(_format)
const _maxDate = moment().add(15, 'days').format(_format)
const FILLER_HEIGHT = 20
const selectedColor = '#49c7f2'
export default class HorizontalCalendarList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _markedDates: [],
    };
  }

  checkDay(dateString){
    const _selectedDay = moment(dateString).format(_format);
    const _prevDay = moment(dateString).add(-1, 'days').format(_format);
    const _nextDay = moment(dateString).add(1, 'days').format(_format);
    let selected = true;
    let startingDay = true;
    let endingDay = true;
    let tempDates = this.state._markedDates;

    selected = tempDates[_selectedDay]?!this.state._markedDates[_selectedDay].selected:true;

    if(tempDates[_prevDay]){
      tempDates[_prevDay] = {...tempDates[_prevDay],...{endingDay:!selected}};
    }
    
    if(tempDates[_nextDay]){
      tempDates[_nextDay] = {...tempDates[_nextDay],...{startingDay:!selected}};
    }

    startingDay = tempDates[_prevDay]?!tempDates[_prevDay].selected:true;
    endingDay = tempDates[_nextDay]?!tempDates[_nextDay].selected:true;

    tempDates = {...tempDates,
      ...{[_selectedDay]: {selected:selected,startingDay:startingDay, endingDay:endingDay, color:selected?selectedColor:null,dotColor: "#000"}}}

    for(let day in tempDates){
      if(!tempDates[day].selected){
        delete tempDates[day];
      }
    }
    this.setState({ _markedDates: tempDates});
  }

  onDaySelect = (day) => {
    this.checkDay(day.dateString);
  }
  
  render() {
    return (
      <View style={{flex:1, justifyContent:'center', backgroundColor:'#aaa'}}>
      <View style={{alignItems:'center'}}>
        <CalendarList
          onDaySelect={this.onDaySelect}
          theme={{
            'stylesheet.calendar.main':{
              week: {
                height:24,
                marginTop: 1,
                marginBottom: 1,
                flexDirection: 'row',
                justifyContent: 'space-around'
              },
              dayContainer:{
                height:20,
              },
            },
            'stylesheet.day.period':{
              base: {
                width: 24,
                height: 20,
                alignItems: 'center'
              },
              fillers: {
                position: 'absolute',
                height: FILLER_HEIGHT,
                flexDirection: 'row',
                left: 0,
                right: 0,
              },
              leftFiller: {
                height: FILLER_HEIGHT,
                flex: 1
              },
              rightFiller: {
                height: FILLER_HEIGHT,
                flex: 1
              },
              text: {
                fontSize: 14,
                fontWeight: '300',
              },
            },
            'stylesheet.calendar.header':{
              monthText:{
                fontSize:12,
                fontWeight: '300',
                marginVertical:7,
              },
              dayHeader: {
                marginTop: 2,
                marginBottom: 7,
                width: 32,
                textAlign: 'center',
                fontSize: 12,
              },
            },
            'stylesheet.calendar-list.main':{
              calendar:{
                paddingLeft:0,
                paddingRight:0,
              }
            },
          }}
          markingType={'period'}
          // we use moment.js to give the minimum and maximum dates.
          minDate={_today}
          maxDate={_maxDate}
          hideArrows={true}

          onDayPress={this.onDaySelect}
          onMonthChange={(month) => {console.log('month changed', month)}}
          markedDates={this.state._markedDates}
          
          style={{width:300, borderRadius:5, backgroundColor:'#fff'}}
          calendarWidth={300}
          calendarHeight={220}
          current={_today}
          pastScrollRange={24}
          futureScrollRange={24}
          horizontal
          pagingEnabled
          hideDayNames={false}
        />
      </View>
      </View>
    );
  }
}

