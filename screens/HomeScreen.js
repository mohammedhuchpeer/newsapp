import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Dimensions,
    FlatList,
    Linking,
    StyleSheet
} from "react-native";
import { Icon, Title, Container, Content, Card, Body } from "native-base";
import axios from "axios";
import moment from 'moment';
import { bold } from "ansi-colors";

const { width, height } = Dimensions.get('window');
class HomeScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: 'News',
            headerStyle: { backgroundColor: "#B3E5C8" },
            headerLeft: (
                <Icon name="menu" style={{ flex: 1, marginLeft: 10, alignSelf: 'center', }} size={25} onPress={() => navigation.openDrawer()} />
            ),
            headerRight: <View style={{ padding: 10 }}>
                <Text>Picker</Text>
            </View>,
            headerTitleStyle: {
                fontSize: 25
            }
        };
    };

    constructor() {
        super()
        this.state = {
            category: "general",
            country: "in",
            dataSource: [],
            isLoading: true
        }
    }

    componentDidMount() {
        this.loadNews();
    }

    refreshNews = (category) => {
        this.setState({ category, isLoading: true });
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.category !== this.state.category || prevState.country !== this.state.country) {
            this.loadNews();
        }
        else if (this.state.isLoading) {
            this.setState({ isLoading: false });

        }
    }

    loadNews = () => {
        axios.get(`https://newsapi.org/v2/top-headlines?country=${this.state.country}&category=${this.state.category}&apiKey=e874c8c214f64970bb42bed0ec1666f3`)
            .then((response) => this.setState({ dataSource: response.data, isLoading: false }))
            .catch(error => console.log(error))
            .finally(() => console.log('request completed'));
    }

    renderItem = ({ item }) => {
        return (<Container style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width }}>
            <View style={styles.cardBox}>
                <Card style={styles.card}>
                    <View style={{ justifyContent: 'space-around', height: 50, width: width - 20, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#697689', margin: 15 }}>{item.author ? item.author : null}</Text>
                        <Text style={{ fontSize: 12, fontWeight: '600', color: '#126ADE', margin: 15 }}>{moment(item.publishedAt || moment.now()).fromNow()}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', width: width - 20 }}>
                        <Image
                            style={styles.image}
                            source={item.urlToImage ? { uri: item.urlToImage } : null}
                        />
                    </View>
                    <View style={{ flexDirection: "column", height: 332, alignItems: 'center', width: width - 20 }}>
                        <Card style={styles.content}>
                            <Text style={styles.title}>
                                {item.title}
                            </Text>
                            <Text style={styles.description}>
                                {item.description}
                            </Text>
                        </Card>
                        <Card style={styles.url}>
                            <TouchableOpacity style={{ justifyContent: 'center' }} onPress={() => Linking.openURL(item.url)}>
                                <View style={{ marginLeft: 5, marginTop: 5, height: 60, width: width - 40, borderColor: 'grey', justifyContent: 'center', borderWidth: 3, borderRadius: 10 }}>
                                    <Text style={styles.buttonText}>Tap here to read more</Text>
                                </View>
                            </TouchableOpacity>
                        </Card>
                    </View>
                </Card>
            </View>
        </Container >
        );
    }

    renderElement() {
        return this.state.isLoading ? (
            <View style={styles.loader}>
                <ActivityIndicator size="large" />
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Please wait</Text>
            </View>
        ) : (
                <FlatList
                    horizontal
                    pagingEnabled
                    data={this.state.dataSource.articles}
                    renderItem={this.renderItem}
                    keyExtractor={(item) => item.url}
                />
            );
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.tabs}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerstyle={{ justifyContent: 'center', alignContent: 'center' }}>
                        <TouchableOpacity
                            activeOpacity={0.1}
                            style={this.state.category === "general" ? styles.tab1 : styles.tab}
                            onPress={() => this.refreshNews("general")}
                        >
                            <Text style={styles.text}>General</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.1}
                            style={this.state.category === "business" ? styles.tab1 : styles.tab}
                            onPress={() => this.refreshNews("business")}
                        >
                            <Text style={styles.text}>Business</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.1}
                            style={this.state.category === "entertainment" ? styles.tab1 : styles.tab}
                            onPress={() => this.refreshNews("entertainment")}
                        >
                            <Text style={styles.text}>Entertainment</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.1}
                            style={this.state.category === "health" ? styles.tab1 : styles.tab}
                            onPress={() => this.refreshNews("health")}
                        >
                            <Text style={styles.text}>Health</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.1}
                            style={this.state.category === "science" ? styles.tab1 : styles.tab}
                            onPress={() => this.refreshNews("science")}
                        >
                            <Text style={styles.text}>Science</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.1}
                            style={this.state.category === "sports" ? styles.tab1 : styles.tab}
                            onPress={() => this.refreshNews("sports")}
                        >
                            <Text style={styles.text}>Sports</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.1}
                            style={this.state.category === "technology" ? styles.tab1 : styles.tab}
                            onPress={() => this.refreshNews("technology")}
                        >
                            <Text style={styles.text}>Technology</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
                <View style={styles.cardcontainer}>
                    {this.renderElement()}
                </View>
            </View>
        );
    }
}
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tabs: {
        height: 43,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5
    },
    tab:
    {
        flexDirection: 'row',
        height: 35,
        width: 100,
        backgroundColor: 'white',
        borderRadius: 7.5,
        borderWidth: 0,
        margin: 3,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#194D2F",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.75,
        shadowRadius: 2.00,

        elevation: 6,
    },
    tab1:
    {
        flexDirection: 'row',
        height: 35,
        width: 100,
        backgroundColor: '#D9E3F0',
        borderRadius: 7.5,
        borderWidth: 0,
        margin: 2,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#194D2F",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.75,
        shadowRadius: 2.00,

        elevation: 6
    },
    text:
    {
        fontSize: 14,
        fontWeight: '600',
        color: '#4A4A4A'
    },
    cardcontainer:
    {
        flex: 1
    },
    loader:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    card:
    {

        width: width - 20,
        height: height - 120,
        margin: 5,
        borderRadius: 10,
        shadowColor: "#16A5A5",
        shadowOffset: {
            width: 2,
            height: 12,
        },
        shadowOpacity: 0.45,
        shadowRadius: 15,
        elevation: 15
    },
    cardBox: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 2
    },
    image: {
        position: 'absolute',
        height: 250,
        width: width - 30,
        borderRadius: 10,
        shadowColor: "#16A5A5",
        shadowOffset: {
            width: 2,
            height: 12,
        },
        shadowOpacity: 0.9,
        shadowRadius: 15
    },
    content: {
        position: 'absolute',
        height: 250,
        width: width - 30,
        borderRadius: 10
    },
    description: {
        fontSize: 15,
        fontWeight: '700',
        margin: 10,
        color: '#525252'
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        margin: 10,
        color: '#455A64'
    },
    url: {
        height: 70,
        width: width - 30,
        borderRadius: 10,
        marginTop: 258
    },
    buttonText: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    }
});