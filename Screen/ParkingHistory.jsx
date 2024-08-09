import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Linking,
} from "react-native";
import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign, EvilIcons, FontAwesome5 } from "@expo/vector-icons";
import tw from "twrnc";
import { Chip } from "@rneui/base";
import { Button } from "@rneui/themed";
import axios from "axios";
import { Skeleton, Overlay } from "@rneui/themed";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Rating, AirbnbRating } from "react-native-ratings";
import Textarea from "react-native-textarea";

export default function MyParking({ navigation }) {
  const [ShowParkingData, setParkingData] = useState([]);
  const [IsFetchedParkingData, setIsFetchedParkingData] = useState(null);
  const customer_id = AsyncStorage.getItem("customer_id");
  const [visible, setVisible] = useState(false);

  const getParkingData = async () => {
    try {
      setIsFetchedParkingData(false);
      axios
        .post("https://customer.theparkvue.com/api/customer-booking", {
          customer_id: 2,
          booking_status: "Completed",
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

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const [IsLoading, setIsLoading] = useState(false);
  const [rating, setrating] = useState(null);
  const [booking_id, setBookingId] = useState(null);
  const [station_id, setstation_id] = useState(null);
  const [comment, setcomment] = useState(null);
  const GetDataByReview = (item) => {
    setstation_id(item.station_id);
    setBookingId(item.parking_id);
    toggleOverlay();
  };

  const ratingCompleted = (rating) => {
    console.log("Rating is: " + rating);
    setrating(rating);
  };

  const reviewData = {
    customer_id: 2,
    rating: rating,
    booking_id: booking_id,
    station_id: station_id,
    comment: comment,
    is_cancle: 0,
  };

  const ParkingReview = () => {
    try {
      setIsLoading(true);
      axios
        .post(
          "https://customer.theparkvue.com/api/add-customer-review",
          reviewData,
          {
            headers: {
              token:
                "7c98a4fcb9ee1a8e6d196e846d809f65bb94355c1f2b432c4b959ea7b71e182d",
            },
          }
        )
        .then((res) => {
          const { status, message } = res.data;
          console.log(res.data);
          setIsLoading(false);
          if (status === true) {
            toggleOverlay(false);
            setcomment(null);
            setrating(null);
            getParkingData();
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

  // for review

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
    getParkingData();
  }, []);
  return (
    <>
      <SafeAreaView
        contentContainerStyle={styles.scrollView}
        style={tw`h-full flex`}
      >
        <View
          style={tw`flex flex-row mx-3 px-3 py-[6px] gap-3 items-center rounded-[28px] my-2 bg-[#084B82]`}
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
            Parking History
          </Text>
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
                    navigation.navigate("Park", { itemId: item.parking_id });
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
                          item.booking_status == "Completed"
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
                            item.booking_status == "Completed"
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
                        onPress={() => {
                          openGoogleMaps(item);
                        }}
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
                        <Text style={tw`text-[#868686] font-medium`}>
                          {item.end_date}
                        </Text>
                        <Text style={tw`text-[#9A9A9A]`}>{item.end_time}</Text>
                      </View>
                    </View>
                    <View style={tw`flex flex-row gap-3 mt-2`}>
                      {item.customerGivenReview == 0 ? (
                        <Button
                          onPress={() => {
                            GetDataByReview(item);
                          }}
                          radius={"md"}
                          type="clear"
                        >
                          Review Station
                        </Button>
                      ) : null}
                      <Button radius={"md"} color={"#25AE7A"}>
                        Re-booking
                      </Button>
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

        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
          <View style={tw`w-full items-center text-center py-4 px-4 relative`}>
            <Image
              style={tw`w-[100px] h-[100px] absolute rounded-full p-1 -top-14 bg-[#fff]`}
              source={require("../assets/images/rate.png")}
            />
            <Text
              style={tw`text-lg text-center font-medium leading-tight mt-6`}
            >
              {" "}
              How Would You Rate Our {"\n"} Parking Station?
            </Text>
            <AirbnbRating
              count={5}
              reviews={
                ratingCompleted.rating
                  ? "Hello"
                  : ["Bad", "OK", "Good", "Very Good", "Amazing"]
              }
              defaultRating={0}
              defaultValue={0}
              reviewSize={20}
              onFinishRating={ratingCompleted}
              size={25}
            />
            <Textarea
              containerStyle={tw`h-[100px] w-[300px] rounded-[10px] mt-4 text-base text-[#000] border-[1px] border-[#ccc] px-2 py-1`}
              defaultValue={reviewData.comment}
              onChangeText={(value) => setcomment(value)}
              maxLength={150}
              placeholder="Enter Here"
              placeholderTextColor={"#24242480"}
              underlineColorAndroid={"transparent"}
            />
            <View style={tw`flex flex-row gap-6 mt-5`}>
              <Button
                title="Cancel"
                color={"#DAF8F0"}
                titleStyle={tw`text-[#25AE7A] px-3`}
                radius={"md"}
                onPress={toggleOverlay}
              />
              <Button
                loading={IsLoading}
                title="Submit"
                radius={"md"}
                titleStyle={tw`px-3`}
                color={"#25AE7A"}
                onPress={ParkingReview}
              />
            </View>
          </View>
        </Overlay>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    height: "100%",
  },
  textPrimary: {
    marginVertical: 20,
    textAlign: "center",
    fontSize: 20,
  },
  textSecondary: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 17,
  },
});
