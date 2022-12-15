import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import styled from "styled-components/native";
import {
  Button,
  FlatList,
  Image,
  ImageBackground,
  useWindowDimensions,
} from "react-native";

const SelectPhoto = ({ navigation }) => {
  const [ok, setOk] = useState(false);
  const [videos, setVideos] = useState([]);
  const [chosenVideo, setChosenVideo] = useState("");
  const getVideos = async () => {
    const { assets: videos } = await MediaLibrary.getAssetsAsync({
      mediaType: "video",
      first: 1000,
    });
    setVideos(videos);
    setChosenVideo(videos[0]);
  };
  const getPermissions = async () => {
    const { status } = await MediaLibrary.getPermissionsAsync();
    if (status !== "granted") {
      await MediaLibrary.requestPermissionsAsync();
      if (status === "granted") {
        setOk(true);
        getVideos();
      }
    } else if (status === "granted") {
      setOk(true);
      getVideos();
    }
  };
  useEffect(() => {
    getPermissions();
  }, [ok]);

  const HeaderRight = () => (
    <Button
      title="선택 영상 업로드"
      onPress={() =>
        navigation.navigate("UploadForm", {
          ...chosenVideo,
        })
      }
    />
  );
  useEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRight,
    });
  }, [chosenVideo]);

  const numColumns = 2;
  const { width } = useWindowDimensions();
  const chooseVideo = (video) => {
    setChosenVideo(video);
  };
  const renderItem = ({ item: video }) => (
    <ImageContainer onPress={() => chooseVideo(video)}>
      <Image
        source={{ uri: video?.uri }}
        style={{ width: width / numColumns, height: 200 }}
      />
      <TimeContainer>
        <Title>
          날짜:
          {video?.filename.substr(0, 4) +
            "-" +
            video?.filename.substr(4, 2) +
            "-" +
            video?.filename.substr(6, 2)}
        </Title>
      </TimeContainer>
      <TimeContainer_2>
        <Title>
          시간:
          {video?.filename.substr(9, 2) +
            ":" +
            video?.filename.substr(11, 2) +
            ":" +
            video?.filename.substr(13, 2)}
        </Title>
      </TimeContainer_2>
      <DurationContainer>
        <Title>길이:{video?.duration.toFixed(1)}초</Title>
      </DurationContainer>
      <IconContainer>
        <Ionicons
          name="checkmark-circle"
          size={25}
          color={video?.uri === chosenVideo?.uri ? "#0984e3" : "white"}
        />
      </IconContainer>
    </ImageContainer>
  );
  //return ====return ====return ====return ====return ====return ====return ====
  return (
    <Container>
      <Top>
        {chosenVideo?.uri !== "" ? (
          <ImageBackground
            source={{ uri: chosenVideo?.uri }}
            style={{ width: "100%", height: "100%" }}
            resizeMode={"contain"}
          />
        ) : null}
      </Top>
      <Bottom>
        <FlatList
          data={videos.sort((a, b) => {
            return b.creationTime - a.creationTime;
          })}
          numColumns={numColumns}
          keyExtractor={(video) => video.id}
          renderItem={renderItem}
          style={{ flex: 0 }}
          initialNumToRender={videos.length}
        />
      </Bottom>
      <Button title="동영상 새로고침" onPress={getVideos} />
    </Container>
  );
};
export default SelectPhoto;

const Container = styled.View`
  flex: 1;
`;
const Top = styled.View`
  flex: 1;
  background-color: black;
  margin-bottom: 2px;
`;
const Bottom = styled.View`
  flex: 1;
  background-color: bisque;
`;
const IconContainer = styled.View`
  position: absolute;
  bottom: 5px;
  right: 0px;
`;
const DurationContainer = styled.View`
  position: absolute;
  bottom: 5px;
  left: 0px;
  background-color: black;
`;
const TimeContainer = styled.View`
  position: absolute;
  top: 3%;
  left: 0px;
  background-color: black;
`;
const TimeContainer_2 = styled.View`
  position: absolute;
  top: 15%;
  left: 0px;
  background-color: black;
`;
const ImageContainer = styled.TouchableOpacity`
  border: 1px solid #ccc;
`;
const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: white;
`;
