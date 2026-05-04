import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { COLORS } from '../constants/style';
import { TextField } from '../components/Input';
import { CheckboxItem } from '../components/CheckboxItem';
import { CustomButton } from '../components/Button';
import type { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type AuthMode = 'login' | 'register' | 'confirm';

export const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const inputs = useRef<Array<TextInput | null>>([]);

  const [mode, setMode] = useState<AuthMode>('login');
  const [accepted, setAccepted] = useState(false);
  const [code, setCode] = useState(['', '', '', '']);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const isLogin = mode === 'login';
  const isRegister = mode === 'register';
  const isConfirm = mode === 'confirm';

  const updateForm = (key: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const goToApp = () => navigation.replace('MainTabs');

  const handleSubmit = () => {
    if (isLogin) {
      goToApp();
      return;
    }

    if (isRegister) {
      setMode('confirm');
      return;
    }

    if (code.join('').length === 4) {
      goToApp();
    }
  };

  const changeCode = (value: string, index: number) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    const next = [...code];

    next[index] = digit;
    setCode(next);

    if (digit && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  const switchMode = () => {
    setMode(isLogin ? 'register' : 'login');
    setCode(['', '', '', '']);
    setAccepted(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={[
          styles.container,
          isConfirm && styles.confirmContainer,
        ]}
        keyboardShouldPersistTaps="handled"
      >
        {isConfirm ? (
          <>
            <Text style={styles.confirmTitle}>Enter confirmation code</Text>

            <Text style={styles.confirmText}>
              A 4-digit code was sent to{'\n'}
              {form.email || 'your email'}
            </Text>

            <View style={styles.codeRow}>
              {code.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={ref => {
                    inputs.current[index] = ref;
                  }}
                  style={[styles.codeInput, digit && styles.codeInputActive]}
                  value={digit}
                  onChangeText={value => changeCode(value, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  textAlign="center"
                />
              ))}
            </View>

            <TouchableOpacity>
              <Text style={styles.resend}>Resend code</Text>
            </TouchableOpacity>

            <CustomButton
              title="Continue"
              onPress={handleSubmit}
              style={styles.button}
            />
          </>
        ) : (
          <>
            {isLogin && (
              <View style={styles.logoBox}>
                <Text style={styles.logoText}>
                  ibis{'\n'}
                  <Text style={styles.logoSubText}>STYLES</Text>
                </Text>
              </View>
            )}

            <Text style={isLogin ? styles.title : styles.smallTitle}>
              {isLogin ? 'Welcome to Ibis hotel!' : 'Sign up'}
            </Text>

            {!isLogin && (
              <Text style={styles.subtitle}>
                Create an account to get started
              </Text>
            )}

            {isRegister && (
              <TextField
                label="Name"
                placeholder="Name"
                value={form.name}
                onChangeText={value => updateForm('name', value)}
              />
            )}

            <TextField
              label={isRegister ? 'Email Address' : undefined}
              placeholder="Email Address"
              keyboardType="email-address"
              autoCapitalize="none"
              value={form.email}
              onChangeText={value => updateForm('email', value)}
            />

            <TextField
              label={isRegister ? 'Password' : undefined}
              placeholder="Password"
              secureTextEntry
              value={form.password}
              onChangeText={value => updateForm('password', value)}
            />

            {isRegister && (
              <>
                <TextField
                  placeholder="Confirm password"
                  secureTextEntry
                  value={form.confirmPassword}
                  onChangeText={value => updateForm('confirmPassword', value)}
                />

                <CheckboxItem
                  value={accepted}
                  onValueChange={setAccepted}
                  label="I've read and agree with the Terms and Conditions and the Privacy Policy."
                />
              </>
            )}

            {isLogin && (
              <TouchableOpacity>
                <Text style={styles.forgot}>Forgot password?</Text>
              </TouchableOpacity>
            )}

            <CustomButton
              title={isLogin ? 'Login' : 'Sign Up'}
              onPress={handleSubmit}
              style={styles.button}
            />

            <TouchableOpacity onPress={switchMode}>
              <Text style={styles.switchText}>
                {isLogin ? 'Not a member? ' : 'Already have an account? '}
                <Text style={styles.switchLink}>
                  {isLogin ? 'Register now' : 'Login'}
                </Text>
              </Text>
            </TouchableOpacity>

            {isLogin && (
              <>
                <View style={styles.divider} />
                <Text style={styles.orText}>Or continue with</Text>

                <View style={styles.socialRow}>
                  <TouchableOpacity
                    style={[styles.socialButton, styles.google]}
                  >
                    <Text style={styles.socialText}>G</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.socialButton}>
                    <Text style={styles.socialText}></Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 28,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  confirmContainer: {
    paddingTop: 90,
    justifyContent: 'flex-start',
  },
  logoBox: {
    width: 180,
    height: 180,
    alignSelf: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
  },
  logoText: {
    fontSize: 44,
    lineHeight: 46,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  logoSubText: {
    fontSize: 34,
    fontWeight: '400',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111111',
    textAlign: 'center',
    marginBottom: 24,
  },
  smallTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111111',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#888888',
    marginBottom: 18,
  },
  forgot: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 18,
  },
  button: {
    width: '100%',
    marginTop: 6,
  },
  switchText: {
    textAlign: 'center',
    color: '#999999',
    fontSize: 12,
    marginTop: 18,
  },
  switchLink: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 18,
  },
  orText: {
    textAlign: 'center',
    color: '#999999',
    fontSize: 12,
    marginBottom: 14,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  socialButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#111111',
    justifyContent: 'center',
    alignItems: 'center',
  },
  google: {
    backgroundColor: '#EA4335',
  },
  socialText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  confirmTitle: {
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
  },
  confirmText: {
    fontSize: 13,
    color: '#888888',
    textAlign: 'center',
    marginBottom: 28,
  },
  codeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 70,
  },
  codeInput: {
    width: 46,
    height: 46,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    fontSize: 18,
    color: '#111111',
  },
  codeInputActive: {
    borderColor: COLORS.primary,
  },
  resend: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 18,
  },
});
