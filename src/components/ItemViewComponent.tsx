import {StyleSheet, Text, View} from 'react-native';

export default function ItemViewComponent({
  name,
  value,
  valueType = '',
}: {
  name: string;
  value: string;
  valueType?: string;
}) {
  return (
    <View style={styles.item_container}>
      <Text style={styles.text_heading}>{name}</Text>
      <View style={styles.item_value_container}>
        <Text style={styles.text_value}>
          {value} {valueType}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item_container: {
    flex: 1,
    display: 'flex',
    backgroundColor: '#D0BCFF4D',
    borderRadius: 20,
    padding: 10,
  },
  text_heading: {color: 'black', fontSize: 18, fontWeight: '600'},
  item_value_container: {
    display: 'flex',
    justifyContent: 'center',
    flex: 1,
    marginLeft: 12,
  },
  text_value: {fontSize: 25, fontWeight: '300'},
});
