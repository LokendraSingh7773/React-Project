import * as React from "react";
import { SafeAreaView, View, useWindowDimensions , BackHandler, Alert } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import tw from "twrnc";
import { useEffect, useState } from "react";
import { Text, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";
import { Button } from "@rneui/themed";
const width = Dimensions.get("window").width;

export default function TabViewExample() {
  const GOOGLE_MAPS_APIKEY = "AIzaSyCIty6mcdUJPR_VOSP5vCjWp5ZoDQbEqXw";

  const [stationsData, setStationData] = useState([]);
  const [stationsLatitude, setStationsLatitude] = useState(0);
  const [stationsLongitude, setStationsLongitude] = useState(0);
  const [stationDetailsFetched, setStationDetailsFetched] = useState(false);

  const getStationData = async (vehicle_type, lat, long) => {
    try {
      setStationDetailsFetched(false);
      axios
        .post("https://parkvue.microcrm.in/api/parking-stations", {
          customer_id: 0,
          vehicle_type: vehicle_type,
          latitude: lat,
          longitude: long,
          green_pass: "no",
        })
        .then((res) => {
          const { status_code, message, centerList } = res.data;
          setStationDetailsFetched(true);

          if (status_code == "1") {
            setStationData(centerList);
            setStationsLatitude(centerList[0].latitude);
            setStationsLongitude(centerList[0].longitude);
            console.log(stationsLatitude);
          }
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    } catch (error) {
      console.log(err)
    }
  };

  const createTheStationRoute = (indexData) => {
    console.log(indexData);
    let dataArrayOfStation = stationsData.at(indexData);
    if (dataArrayOfStation) {
      setStationsLatitude(dataArrayOfStation.latitude);
      setStationsLongitude(dataArrayOfStation.longitude);
    }
  };
  // useEffect(() => {}, []);

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);

  const findvehicle = (data) => {
    console.log("user data", data);
    console.log("data");
    console.log(index);
  };
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

  useEffect(() => {
    if (index == 0) {
      getStationData("car");
    } else {
      getStationData("bike");
    }
    //call your increment function here
  }, [index]); //and in the array tag the state you want to watch for

  const CarRoute = () => (
    <View style={{ flex: 1, backgroundColor: "#fff", display: "block" }}>
      <View style={tw`h-full `}>
        <Carousel
          width={width}
          height={width}
          autoPlay={false}
          data={stationsData}
          onSnapToItem={(index) => {
            createTheStationRoute(index);
          }}
          renderItem={({ item, index }) => (
            <View
              style={[
                tw`px-6 py-4 mx-4 mt-2 rounded-[20px] shadow-2xl shadow-[#25AE7A] border-[1px] border-[#25AE74] bg-white`,
                styles.card,
              ]}
            >
              <View
                key={index}
                style={tw`flex flex-row justify-between items-center`}
              >
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
                <Button
                  buttonStyle={tw`bg-[#25AE7A] mt-6  py-3 rounded-[23px]`}
                >
                  <Text style={tw`text-center text-white font-medium`}>
                    Book Now
                  </Text>
                </Button>
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
          data={stationsData}
          onSnapToItem={(index) => console.log("current index:", index)}
          renderItem={({ item, index }) => (
            <View
              style={[
                tw`px-6 py-4 mx-4 mt-2 rounded-[20px] shadow-2xl shadow-[#25AE7A] border-[1px] border-[#25AE74] bg-white`,
                styles.card,
              ]}
            >
              <View
                key={index}
                style={tw`flex flex-row justify-between items-center`}
              >
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
                <Button
                  buttonStyle={tw`bg-[#25AE7A] mt-6  py-3 rounded-[23px]`}
                >
                  <Text style={tw`text-center text-white font-medium`}>
                    Book Now
                  </Text>
                </Button>
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

  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);

      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    };

    getLocation();
  }, []);

  useEffect(() => {
    // const backAction = () => {
    //   Alert.alert('Exit!', 'Are you sure you want to go back?', [
    //     {
    //       text: 'Cancel',
    //       onPress: () => null,
    //       style: 'cancel',
    //     },
    //     {text: 'YES', onPress: () => BackHandler.exitApp()},
    //   ]);
    //   return true;
    // };

    // const backHandler = BackHandler.addEventListener(
    //   'hardwareBackPress',
    //   backAction,
    // );

    // return () => backHandler.remove();/
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {stationDetailsFetched == true && (
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
          mapType="terrain"
          showsUserLocation={true}
        >
          {stationDetailsFetched &&
            stationsData.map((item, index) => {
              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: parseFloat(item.latitude),
                    longitude: parseFloat(item.longitude),
                  }}
                  title={item.station_name}
                />
              );
            })}
          {stationDetailsFetched == true &&
            stationsData.map((item, index) => {
              return (
                <MapViewDirections
                  key={index}
                  origin={{
                    latitude: 26.91071756609974,
                    longitude: 75.78035792542063,
                  }}
                  destination={{
                    latitude: parseFloat(stationsLatitude),
                    longitude: parseFloat(stationsLongitude),
                  }}
                  strokeWidth={4}
                  apikey={GOOGLE_MAPS_APIKEY}
                  strokeColor="#256db5"
                />
              );
            })}
        </MapView>
      )}
      <TabView
        style={[tw`absolute bottom-0 h-[260px] w-full rounded-t-[20px]`]}
        animationEnabled={false}
        swipeEnabled={false}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width, height: 60 }}
      />
    </SafeAreaView>
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
  map: {
    width: "100%",
    height: "100%",
  },
});
