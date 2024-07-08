import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React from "react";
import { ScrollView } from "react-native";
import { RefreshControl } from "react-native";

import tw from "twrnc";

export default function LoginProfile(props) {
  const [refreshing, setRefreshing] = React.useState(false);

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
          <Text style={styles.loginTitle}>Profile</Text>
          <Text style={tw``}>Enter Your name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter number"
            placeholderTextColor="#24242480"
          />
          <Text style={{ marginTop: 30, marginBottom: 8 }}>
            Enter Your Email
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter number"
            placeholderTextColor="#24242480"
          />
          <Text style={{ marginTop: 30, marginBottom: 8 }}>
            Enter Your Address{" "}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter number"
            placeholderTextColor="#24242480"
            keyboardType="email-address"
          />

          <TouchableOpacity
            accessible={false}
            onPress={() => props.navigation.navigate('Home')}
            onSubmitEditing={Keyboard.dismiss}
          >
            <Text showSoftInputOnFocus={false} style={styles.continueButton}>
              Continue
            </Text>
          </TouchableOpacity>
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
    marginBottom: 40,
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
