import Text from '@/components/common/Text';
import { Eye, EyeOff } from 'lucide-react-native';
import React, { forwardRef, useState } from 'react';
import { TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';

export interface InputFieldProps extends TextInputProps {
  type?: 'text' | 'email' | 'password' | 'textarea' | 'confirmPassword';
  label?: string;
  textAreaRows?: number;
  error?: { message?: string };
  icon?: React.ReactNode;
  placeholder?: string;
  compulsory?: boolean;
  className?: string;
}

export const InputField = forwardRef<TextInput, InputFieldProps>((props, ref) => {
  const {
    type = 'text',
    label,
    error,
    icon,
    onBlur,
    placeholder,
    textAreaRows = 3,
    compulsory,
    className = '',
    ...inputProps
  } = props;

  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);

  const isPassword = type === 'password' || type === 'confirmPassword';
  const isEmail = type === 'email';
  const isTextArea = type === 'textarea';

  return (
    <View className="mb-4 w-full">

      {label && (
        <Text type={"header"} className="text-lg text-slate-800 mb-1">
          {label}
          {compulsory && <Text type={"header"} className="text-red-500"> *</Text>}
        </Text>
      )}

      <View className="flex-row items-center bg-[#F6F7F8] relative">

        {icon && !isTextArea && (
          <View className="absolute left-3 z-10 justify-center items-center">
            {icon}
          </View>
        )}

        <TextInput
          ref={ref}
          placeholder={placeholder}
          placeholderTextColor="#A0AEC0"
          secureTextEntry={isPassword && !showPassword}
          keyboardType={isEmail ? 'email-address' : 'default'}
          multiline={isTextArea}
          onFocus={() => setFocused(true)}
          onBlur={
            (e) => {
              setFocused(false);
              onBlur?.(e);

            }
          }
          numberOfLines={isTextArea ? textAreaRows : 1}
          style={isTextArea ? { textAlignVertical: 'top' } : undefined}
          className={`flex-1 px-3 text-base text-slate-900 rounded-md font-mont border
            ${isTextArea ? 'h-auto py-3' : ''} 
            ${icon && !isTextArea ? 'pl-11' : ''}
            ${isPassword ? 'pr-11' : ''}
            ${error?.message ? 'border-red-500' : focused ? 'border-orange-500' : 'border-slate-400'}
            ${className}`}
          {...inputProps}

        />

        {isPassword && (
          <TouchableOpacity
            style={{ height: '100%' }}
            className="absolute right-3 justify-center items-center"
            onPress={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff size={20} color="#718096" />
            ) : (
              <Eye size={20} color="#718096" />
            )}
          </TouchableOpacity>
        )}
      </View>

      {/* FormHelperText (Error) */}
      {error?.message && (
        <Text className="text-red-500 text-left text-xs mt-1">
          {error.message}
        </Text>
      )}
    </View>
  );
});

InputField.displayName = 'InputField';