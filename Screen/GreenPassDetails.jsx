import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Alert,
  Share,
  Linking,
} from "react-native";
import { ScrollView } from "react-native";
import { Button, Chip, Divider } from "@rneui/themed";
import {
  AntDesign,
  Feather,
  Octicons,
  FontAwesome5,
  EvilIcons,
} from "@expo/vector-icons";
import tw from "twrnc";
import axios from "axios";
import { useEffect, useState } from "react";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ParkingDetails({ navigation }) {
  const [IsFetchedGreenPassData, setIsFetchedGreenPassData] = useState("");
  const [IsShowGreenPassData, setIsShowGreenPassData] = useState([]);
  const customer_id = AsyncStorage.getItem("customer_id");
  const GetParkingTicketData = async () => {
    try {
      setIsFetchedGreenPassData(false);
      axios
        .post("https://customer.theparkvue.com/api/customer-green-pass", {
          customer_id: 2,
          token:
            "7c98a4fcb9ee1a8e6d196e846d809f65bb94355c1f2b432c4b959ea7b71e182d",
        })
        .then((res) => {
          const { status_code, message, vehiclePassList } = res.data;
          console.log(res.data);
          if (status_code == "1") {
            setIsShowGreenPassData(vehiclePassList);
            setIsFetchedGreenPassData(true);
          } else {
            setIsFetchedGreenPassData(message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const share = async (item) => {
    // Download the image
    // const { uri } = await FileSystem.downloadAsync(
    //   "https://cdn.pixabay.com/photo/2021/12/12/16/10/qr-6865526_1280.png",
    //   FileSystem.documentDirectory + "pepe.jpg"
    // );
    const messageText = `*Your Parking Station details:*
  *Click link for Parking QR Code:*
  ${item.qr_code}
  Start Date & Time:*${item.from_date}*
  End Date & Time: *${item.to_date} * 
  Location:https://www.google.com/maps/?q=${item.latitude},${item.longitude}`;
  
  // Duration:*${item.parking_hours}*
    try {
      await Share.share({
        message: messageText,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // for location
  const openGoogleMaps = (item) => {
    const latitude = item.latitude; // Example latitude
    const longitude = item.longitude; // Example longitude
    const url = `https://www.google.com/maps/?q=${latitude},${longitude}`;

    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL", err)
    );
  };

  useEffect(() => {
    GetParkingTicketData();
  }, []);

  return (
    <>
      <SafeAreaView style={tw`h-full flex`}>
        <View
          style={tw`flex flex-row mx-3 px-3 py-[6px] gap-2 items-center rounded-[28px] my-2 bg-[#084B82]`}
        >
          <Button
            onPress={() => navigation.goBack()}
            buttonStyle={tw`rounded-full py-[8px] px-[8px]`}
            radius={"xl"}
            color={"#063862"}
          >
            <AntDesign name="arrowleft" color="#fff" size={22} />
          </Button>
          <Text style={tw`text-white font-semibold text-base`}>
            Green Pass Details
          </Text>
        </View>

        {IsFetchedGreenPassData === true ? (
          <ScrollView style={tw`mx-5 mt-5`}>
            {IsShowGreenPassData.map((item, index) => {
              return (
                <View key={index}>
                  <View style={tw`bg-white rounded-[29px] px-4 py-4`}>
                    <TouchableOpacity style={tw`self-end`}>
                      <Octicons
                        onPress={()=>{share(item)}}
                        name="share-android"
                        color="#000"
                        size={26}
                      />
                    </TouchableOpacity>
                    <Image
                      style={tw`w-[165px] h-[165px] self-center mt-2`}
                      source={require("@/assets/images/qr-code.png")}
                    />

                    <Text
                      style={tw`text-[#9A9A9A] text-xs text-center pb-5 mt-1 font-medium`}
                    >
                      Scan this on the scanner machine when {"\n"} you are in
                      the parking lot
                    </Text>
                  </View>
                  <View style={tw`border-[1px] mx-5 border-dashed`}></View>
                  <View style={tw`bg-white rounded-[29px] px-4 py-6`}>
                    <View
                      style={tw`flex flex-row items-center justify-between mt-2`}
                    >
                      <View>
                        <Text style={tw`text-black text-base font-medium`}>
                          {item.center_name}
                        </Text>
                        <Text style={tw`text-[#9A9A9A] text-xs`}>
                          {item.parking_address}
                        </Text>
                      </View>
                      <Button
                        onPress={()=>{openGoogleMaps(item)}}
                        buttonStyle={tw`border-2 border-[#25AE7A] `}
                        radius={"xl"}
                        type="outline"
                        titleStyle={tw`text-[#25AE7A]`}
                      >
                        <FontAwesome5
                          name="directions"
                          color="#25AE7A"
                          size={22}
                        />
                      </Button>
                    </View>

                    {/* date & Time */}
                    <View
                      style={tw`flex flex-row mt-5 bg-[#FAFAFA] justify-between gap-4 items-center py-2 rounded-[5px] px-3`}
                    >
                      <View style={tw`flex flex-row items-center gap-2`}>
                        <View>
                          <Text style={tw`text-[#474747] font-semibold`}>
                            {item.from_date}
                          </Text>
                        </View>
                      </View>
                      <View>
                        <AntDesign
                          name="arrowright"
                          color="#868686"
                          size={24}
                        />
                      </View>
                      <View>
                        <View>
                          <Text style={tw`text-[#474747] font-semibold`}>
                            {item.to_date}
                          </Text>
                        </View>
                      </View>
                    </View>

                    {/* booking id and vehicle  */}
                    <View
                      style={tw`flex flex-row mt-5 justify-between gap-4 items-center py-2 rounded-[5px] px-3`}
                    >
                      <View>
                        <Text style={tw`text-[#606060] `}>
                          {/* {item.start_time} */}Booking ID
                        </Text>
                        <Text style={tw`text-[#474747] font-semibold`}>
                          {item.reference_code}
                        </Text>
                      </View>
                      <View>
                        <Text style={tw`text-[#606060] text-right`}>
                          {/* {item.end_time} */}Vehicle
                        </Text>
                        <Text style={tw`text-[#5814B0] font-semibold text-xs `}>
                          {/* {item.vehicle_model} :{" "} */}
                          {item.vehicle_no}
                        </Text>
                      </View>
                    </View>

                    {/* Duration and status */}
                    <View
                      style={tw`flex flex-row mt-5 justify-between gap-4 items-center py-2 rounded-[5px] px-3`}
                    >
                      <View>
                        <Text style={tw`text-[#606060] `}>Duration</Text>
                        <Text style={tw`text-[#474747] font-semibold`}>
                          {item.duration}
                        </Text>
                      </View>
                      <View>
                        <Text style={tw`text-[#606060] text-right`}>
                          Booking Status
                        </Text>
                        <Chip
                          size="xs"
                          buttonStyle={tw`mt-1`}
                          color={
                            item.status == "1"
                              ? "#DAF8F0"
                              : item.status == "0"
                              ? "#ffcccb"
                              : "#ccc"
                          }
                        >
                          <Text
                            style={
                              item.status == "1"
                                ? tw`text-[#25AE7A] text-sm font-medium`
                                : item.status == "0"
                                ? tw`text-[#f00] text-sm font-medium`
                                : "#ccc"
                            }
                          >
                            {item.status == "1" ? "Confirmed" : "Pending"}
                          </Text>
                        </Chip>
                      </View>
                    </View>
                  </View>

                  {/* {item.is_extended === true ? ( */}
                  <View is_extended={false}>
                    <Button
                      // onPress={() => props.navigation.navigate("MainDesign")}
                      buttonStyle={tw`bg-[#25AE7A] mt-6 py-3 rounded-[23px]`}
                    >
                      <Text
                        style={tw`text-center text-sm text-white font-normal`}
                      >
                        Recharge
                      </Text>
                    </Button>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        ) : (
          <View style={tw`items-center h-full mt-40`}>
            <Button
              style={tw`text-center justify-center items-center`}
              type="Clear"
              loadingProps={{
                size: "50px",
                color: "#084b82",
              }}
              loadingStyle={tw`text-xl`}
              loading
            ></Button>
            <Text style={tw`text-center text-[#084b82] text-base ml-2`}>
              Loading..
            </Text>
          </View>
        )}
      </SafeAreaView>
    </>
  );
}
