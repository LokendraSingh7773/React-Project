import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar } from "@rneui/themed";
import { Button } from "@rneui/themed";
import { RefreshControl } from "react-native";
import { BottomSheet } from "@rneui/themed";
import {
  AntDesign,
  Feather,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import tw from "twrnc";
import axios from "axios";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MyProfile({navigation}) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [ShowProfileData, setShowProfileData] = useState([]);
  const [IsFetchedProfileData, setIsFetchedProfileData] = useState(false);
  const [IsUpdateProfiledetails, setIsUpdateProfileDetails] = useState(false);

  const getProfileData = async () => {
    try {
      setIsFetchedProfileData(false);
      axios
        .post("https://customer.theparkvue.com/api/customer-profile", {
          customer_id: 2,
          token:
          "7c98a4fcb9ee1a8e6d196e846d809f65bb94355c1f2b432c4b959ea7b71e182d",
        })
        .then((res) => {
          const { customer_data, message, status_code } = res.data;
          // console.log(res.data);

          if (status_code == "1") {
            setShowProfileData(customer_data);
            setIsFetchedProfileData(true);
          } else {
            setIsFetchedProfileData(message);
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

  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [address, setaddress] = useState("");
  const [customer_image, setcustomer_image] = useState("");
  const [mobile, setnumber] = useState("");

  const GetUpdateProfileData = {
    customer_id: 2,
    name: name,
    mobile: mobile,
    email: email,
    address: address,
    customer_image: customer_image,
  };

  const GetProfileData = (ShowProfileData) => {
    setName(ShowProfileData.name);
    setemail(ShowProfileData.email);
    setaddress(ShowProfileData.address);
    setnumber(ShowProfileData.mobile);
    setIsUpdateProfileDetails(true);
  };

  const [isLoading, setisLoading] = useState();
  const customer_id = AsyncStorage.getItem("customer_id")


  const ISUpdateTheProfileDetails = async () => {
    try {
      setisLoading(true);
      axios
        .post(
          "https://customer.theparkvue.com/api/update-profile",
          GetUpdateProfileData , {
            headers: {
              customer_id: customer_id,
              token:
                "7c98a4fcb9ee1a8e6d196e846d809f65bb94355c1f2b432c4b959ea7b71e182d",
            },
          }
        )
        .then((res) => {
          const { message, status_code } = res.data;

          setisLoading(false);
          if (status_code == "1") {
            getProfileData()
            setIsUpdateProfileDetails(false)
            Toast.show({
              type: "success",
              text1: message,
            });
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
      getProfileData();
      setRefreshing(false);
    });
  }, []);

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        style={tw`h-full flex`}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View
          style={tw`flex flex-row justify-between mx-3 px-3 py-3 items-center rounded-[28px] my-2 bg-[#084B82]`}
        >
          <Text style={tw`text-white font-semibold text-base`}>
            Profile and Settings
          </Text>
          {/* <TouchableOpacity>
            <AntDesign
              style={tw`bg-white p-1 rounded-full`}
              name="plus"
              color={"#25AE7A"}
              size={26}
              />
          </TouchableOpacity> */}
        </View>

        {/* Main Design */}
        <ScrollView style={tw`px-4`}>
          <View
            style={tw`relative bg-white items-center px-3 mt-12 rounded-[11px] pb-3 h-45`}
          >
            <Avatar
              size={97}
              rounded
              icon={{ name: "user", type: "font-awesome", color: "#3879F0" }}
              containerStyle={tw`bg-white absolute -top-11 border-[5px] border-[#f5f5f5]`}
            />
            <TouchableOpacity
              onPress={() => {
                GetProfileData(ShowProfileData);
              }}
              style={tw`self-end mt-1`}
            >
              <MaterialIcons name="edit" color="#000" size={25} />
            </TouchableOpacity>

            <Text style={tw`mt-7 text-[#084B82] font-bold text-lg mb-1`}>
              {ShowProfileData.name}
            </Text>
            <View style={tw`flex flex-row gap-2 mt-2`}>
              <FontAwesome size={20} name="phone" color={"#8D8D8D"} />
              <Text style={tw`text-[#8D8D8D]`}>
                +91 {ShowProfileData.mobile}
              </Text>
            </View>
            <View style={tw`flex flex-row gap-2 mt-1 items-center`}>
              <MaterialCommunityIcons
                size={20}
                name="email"
                color={"#8D8D8D"}
              />
              <Text style={tw`text-[#8D8D8D]`}>{ShowProfileData.email}</Text>
            </View>
            <View style={tw`flex flex-row gap-2 mt-1 items-center`}>
              <FontAwesome6 size={20} name="location-dot" color={"#8D8D8D"} />
              <Text style={tw`text-[#8D8D8D]`}>{ShowProfileData.address}</Text>
            </View>
          </View>
          {/* For Green Pass */}
          <View
            style={tw`bg-white rounded-[11px] mt-3 justify-between px-3 pb-3 `}
          >
            <View style={tw`bg-white flex flex-row justify-between`}>
              <View style={tw`flex flex-row items-center gap-2`}>
                <MaterialCommunityIcons
                  size={23}
                  name="ticket-outline"
                  color={"#13A74A"}
                />
                <Text style={tw`text-[#13A74A] text-[15px] font-medium`}>
                  Green Pass
                </Text>
              </View>
              <View>
                <Button
                  buttonStyle={tw`rounded-lg px-2`}
                  type="none"
                  radius={"xl"}
                  titleStyle={tw`text-[#25AE7A]`}
                >
                  <Feather name="plus" color="#25AE7A" size={25} />
                </Button>
              </View>
            </View>
            <View>
              <Button onPress={()=> navigation.navigate("GreenPassDetails")}
                buttonStyle={tw`rounded-[9px] bg-[#13A74A] bg-opacity-15 justify-start px-4 mt-1 py-[10px]`}
              >
                <Text style={tw`text-[#343434] font-medium`}>
                 {ShowProfileData.greenPassCount} Pass available
                </Text>
              </Button>
            </View>
          </View>

          {/* Help */}
          <TouchableOpacity onPress={()=>navigation.navigate("HelpSupport")}
            style={tw`flex flex-row items-center gap-3 mt-5 bg-white rounded-[11px] py-[15px] px-3`}
          >
            <Feather name="info" color="#6E6E6E" size={20} />
            <Text style={tw`font-medium text-[#6E6E6E]`}>Help</Text>
          </TouchableOpacity>

          {/* Privacy Policy */}
          <TouchableOpacity onPress={()=>navigation.navigate("PrivacyPolicy")}
            style={tw`flex flex-row items-center gap-3 mt-2 bg-white rounded-[11px] py-[15px] px-3`}
          >
            <MaterialIcons name="privacy-tip" color="#6E6E6E" size={20} />
            <Text style={tw`font-medium text-[#6E6E6E]`}>Privacy Policy</Text>
          </TouchableOpacity>

          {/* FAQ */}
          <TouchableOpacity onPress={()=>navigation.navigate("ShareDetails")}
            style={tw`flex flex-row items-center gap-3 mt-2 bg-white rounded-[11px] py-[15px] px-3`}
          >
            <Feather name="help-circle" color="#6E6E6E" size={20} />
            <Text style={tw`font-medium text-[#6E6E6E]`}>FAQ</Text>
          </TouchableOpacity>

          {/* Parking History */}
          <TouchableOpacity onPress={()=>navigation.navigate("ParkingHistory")}
            style={tw`flex flex-row items-center gap-3 mt-2 bg-white rounded-[11px] py-[15px] px-3`}
          >
            <Octicons name="history" color="#6E6E6E" size={20} />
            <Text style={tw`font-medium text-[#6E6E6E]`}>Parking History</Text>
          </TouchableOpacity>

          {/* Help */}
          <TouchableOpacity
            style={tw`flex flex-row items-center gap-3 mt-2 bg-white rounded-[11px] py-[15px] px-3`}
          >
            <Feather name="log-out" color="#f00" size={20} />
            <Text style={tw`font-medium text-[#f00]`}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* for update vehicle  */}
        <BottomSheet
          onBackdropPress={() => {
            setIsUpdateProfileDetails(false);
          }}
          modalProps={{}}
          isVisible={IsUpdateProfiledetails}
        >
          <View style={tw`bg-white w-full px-4 py-6 rounded-t-[20px]`}>
            <View style={tw`absolute right-2`}>
              <Button
                onPress={() => setIsUpdateProfileDetails(false)}
                buttonStyle={tw`rounded-lg px-4 py-2 text-[#f00]`}
                titleStyle={tw`text-[#f00]`}
                type="Clear"
              >
                Close
                {/* <AntDesign name="closecircleo" color="red" size={32} /> */}
              </Button>
            </View>
            <View style={[tw`px-2`]}>
              <Text style={tw`text-lg font-semibold `}>Edit Profile</Text>
              <View>
                <View>
                  <Text style={tw`text-sm mt-7`}>Name</Text>
                  <TextInput
                    style={tw`w-full border-b text-sm items-center h-8 border-b-[#ccc]`}
                    placeholder="Enter Name"
                    value={GetUpdateProfileData.name}
                    onChangeText={(text) => setName(text)}
                    placeholderTextColor="#24242480"
                    keyboardType="text"
                  />
                </View>
                <View>
                  <Text style={tw`text-sm mt-7`}>Mobile Number</Text>
                  <TextInput
                    style={tw`w-full border-b text-sm items-center h-8 border-b-[#ccc] uppercase`}
                    placeholder="Enter Mobile Number"
                    value={GetUpdateProfileData.mobile}
                    onChangeText={(text) => setnumber(text)}
                    placeholderTextColor="#24242480"
                    keyboardType="text"
                  />
                </View>
                <View>
                  <Text style={tw`text-sm mt-7`}>Email Address</Text>
                  <TextInput
                    style={tw`w-full border-b text-sm items-center h-8 border-b-[#ccc] `}
                    placeholder="Enter Email Address"
                    value={GetUpdateProfileData.email}
                    onChangeText={(text) => setemail(text)}
                    placeholderTextColor="#24242480"
                  />
                </View>
                <View>
                  <Text style={tw`text-sm mt-7`}>Your Address</Text>
                  <TextInput
                    style={tw`w-full border-b text-sm items-center h-8 border-b-[#ccc] `}
                    placeholder="Enter Address"
                    value={GetUpdateProfileData.address}
                    onChangeText={(text) => setaddress(text)}
                    placeholderTextColor="#24242480"
                  />
                </View>
                <View>
                  <Button
                    onPress={ISUpdateTheProfileDetails}
                    loading={isLoading}
                    buttonStyle={tw`bg-[#25AE7A] mt-12 mb-6 py-3 rounded-[23px]`}
                  >
                    <Text style={tw`text-center text-white font-medium`}>
                      Submit
                    </Text>
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </BottomSheet>
      </ScrollView>
      <View style={tw`absolute bottom-4 w-full h-full `}>
          <Toast style={tw`border-2`} position={"top"}></Toast>
        </View>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    height: "100%",
  },
});
