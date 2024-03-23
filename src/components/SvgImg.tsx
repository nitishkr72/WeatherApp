import {Image, Svg} from 'react-native-svg';

export default function SvgImg({
  path,
  width = '100',
  height = '100',
}: {
  path: any;
  width?: string;
  height?: string;
}): React.JSX.Element {
  return (
    <Svg width={width} height={height}>
      <Image href={path} />
    </Svg>
  );
}
