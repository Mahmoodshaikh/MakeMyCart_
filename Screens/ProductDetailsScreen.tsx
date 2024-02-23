import React, { useState, useRef } from 'react';
import { Text, View, Image, StyleSheet, Dimensions, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import Stars from '../Components/Stars';

type RootStackParamList = {
  ProductDetailsScreen: {
    productId: number;
    ProductTitle: string;
    productDescription: string;
    ProductImages: string[];
    ProductRating: number;
    ProductDiscountPercentage: number;
    ProductPrice: number;
  };
};

type ProductDetailsScreenProps = {
  route: RouteProp<RootStackParamList, 'ProductDetailsScreen'>;
};

const ProductDetailsScreen: React.FC<ProductDetailsScreenProps> = ({ route }) => {
  const { productId, ProductTitle, productDescription, ProductImages, ProductRating, ProductDiscountPercentage, ProductPrice } = route.params;

  const getProductById = (productId: number) => {
    return {
      id: productId,
      name: ProductTitle,
      description: productDescription,
      images: ProductImages,
      rating: ProductRating,
      discount: ProductDiscountPercentage,
      price: ProductPrice,
    };
  };

  // console.log("result", getProductById(productId));

  const product = getProductById(productId);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const renderImage = ({ item }: { item: string }) => (
    <View style={styles.imageContainer}>
      <Image
        source={{ uri: item }}
        style={styles.image}
        onLoadStart={() => setLoading(true)}
        onLoad={() => setLoading(false)}
      />
      <View style={styles.pagination}>
        {product.images.map((_, index) => renderDot(index))}
      </View>
      {loading && <ActivityIndicator style={styles.loader} />}
    </View>
  );

  const renderDot = (index: number) => {
    return (
      <TouchableOpacity
        key={index}
        style={[styles.dot, { backgroundColor: index === currentIndex ? '#FC6736' : '#ccc' }]}
        onPress={() => scrollToIndex(index)}
      />
    );
  };

  const scrollToIndex = (index: number) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
    setCurrentIndex(index);
  };

  return (
    <View style={styles.parentContainer}>
      <FlatList
        ref={flatListRef}
        data={product.images}
        renderItem={renderImage}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(event) => {
          setCurrentIndex(Math.round(event.nativeEvent.contentOffset.x / Dimensions.get('window').width));
        }}
      />

      <View style={styles.childContainer}>
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productDescription}>{product.description}</Text>
          <Text style={styles.productPrice}>
            Price: ${product.price}{' '}
            <Text style={styles.discountText}>
              ${Math.floor(product.price + (product.price * product.discount) / 100)}
            </Text>{' '}
            <Text style={styles.discountPercentage}>
              {product.discount}% off
            </Text>
          </Text>
          <Stars rating={product.rating} />
        </View>
      </View>


    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
  },
  childContainer: {
    flex: 16,
  },
  imageContainer: {
    marginTop: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'yellow',
    height: '60%'
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * 0.65,
    resizeMode: 'cover',
    borderRadius: 4,
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    zIndex: 10,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    borderColor: 'blue',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  productInfo: {
    flex: 1,
    padding: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  productDescription: {
    fontSize: 18,
    marginBottom: 10,
    color: '#000000',
  },
  productPrice: {
    fontSize: 20,
    marginBottom: 10,
    color: '#000',
    fontWeight: 'bold',
  },
  discountText: {
    textDecorationLine: 'line-through',
    color: '#C3ACD0',
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  discountPercentage: {
    color: '#416D19',
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
});

export default ProductDetailsScreen;
