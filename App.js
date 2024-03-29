import "react-native-gesture-handler";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import SignUp from "./src/components/Auth/SignUp";
import SignIn from "./src/components/Auth/SignIn";
import Home from "./src/components/Home";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { axios } from "./src/Config/Axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import ForgetPass from "./src/components/Auth/forgetPassword";
import PasswordVerify from "./src/components/Auth/passwordVerify";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import Categories from "./src/components/Screens/Shop/Categories";
import ProductView from "./src/components/Screens/Home/ProductView";
import Products from "./src/components/Screens/Shop/Products";
import { ModalPortal } from "react-native-modals";
import ClientAddress from "./src/components/Screens/Profile/ClientAddress";
import CreateAddress from "./src/components/Screens/Profile/CreateAddress";
import Checkout from "./src/components/Screens/Bag/Checkout";
import Success from "./src/components/Screens/Bag/Success";
import Order from "./src/components/Screens/Profile/Order";
import Setting from "./src/components/Screens/Profile/Setting";
import Contact from "./src/components/Screens/Profile/Contact";
import OrderDetailes from "./src/components/Screens/Profile/OrderDetailes";
import Landing from "./src/components/Screens/Home/LandingHome";
import LandingProductView from "./src/components/Screens/Home/LandingProductView";
import LandingCategories from "./src/components/Screens/Home/landingShop/Categories";
import LandingProducts from "./src/components/Screens/Home/landingShop/Products";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#1E1F28",
  },
};

const AuthContext = React.createContext();
const Stack = createStackNavigator();

function SignInScreen(props) {
  const navigation = useNavigation();
  const { signIn } = React.useContext(AuthContext);
  return <SignIn {...props} navigation={navigation} userLogin={signIn} />;
}
function SignUpScreen(props) {
  const navigation = useNavigation();
  const { signIn } = React.useContext(AuthContext);
  return <SignUp {...props} navigation={navigation} userLogin={signIn} />;
}

export default function App({ navigation }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            isVerified: false,
          };
        case "VERIFY":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            isVerified: true,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      isVerified: false,
    },
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem("userToken");
        axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
        // console.log(userToken);
      } catch (e) {
        console.log(e);
        // Restoring token failed
      }
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: "RESTORE_TOKEN", token: userToken });
    };
    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
    }),
    [],
  );
  const HomeScreen = props => {
    const navigation = useNavigation();

    // const { signOut } = dispatch({ type: "SIGN_OUT" });
    return (
      <Home
        {...props}
        navigation={navigation}
        logout={() => {
          dispatch({ type: "SIGN_OUT" });
        }}
      />
    );
  };
  const LandingScreen = props => {
    const navigation = useNavigation();

    // const { signOut } = dispatch({ type: "SIGN_OUT" });
    return (
      <Landing
        {...props}
        navigation={navigation}
        logout={() => {
          dispatch({ type: "SIGN_OUT" });
        }}
      />
    );
  };
  const LandingCategoryScreen = props => {
    const navigation = useNavigation();

    // const { signOut } = dispatch({ type: "SIGN_OUT" });
    return (
      <LandingCategories
        {...props}
        navigation={navigation}
        logout={() => {
          dispatch({ type: "SIGN_OUT" });
        }}
      />
    );
  };
  const ProductScreen = props => {
    const navigation = useNavigation();
    const route = useRoute();
    // const { signOut } = dispatch({ type: "SIGN_OUT" });
    return <ProductView {...props} navigation={navigation} route={route} />;
  };

  const LandingProductViewScreen = props => {
    const navigation = useNavigation();
    const route = useRoute();
    // const { signOut } = dispatch({ type: "SIGN_OUT" });
    return (
      <LandingProductView {...props} navigation={navigation} route={route} />
    );
  };
  const LandingProductsScreen = props => {
    const navigation = useNavigation();
    const route = useRoute();
    // const { signOut } = dispatch({ type: "SIGN_OUT" });
    return <LandingProducts {...props} navigation={navigation} route={route} />;
  };

  const ClientAddressScreen = props => {
    const navigation = useNavigation();
    const route = useRoute();

    return <ClientAddress {...props} navigation={navigation} route={route} />;
  };
  const CreateAddressScreen = props => {
    const navigation = useNavigation();
    const route = useRoute();

    return <CreateAddress {...props} navigation={navigation} route={route} />;
  };
  const CategoriesScreen = props => {
    const navigation = useNavigation();
    const route = useRoute();
    return <Categories {...props} navigation={navigation} route={route} />;
  };
  const ProductsScreen = props => {
    const navigation = useNavigation();
    const route = useRoute();
    return <Products {...props} navigation={navigation} route={route} />;
  };
  const CheckoutScreen = props => {
    const navigation = useNavigation();
    const route = useRoute();
    return <Checkout {...props} navigation={navigation} route={route} />;
  };
  const SuccessScreen = props => {
    const navigation = useNavigation();
    const route = useRoute();
    return <Success {...props} navigation={navigation} route={route} />;
  };
  const OrderScreen = props => {
    const navigation = useNavigation();
    const route = useRoute();
    return <Order {...props} navigation={navigation} route={route} />;
  };
  const OrderDetailesrScreen = props => {
    const navigation = useNavigation();
    const route = useRoute();
    return <OrderDetailes {...props} navigation={navigation} route={route} />;
  };
  const SettingScreen = props => {
    const navigation = useNavigation();
    const route = useRoute();
    return <Setting {...props} navigation={navigation} route={route} />;
  };
  const ContactScreen = props => {
    const navigation = useNavigation();
    const route = useRoute();
    return <Contact {...props} navigation={navigation} route={route} />;
  };
  const ForgetPasswordScreen = props => {
    const navigation = useNavigation();
    // const { signIn } = React.useContext(AuthContext);userLogin={signIn}
    return (
      <ForgetPass
        {...props}
        navigation={navigation}
        verify={() => {
          dispatch({ type: "VERIFY" });
        }}
      />
    );
  };

  const PasswordVerifyScreen = props => {
    const navigation = useNavigation();
    const route = useRoute();
    return (
      <PasswordVerify
        {...props}
        navigation={navigation}
        route={route}
        verified={() => {
          dispatch({ type: "SIGN_IN" });
        }}
      />
    );
  };
  return (
    <AuthContext.Provider value={authContext}>
      <SafeAreaProvider>
        <NavigationContainer theme={MyTheme}>
          <Stack.Navigator>
            {state.userToken == null ? (
              state.isVerified == false ? (
                <>
                  <Stack.Screen
                    name="Landing"
                    component={LandingScreen}
                    options={{
                      animationTypeForReplace: state.isSignout ? "pop" : "push",
                      header: () => {
                        "none";
                      },
                    }}
                  />
                  <Stack.Screen
                    name="LandingProductView"
                    component={LandingProductViewScreen}
                    options={{
                      animationTypeForReplace: state.isSignout ? "pop" : "push",
                      header: () => {
                        "none";
                      },
                    }}
                  />
                  <Stack.Screen
                    name="LandingCategory"
                    component={LandingCategoryScreen}
                    options={{
                      animationTypeForReplace: state.isSignout ? "pop" : "push",
                      header: () => {
                        "none";
                      },
                    }}
                  />
                  <Stack.Screen
                    name="LandingProducts"
                    component={LandingProductsScreen}
                    options={{
                      animationTypeForReplace: state.isSignout ? "pop" : "push",
                      header: () => {
                        "none";
                      },
                    }}
                  />
                  <Stack.Screen
                    name="SignIn"
                    component={SignInScreen}
                    options={{
                      animationTypeForReplace: state.isSignout ? "pop" : "push",
                      header: () => {
                        "none";
                      },
                    }}
                  />
                  <Stack.Screen
                    name="SignUp"
                    component={SignUpScreen}
                    options={{
                      animationTypeForReplace: state.isSignout ? "pop" : "push",
                      header: () => {
                        "none";
                      },
                    }}
                  />
                  <Stack.Screen
                    name="ForgetPass"
                    component={ForgetPasswordScreen}
                    options={{
                      animationTypeForReplace: state.isSignout ? "pop" : "push",
                      header: () => {
                        "none";
                      },
                    }}
                  />
                </>
              ) : (
                <Stack.Screen
                  name="VerifyPass"
                  component={PasswordVerifyScreen}
                  options={{
                    animationTypeForReplace: state.isSignout ? "pop" : "push",
                    header: () => {
                      "none";
                    },
                  }}
                />
              )
            ) : (
              <>
                <Stack.Screen
                  name="Home"
                  component={HomeScreen}
                  options={{
                    animationTypeForReplace: state.isSignout ? "pop" : "push",
                    header: () => {
                      "none";
                    },
                  }}
                />
                <Stack.Screen
                  name="ProductView"
                  component={ProductScreen}
                  options={{
                    animationTypeForReplace: state.isSignout ? "pop" : "push",
                    header: () => {
                      "none";
                    },
                  }}
                />
                <Stack.Screen
                  name="category"
                  component={CategoriesScreen}
                  options={{
                    animationTypeForReplace: state.isSignout ? "pop" : "push",
                    header: () => {
                      "none";
                    },
                  }}
                />
                <Stack.Screen
                  name="products"
                  component={ProductsScreen}
                  options={{
                    animationTypeForReplace: state.isSignout ? "pop" : "push",
                    header: () => {
                      "none";
                    },
                  }}
                />
                <Stack.Screen
                  name="clientAddresses"
                  component={ClientAddressScreen}
                  initialParams={{ refresh: false }}
                  options={{
                    animationTypeForReplace: state.isSignout ? "pop" : "push",
                    header: () => {
                      "none";
                    },
                  }}
                />
                <Stack.Screen
                  name="createAddress"
                  component={CreateAddressScreen}
                  options={{
                    animationTypeForReplace: state.isSignout ? "pop" : "push",
                    header: () => {
                      "none";
                    },
                  }}
                />
                <Stack.Screen
                  name="Checkout"
                  component={CheckoutScreen}
                  options={{
                    animationTypeForReplace: state.isSignout ? "pop" : "push",
                    header: () => {
                      "none";
                    },
                  }}
                />
                <Stack.Screen
                  name="Success"
                  component={SuccessScreen}
                  options={{
                    animationTypeForReplace: state.isSignout ? "pop" : "push",
                    header: () => {
                      "none";
                    },
                  }}
                />
                <Stack.Screen
                  name="Order"
                  component={OrderScreen}
                  options={{
                    animationTypeForReplace: state.isSignout ? "pop" : "push",
                    header: () => {
                      "none";
                    },
                  }}
                />
                <Stack.Screen
                  name="OrderDetailes"
                  component={OrderDetailesrScreen}
                  options={{
                    animationTypeForReplace: state.isSignout ? "pop" : "push",
                    header: () => {
                      "none";
                    },
                  }}
                />
                <Stack.Screen
                  name="Setting"
                  component={SettingScreen}
                  options={{
                    animationTypeForReplace: state.isSignout ? "pop" : "push",
                    header: () => {
                      "none";
                    },
                  }}
                />
                <Stack.Screen
                  name="Contact"
                  component={ContactScreen}
                  options={{
                    animationTypeForReplace: state.isSignout ? "pop" : "push",
                    header: () => {
                      "none";
                    },
                  }}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="light" />
        <ModalPortal />
      </SafeAreaProvider>
    </AuthContext.Provider>
  );
}
