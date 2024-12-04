import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { NewsDataType } from '@/types';
import { Colors } from '@/constants/Colors';
import Loading from './Loading';
import { Link } from 'expo-router';

type Props = {
  newsList: NewsDataType[] | undefined;
};

const NewList: React.FC<Props> = ({ newsList = [] }) => {
  const renderItem = ({ item }: { item: NewsDataType }) => (
    <Link href={`/news/${item.article_id}`} asChild>
      <TouchableOpacity>
        <NewsItem item ={item}/>
      </TouchableOpacity>
    </Link>
  );

  if (newsList.length == 0) {
    return <Loading size="large" />;
  }
  else{
    renderItem;
  }

  return (
    <FlatList
      data={newsList}
      renderItem={renderItem}
      keyExtractor={(item) => item.article_id}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  itemImg: {
    width: 90,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  placeholderImg: {
    backgroundColor: Colors.lightGrey,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemCategory: {
    fontSize: 12,
    color: Colors.darkGrey,
    textTransform: 'capitalize',
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.black,
    marginVertical: 5,
  },
  itemSourceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemSourceImg: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 5,
  },
  placeholderSourceImg: {
    backgroundColor: Colors.lightGrey,
  },
  itemSourceName: {
    fontSize: 10,
    color: Colors.darkGrey,
  },
});

export default NewList;

export const NewsItem =({item} :{item:NewsDataType}) => {
    return(
        <View style={styles.itemContainer}>
          {item.image_url ? (
            <Image
              source={{ uri: item.image_url }}
              style={styles.itemImg}
              
            />
          ) : (
            <View style={[styles.itemImg, styles.placeholderImg]} />
          )}
          <View style={styles.textContainer}>
            <Text style={styles.itemCategory}>{item.category}</Text>
            <Text style={styles.itemTitle} numberOfLines={2}>{item.title}</Text>
            <View style={styles.itemSourceInfo}>
              {item.source_icon ? (
                <Image
                  source={{ uri: item.source_icon }}
                  style={styles.itemSourceImg}
                
                />
              ) : (
                <View style={[styles.itemSourceImg, styles.placeholderSourceImg]} />
              )}
              <Text style={styles.itemSourceName}>{item.source_name}</Text>
            </View>
          </View>
        </View>
    )
}