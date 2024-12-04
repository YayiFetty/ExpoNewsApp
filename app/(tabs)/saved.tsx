import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Link, Stack, useFocusEffect } from 'expo-router';
import Loading from '@/components/Loading';
import { NewsItem } from '@/components/NewList';

type Props = {}

const Page = (props: Props) => {
  const [bookmarkNews, setBookmarkNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchBookmark = useCallback(async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('bookmark');
      const res = token ? JSON.parse(token) : [];

      // Filter out any null or invalid entries
      const validBookmarks = res.filter((id: string | null) => id !== null && id !== '');
   
      if (validBookmarks.length > 0) {
        console.log("Bookmark res", validBookmarks);
        let query_string = validBookmarks.join(',');
        console.log("Query String", query_string);

        const response = await axios.get(`https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&id=${query_string}`);
        const news = response.data.results;
        console.log("newsdata:", news)
        setBookmarkNews(news);
      } else {
        console.log("No valid bookmarks to fetch");
        setBookmarkNews([]);
      }
    } catch (error) {
      console.log('Error fetching bookmarks', error);
      setBookmarkNews([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Use useFocusEffect to refetch bookmarks when the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchBookmark();
    }, [fetchBookmark])
  );

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Bookmarks',
        }}
      />
      <View style={styles.container}>
        {isLoading ? (
          <Loading size="large" style={styles.loading} />
        ) : bookmarkNews.length > 0 ? (
          <FlatList
            data={bookmarkNews}
            keyExtractor={(item) => item.article_id }
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Link href={`/news/${item.article_id }`} asChild>
                <TouchableOpacity>
                  <NewsItem item={item} />
                </TouchableOpacity>
              </Link>
            )}
          />
        ) : (
          <Text style={styles.noBookmarksText}>No bookmarks saved</Text>
        )}
      </View>
    </>
  );
}

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noBookmarksText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});