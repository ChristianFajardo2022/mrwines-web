<ImageBackground
        style={styles.imageBackgroundContainer}
        source={require("../../assets/botellas.jpg")}
      >
        <View style={styles.view1}>
          <Text style={styles.text1}>Basket</Text>
        </View>
        
        <View key={everyWine._id} style={styles.view2}>
          <View style={styles.view3}>
            <Image style={styles.customImg} source={{uri: oneWine.photo}} />
          </View>
          <View style={styles.view4}>
            <View>
              <Text>{everyWine.idWine.nameWine}</Text>
            </View>
            <View>
              <Text>{everyWine.idWine.type} - {everyWine.idWine.variety}</Text>
            </View>
          </View>
          <View style={styles.view5}>
            <Text>{everyWine.idWine.price} U$D</Text>
          </View>
          <View style={styles.view6}>
            <TouchableHighlight
              type="submit"
              onPress={() => Alert.alert("You has deleted a item")}
            >
              <Text>
                <MaterialCommunityIcons name="delete" size={28} color="black" />
              </Text>
            </TouchableHighlight>
          </View>
        </View> : (
                        <View style={styles.view11}>
                            <Text>Your cart is empty</Text>
                            <Text>Choose a product in the Shop! </Text>
                        </View>
                        )

        <View style={styles.view7}>
          <View style={styles.view8}>
            <Text style={styles.text2}>Subtotal: 500U$D</Text>
          </View>
          <View style={styles.view9}>
            <Text style={styles.text2}>Total: 1000U$D</Text>
          </View>
          <View style={styles.view10}>
          <TouchableHighlight
              type="submit"
              onPress={() => Alert.alert("Simple Button pressed")}
            >
              <Text style={styles.textSubmit}>
                Checkout
              </Text>
            </TouchableHighlight>
            <TouchableHighlight
              type="submit"
              onPress={() => Alert.alert("Simple Button pressed")}
            >
              <Text style={styles.textSubmit2}>
                Keep buying
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </ImageBackground>

const styles = StyleSheet.create({
    imageBackgroundContainer: {
      height: "100%",
    },
    view1: {
      height: 100,
      justifyContent: "flex-end",
      alignItems: "center",
    },
    text1: {
      fontSize: 40,
      fontWeight: "bold",
      color: "red",
      textShadowColor: "black",
      textShadowRadius: 5,
    },
    view2: {
      backgroundColor: "white",
      borderColor: "black",
      borderWidth: 1,
      height: 100,
      width: "94%",
      marginTop: 20,
      marginLeft: 10,
      borderRadius: 10,
      flexDirection: "row",
    },
    view3: {
      width: "23.5%",
      justifyContent: "center",
    },
    view4: {
      width: "29.5%",
      justifyContent: "center",
      alignItems: "center",
    },
    view5: {
      width: "23.5%",
      justifyContent: "center",
      alignItems: "center",
    },
    view6: {
      width: "23.5%",
      justifyContent: "center",
      alignItems: "center",
    },
    customImg: {
      width: null,
      resizeMode: "contain",
      height: 70,
    },
    view7: {
      backgroundColor: "white",
      borderWidth: 1,
      borderColor: "black",
      height: 220,
      marginTop: 10,
      width: "94%",
      marginLeft: 10,
      borderRadius: 10,
    },
    view8: {
      borderBottomColor: "black",
      borderBottomWidth: 1,
      height: 60,
      justifyContent: "center",
      alignItems: "center"
    },
    view9:{
      borderBottomColor: "black",
      borderBottomWidth: 1,
      height: 60,
      justifyContent: "center",
      alignItems: "center"
    },
    text2: {
      fontSize: 18,
    },
    textSubmit: {
      backgroundColor: "brown",
      marginBottom: 10,
      padding: 15,
      width: "100%",
      borderRadius: 10
    },
    textSubmit2: {
      backgroundColor: "brown",
      marginBottom: 10,
      padding: 15,
      width: "100%",
      borderRadius: 10
    },
    view10: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      height: 98
    },
  view11:{
      backgroundColor: "white",
      borderWidth: 1,
      borderColor: "black",
      justifyContent: "center",
      alignItems: "center",
      width: "94%",
      marginLeft: 10,
      borderRadius: 10,
      marginTop:"20%",
  }
  });
