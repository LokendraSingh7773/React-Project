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

export default function ParkingDetails({ route, navigation }) {
  const { itemId } = route.params;
  const [IsFetchedParkingData, setIsFetchedParkingData] = useState("");
  const [IsShowParkingData, setIsShowParkingData] = useState([]);
  const GetParkingTicketData = async () => {
    try {
      setIsFetchedParkingData(false);
      axios
        .post("https://customer.theparkvue.com/api/booking-detail", {
          customer_id: 2,
          booking_id: itemId,
          token:
            "7c98a4fcb9ee1a8e6d196e846d809f65bb94355c1f2b432c4b959ea7b71e182d",
        })
        .then((res) => {
          const { status_code, message, booking_details } = res.data;
          // console.log(res.data);
          if (status_code == "1") {
            setIsShowParkingData(booking_details);
            setIsFetchedParkingData(true);
          } else {
            setIsFetchedParkingData(message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const share = async () => {
    const { uri } = await FileSystem.downloadAsync(
      "https://cdn.pixabay.com/photo/2021/12/12/16/10/qr-6865526_1280.png",
      FileSystem.documentDirectory + "pepe.jpg"
    );
  //  const messageText = 'Text that you want to share goes here'
    

    console.log("Waiting for share to resolve:");
    await Sharing.shareAsync(uri, {
      mimeType: "image/jpeg",
      dialogTitle:"Share this text",
      UTI: "JPEG",
    });
    console.log("File has been shared");
  };

  // for location
  const openGoogleMaps = () => {
    const latitude = IsShowParkingData.latitude; // Example latitude
    const longitude = IsShowParkingData.longitude; // Example longitude
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
            buttonStyle={tw`rounded-full py-[10px]`}
            radius={"xl"}
            color={"#063862"}
          >
            <AntDesign name="arrowleft" color="#fff" size={22} />
          </Button>
          <Text style={tw`text-white font-semibold text-base`}>
            Parking Details
          </Text>
        </View>

        {/* <Text style={tw`text-lg font-semibold`}>The case id is :{itemId}</Text> */}
        <ScrollView style={tw`mx-5 mt-5`}>
          <View style={tw`bg-white rounded-[29px] px-4 py-4`}>
            <TouchableOpacity style={tw`self-end`}>
              <Octicons
                onPress={share}
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
              Scan this on the scanner machine when {"\n"} you are in the
              parking lot
            </Text>
          </View>
          <View style={tw`border-[1px] mx-5 border-dashed`}></View>
          <View style={tw`bg-white rounded-[29px] px-4 py-6`}>
            <View style={tw`flex flex-row items-center justify-between mt-2`}>
              <View>
                <Text style={tw`text-black text-base font-medium`}>
                  {IsShowParkingData.center_name}
                </Text>
                <Text style={tw`text-[#9A9A9A] text-xs`}>
                  {IsShowParkingData.parking_address}
                </Text>
              </View>
              <Button
                onPress={openGoogleMaps}
                buttonStyle={tw`border-2 border-[#25AE7A] `}
                radius={"xl"}
                type="outline"
                titleStyle={tw`text-[#25AE7A]`}
              >
                <FontAwesome5 name="directions" color="#25AE7A" size={22} />
              </Button>
            </View>

            {/* date & Time */}
            <View
              style={tw`flex flex-row mt-5 bg-[#FAFAFA] justify-between gap-4 items-center py-2 rounded-[5px] px-3`}
            >
              <View style={tw`flex flex-row  items-center gap-2`}>
                <View>
                  <Text style={tw`text-[#474747] font-semibold`}>
                    {IsShowParkingData.start_date}
                  </Text>
                  <Text style={tw`text-[#9A9A9A] `}>
                    {IsShowParkingData.start_time}
                  </Text>
                </View>
              </View>
              <View>
                <AntDesign name="arrowright" color="#868686" size={24} />
              </View>
              <View>
                <View>
                  <Text style={tw`text-[#474747] font-semibold`}>
                    {IsShowParkingData.end_date}
                  </Text>
                  <Text style={tw`text-[#9A9A9A]`}>
                    {IsShowParkingData.end_time}
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
                  {IsShowParkingData.booking_no}
                </Text>
              </View>
              <View>
                <Text style={tw`text-[#606060] text-right`}>
                  {/* {item.end_time} */}Vehicle
                </Text>
                <Text style={tw`text-[#5814B0] font-semibold text-xs `}>
                  {/* {IsShowParkingData.vehicle_model} :{" "} */}
                  {IsShowParkingData.vehicle_number}
                </Text>
              </View>
            </View>

            {/* Duration and status */}
            <View
              style={tw`flex flex-row mt-5 justify-between gap-4 items-center py-2 rounded-[5px] px-3`}
            >
              <View>
                <Text style={tw`text-[#606060] `}>Booking Duration</Text>
                <Text style={tw`text-[#474747] mt-1 font-semibold`}>
                  {IsShowParkingData.parking_hours}
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
                    IsShowParkingData.booking_status == "Confirmed"
                      ? "#DAF8F0"
                      : IsShowParkingData.booking_status == "Canceled"
                      ? "#ffcccb"
                      : IsShowParkingData.booking_status == "Ongoing"
                      ? "#F8E8DA"
                      : "#ccc"
                  }
                >
                  <Text
                    style={
                      IsShowParkingData.booking_status == "Confirmed"
                        ? tw`text-[#25AE7A] text-sm font-medium`
                        : IsShowParkingData.booking_status == "Canceled"
                        ? tw`text-[#f00] text-sm font-medium`
                        : IsShowParkingData.booking_status == "Ongoing"
                        ? tw`text-[#ff7700] text-sm font-medium`
                        : "#ccc"
                    }
                  >
                    {IsShowParkingData.booking_status}
                  </Text>
                </Chip>
              </View>
            </View>
          </View>

          {IsShowParkingData.is_extended === true ? (
            <View is_extended={false}>
              <Button
                // onPress={() => props.navigation.navigate("MainDesign")}
                buttonStyle={tw`bg-[#25AE7A] mt-6 py-3 rounded-[23px]`}
              >
                <Text style={tw`text-center text-sm text-white font-normal`}>
                  Extend Booking
                </Text>
              </Button>
            </View>
          ) : null}

          {IsShowParkingData.canUserCancle === 1 ? (
            <View>
              <Button
                // onPress={() => props.navigation.navigate("MainDesign")}
                buttonStyle={tw`bg-[#E29624] mt-6 mb-8 py-3 rounded-[23px]`}
              >
                <Text style={tw`text-center text-sm text-white font-normal`}>
                  Cancel Booking
                </Text>
              </Button>
            </View>
          ) : null}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
