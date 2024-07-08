import * as React from "react";
import { ActivityIndicator, View, useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import tw from "twrnc";
import { useEffect, useState } from "react";
import { Text, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";

const width = Dimensions.get("window").width;


  

export default function TabViewExample() {
  
  const [stationsData , setStationData] = useState([]);
   

const getStationData = async () => {
  axios
    .post("https://parkvue.microcrm.in/api/parking-stations",{
      customer_id: 0,
      vehicle_type: 'car',
      latitude: "26.91005663752748",
      longitude: "75.78074459248285",
      green_pass: 'no',
    })
    .then((res) => {
      console.log(res.data);
      const {status_code , message , centerList} = res.data

      if(status_code == "1"){
        setStationData(centerList)
      }
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
    });
  }

  useEffect(()=>{
    getStationData()
    console.log(getStationData.vehicle_type)
  },[])

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
   
    { key: "Car", title: "Car" },
    { key: "Bike", title: "Bike" },
  ]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={[tw``, { backgroundColor: "#ff7700", position: "top" }]}
      activeColor="#FF7700"
      inactiveColor="#000"
      labelStyle={{ fontWeight: "600" }}
      style={[tw`font-bold bg-[#fff] font-bold shadow-none rounded-sm px-2`]}
    />
  );



  

const CarRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#fff", display: "block" }}>
    <View style={tw`h-full `}>
      <Carousel
        width={width}
        height={width}
        autoPlay={false}
        data={stationsData}
        onSnapToItem={(index) => console.log("current index:", index)}
        renderItem={({ item , index }) => (
          <View
            style={[
              tw`px-6 py-4 mx-4 mt-2 rounded-[20px] shadow-2xl shadow-[#25AE7A] border-[1px] border-[#25AE74]  bg-white`,
              styles.card,
            ]}
          >
            <View key={index} style={tw`flex flex-row justify-between items-center`}>
              <View>
                <Text style={tw`text-[15px] font-semibold text-black `}>
                 {item.station_name}
                </Text>
                <Text style={tw`text-xs text-[#9A9A9A] mt-1`}>
                  {item.station_address}
                </Text>
              </View>
              <View style={tw`bg-[#DFF0FF] px-4 py-1 rounded-[13px]`}>
                <Text style={tw`text-lg font-semibold text-[#084B82]`}>
                  ₹{item.per_hour_charges}
                </Text>
                <Text style={tw`text-xs text-[#5A5A5A]`}>Per hrs</Text>
              </View>
            </View>
            <View style={tw`flex flex-row justify-between mt-4 mx-2`}>
              <View style={tw`flex flex-row items-center`}>
                <Text style={tw`text-[15px] font-medium text-[#393939] `}>
                  {item.rating}
                </Text>
                <FontAwesome name="star" color={"#FFBB00"} size={18} />
              </View>
              <View style={tw`flex flex-row items-center gap-1`}>
                <MaterialIcons
                  style={tw`bg-[#084B82] rounded-1 w-[19px] h-[19px] `}
                  name="directions-run"
                  color={"white"}
                  size={18}
                />
                <Text style={tw`text-sm font-medium text-[#393939] `}>
                  {item.centerDistance} km away
                </Text>
              </View>
              <View style={tw`flex flex-row items-center gap-1 text-center`}>
                <MaterialIcons
                  style={tw`bg-[#084B82] rounded-1 w-[19px] h-[19px] text-center`}
                  name="local-parking"
                  color={"white"}
                  size={16}
                />
                <Text style={tw`text-sm font-medium text-[#0DB756] `}>
                  {item.slots} spots
                </Text>
              </View>
            </View>
            <View>
              <TouchableOpacity
                style={tw`bg-[#25AE7A]  mt-6 py-3 rounded-[23px]`}
              >
                <Text style={tw`text-center text-white font-medium`}>
                  Book Now
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  </View>
);

const BikeRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#fff" }}>
    <View style={tw`h-full `}>
      <Carousel
        width={width}
        height={width}
        autoPlay={false}
        data={[...new Array(6).keys()]}
        onSnapToItem={(index) => console.log("current index:", index)}
        renderItem={({ index }) => (
          <View
            style={[
              tw`px-6 py-4 mx-4 mt-2 rounded-[20px] shadow-2xl shadow-[#25AE7A] border-[1px] border-[#25AE74] bg-white`,
              styles.card,
            ]}
          >
            <View style={tw`flex flex-row justify-between items-center`}>
              <View>
                <Text style={tw`text-[15px] font-semibold text-black `}>
                  Jaipur Internation Airport
                </Text>
                <Text style={tw`text-xs text-[#9A9A9A] mt-1`}>
                  Jaipur Internation Airport
                </Text>
              </View>
              <View style={tw`bg-[#DFF0FF] px-4 py-1 rounded-[13px]`}>
                <Text style={tw`text-lg font-semibold text-[#084B82]`}>
                  ₹10
                </Text>
                <Text style={tw`text-xs text-[#5A5A5A]`}>Per hrs</Text>
              </View>
            </View>
            <View style={tw`flex flex-row justify-between mt-4 mx-2`}>
              <View style={tw`flex flex-row items-center`}>
                <Text style={tw`text-[15px] font-medium text-[#393939] `}>
                  4.5
                </Text>
                <FontAwesome name="star" color={"#FFBB00"} size={18} />
              </View>
              <View style={tw`flex flex-row items-center gap-1`}>
                <MaterialIcons
                  style={tw`bg-[#084B82] rounded-1 w-[19px] h-[19px] `}
                  name="directions-run"
                  color={"white"}
                  size={18}
                />
                <Text style={tw`text-sm font-medium text-[#393939] `}>
                  2 km away
                </Text>
              </View>
              <View style={tw`flex flex-row items-center gap-1 text-center`}>
                <MaterialIcons
                  style={tw`bg-[#084B82] rounded-1 w-[19px] h-[19px] text-center`}
                  name="local-parking"
                  color={"white"}
                  size={16}
                />
                <Text style={tw`text-sm font-medium text-[#0DB756] `}>
                  18 spots
                </Text>
              </View>
            </View>
            <View>
              <TouchableOpacity
                style={tw`bg-[#25AE7A]  mt-6 py-3 rounded-[23px]`}
              >
                <Text style={tw`text-center text-white font-medium`}>
                  Book Now
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  </View>
);

const renderScene = SceneMap({
  Car: CarRoute,
  Bike: BikeRoute,
});




  return (
    <TabView
      style={[tw`absolute bottom-0 h-[255px] w-full rounded-t-[20px]`]}
      animationEnabled={false}
      swipeEnabled={false}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width, height: 60 }}
    >
    </TabView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },

  card: {
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 6,
  },
});
