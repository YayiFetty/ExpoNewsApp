import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { NewsDataType } from '@/types';
import axios from 'axios';
import Loading from '@/components/Loading';
import { Colors } from '@/constants/Colors';
import Moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NewsDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [news, setNews] = useState<NewsDataType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [bookmark, setBookmark] = useState(false);

  useEffect(() => {
    getNews();
  }, [id]);

  useEffect(() => {
    if (!isLoading && news) {
      renderBookmark(news.article_id);
    }
  }, [isLoading, news]);

  const getNews = async () => {
    try {
      const url = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&id=${id}`;
      const response = await axios.get<{ results: NewsDataType[] }>(url);

      if (response && response.data && response.data.results.length > 0) {
        setNews(response.data.results[0]);
      } else {
        console.log('No news data found');
      }
    } catch (error) {
      console.log('Error Message', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveBookmark = useCallback(async (newsId: string) => {
    try {
      const bookmarkData = await AsyncStorage.getItem("bookmark");
      const bookmarks: string[] = bookmarkData ? JSON.parse(bookmarkData) : [];

      if (!bookmarks.includes(newsId)) {
        bookmarks.push(newsId);
        await AsyncStorage.setItem("bookmark", JSON.stringify(bookmarks));
        setBookmark(true);
        alert("News Saved");
      } else {
        alert("This is already bookmarked.");
      }
    } catch (error) {
      console.log('Error saving bookmark: ', error);
    }
  }, []);

  const removeBookmark = useCallback(async (newsId: string) => {
    try {
      const bookmarkData = await AsyncStorage.getItem("bookmark");
      let bookmarks: string[] = bookmarkData ? JSON.parse(bookmarkData) : [];

      bookmarks = bookmarks.filter((id: string) => id !== newsId);
      await AsyncStorage.setItem("bookmark", JSON.stringify(bookmarks));
      setBookmark(false);
      alert("News UnSaved");
    } catch (error) {
      console.log('Error removing bookmark: ', error);
    }
  }, []);

  const renderBookmark = useCallback(async (newsId: string) => {
    try {
      const bookmarkData = await AsyncStorage.getItem("bookmark");
      const bookmarks: string[] = bookmarkData ? JSON.parse(bookmarkData) : [];
      setBookmark(bookmarks.includes(newsId));
    } catch (error) {
      console.log('Error rendering bookmark: ', error);
    }
  }, []);

  const toggleBookmark = useCallback(() => {
    if (news) {
      if (bookmark) {
        removeBookmark(news.article_id);
      } else {
        saveBookmark(news.article_id);
      }
    }
  }, [bookmark, news, removeBookmark, saveBookmark]);

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={toggleBookmark}>
              <Ionicons 
                name={bookmark ? "heart" : "heart-outline"} 
                size={24} 
                color={bookmark ? "red" : Colors.black}
              />
            </TouchableOpacity>
          ),
          title: '',
        }}
      />
      {isLoading ? (
        <Loading size={'large'} />
      ) : news ? (
        <ScrollView contentContainerStyle={styles.contentContainer} style={styles.container}>
          <Text style={styles.title}>{news.title}</Text>
          <View style={styles.newsInfoWrapper}>
            <Text style={styles.newsInfo}>{Moment(news.pubDate).format('MMM DD, hh:mm a')}</Text>
            <Text style={styles.newsInfo}>{news.source_name}</Text>
          </View>
          {news.image_url && (
            <Image source={{ uri: news.image_url }} style={styles.newsImg} />
          )}
          {news.content ? (
            <Text style={styles.newsContent}>{news.content}</Text>
          ) : (
            <Text style={styles.description}>{news.description}</Text>
          )}
        </ScrollView>
      ) : (
        <Text style={styles.errorText}>No news data available</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contentContainer: {
    marginHorizontal: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginVertical: 10,
    letterSpacing: 0.6,
  },
  newsImg: {
    width: '100%',
    height: 300,
    marginBottom: 20,
    borderRadius: 10,
  },
  newsInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  newsInfo: {
    fontSize: 12,
    color: Colors.darkGrey,
  },
  newsContent: {
    fontSize: 14,
    color: '#555',
    letterSpacing: 0.8,
    lineHeight: 22,
  },
  description: {
    fontSize: 14,
    color: '#555',
    letterSpacing: 0.8,
    lineHeight: 22,
  },
  errorText: {
    fontSize: 16,
    color: Colors.darkGrey,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default NewsDetails;