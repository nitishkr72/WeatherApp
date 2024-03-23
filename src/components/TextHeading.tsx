import {Text} from 'react-native';

export default function TextHeading({text}: {text: string}): React.JSX.Element {
  return (
    <Text style={{color: '#454545', fontWeight: '700', fontSize: 24}}>
      {text}
    </Text>
  );
}
