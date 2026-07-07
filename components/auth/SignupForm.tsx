import { LoginFormProps } from '@/types/form-props';
import { FileText, Lock, Mail, User } from 'lucide-react-native';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { InputField } from '../common/InputField';


export default function SignupForm({onSuccess}: LoginFormProps) {
  // 1. Initialize useForm with your fields
  const { control, handleSubmit } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      bio: '',
    },
  });

 
  const onSubmit = () => {
    console.log('Form Data Submitted:', );
  };

  return (
    <ScrollView className="flex-1 bg-white p-6 pt-16"
      contentContainerClassName="flex-1 justify-center">
      <Text className="text-3xl font-bold text-slate-900 font-baloo mb-2">
        Create Account
      </Text>
      <Text className="text-sm text-slate-500 font-baloo mb-8">
        Please fill in the details below to sign up.
      </Text>

      {/* --- FULL NAME FIELD --- */}
      <Controller
        control={control}
        name="fullName"
        rules={{ required: 'Full name is required' }}
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <InputField
            label="Full Name"
            placeholder="John Doe"
            compulsory
            icon={<User size={20} color="#718096" />}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            error={fieldState.error} // Pass down the error state object
          />
        )}
      />

      {/* --- EMAIL FIELD --- */}
      <Controller
        control={control}
        name="email"
        rules={{ 
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address'
          }
        }}
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <InputField
            label="Email Address"
            type="email"
            placeholder="john@example.com"
            compulsory
            icon={<Mail size={20} color="#718096" />}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            error={fieldState.error}
          />
        )}
      />

      {/* --- PASSWORD FIELD --- */}
      <Controller
        control={control}
        name="password"
        rules={{ 
          required: 'Password is required',
          minLength: { value: 6, message: 'Password must be at least 6 characters' }
        }}
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <InputField
            label="Password"
            type="password"
            placeholder="••••••••"
            compulsory
            icon={<Lock size={20} color="#718096" />}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            error={fieldState.error}
          />
        )}
      />

      {/* --- BIO (TEXTAREA) FIELD --- */}
      <Controller
        control={control}
        name="bio"
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <InputField
            label="Short Bio"
            type="textarea"
            placeholder="Tell us a little bit about yourself..."
            textAreaRows={4}
            icon={<FileText size={20} color="#718096" />}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            error={fieldState.error}
          />
        )}
      />

      {/* --- SUBMIT BUTTON --- */}
      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        className="mt-4 bg-orange-500 h-12 rounded-md items-center justify-center shadow-sm active:opacity-80"
      >
        <Text className="text-white text-base font-semibold font-baloo">
          Sign Up
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}