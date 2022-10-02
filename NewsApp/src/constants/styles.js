import { StyleSheet } from "react-native";
import { FONTS } from "./theme";

// all the styles used in the application
export const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    margin:'4%',
    // marginTop: "3%",
    // width: 250,
    // height: 250,
    // backgroundColor: 'yellow',
  },
  mainCardView: {
    flexDirection: 'row', alignItems: 'center', flex: 1,
    // height: 90,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    // shadowColor: Colors.shadow,
    // shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    // boxShadow: "12px 10px 17px -12px rgba(3,4,6,0.75)",
    shadowRadius: 8,
    elevation: 3,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // paddingLeft: 16,
    // paddingRight: 14,
    // marginTop: 6,
    // marginBottom: 6,
    // marginLeft: 16,
    // marginRight: 16,
  },
  subCardView: {
    width: '62%', 
    marginLeft:'3%', 
    marginTop:'3%', 
    marginBottom:'3%'
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginRight:0,
    // paddingHorizontal: 0,
    // paddingTop: '9.5%',
    alignItems: 'center',
    backgroundColor: '#0C54BE'
  },
  modalView: {
    backgroundColor: 'white',
    borderColor: 'deepskyblue',
    borderRadius: 20,
    borderWidth: 1,
    padding: 10,
    marginTop: 50,
    shadowColor: 'red',
    opacity:1,
// justifyContent:'center',
// alignItems:'center',
  margin:16,
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    elevation: 5,
    height: 180,
    width: '92%',
  },
  modalView2:{
    backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  subModalView2:{
    backgroundColor: 'white',
    paddingTop: 12,
    paddingHorizontal: 12,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    minHeight: 200,    
  },
  sliderIndicatorRow: {
    flexDirection: 'row',
    marginBottom: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderIndicator: {
    backgroundColor: '#CECECE',
    height: 4,
    width: 45,
  },
  radioContainer: {
    marginBottom: '3%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioText: {
    ...FONTS.h3,
    marginRight: '10%',
    fontSize: 18,
    color: '#222222',
    // fontWeight: '800'
  },
  radioCircle: {
    height: 25,
    width: 25,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#0C54BE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRb: {
    width: 14,
    height: 14,
    borderRadius: 50,
    backgroundColor: '#0C54BE',
  },
  image: {
    marginTop: '50%',
    width: '46%',
    height: '46%',
    tintColor: 'black'
  }
})