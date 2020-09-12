import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, Button, Platform } from 'react-native';
import Constants from 'expo-constants';
import axios from 'axios';

var BaseCurrency, Date;
var item = {
  id: 1,
  currency: "",
  rate: 0,
}

const DATA = [];

async function fetchData() {
  await fetch('http://data.fixer.io/api/latest?access_key=c000fd34a28740aa14910b4d4346e113')
    .then((response) => response.json())
    .then((json) => {
      if (json.success) {
        BaseCurrency = json.base;
        Date = json.date;
        console.log(json);
        Object.keys(json.rates).map((key) => 
        {
          item.id += 1;
          item.currency = "EUR - "+key;
          item.rate = json.rates[key];
          DATA.push(item);
          item = {
            id: item.id,
            currency: "",
            rate: 0,
          }
        });
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

// Uri("https://query2.finance.yahoo.com/v7/finance/quote?formatted=true&crumb=B3icRHiS33R&lang=en-IN&region=IN&symbols=" + request.Stock + ".NS&corsDomain=in.finance.yahoo.com")

// function fetchData() {

//   axios.get("https://query2.finance.yahoo.com/v7/finance/quote?formatted=true&crumb=B3icRHiS33R&lang=en-IN&region=IN&symbols=SBIN.NS&corsDomain=in.finance.yahoo.com")
//     .then(response => {
//       console.log('getting data from axios', response.data);
//       return response;
//     })
//     .catch(error => {
//       console.log(error);
//     });
// }

function Item({ currency, rate }) {
  // useEffect(() => {
  //   goForAxios();
  //   console.log(data);
  // }, [])
  console.log(currency, rate);
  return (
    <View style={styles.item}>
      <Text style={styles.currency_pair}>{currency}</Text>
      <Text style={styles.rate}>{rate}</Text>
    </View>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  fetchData();
  console.log(DATA);
  if(DATA.length>169) {
    setLoaded(true);
  }
  return (
    <SafeAreaView style={styles.container}>
      {{loaded} && <FlatList
        data={DATA}
        numColumns={Platform.OS === 'web' ? 5 : 2}
        renderItem={({ item }) => <Item rate={item.rate} currency={item.currency} />}
        keyExtractor={(item) => item.id}
      />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    alignItems: "center",
    justifyContent: "space-around",
  },
  item: {
    backgroundColor: '#f9f9f9',
    width: 150,
    height: 150,
    marginVertical: 8,
    marginHorizontal: 8,
    shadowColor: '#e0e0e0',
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 5,
      width: 5
    },
    elevation: 10,
  },
  currency_pair: {
    fontSize: 25,
  },
  rate: {
    fontSize: 20,
  },
});
