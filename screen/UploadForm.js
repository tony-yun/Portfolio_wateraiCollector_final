import React, { useEffect, useRef, useState } from "react";
import { Alert, Button, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { Video } from "expo-av";
import { useForm, Controller } from "react-hook-form";
import Input from "../components/Input";
import { useMutation } from "@apollo/client";
import { SEND_VIDEO } from "../queries/info/CreateInfo";
import { ReactNativeFile } from "apollo-upload-client";
import * as mime from "react-native-mime-types";
import AppLoader from "../components/AppLoader";

const UploadForm = ({ route, navigation }) => {
  const video = useRef(null);
  const [realVideo, setRealVideo] = useState();
  const [dataTransferred, setDataTransferred] = useState(false);

  //useForm
  const {
    handleSubmit,
    control,
    getValues,
    watch,
    formState: { errors, isDirty, isSubmitting, isValid },
  } = useForm({ mode: "onChange" });
  //console.log(watch()); //useform에서 어떤 행동이 있는지 추적.

  //getVideoFromUrl
  const getFileFromUrl = async () => {
    const file = new ReactNativeFile({
      uri: route?.params?.uri,
      type: mime.lookup(route?.params?.uri) || "video/mp4",
      name: route?.params?.filename,
    });
    setRealVideo(file);
  };
  console.log("route:", route);
  console.log("name:", String(route?.params?.filename));

  //useMutation: onCompleted
  const onCreateInfoCompleted = (data) => {
    setDataTransferred(false);
    Alert.alert(
      "영상 전송 완료",
      "1시간 안에 촬영한 1분짜리 영상을 총 5개 올려주시기 바랍니다.",
      [
        {
          text: "영상 선택으로 돌아가기",
          onPress: () => navigation.navigate("SelectPhoto"),
        },
      ]
    );
  };

  //useMutation (send to server)
  const [receiveVideo] = useMutation(SEND_VIDEO, {
    onCompleted: onCreateInfoCompleted,
  });

  const onSubmit = () => {
    const { collector, river } = getValues();
    receiveVideo({
      variables: {
        file: realVideo,
        time: String(route?.params?.creationTime),
        width: route?.params?.width,
        height: route?.params?.height,
        collector: collector,
        rivername: river,
      },
    });
    setDataTransferred(true);
  };

  useEffect(() => {
    if (!!realVideo) {
    }
  }, [realVideo]);

  useEffect(() => {
    getFileFromUrl();
  }, []);

  const VideoDate =
    route?.params?.filename.substr(0, 4) +
    "-" +
    route?.params?.filename.substr(4, 2) +
    "-" +
    route?.params?.filename.substr(6, 2) +
    " " +
    route?.params?.filename.substr(9, 2) +
    ":" +
    route?.params?.filename.substr(11, 2) +
    ":" +
    route?.params?.filename.substr(13, 2);
  //return ====return ====return ====return ====return ====return ====return ====
  return (
    <>
      <Container>
        <Top>
          <Video
            ref={video}
            style={{ alignSelf: "center", width: "100%", height: "100%" }}
            source={{
              uri: route?.params?.uri,
            }}
            useNativeControls
            resizeMode="contain"
            isLooping
          />
        </Top>

        <Bottom>
          <>
            <Title>영상 정보 미리보기:</Title>
            <View
              style={{
                borderWidth: 3,
                borderColor: "#0984e3",
                borderRadius: 10,
                marginLeft: "3%",
                marginRight: "3%",
              }}
            >
              <Title>촬영일:{VideoDate}</Title>
              <Title>영상길이: {route?.params?.duration.toFixed(1)}초</Title>
            </View>
          </>

          <Title>촬영자(필수 입력):</Title>
          <>
            <Controller
              defaultValue=""
              name="collector"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  onChangeText={(text) => onChange(text)}
                  value={value}
                  placeholder="이름(성명)"
                  error={errors?.collector}
                  errorText={errors?.collector?.message}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: "본인 성명을 정확히 기재해야 정산받을 수 있습니다.",
                },
              }}
            />
          </>
          <Title>촬영 하천명(필수 입력):</Title>
          <>
            <Controller
              defaultValue=""
              name="river"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  onChangeText={(text) => onChange(text)}
                  value={value}
                  placeholder="촬영 하천명"
                  error={errors?.river}
                  errorText={errors?.river?.message}
                />
              )}
              rules={{
                required: {
                  value: true,
                  message: "촬영 하천명을 입력해주세요.",
                },
              }}
            />
          </>
        </Bottom>
        <Button
          title="영상 최종 업로드"
          onPress={handleSubmit(onSubmit)}
          label="Submit"
          disabled={!isDirty || !isValid}
        />
      </Container>
      {dataTransferred === true ? <AppLoader /> : null}
    </>
  );
};
export default UploadForm;

const Container = styled.View`
  flex: 1;
`;
const Top = styled.View`
  flex: 1;
  background-color: black;
`;
const Bottom = styled.ScrollView`
  flex: 1;
  background-color: bisque;
`;
const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: black;
  margin: 1.5%;
`;
