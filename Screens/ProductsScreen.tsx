import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  FlatList,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { AllProductsDetails } from '../Store/ProductSlice';
import { useNavigation } from '@react-navigation/native';
import { addToCart, selectCartItems } from '../Store/CartSlice';

import Stars from '../Components/Stars'
import { userLogin } from '../Store/AuthSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Product {
  discountPercentage: number;
  price: number;
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  rating: number;
  images: string;
}

interface RootState {
  selectedCategory: any;
  product: {
    isLoading: boolean;
    productsData: Product[];
    error: string;
  };
}

const ProductsScreen: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigation = useNavigation<any>();
  const { isLoading, productsData, error } = useSelector(
    (state: RootState) => state.product,
  );
  const categoriesData = useSelector((state: RootState) => state.selectedCategory);
  const { categoryData } = categoriesData;

  const cartItems = useSelector(selectCartItems);
  const [addedToCartItems, setAddedToCartItems] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<string>('');
  const [searchClicked, setSearchClicked] = useState<boolean>(false);
  const [cartItemsAsyncStore, setCartItemsAsyncStore] = useState([]);


  const inputRef = useRef<TextInput>(null);
  useEffect(() => {
    dispatch(AllProductsDetails());
  }, [dispatch]);

  const handleProductPress = (
    productId: number,
    ProductTitle: string,
    productDescription: string,
    ProductImages: string,
    ProductRating: string,
    ProductDiscountPercentage: number,
    ProductPrice: number,
  ) => {
    console.log("ProductPrice ", ProductPrice)
    navigation.navigate('ProductDetailsScreen', {
      productId,
      ProductTitle,
      productDescription,
      ProductImages,
      ProductRating,
      ProductDiscountPercentage,
      ProductPrice,
    });
  };

  const addToCartHandler = async (
    productId: number,
    ProductTitle: string,
    productDescription: string,
    ProductImages: string,
    ProductPrice: number,
    ProductDiscountPercentage: number,
    ProductRating: number,
  ) => {
    dispatch(
      addToCart({
        productId,
        ProductTitle,
        productDescription,
        ProductImages,
        ProductPrice,
        ProductDiscountPercentage,
        ProductRating,
      }),
    );
    setAddedToCartItems([...addedToCartItems, productId]);

    try {
      const updatedCartItems = [...cartItems, {
        productId,
        ProductTitle,
        productDescription,
        ProductImages,
        ProductPrice,
        ProductDiscountPercentage,
        ProductRating,
      }];
      await AsyncStorage.setItem('cartItemsAsyncStore', JSON.stringify(updatedCartItems));
    } catch (error) {
      console.error('Error updating cart items in AsyncStorage:', error);
    }
  };
  const loadProfilePicFromStorage = async () => {
    try {
      const items = await AsyncStorage.getItem('cartItemsAsyncStore');
      if (items !== null) {
        setCartItemsAsyncStore(JSON.parse(items));
      }
    } catch (error) {
      console.error('Error fetching cart items from AsyncStorage:', error);
    }
  };

  useEffect(() => {
    loadProfilePicFromStorage();
    console.log("cartItemsAsyncStore---1--", cartItemsAsyncStore)
  }, [cartItems]);

  const handleSearch = () => {
    setSearchClicked(true)
    inputRef.current?.blur();
    fetch(`https://dummyjson.com/products/search?q=${searchQuery}`)
      .then(res => res.json())
      .then(data => setSearchResults(data))
      .catch(error => console.error('Error searching products:', error));
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }
  return (
    <>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            ref={inputRef}
            style={styles.searchInput}
            placeholder="Search Products"
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleSearch}
          >
            <Text style={styles.searchButtonText} onPress={handleSearch}>Search</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.scrollView}>
          <FlatList
            data={searchClicked ? searchResults?.products : categoryData?.products}
            keyExtractor={item => item.id.toString()}
            ListEmptyComponent={() => (
              <View style={styles.emptyListContainer}>
                <Text style={styles.emptyListText}>
                  {searchClicked
                    ? 'No products found for your search.'
                    : 'No products available.'}
                </Text>
              </View>
            )}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  handleProductPress(
                    item.id,
                    item.title,
                    item.description,
                    item.images,
                    item.rating,
                    item.discountPercentage,
                    item.price,
                  )
                }>
                <View style={styles.productItem}>
                  <Image
                    source={{ uri: item.thumbnail }}
                    style={styles.productImage}
                  />
                  <View style={styles.productContainer}>
                    <Text style={styles.productName}>{item.title}</Text>
                  </View>
                  <Text style={styles.productDescription}>{item.description}</Text>
                  <Text style={styles.productName}>
                    Price: ${item.price}{' '}
                    <Text style={styles.strikeThroughtextStyle}>
                      $
                      {Math.floor(
                        item.price + (item.price * item.discountPercentage) / 100,
                      )}
                    </Text>{' '}
                    <Text style={styles.DiscountPercentage}>
                      {item.discountPercentage}% off
                    </Text>
                  </Text>
                  <Stars rating={item.rating} />
                  <TouchableOpacity
                    onPress={() =>
                      addToCartHandler(
                        item.id,
                        item.title,
                        item.description,
                        item.images,
                        item.price,
                        item.discountPercentage,
                        item.rating,
                      )
                    }
                    style={styles.addToCartButton}
                    disabled={addedToCartItems.includes(item.id)}>
                    {addedToCartItems.includes(item.id) ? (
                      <Text style={styles.addedToCartButtonText}>
                        Added to Cart
                      </Text>
                    ) : (
                      <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
      <Text style={styles.bottomSpace}></Text>
    </>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1E9FF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
    marginTop: 80,
    borderRadius: 5,
    padding: 20
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#FC6736',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    flex: 1,
  },
  searchButton: {
    backgroundColor: '#FC6736',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  searchButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  scrollView: {

  },
  productItem: {
    marginBottom: 20,
    marginLeft: 10,
    backgroundColor: '#ECF8F9',
    padding: 20,
    width: '96%',
    borderWidth: 1,
    borderColor: '#FC6736',
    borderRadius: 5,

  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#000000',
  },
  productContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
  },
  strikeThroughtextStyle: {
    textDecorationLine: 'line-through',
    color: '#C3ACD0',
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  DiscountPercentage: {
    color: '#416D19',
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1,
  },

  productRating: {
    fontSize: 18,
    marginLeft: 5,
    color: '#000000',
  },
  productDescription: {
    fontSize: 16,
    color: '#000000',
  },
  addToCartButton: {
    backgroundColor: '#FC6736',
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  addToCartButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  addedToCartButtonText: {
    fontSize: 18,
    color: '#888888',
    fontWeight: 'bold',
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListText: {
    fontSize: 18,
    color: '#888',
  },
  bottomSpace: {
    marginBottom: 60,
  }
});

export default ProductsScreen;
