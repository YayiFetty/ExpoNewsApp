import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, router, Stack, useLocalSearchParams } from "expo-router";
import { NewsDataType } from "@/types";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import Loading from "@/components/Loading";
import { NewsItem } from "@/components/NewList";

type Props = {};

const Search = (props: Props) => {
  const { query, category, country } = useLocalSearchParams<{
    query: string;
    category: string;
    country: string;
  }>();
  const [news, setNews] = useState<NewsDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getNews();
  }, []);
  const getNews = async (category: string = "") => {
    try {
      let categoryString = "";
      let queryString = "";
      let countryString = "";

      if (category) {
        categoryString = `&category=${category}`;
      }
      if (query) {
        queryString = `&q=${query}`;
      }
      if (country) {
        countryString = `&country=${country}`;
      }
      const url = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=en&image=1&removeduplicate=1&size=10${categoryString}${countryString}${queryString}`;
      const response = await axios.get(url);

      if (response?.data?.results) {
        setNews(response.data.results);
        setIsLoading(false);
      }
    } catch (error: any) {
      console.log("Error fetching news", error);
    }
  };
  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={22} />
              </TouchableOpacity>
            );
          },
          
          title: "Search",
        }}
      />
      <View>
        {isLoading ? (
          <Loading size={"large"} style={{alignItems:"center", justifyContent:"center", flex:1}} />
        ) : (
          <FlatList
            data={news}
            keyExtractor={(_, idx) => `list_item${idx}`}
            showsVerticalScrollIndicator={false}
            renderItem={({ index, item }) => {
              return (
                <Link key={index} href={`/news/${item.article_id}`} asChild>
                  <TouchableOpacity>
                    <NewsItem item={item} />
                  </TouchableOpacity>
                </Link>
              );
            }}
          />
        )}
      </View>
    </>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 20,
  },
});
