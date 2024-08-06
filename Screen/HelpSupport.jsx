import { SafeAreaView, View, Text, ScrollView, TextInput } from "react-native";
import tw from "twrnc";
import { Button } from "@rneui/themed";
import { AntDesign } from "@expo/vector-icons";
import Textarea from "react-native-textarea";
import { useEffect, useState } from "react";
import axios from "axios";
import Toast from "react-native-toast-message";

export default function HelpSupport({ navigation }) {
  const [FetchedSupportQuery, setFetchedSupportQuery] = useState("");
  const [customer_name, setcustomer_name] = useState(null);
  const [comment, setcomment] = useState(null);
  const [ShowSupportQuery, setShowSupportQuery] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const GetSupportQueries = () => {
    try {
      setFetchedSupportQuery(false);
      axios
        .post("https://customer.theparkvue.com/api/ticket-history", {
          customer_id: 2,
        })
        .then((res) => {
          const { status_code, message, ticket_List } = res.data;
          //   console.log(res.data);
          if (status_code == "1") {
            setFetchedSupportQuery(true);
            setShowSupportQuery(ticket_List);
          } else {
            setFetchedSupportQuery(message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const IsAddNewSupportQueries = {
    customer_id: 2,
    customer_name: customer_name,
    comment: comment,
  };

  const AddSupportQueries = () => {
    try {
      setisLoading(true);
      axios
        .post(
          "https://customer.theparkvue.com/api/create-ticket",
          IsAddNewSupportQueries
        )
        .then((res) => {
          const { status_code, message } = res.data;
          setisLoading(false);
          if (status_code == "1") {
            GetSupportQueries();
            setcustomer_name(null);
            setcomment(null);
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

  useEffect(() => {
    GetSupportQueries();
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
            Help & Support
          </Text>
        </View>

        {/* main design */}
        <View style={tw`px-4 mt-3`}>
          <View>
            <View>
              <Text style={tw`text-lg font-semibold`}>Send Your Query</Text>

              <View style={tw`flex flex-row mt-3  px-2 mb-[1px]`}>
                <Text style={tw`text-sm `}>Customer name</Text>
                <Text style={tw`text-sm text-[#f00]`}>*</Text>
              </View>
              <TextInput
                style={tw`h-[50px] w-full rounded-[14px] border-[#fff0] text-[#000] bg-[#fff] p-4`}
                value={customer_name}
                onChangeText={(value) => setcustomer_name(value)}
                placeholder="Enter your Name"
                placeholderTextColor="#24242480"
              />

              <View style={tw`flex flex-row mt-4  px-2 mb-[1px]`}>
                <Text style={tw`text-sm `}>Message</Text>
                <Text style={tw`text-sm text-[#f00]`}>*</Text>
              </View>
              <Textarea
                containerStyle={tw`h-[150px] w-full rounded-[10px] text-base text-[#000] bg-[#fff] px-2 py-1`}
                onChangeText={(value) => setcomment(value)}
                defaultValue={comment}
                maxLength={220}
                placeholder="Enter Here"
                placeholderTextColor={"#24242480"}
                underlineColorAndroid={"transparent"}
              />
            </View>
            <View>
              <Button
                loading={isLoading}
                onPress={AddSupportQueries}
                buttonStyle={tw`bg-[#25AE7A] mt-6 py-2 rounded-[23px]`}
                titleStyle={tw`text-base font-normal`}
              >
                Submit
              </Button>
            </View>

            <View>
              <Text style={tw`text-lg mt-6 mb-1 font-semibold`}>
                Your Support Queries:-{" "}
              </Text>
              {FetchedSupportQuery === true ? (
                <ScrollView>
                  {ShowSupportQuery.map((item, index) => {
                    return (
                      <View
                        key={index}
                        style={tw`bg-white rounded-[11px] py-[5px] px-2 mb-2`}
                      >
                        <Text style={tw`text-sm`}>
                          <Text style={tw`font-semibold`}>Ticket ID: </Text>{" "}
                          {item.ticket_no}
                        </Text>
                        <Text style={tw`text-sm`}>
                          <Text style={tw`font-semibold`}>Comment:</Text>
                          {item.comment}
                        </Text>
                        <Text style={tw`text-xs text-right`}>{item.date}</Text>
                      </View>
                    );
                  })}
                </ScrollView>
              ) : (
                <View style={tw`items-center h-full mt-10`}>
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
            </View>
          </View>
        </View>
        <View style={tw`absolute top-1 w-full h-full `}>
          <Toast position={"bottom"}></Toast>
        </View>
      </SafeAreaView>
    </>
  );
}
