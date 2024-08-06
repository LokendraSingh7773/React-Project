import { SafeAreaView, View, Text, ScrollView, TextInput } from "react-native";
import tw from "twrnc";
import { Button } from "@rneui/themed";
import { AntDesign } from "@expo/vector-icons";
import Textarea from "react-native-textarea";
import { useEffect, useState } from "react";
import axios from "axios";
import Toast from "react-native-toast-message";
import HTMLView from "react-native-htmlview";

export default function HelpSupport({ navigation }) {
  const [FetchedSupportQuery, setFetchedSupportQuery] = useState("");
  const [ShowSupportQuery, setShowSupportQuery] = useState([]);

  const GetSupportQueries = () => {
    try {
      setFetchedSupportQuery(false);
      axios
        .post("https://customer.theparkvue.com/api/privacy", {
          customer_id: 2,
        })
        .then((res) => {
          const { status_code, message, page_data } = res.data;
          // console.log(res.data);
          if (status_code == "1") {
            setFetchedSupportQuery(true);
            setShowSupportQuery(page_data);
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

  useEffect(() => {
    GetSupportQueries();
  }, []);

  return (
    <>
      <SafeAreaView style={tw`flex`}>
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
            Privacy Policy
          </Text>
        </View>

        {/* main design */}

        <View style={tw`px-3 mt-3`}>
          {FetchedSupportQuery === true ? (
            <View>
              <Text style={tw`text-lg font-semibold`}>
                {ShowSupportQuery.heading}
              </Text>
              <ScrollView style={tw`bg-white mt-2 rounded-[11px] px-2 py-2 h-full h-[89%]`}>
                <HTMLView style={tw`pb-4`} value={ShowSupportQuery.content}></HTMLView>
              </ScrollView>
            </View>
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
      </SafeAreaView>
    </>
  );
}
