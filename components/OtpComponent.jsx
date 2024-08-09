import { Image, StyleSheet, Platform, ScrollView } from "react-native";
import { useState } from "react";
import { Text, View, RefreshControl } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Button } from "@rneui/themed";
import tw from "twrnc";
import Toast from "react-native-toast-message";
import axios from "axios";

export default function HomeScreen({ route, navigation }) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [userOTP, setuserOTP] = useState(null);
  const { UserNumber } = route.params;

  const ForOTPData = {
    mobile: UserNumber,
    otp: userOTP,
  };

  const VerifyTheUser = () => {
    try {
      axios
        .post("https://customer.theparkvue.com/api/customer-verify", ForOTPData)
        .then((res) => {
          const { status_code, message, customer_id } = res.data;
          console.log(res.data);
          console.log(userOTP);
          if (status_code == "1") {
            AsyncStorage.setItem("customer_id", customer_id);
            navigation.navigate("MainDesign");
            Toast.show({
              type: "success",
              text1: message,
            });
          } else if (status_code == "2") {
            AsyncStorage.setItem("customer_id", customer_id);
            navigation.navigate("LoginProfilePage");
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
  
  const handleTextChange = (value) => {
    console.log('Text changed:', value);
    setuserOTP(value);
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
          <Text style={styles.loginTitle}>Enter OTP</Text>
          <Text style={{ color: "#242424", marginTop: 20 }}>
            Please enter the OTP sent on your {"\n"} registered mobile Number
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 30,
              marginBottom: 40,
            }}
          >
            <Text style={{ fontWeight: "600", fontSize: 16 }}>
              {UserNumber}
            </Text>
            <Text
              style={{ fontWeight: "600", fontSize: 16, color: "#084B82" }}
              onPress={() => navigation.navigate("login")}
            >
              Change
            </Text>
          </View>
          <OtpInput
          autoFocus={false}
            numberOfDigits={4}
            focusColor="green"
            value={userOTP}
            onTextChange={handleTextChange}
            keyboardType="numeric"
            focusStickBlinkingDuration={500}
            onFilled={(otp) => console.log(`OTP is ${otp}`)}
            theme={{
              containerStyle: tw`px-4`,
              pinCodeContainerStyle: [
                styles.pinCodeContainer,
                tw`w-16 bg-[#EFEFEF]`,
              ],
              pinCodeotpStyle: styles.pinCodeText,
              focusStickStyle: styles.focusStick,
              focusedPinCodeContainerStyle: styles.activePinCodeContainer,
            }}
          />
          <View>
            <Button
              onPress={VerifyTheUser}
              buttonStyle={tw`bg-[#25AE7A] mt-11 mb-6 py-3 rounded-[23px]`}
            >
              <Text style={tw`text-center text-sm text-white font-normal`}>
                Continue
              </Text>
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
    marginTop: 30,
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
