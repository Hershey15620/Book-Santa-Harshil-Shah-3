import React, { Component } from 'react';
import { View, KeyboardAvoidingView,ScrollView,StyleSheet, Modal,Text, Image, TouchableOpacity,TextInput, Alert } from 'react-native';
import SantaAnimation from '../components/SantaClaus.js';
import db from '../config';
import firebase from 'firebase';

export default class WelcomeScreen extends Component {
  constructor(){
    super()
    this.state={
      emailId : '',
      password: '',
      firstname:'',
      lastname:'',
      address:'',
      contact:'',
      confirmPassword:'',
      isModalVisible:'false'

    }
  }

  

  userLogin = (emailId, password)=>{
    firebase.auth().signInWithEmailAndPassword(emailId, password)
    .then(()=>{
      return Alert.alert("Successfully Login")
    })
    .catch((error)=> {
      var errorCode = error.code;
      var errorMessage = error.message;
      return Alert.alert(errorMessage)
    })
  }

  userSignUp = (emailId, password,confirmPassword) =>{
    if(password !==confirmPassword){
      return alert("password doesn't match")
    }else{
    firebase.auth().createUserWithEmailAndPassword(emailId, password)
    .then(()=>{
      dblur.collection('Users').add({
        FirstName:this.state.firstname,
        LastName: this.state.lastname,
        Contact: this.state.contact,
        Address: this.state.address, 
        EmailID: this.state.emailId,
        Password: this.state.password
})
      return Alert.alert("User Added Successfully",'',
      [{text:'OK',onPress:()=>this.setState({isModalVisible:'true'})}])
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      return Alert.alert(errorMessage)
    });
  }
}
showModal=()=>{
  return(
    <Modal animationType='fade' transparent={true} visible={this.state.isModalVisible}>
<View style={styles.modalcontainer}>
  <ScrollView style={{width:"100%"}}>
<KeyboardAvoidingView style={styles.keybord}>
<Text style={styles.modetitle}> Registration</Text>
<TextInput style={styles.fromtext}
placeholder={'1st Name'}
maxLength={8}
onChangeText={(text)=>this.setState({firstname:text})}/>
<TextInput style={styles.fromtext}
placeholder={'Last Name'}
maxLength={8}
onChangeText={(text)=>this.setState({lastname:text})}/>
 <TextInput style={styles.fromtext}
placeholder="example@booksanta.com"
placeholderTextColor = "#ffff"
keyboardType ='email-address'
onChangeText={(text)=>{
this.setState({emailId: text})}}/>
<TextInput style={styles.fromtext}
secureTextEntry = {true}
placeholder="password"
placeholderTextColor = "#ffff"
onChangeText={(text)=>{
this.setState({password: text})}}/>
        <TextInput
          style={styles.formtext}
          placeholder ={"Contact"}
          maxLength ={10}
          keyboardType={'numeric'}
          onChangeText={(text)=>{
            this.setState({
              contact: text
            })
          }}
        />
        <TextInput
          style={styles.formtext}
          placeholder ={"Confrim Password"}
          secureTextEntry = {true}
          onChangeText={(text)=>{
            this.setState({
              confirmPassword: text
            })
          }}
        />
        <TextInput
          style={styles.formtext}
          placeholder ={"Address"}
          multiline = {true}
          onChangeText={(text)=>{
            this.setState({
              address: text
            })
          }}
        />
        <View >
          <TouchableOpacity style={styles.submit} onPress={()=>{this.userSignUp(this.state.emailId,this.state.password,this.state.confirmPassword)}}>
            <Text style={styles.submittext}>SubmitB</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancel} onPress={()=>{this.setState({isModalVisible:'false'})}}>
            <Text style={styles.canceltext}>Cancel</Text>
          </TouchableOpacity>

        </View>
</KeyboardAvoidingView>
 </ScrollView>
</View>
 </Modal>

  )
}

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <SantaAnimation/>
          <Text style={styles.title}>Book Santa</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TextInput
          style={styles.loginBox}
          placeholder="example@booksanta.com"
          placeholderTextColor = "#ffff"
          keyboardType ='email-address'
          onChangeText={(text)=>{
            this.setState({
              emailId: text
            })
          }}
        />

        <TextInput
          style={styles.loginBox}
          secureTextEntry = {true}
          placeholder="password"
          placeholderTextColor = "#ffff"
          onChangeText={(text)=>{
            this.setState({
              password: text
            })
          }}
        />
          <TouchableOpacity
            style={[styles.button,{marginBottom:20, marginTop:20}]}
            onPress = {()=>{this.userLogin(this.state.emailId, this.state.password)}}
            >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={()=>{this.userSignUp(this.state.emailId, this.state.password)}}
            >
            <Text style={styles.buttonText}>SignUp</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#F8BE85'
  },
  profileContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  title :{
    fontSize:65,
    fontWeight:'300',
    paddingBottom:30,
    color : '#ff3d00'
  },
  loginBox:{
    width: 300,
    height: 40,
    borderBottomWidth: 1.5,
    borderColor : '#ff8a65',
    fontSize: 20,
    margin:10,
    paddingLeft:10
  },
  button:{
    width:300,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25,
    backgroundColor:"#ff9800",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.30,
    shadowRadius: 10.32,
    elevation: 16,
  },
  buttonText:{
    color:'#ffff',
    fontWeight:'200',
    fontSize:20
  },
  buttonContainer:{
    flex:1,
    alignItems:'center'
  },
  modalcontainer:{
    flex:1,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ffff",
    marginRight:30,
    marginLeft : 30,
    marginTop:80,
    marginBottom:80,
  },
  modaltitle:{
    justifyContent:'center',
    alignSelf:'center',
    fontSize:30,
    color:'#ff5722',
    margin:50
  },
  formtext:{
    width:"75%",
    height:35,
    alignSelf:'center',
    borderColor:'#ffab91',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10
  },
  submit:{
    width:200,
    height:40,
    alignItems:'center',
    justifyContent:'center',
    borderWidth:1,
    borderRadius:10,
    marginTop:30
  },
  submittext:{
    color:'#ff5722',
    fontSize:15,
    fontWeight:'bold'
  },
  cancel:{
    width:200,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    marginTop:5,
  },
  canceltext:{
    color:'#ff5722',
    fontSize:15,
    fontWeight:'bold'
  },
  keyboard:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
})
