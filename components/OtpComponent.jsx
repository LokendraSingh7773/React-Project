import {
  Image,
  StyleSheet,
  Platform,
  ScrollView,
} from "react-native";
import { Keyboard } from "react-native";
import {
  Text,
  View,
  RefreshControl,
} from "react-native";
import { OtpInput } from "react-native-otp-entry";
import React from "react";
import { Button } from "@rneui/themed";
import tw from "twrnc";

export default function HomeScreen(props) {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  Keyboard.dismiss();

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
            <Text style={{ fontWeight: "600", fontSize: 16 }}>9982499155</Text>
            <Text
              style={{ fontWeight: "600", fontSize: 16, color: "#084B82" }}
              onPress={() => props.navigation.navigate("login")}
            >
              Change
            </Text>
          </View>

          <OtpInput
            autoFocus= {false}
            numberOfDigits={5}
            focusColor="green"
            focusStickBlinkingDuration={500}
            onFilled={(text) => console.log(`OTP is ${text}`)}
            theme={{
              containerStyle: styles.container,
              pinCodeContainerStyle: styles.pinCodeContainer,
              pinCodeTextStyle: styles.pinCodeText,
              focusStickStyle: styles.focusStick,
              focusedPinCodeContainerStyle: styles.activePinCodeContainer,
            }}
          />
           <View>
            <Button
              onPress={() => props.navigation.navigate("LoginProfilePage")}
              buttonStyle={tw`bg-[#25AE7A] mt-11 mb-6 py-3 rounded-[23px]`}
            >
              <Text
                style={tw`text-center text-sm text-white font-normal`}
              >
                Continue
              </Text>
            </Button>
            </View>
        </View>
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
