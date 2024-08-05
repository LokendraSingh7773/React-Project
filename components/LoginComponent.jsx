import {
  Image,
  StyleSheet,
  Platform,
  ScrollView,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  RefreshControl,
} from "react-native";
import { Button } from "@rneui/themed";
import React from "react";
import tw from "twrnc";
import axios from "axios";
import Toast from "react-native-toast-message";

export default function HomeScreen(props) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [FetchedTheLoginData, setFetchedTheLoginData] = useState(true);
  const [mobile, setmobile] = useState("");
  const [latitude, setlatitude] = useState(null);
  const [longitude, setlongitude] = useState(null);
  const [fcmToken, setfcmToken] = useState(null);

  const SendOtpToUser = () => {
    try {
      setFetchedTheLoginData(false);
      axios
        .post("https://customer.theparkvue.com/api/customer-login", {
          mobile: mobile,
          latitude: latitude,
          longitude: longitude,
          fcmToken: fcmToken,
        })
        .then((res) => {
          const { status_code, message } = res.data;

          setFetchedTheLoginData(false);
          if (status_code == "1") {
            if (mobile.length == 10) {
              props.navigation.navigate("OTPPage" , { UserNumber: mobile });
            } else {
              Toast.show({
                type: "error",
                text1: "Please Enter your 10 Digit Number",
              });
            }
          } else {
            Toast.show({
              type: "error",
              text1: message,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.applayout}>
        <View style={{ top: 80 }}>
          <Image
            source={require("@/assets/images/parkvue.png")}
            style={styles.reactLogo}
          />
        </View>
        <View style={styles.Bottombar}>
          <Text style={styles.loginTitle}>Log in</Text>
          <Text style={styles.mobilenumber}>Enter Mobile Number</Text>
          <TextInput
            style={styles.input}
            value={mobile}
            onChangeText={(mobile) => setmobile(mobile)}
            placeholder="Enter number"
            placeholderTextColor="#24242480"
            keyboardType="numeric"
            maxLength={10}
          />

          <View>
            <Button
              accessible={false}
              onPress={SendOtpToUser}
              onSubmitEditing={Keyboard.dismiss}
              buttonStyle={tw`bg-[#25AE7A] mt-11 mb-6 py-3 rounded-[23px]`}
              titleStyle={tw`text-sm font-normal`}
            >
              Continue
            </Button>
          </View>
        </View>
      </View>
      <View style={tw`absolute -bottom-4 w-full h-full `}>
        <Toast position={"bottom"}></Toast>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#084b82",
  },

  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 180,
    width: 180,
    alignItems: "center",
    textAlign: "center",
    alignSelf: "center",
    position: "absolute",
  },
  input: {
    height: 50,
    width: "full",
    borderRadius: 10,
    borderColor: "#ffffff00",
    color: "#000000",
    backgroundColor: "#EFEFEF",
    borderWidth: 1,
    padding: 10,
  },
  mobilenumber: {
    marginTop: 50,
    marginBottom: 10,
    color: "#242424",
  },
  continueButton: {
    marginTop: 60,
    textAlign: "center",
    backgroundColor: "#25AE7A",
    color: "white",
    padding: 14,
    fontSize: 14,
    borderRadius: 25,
    marginStart: 4,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000000",
  },
  applayout: {
    backgroundColor: "#084b82",
    color: "white",
    height: "100%",
  },
  Bottombar: {
    backgroundColor: "white",
    padding: 40,
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderTopEndRadius: 40,
    borderTopStartRadius: 40,
  },
});
