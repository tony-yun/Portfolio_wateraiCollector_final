import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import SelectPhoto from "./screen/SelectPhoto";
import UploadForm from "./screen/UploadForm";
import { client } from "./Apollo";
import { ApolloProvider } from "@apollo/client";

const Stack = createNativeStackNavigator();

/**
 * Apollo client contains application
 * @returns SelectPhoto,UploadForm
 */
const App = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="SelectPhoto"
            component={SelectPhoto}
            options={{ title: "wateraiCollector" }}
          />
          <Stack.Screen
            name="UploadForm"
            component={UploadForm}
            options={{ title: "영상 업로드하기" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
