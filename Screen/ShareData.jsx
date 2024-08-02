import React from "react";
import { Alert, Share, View, Button } from "react-native";

import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";

const ShareExample = () => {
  // const onShare = async () => {
  //   try {
  //     const result = await Share.share({
  //       message:
  //         "React Native | A framework for building native apps using React",
  //     });
  //     if (result.action === Share.sharedAction) {
  //       if (result.activityType) {
  //         // shared with activity type of result.activityType
  //       }
  //     }
  //   } catch (err) {
  //     Alert.alert(err);
  //   }
  // };

  const share = async () => {
    const { uri } = await FileSystem.downloadAsync(
      "https://cdn.pixabay.com/photo/2021/12/12/16/10/qr-6865526_1280.png",
      FileSystem.documentDirectory + "pepe.jpg"
    );
    

    console.log("Waiting for share to resolve:");
    await Sharing.shareAsync(uri, {
      mimeType: "image/jpeg",
      dialogTitle:"Share this text",
      UTI: "JPEG",
    });
    console.log("File has been shared");
  };

  const ShareSomeData = async () => {
    try {
      const ShareOptions = await Share.share({
        message: "Hello My Name is Lokendra Singh",
      });
    } catch (error) {
      console.log(err);
    }
  };

  return (
    <View style={{ marginTop: 50 }}>
      <Button onPress={(ShareSomeData,share)} title="Share" />
    </View>
  );
};

export default ShareExample;
