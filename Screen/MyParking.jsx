import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import { RefreshControl } from "react-native";
import { AntDesign, EvilIcons, FontAwesome5 } from "@expo/vector-icons";
import tw from "twrnc";
import { Chip } from "@rneui/base";
import { Button } from "@rneui/themed";
import axios from "axios";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Skeleton } from "@rneui/themed";
import Toast from "react-native-toast-message";

export default function MyParking({ navigation }) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [ShowParkingData, setParkingData] = useState([]);
  const [SkeletonData, setSkeletonData] = useState(1, 2, 3, 4);
  const [IsFetchedParkingData, setIsFetchedParkingData] = useState(null);

  const getParkingData = async () => {
    try {
      setIsFetchedParkingData(false);
      axios
        .post("https://customer.theparkvue.com/api/customer-booking", {
          customer_id: 2,
          token:
            "7c98a4fcb9ee1a8e6d196e846d809f65bb94355c1f2b432c4b959ea7b71e182d",
        })
        .then((res) => {
          const { booking_list, message, status_code } = res.data;
          // console.log(res.data);
          if (status_code == "1") {
            if (booking_list.length > 0) {
              setParkingData(booking_list);
              setIsFetchedParkingData(true);
            } else {
              setIsFetchedParkingData(message);
            }
          } else {
            setIsFetchedParkingData(message);
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

  useEffect(() => {
    getParkingData();
  }, []);
  return (
    <>
      <SafeAreaView
        contentContainerStyle={styles.scrollView}
        style={tw`h-full flex`}
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
      >
        <View
          style={tw`flex flex-row justify-between mx-3 px-3 py-3 items-center rounded-[28px] my-2 bg-[#084B82]`}
        >
          <Text style={tw`text-white font-semibold text-base`}>My Parking</Text>
        </View>
        {IsFetchedParkingData == true ? (
          <Text style={tw`mt-2 text-base text-[#000000] opacity-50 mx-6 mb-3`}>
            Total {ShowParkingData.length} Parking
          </Text>
        ) : null}

        {/* Main design */}

        {IsFetchedParkingData == true ? (
          <ScrollView>
            {ShowParkingData.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    navigation.navigate("Park", { itemId: item.parking_id }),
                      console.log("The Station Id is " + item.parking_id);
                  }}
                >
                  <View style={tw`bg-white mx-4 px-3 mb-3 rounded-[11px] py-3`}>
                    <View
                      style={tw`flex flex-row items-center justify-between`}
                    >
                      <Text style={tw`text-[#606060]`}>
                        ID:{item.booking_no}
                      </Text>
                      <Chip
                        size="xs"
                        color={
                          item.booking_status == "Confirmed"
                            ? "#DAF8F0"
                            : item.booking_status == "Canceled"
                            ? "#ffcccb"
                            : item.booking_status == "Ongoing"
                            ? "#F8E8DA"
                            : "#ccc"
                        }
                      >
                        <Text
                          style={
                            item.booking_status == "Confirmed"
                              ? tw`text-[#25AE7A] text-sm font-medium px-2`
                              : item.booking_status == "Canceled"
                              ? tw`text-[#f00] text-sm font-medium px-2`
                              : item.booking_status == "Ongoing"
                              ? tw`text-[#ff7700] text-sm font-medium px-2`
                              : "#ccc"
                          }
                        >
                          {item.booking_status}
                        </Text>
                      </Chip>
                    </View>
                    <View
                      style={tw`flex flex-row items-center justify-between mt-2`}
                    >
                      <View>
                        <Text style={tw`text-black font-medium`}>
                          {item.center_name}
                        </Text>
                        <Text style={tw`text-[#9A9A9A] text-xs`}>
                          {item.parking_address}
                        </Text>
                      </View>
                      <Button
                        buttonStyle={tw`rounded-lg px-4 py-2 `}
                        type="none"
                        radius={"xl"}
                        titleStyle={tw`text-[#25AE7A]`}
                      >
                        <FontAwesome5
                          name="directions"
                          color="#25AE7A"
                          size={25}
                        />
                      </Button>
                    </View>
                    <View
                      style={tw`flex flex-row items-center justify-between mt-2 bg-[#f5f5f5] px-2 rounded-md py-2`}
                    >
                      <View style={tw`flex flex-row`}>
                        <Text style={tw`text-[#606060]`}>
                          {item.vehicle_model} :{" "}
                        </Text>
                        <Text style={tw`text-[#5814B0] font-semibold text-sm`}>
                          {item.vehicle_number}
                        </Text>
                      </View>
                      <Text style={tw`text-[#555555] text-base font-bold `}>
                        ₹{item.total_amount}
                      </Text>
                    </View>
                    <View style={tw`flex flex-row mt-3 gap-4 items-center`}>
                      <View style={tw`flex flex-row items-center gap-2`}>
                        <EvilIcons name="calendar" color="#868686" size={30} />
                        <View>
                          <Text style={tw`text-[#868686] font-medium`}>
                            {item.start_date}
                          </Text>
                          <Text style={tw`text-[#9A9A9A] `}>
                            {item.start_time}
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
                          <Text style={tw`text-[#868686] font-medium`}>
                            {item.end_date}
                          </Text>
                          <Text style={tw`text-[#9A9A9A]`}>
                            {item.end_time}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        ) : IsFetchedParkingData != true && IsFetchedParkingData != false ? (
          <View style={tw`items-center mt-12`}>
            <Image
              style={tw`w-[340px] h-[250px]`}
              source={require("@/assets//images/warning-2.gif")}
            />
            <Text style={tw`font-semibold text-2xl`}>No Data Found</Text>
          </View>
        ) : (
          <View style={tw`mt-8`}>
            {ShowParkingData.map((item, index) => {
              return (
                <View
                  key={index}
                  style={tw`bg-white mx-4 px-3 mb-3 rounded-[11px] py-3`}
                >
                  <View style={tw`flex flex-row items-center justify-between`}>
                    <Skeleton
                      skeletonStyle={tw`rounded-[20px]`}
                      circle={true}
                      animation="wave"
                      width={160}
                      height={15}
                    />

                    <Skeleton
                      skeletonStyle={tw`rounded-[11px]`}
                      circle={true}
                      animation="wave"
                      width={90}
                      height={25}
                    />
                  </View>
                  <View
                    style={tw`flex flex-row items-center justify-between mt-2`}
                  >
                    <View>
                      <Skeleton
                        circle={true}
                        skeletonStyle={tw``}
                        animation="wave"
                        style={tw`mb-1`}
                        width={140}
                        height={15}
                      />
                      <Skeleton
                        circle={true}
                        animation="wave"
                        width={140}
                        height={15}
                      />
                    </View>
                    <Skeleton
                      skeletonStyle={tw``}
                      circle={true}
                      animation="wave"
                      style={tw`mr-3`}
                      width={30}
                      height={30}
                    />
                  </View>
                  <View
                    style={tw`flex flex-row items-center justify-between mt-2 bg-[#f5f5f5] px-2 rounded-md py-2`}
                  >
                    <View style={tw`flex flex-row`}>
                      <Skeleton
                        skeletonStyle={tw``}
                        circle={true}
                        animation="wave"
                        width={140}
                        height={20}
                      />
                    </View>
                    <Skeleton
                      skeletonStyle={tw``}
                      circle={true}
                      animation="wave"
                      width={40}
                      height={30}
                    />
                  </View>
                  <View style={tw`flex flex-row mt-3 gap-4 items-center`}>
                    <View style={tw`flex flex-row items-center gap-2`}>
                      <View>
                        <Skeleton
                          skeletonStyle={tw``}
                          circle={true}
                          style={tw`mb-1`}
                          animation="wave"
                          width={140}
                          height={15}
                        />

                        <Skeleton
                          skeletonStyle={tw``}
                          circle={true}
                          animation="wave"
                          width={140}
                          height={15}
                        />
                      </View>
                    </View>
                    <View>
                      <Skeleton
                        skeletonStyle={tw``}
                        animation="wave"
                        style={tw`mb-1`}
                        width={20}
                        height={10}
                      />
                    </View>
                    <View>
                      <View>
                        <Skeleton
                          skeletonStyle={tw``}
                          circle={true}
                          animation="wave"
                          style={tw`mb-1`}
                          width={140}
                          height={15}
                        />

                        <Skeleton
                          skeletonStyle={tw``}
                          circle={true}
                          animation="wave"
                          width={140}
                          height={15}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        )}
        <View style={tw`absolute -bottom-4 w-full h-full `}>
          <Toast position={"bottom"}></Toast>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    height: "100%",
  },
});
