import { PropsWithChildren } from 'react';
import { Text, TextProps } from 'react-native';
import { tv, type VariantProps } from 'tailwind-variants';

const text = tv({
  variants: {
    type: {
      header: 'font-baloo-medium',
      headerBold: 'font-baloo-bold',
      paragraph: 'font-mont',
      paragraphSemiBold: 'font-mont-semibold',
      paragraphBold: 'font-mont-bold',
      paragraphExtrabold: 'font-mont-extrabold',
      paragraphItalic: 'font-mont-italic'
    },
  },
  defaultVariants: {
    type: 'paragraph',
  },
});

type CommonTextProps = VariantProps<typeof text> & {
  className?: string;
};

const CommonText = ({
  type,
  className,
  children,
  ...rest
}: PropsWithChildren<CommonTextProps & TextProps>) => {
  return (
    <Text
      className={text({
        type,
        className,
      })}
      {...rest}
    >
      {children}
    </Text>
  );
};

export default CommonText;