


import { StyleSheet, View, SafeAreaView, FlatList, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import axios from 'axios';
import { NewsDataType } from '@/types';
import Header from '@/components/header/Header';
import Searchbar from '@/components/searchbar/Searchbar';
import BreakingNews from '@/components/breakingnews/BreakingNews';
import Category from '@/components/Category';
import NewList from '@/components/NewList';
import Loading from '@/components/Loading';
import { Colors } from '@/constants/Colors';

type Props = {
  setSearchQuery: Function
};

const Page = (props: Props) => {
  const { top: safeTop } = useSafeAreaInsets();
  const [breakingNews, setBreakingNews] = useState<NewsDataType[]>([]);
  const [news, setNews] = useState<NewsDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getBreakingNews();
    getNews();
  }, []);

  const getBreakingNews = async () => {
    try {
      const url = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=en&image=1&removeduplicate=1&size=5`;
      const response = await axios.get(url);
      
      if (response?.data?.results) {
        setBreakingNews(response.data.results);
        setIsLoading(false);
      }
    } catch (error: any) {
      console.log('Error fetching breaking news', error);
    }
  };

  const getNews = async (category: string = '') => {
    try {
      let categoryString = '';
      if (category.length !== 0) {
        categoryString = `&category=${category}`;
      }
      const url = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=en&image=1&removeduplicate=1&size=10${categoryString}`;
      const response = await axios.get(url);
      
      if (response?.data?.results) {
        setNews(response.data.results);
        setIsLoading(false);
      }
    } catch (error: any) {
      console.log('Error fetching news', error);
    }
  };

  const onCategoryChanged = (category: string) => {
    setNews([]);
    getNews(category);
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: safeTop }]}>
      <Header  />
      <Searchbar  withHorizontalPadding={true} />
      
      {isLoading ? (
        <Loading size="large" />
      ) : (
        <View style={styles.content}>
          {/* Breaking News Section */}
          {breakingNews.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Breaking News</Text>
              <BreakingNews newsList={breakingNews} />
            </>
          )}

          {/* Category Filter */}
          <Category onCategoryChanged={onCategoryChanged} />

          {/* General News Section */}
          <Text style={styles.sectionTitle}>Latest News</Text>
          {news.length > 0 ? (
            <NewList newsList={news} />
          ) : (
           <Loading size={'large'}/>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 10,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
    color: Colors.black,
  },
  noDataText: {
    fontSize: 16,
    color: Colors.darkGrey,
    textAlign: 'center',
    marginVertical: 20,
  },
});
