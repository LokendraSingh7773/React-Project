import { AccordionList } from "accordion-collapse-react-native";
import { useEffect, useState } from "react";
import axios from "axios";
// import { Separator } from "native-base";
import { View, Text, SafeAreaView } from "react-native";
import tw from "twrnc";
import { Button } from "@rneui/themed";
import { AntDesign } from "@expo/vector-icons";

export default function FAQ({ navigation }) {
  const [FetchedSupportQuery, setFetchedSupportQuery] = useState("");
  const [ShowSupportQuery, setShowSupportQuery] = useState([]);

  const GetSupportQueries = () => {
    try {
      setFetchedSupportQuery(false);
      axios
        .post("https://customer.theparkvue.com/api/need-help", {
          customer_id: 2,
        })
        .then((res) => {
          const { status_code, message, help_list } = res.data;
          console.log(res.data);
          if (status_code == "1") {
            setShowSupportQuery(help_list);
            setFetchedSupportQuery(true);
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

  const _head = (item) => {
    return (
      <View bordered style={tw`mx-3`}>
        <Text
          style={tw`bg-[#fff] mt-2 w-full py-3 px-2 rounded-[6px] text-base font-semibold`}
        >
          {item.question}
        </Text>
      </View>
    );
  };

  const _body = (item) => {
    return (
      <View bordered style={tw`bg-white mx-3`}>
        <Text style={tw`px-2 py-1`}>{item.answer}</Text>
      </View>
    );
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
          <Text style={tw`text-white font-semibold text-base`}>FAQ</Text>
        </View>
        {FetchedSupportQuery === true ? (
          <View style={tw`mt-3 mx-2`}>
            <AccordionList
              list={ShowSupportQuery}
              header={_head}
              body={_body}
              keyExtractor={(item) => `${item.id}`}
            />
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
      </SafeAreaView>
    </>
  );
}

// how to fetch data in Accordin list by Api
