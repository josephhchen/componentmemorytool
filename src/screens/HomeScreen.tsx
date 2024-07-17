import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Navbar from '../components/Navbar';
import axios from 'axios';
import useMemoryUsage from '../hooks/useMemoryUsage';
import { useMemoryUsage as useMemoryUsageContext } from '../context/MemoryUsageContext';
import { UNSPLASH_API_KEY } from '@env';

const gradientColors = [
  ['#ff9a9e', '#fad0c4'],
  ['#a18cd1', '#fbc2eb'],
  ['#ffecd2', '#fcb69f'],
  ['#ff9a9e', '#fecfef'],
  ['#ffdde1', '#ee9ca7'],
  ['#cfd9df', '#e2ebf0'],
  ['#a1c4fd', '#c2e9fb'],
  ['#d4fc79', '#96e6a1'],
];

const fakeTimestamps = ['5h', '10d', '2w', '1m', '3d', '6h', '15d', '1w'];

const HomeScreen = () => {
  const [posts, setPosts] = useState(fakePosts);
  const { usageInfo, error } = useMemoryUsage();
  const { setHomeMemoryUsage } = useMemoryUsageContext();


  useEffect(() => {
    if (usageInfo) {
      setHomeMemoryUsage(usageInfo);
    }
  }, [usageInfo]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('https://api.unsplash.com/photos/random', {
          params: { count: fakePosts.length },
          headers: {
            Authorization: `Client-ID ${UNSPLASH_API_KEY}`,
          },
        });
        const updatedPosts = posts.map((post, index) => ({
          ...post,
          image: response.data[index].urls.regular,
        }));
        setPosts(updatedPosts);
      } catch (error) {
        console.error(error);
      }
    };
    fetchImages();
  }, []);

  const renderItem = ({ item, index }) => (
    <View key={index} style={styles.postContainer}>
      <View style={styles.postHeader}>
        <LinearGradient colors={gradientColors[index % gradientColors.length]} style={styles.smallGradient}>
          <Image source={{ uri: item.userImage }} style={styles.postUserImage} />
        </LinearGradient>
        <Text style={styles.postUsername}>{item.username}</Text>
        <Text style={styles.timestamp}>{fakeTimestamps[index % fakeTimestamps.length]}</Text>
      </View>
      <Text style={styles.postLikes}>
        <Text style={{ fontWeight: 'bold' }}>{item.likes}</Text> connections like this post
      </Text>
      <Image source={{ uri: item.image }} style={styles.postImage} />
      <View style={styles.postFooter}>
        <Text style={styles.postCaption}>{item.caption}</Text>
      </View>
    </View>
  );

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>connections</Text>
          <View style={styles.icons}>
            <Icon name="chatbubbles-outline" size={26} color="black" style={styles.icon} />
          </View>
        </View>

        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 50 }}
        />
        {usageInfo && (
          <View style={styles.memoryUsage}>
            <Text>Memory Usage: {(usageInfo.resident_size / (1024 * 1024))} MB</Text>
            <Text>Virtual Size: {(usageInfo.virtual_size / (1024 * 1024))} MB</Text>
            <Text>CPU Usage: {usageInfo.cpu_usage}%</Text>
          </View>
        )}
        {error && <Text style={styles.errorText}>Error: {error.message}</Text>}
      </View>
      <Navbar />
    </>
  );
};

const fakePosts = [
  { username: 'Joe', userImage: 'https://thispersondoesnotexist.com/image', image: '', likes: 3, caption: 'Enjoying the sunny weather!' },
  { username: 'Roman', userImage: 'https://thispersondoesnotexist.com/image', image: '', likes: 2, caption: 'Fantastic day today.' },
  { username: 'Zach B', userImage: 'https://thispersondoesnotexist.com/image', image: '', likes: 5, caption: 'What a view' },
  { username: 'Zach L', userImage: 'https://thispersondoesnotexist.com/image', image: '', likes: 1, caption: 'Love this place!' },
  { username: 'Amy', userImage: 'https://thispersondoesnotexist.com/image', image: '', likes: 7, caption: 'Amazing sunset.' },
  { username: 'Tina', userImage: 'https://thispersondoesnotexist.com/image', image: '', likes: 20, caption: 'Best vacation ever!' },
  { username: 'Jeramiah', userImage: 'https://thispersondoesnotexist.com/image', image: '', likes: 10, caption: 'Hiking adventures.' },
  { username: 'Sarah', userImage: 'https://thispersondoesnotexist.com/image', image: '', likes: 9, caption: 'Delicious food!' },
];

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  header: {
    marginTop: '12%',
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '5%',
    padding: 10,
  },
  headerText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  icons: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 15,
  },
  storyContainer: {
    height: 120,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  story: {
    alignItems: 'center',
    marginRight: 15,
  },
  gradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  storyImage: {
    width: 54,
    height: 54,
    borderRadius: 27,
  },
  storyText: {
    fontSize: 12,
    color: '#333',
  },
  postContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  smallGradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  postUserImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  postUsername: {
    fontWeight: 'bold',
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    color: 'gray',
    marginLeft: 'auto',
  },
  postImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
  },
  postLikes: {
    fontWeight: 'thin',
    marginBottom: 5,
  },
  postCaption: {
    color: '#333',
  },
  memoryUsage: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    margin: 10,
  },
  errorText: {
    color: 'red',
    padding: 10,
  },
});
