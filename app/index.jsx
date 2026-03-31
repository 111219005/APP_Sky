import { useState } from "react";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";

export default function Page() {
    const [selectedImage, setSelectedImage] = useState(null);

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert("需要權限", "請允許存取相簿，才能上傳照片。");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [5, 9],
            quality: 1,
        });

        if (!result.canceled && result.assets?.[0]?.uri) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            {selectedImage && (
                <Image
                    source={{ uri: selectedImage }}
                    style={styles.userBackground}
                    resizeMode="cover"
                />
            )}

            <Image
                source={require('../img/ground.png')}
                style={styles.groundBackground}
                resizeMode="cover"
            />

            <View style={styles.main}>
                <LinearGradient
                    colors={["rgba(255, 255, 255, 0.3)", "rgba(255, 255, 255, 0)"]}
                    locations={[0.7, 1]}
                    style={styles.topArea}
                >
                    <View style={styles.header}>
                        <Text style={styles.title}>Sky。</Text>
                        <Pressable
                            onPress={pickImage}
                            style={({ pressed }) => [pressed && { opacity: 0.8 }]}
                        >
                            <Image source={require('../img/add-image.png')} style={styles.addIcon} />
                        </Pressable>
                    </View>
                </LinearGradient>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff7fb",
    },
    userBackground: {
        ...StyleSheet.absoluteFillObject,
        width: "100%",
        height: "100%",
    },
    groundBackground: {
        ...StyleSheet.absoluteFillObject,
        width: "100%",
        height: "100%",
        zIndex: 1,
    },
    main: {
        flex: 1,
        alignItems: "center",
        width: "100%",
        zIndex: 2,
    },
    topArea: {
        width: "100%",
        paddingTop: 32,
        paddingHorizontal: 16,
        paddingBottom: 46,
    },
    header: {
        width: "100%",
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 4,
    },
    title: {
        fontFamily: "serif",
        fontStyle: "italic",
        fontSize: 38,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 0,
    },
    addIcon: {
        width: 32,
        height: 32,
        opacity: 0.9,
    },
});
