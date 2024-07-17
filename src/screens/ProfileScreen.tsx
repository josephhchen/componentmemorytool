import React, { useEffect, useMemo, useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import Navbar from '../components/Navbar'
import axios from 'axios'
import MasonryList from '@react-native-seoul/masonry-list'
import Icon from 'react-native-vector-icons/Ionicons';
import { useMemoryUsage } from '../context/MemoryUsageContext';
import useMemoryUsageHook from '../hooks/useMemoryUsage';
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
]

const fakePosts = [
  { id: '1', image: '', caption: 'Enjoying the sunny weather!' },
  { id: '2', image: '', caption: 'Fantastic day today.' },
  { id: '3', image: '', caption: 'What a view' },
  { id: '4', image: '', caption: 'Love this place!' },
  { id: '5', image: '', caption: 'Amazing sunset.' },
  { id: '6', image: '', caption: 'Best vacation ever!' },
  { id: '7', image: '', caption: 'Hiking adventures.' },
  { id: '8', image: '', caption: 'Delicious food!' },
]

const ProfileScreen = ({ navigation }) => {
  const [profile, setProfile] = useState({
    username: 'Joe Chen',
    userImage: 'https://thispersondoesnotexist.com/image',
    bio: 'Mobile Developer Intern @ StoneX',
    posts: fakePosts,
  })
  
  const { usageInfo, error } = useMemoryUsageHook();
  const { setProfileMemoryUsage } = useMemoryUsage();
  console.log({usageInfo})


  useEffect(() => {
    if (usageInfo) {
      setProfileMemoryUsage(usageInfo);
    }
  }, [usageInfo]);

  useEffect(() => {

    const fetchImages = async () => {
      try {
        const response = await axios.get('https://api.unsplash.com/photos/random', {
          params: { count: profile.posts.length },
          headers: {
            Authorization: `Client-ID ${UNSPLASH_API_KEY}`,
          },
        })
        const updatedPosts = profile.posts.map((post, index) => ({
          ...post,
          image: response.data[index].urls.regular,
        }))
        setProfile({ ...profile, posts: updatedPosts })
      } catch (error) {
        console.error(error)
      }
    }
    fetchImages()
  }, [])

  const renderPost = ({ item }) => {
    const randomHeight = Math.floor(Math.random() * 150) + 150 
    return (
      <View key={item.id} style={[styles.postContainer, { height: randomHeight }]}>
        <Image source={{ uri: item.image }} style={[styles.postImage, { height: randomHeight - 40 }]} />
        <Text style={styles.postCaption}>{item.caption}</Text>
      </View>
    )
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{profile.username}</Text>
          <TouchableOpacity onPress={() => (navigation.navigate("SettingsScreen"))} style={styles.icons}>
            <Icon name="hammer" size={26} color="black" style={styles.icon} />
          </TouchableOpacity>
        </View>
        <View style={styles.profileInfo}>
          <LinearGradient colors={gradientColors[0]} style={styles.profileGradient}>
            <Image source={{ uri: profile.userImage }} style={styles.profileImage} />
          </LinearGradient>
          <Text style={styles.profileBio}>{profile.bio}</Text>
          <Text style={styles.connectionsText}>3 connections</Text>
        </View>
        <View style={styles.tabs}>
          <TouchableOpacity style={styles.tab}>
            <Icon name="grid-outline" size={26} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Icon name="heart-outline" size={26} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Icon name="pulse-outline" size={26} color="gray" />
          </TouchableOpacity>
        </View>
        <MasonryList
          data={profile.posts}
          renderItem={renderPost}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 50 }}
        />
      </View>
      {usageInfo && (
          <View style={styles.memoryUsage}>
            <Text>Memory Usage: {(usageInfo.resident_size / (1024 * 1024))} MB</Text>
            <Text>Virtual Size: {(usageInfo.virtual_size / (1024 * 1024))} MB</Text>
            <Text>CPU Usage: {usageInfo.cpu_usage}%</Text>
          </View>
        )}
        {error && <Text style={styles.errorText}>Error: {error.message}</Text>}
      <Navbar />
    </>
  )
}

export default ProfileScreen

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
  profileInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 94,
    height: 94,
    borderRadius: 47,
  },
  profileBio: {
    fontSize: 20,
    color: 'gray',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  connectionsText: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginVertical: '5%',
    fontWeight: "bold"
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  tab: {
    alignItems: 'center',
  },
  tabText: {
    fontSize: 12,
    color: 'black',
    marginTop: 4,
  },
  postContainer: {
    marginVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  postImage: {
    width: '100%',
    borderRadius: 10,
  },
  postCaption: {
    color: '#333',
    textAlign: 'center',
    padding: 5,
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
})
