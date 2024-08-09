import { AccordionList } from "accordion-collapse-react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import Toast from "react-native-toast-message";
import { View, Text, SafeAreaView } from "react-native";
import tw from "twrnc";
import { Button, Overlay } from "@rneui/themed";
import { AntDesign } from "@expo/vector-icons";
import { Image } from "react-native";

import Textarea from "react-native-textarea";
import { Rating, AirbnbRating } from "react-native-ratings";

export default function ShareData({ navigation }) {
  const [IsLoading, setIsLoading] = useState(false);
  const [ShowSupportQuery, setShowSupportQuery] = useState([]);
  const [visible, setVisible] = useState(false);
  const [rating, setrating] = useState(null);
  const [booking_id, setBookingId] = useState(null);
  const [station_id, setstation_id] = useState(null);
  const [comment, setcomment] = useState(null);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const ratingCompleted = (rating) => {
    console.log("Rating is: " + rating);
  };

  const reviewData = {
    customer_id: 2,
    rating: rating,
    booking_id: 80,
    station_id: 5,
    comment: 'jiii',
    is_cancle: 0,
  };

  const ShareParkingReview = async () => {
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
          const { status_code, message } = res.data;

          console.log(res.data);
          setIsLoading(false);
          if (status_code == "1") {
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
  return (
    <>
      <SafeAreaView>
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
        </View>
        <Button onPress={toggleOverlay}>Helllo</Button>

        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
          <View style={tw`w-full items-center text-center py-4 px-6`}>
            <Image
              style={tw`w-[100px] h-[100px]`}
              source={require("../assets/images/rate.png")}
            />
            <Text style={tw`text-lg text-center font-medium leading-tight`}>
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
              onChangeText={(value) => setrating(value)}
              defaultValue={reviewData.rating}
              reviewSize={20}
              size={25}
              onFinishRating={ratingCompleted}
            />
            <Textarea
              containerStyle={tw`h-[150px] w-[300px] rounded-[10px] mt-4 text-base text-[#000] border-[1px] border-[#ccc] px-2 py-1`}
              onChangeText={(value) => setcomment(value)}
              defaultValue={reviewData.comment}
              maxLength={220}
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
                title="Submit"
                radius={"md"}
                titleStyle={tw`px-3`}
                color={"#25AE7A"}
                onPress={ShareParkingReview}
              />
            </View>
          </View>
        </Overlay>

        <View style={tw`absolute -bottom-4 w-full h-full `}>
          <Toast position={"bottom"}></Toast>
        </View>
      </SafeAreaView>
    </>
  );
}

// how to fetch data in Accordin list by Api
