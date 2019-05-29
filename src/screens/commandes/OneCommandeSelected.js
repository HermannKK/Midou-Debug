import React from "react";
import { Icon } from "native-base";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image
} from "react-native";
import SliderImage from "../othersComponents/SliderImage";
import MapPosition from "../othersComponents/MapPosition";
import { dataRepasCommande } from "../home/MapComponents/MyData/Mydata";
class OneCommandeSelected extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: dataRepasCommande[0],
      showInformations: false,
      note: 0,
      notecusto: false
    };
  }

  renduEtoile = (n, size, note) => {
    const item = [];
    if (note) n = this.state.note;
    for (let i = 0; i < 5; i++) {
      if (i < n) {
        item.push(
          <Icon
            name="star"
            type="AntDesign"
            style={{ color: "yellow", fontSize: size }}
            key={i.toString()}
            onPress={() => {
              if (note) this.setState({ note: i + 1 });
            }}
          />
        );
      } else {
        item.push(
          <Icon
            name="star"
            type="AntDesign"
            style={{ color: "white", fontSize: size }}
            key={i.toString()}
            onPress={() => {
              if (note) this.setState({ note: i + 1 });
            }}
          />
        );
      }
    }
    return item;
  };
  componentDidMount() {
    const { navigation } = this.props;
    const data = navigation.getParam("dataCommande");
    this.setState({ data: data });
  }
  render() {
    const data = this.state.data;
    return (
      <View style={styles.mainContainer}>
        {this.state.data != null && (
          <ScrollView style={{ flex: 1, paddingTop: 5 }}>
            <SliderImage tabI={data.Photo} height={300} />
            <View style={styles.alldetailsCon}>
              <TouchableOpacity
                style={styles.tvContenair}
                activeOpacity={0.9}
                onPress={() => {
                  this.setState(prevState => ({
                    showInformations: !prevState.showInformations
                  }));
                }}
              >
                <Text style={styles.tvTotalPrice}>Prix total</Text>
                <View style={styles.tvDirectionRow}>
                  <Text style={styles.tvMad}> MAD </Text>
                  <Text style={styles.tvPrice}>{data.pu * data.quantite}</Text>
                  {this.state.showInformations ? (
                    <Icon
                      name="chevron-up"
                      type="EvilIcons"
                      style={styles.tvIcon}
                    />
                  ) : (
                    <Icon
                      name="chevron-down"
                      type="EvilIcons"
                      style={styles.tvIcon}
                    />
                  )}
                </View>
              </TouchableOpacity>
              {this.state.showInformations && (
                <View style={styles.ivContenair}>
                  <Text style={styles.ivInfoSup}>
                    Informations suplémentaires
                  </Text>
                  <View style={styles.ivInfoIntContainer}>
                    <Text style={styles.ivText}>Repas commandé</Text>
                    <Text style={styles.ivText}>{data.NomPlat}</Text>
                  </View>
                  <View style={styles.ivInfoIntContainer}>
                    <Text style={styles.ivText}>Date</Text>
                    <Text style={styles.ivText}>
                      17 nov 2019 {data.comTime}
                    </Text>
                  </View>
                  <View style={styles.ivInfoIntContainer}>
                    <Text style={styles.ivText}>Prix unitaire</Text>
                    <Text style={styles.ivText}>{data.pu}</Text>
                  </View>
                  <View style={styles.ivInfoIntContainer}>
                    <Text style={styles.ivText}>Quantité</Text>
                    <Text style={styles.ivText}>{data.quantite}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingLeft: 15,
                      paddingRight: 15,
                      paddingBottom: 15
                    }}
                  >
                    <Text style={[styles.ivText, { flex: 2 }]}>
                      Description{" "}
                    </Text>
                    <Text style={[styles.ivText, { flex: 5 }]}>
                      {data.description}
                    </Text>
                  </View>
                  <View style={styles.ivContTotal}>
                    <Text style={styles.ivTotal}>Total</Text>
                    <Text style={styles.ivTotal}>
                      {data.pu * data.quantite}
                    </Text>
                  </View>
                </View>
              )}
              <View style={styles.mpConatiner}>
                <Icon
                  name="cash-multiple"
                  type="MaterialCommunityIcons"
                  style={styles.mpIcon}
                />
                <Text style={styles.mpText}>Paiement cash</Text>
              </View>
              <View
                style={{
                  padding: 15,
                  borderTopColor: "#a4b0be",
                  borderTopWidth: 1
                }}
              >
                <MapPosition
                  position={data.platP}
                  zomLevel={10}
                  height={130}
                  title={"Vos repas"}
                  image={data.Photo[0]}
                />
                <Text>
                  ({data.platP[0]};{data.platP[1]})
                </Text>
              </View>

              <View style={styles.iaContainair}>
                <View style={styles.iaView2}>
                  <View style={styles.iaViewIcon1}>
                    {/* <Icon
                      name="user-circle"
                      type="FontAwesome"
                      style={styles.iaIconUser}
                    /> */}
                    <Image
                      style={{ height: 60, width: 60, borderRadius: 30 }}
                      resizeMode={"cover"}
                      source={data.cooker}
                    />
                  </View>
                  <View style={{ paddingLeft: 10 }}>
                    <Text style={styles.iaUserName}>{data.cuName}</Text>
                    <Text>{data.LieuDate}</Text>
                  </View>
                </View>
                <View style={styles.etoileView}>
                  {this.renduEtoile(5, 17, false)}
                </View>
              </View>
              {!this.state.notecusto && (
                <View
                  style={styles.contNotecuisto}
                >
                  <Text
                    style={styles.contNotecuistohead}
                  >
                    Votre feedback nous interesse
                  </Text>
                  <View style={styles.etoileView}>
                    {this.renduEtoile(0, 40, true)}
                  </View>
                  <Text
                    style={styles.envoyeNote}
                    onPress={() => {
                      if (this.state.note > 0)
                        this.setState({ notecusto: true });
                    }}
                  >
                    ENVOYER
                  </Text>
                </View>
              )}
              <View style={styles.bvRjectContainer}>
                <Text
                  style={{ color: "red" }}
                  //   onPress={() => this.setState({ showValidateReject: true })}
                >
                  SIGNALER UN PROBLEME
                </Text>
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#ecf0f1"
  },
  alldetailsCon: {
    paddingBottom: 15
  },
  ivContenair: {
    backgroundColor: "#dfe4ea",
    borderTopColor: "#a4b0be",
    borderTopWidth: 1
  },
  ivInfoSup: {
    fontSize: 15,
    color: "black",
    fontWeight: "bold",
    alignSelf: "center",
    padding: 10
  },
  ivInfoIntContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
    height: 30
  },
  ivContTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopColor: "#a4b0be",
    borderTopWidth: 1,
    paddingLeft: 15,
    paddingRight: 15,
    height: 36
  },
  ivText: { color: "black" },
  ivTotal: { color: "black", fontWeight: "bold" },
  mpConatiner: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
    borderTopColor: "#a4b0be",
    borderTopWidth: 1
  },
  mpIcon: { color: "#a4b0be", fontSize: 30 },
  mpText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#a4b0be",
    paddingLeft: 10
  },
  bvRjectContainer: {
    height: 40,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 15
  },
  tvContenair: {
    height: 65,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15
  },
  tvTotalPrice: {
    fontSize: 25,
    fontWeight: "200",
    color: "black"
  },
  tvDirectionRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  tvMad: { fontSize: 20, color: "#a4b0be" },
  tvPrice: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black"
  },
  tvIcon: { color: "#a4b0be", fontSize: 25 },
  iaContainair: {
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 15,
    paddingRight: 15,
    borderTopColor: "#a4b0be",
    borderTopWidth: 1
  },
  iaView2: {
    flexDirection: "row",
    alignItems: "center"
  },
  iaViewIcon1: { height: 60, width: 60, borderRadius: 30 },
  iaIconUser: { color: "black", fontSize: 60 },
  iaUserName: { color: "black", fontWeight: "bold" },
  etoileView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  contNotecuisto:{
    backgroundColor: "#2ed573",
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 5,
    paddingTop: 10
  },envoyeNote:{
    alignSelf: "center",
    fontSize: 19,
    marginBottom: 10,
    color: "#fff",
    textAlign: "center",
    textAlignVertical: "center",
    marginTop: 10
  },contNotecuistohead:{
    alignSelf: "center",
    fontSize: 19,
    marginBottom: 10,
    color: "#000"
  }
});

export default OneCommandeSelected;
