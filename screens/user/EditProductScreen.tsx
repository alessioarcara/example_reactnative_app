import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
import {
  Alert,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Item } from "react-navigation-header-buttons";
import { Input, IoniconsHeaderButtons } from "../../components";
import Colors from "../../constants/Colors";
import defaultStyles from "../../constants/default-styles";
import useForm from "../../hooks/useForm";
import usePushNotification from "../../hooks/usePushNotification";
import { UserStackNavigationParams } from "../../navigation/UserNavigator";
import {
  useAddProductMutation,
  useEditProductMutation,
  useGetProductsQuery,
} from "../../services/shopApi";

type EditProductScreenProps = {
  navigation: StackNavigationProp<UserStackNavigationParams, "EditProduct">;
  route: RouteProp<UserStackNavigationParams, "EditProduct">;
};

const EditProductScreen = ({ navigation, route }: EditProductScreenProps) => {
  const { editedProduct } = useGetProductsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      editedProduct: data?.find(
        (product) => product.id === route.params.productId
      ),
    }),
  });

  const getPushToken = usePushNotification();

  const [
    addProduct,
    { isLoading: isAdding, error: failedToAddProductErrorMessage },
  ] = useAddProductMutation();
  const [
    editProduct,
    { isLoading: isUpdating, error: failedToUpdateProductErrorMessage },
  ] = useEditProductMutation();

  useEffect(() => {
    if (failedToAddProductErrorMessage) {
      Alert.alert("An error occurred!", "Can't create product.");
    }
    if (failedToUpdateProductErrorMessage) {
      Alert.alert("An error occurred!", "Can't update product.");
    }
  }, [failedToAddProductErrorMessage, failedToUpdateProductErrorMessage]);

  const [{ inputValues, inputValidities, formIsValid }, valueChangeHandler] =
    useForm({
      title: editedProduct?.title ?? "",
      imageUrl: editedProduct?.imageUrl ?? "",
      price: editedProduct?.price?.toString() ?? "",
      description: editedProduct?.description ?? "",
    });

  const submitHandler = useCallback(() => {
    if (!formIsValid) {
      Alert.alert("Wrong input!", "Please check the errors in the form", [
        { text: "Okay" },
      ]);
      return;
    }
    (editedProduct
      ? editProduct({
          id: editedProduct.id,
          title: inputValues.title,
          imageUrl: inputValues.imageUrl,
          description: inputValues.description,
        })
      : getPushToken().then((pushToken) => {
          addProduct({
            title: inputValues.title,
            imageUrl: inputValues.imageUrl,
            description: inputValues.description,
            price: +inputValues.price,
            pushToken,
          });
        })
    ).then(() => {
      navigation.goBack();
    });
  }, [inputValues, formIsValid]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IoniconsHeaderButtons>
          <Item
            title="Commit"
            iconName="ios-checkmark-circle"
            onPress={submitHandler}
          />
        </IoniconsHeaderButtons>
      ),
    });
  }, [submitHandler]);

  if (isAdding || isUpdating) {
    return (
      <View style={defaultStyles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            label="Title"
            value={inputValues.title}
            onInputChange={valueChangeHandler}
            error={!inputValidities.title}
            errorText="Please enter a valid title!"
            autoCorrect
            autoCapitalize="sentences"
            returnKeyType="next"
            initialValue={editedProduct?.title ?? ""}
            initiallyValid={!!editedProduct}
            required
          />
          <Input
            id="imageUrl"
            label="Image Url"
            value={inputValues.imageUrl}
            onInputChange={valueChangeHandler}
            error={!inputValidities.imageUrl}
            errorText="Please enter a valid image url!"
            returnKeyType="next"
            initialValue={editedProduct?.imageUrl ?? ""}
            initiallyValid={!!editedProduct}
            required
          />
          {editedProduct ? null : (
            <Input
              id="price"
              label="Price"
              value={inputValues.price}
              onInputChange={valueChangeHandler}
              keyboardType="decimal-pad"
              error={!inputValidities.price}
              errorText="Please enter a valid price!"
              required
              min={0.1}
            />
          )}
          <Input
            id="description"
            label="Description"
            value={inputValues.description}
            onInputChange={valueChangeHandler}
            error={!inputValidities.description}
            errorText="Please enter a valid description!"
            autoCorrect
            autoCapitalize="sentences"
            multiline
            numberOfLines={3}
            initialValue={editedProduct?.description ?? ""}
            initiallyValid={!!editedProduct}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditProductScreen;

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
});
