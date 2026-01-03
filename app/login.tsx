import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  BorderRadius,
  BrandColors,
  NeutralColors,
  Shadows,
  Spacing,
  Typography,
} from '@/constants/theme';
import { useAuth } from '@/contexts/auth-context';

export default function LoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedInput, setFocusedInput] = useState<'email' | 'password' | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Lỗi', 'Vui lòng nhập email và mật khẩu');
      return;
    }

    try {
      setIsLoading(true);
      await signIn(email, password);
      // Navigate to home (tabs) on successful login
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert(
        'Đăng nhập thất bại',
        error instanceof Error ? error.message : 'Có lỗi xảy ra. Vui lòng thử lại.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // Handle forgot password action
    Alert.alert('Quên mật khẩu', 'Chức năng này đang được phát triển');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Login Card */}
        <View style={styles.loginCard}>
          {/* Logo / Title Section */}
          <View style={styles.titleSection}>
            <Text style={[styles.welcomeText, { color: NeutralColors.gray700 }]}>Xin chào</Text>
            <Text style={[styles.appTitle, { color: BrandColors.headerOverlay }]}>ChainS</Text>
            <Text style={[styles.subtitle, { color: NeutralColors.gray600 }]}>
              Đăng nhập để tiếp tục
            </Text>
          </View>

          {/* Form Section */}
          <View style={[styles.formContainer, { backgroundColor: '#FFFFFF' }]}>
            {/* Email Input */}
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: NeutralColors.gray700 }]}>
                Email
              </Text>
              <View
                style={[
                  styles.inputWrapper,
                  {
                    borderColor:
                      focusedInput === 'email'
                        ? BrandColors.primary
                        : NeutralColors.gray300,
                    backgroundColor: '#FFFFFF',
                  },
                  focusedInput === 'email' && styles.inputWrapperFocused,
                ]}
              >
                <TextInput
                  style={[styles.input, { color: NeutralColors.gray900 }]}
                  placeholder="Nhập địa chỉ email"
                  placeholderTextColor={NeutralColors.gray400}
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput(null)}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  editable={!isLoading}
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: NeutralColors.gray700 }]}>
                Mật khẩu
              </Text>
              <View
                style={[
                  styles.inputWrapper,
                  {
                    borderColor:
                      focusedInput === 'password'
                        ? BrandColors.primary
                        : NeutralColors.gray300,
                    backgroundColor: '#FFFFFF',
                  },
                  focusedInput === 'password' && styles.inputWrapperFocused,
                ]}
              >
                <TextInput
                  style={[styles.input, { color: NeutralColors.gray900 }]}
                  placeholder="Nhập mật khẩu"
                  placeholderTextColor={NeutralColors.gray400}
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => setFocusedInput('password')}
                  onBlur={() => setFocusedInput(null)}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!isLoading}
                />
              </View>
            </View>

            {/* Forgot Password Button */}
            <TouchableOpacity
              onPress={handleForgotPassword}
              style={styles.forgotPasswordButton}
            >
              <Text style={[styles.forgotPasswordText, { color: BrandColors.primary }]}>
                Quên mật khẩu?
              </Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              onPress={handleLogin}
              style={[
                styles.loginButton,
                { backgroundColor: BrandColors.headerOverlay },
                (!email || !password || isLoading) && styles.loginButtonDisabled,
              ]}
              disabled={!email || !password || isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.loginButtonText}>Đăng nhập</Text>
              )}
            </TouchableOpacity>

            {/* Footer Text */}
            <View style={styles.footer}>
              <Text style={[styles.footerText, { color: NeutralColors.gray500 }]}>
                Bằng cách đăng nhập, bạn đồng ý với{' '}
              </Text>
              <TouchableOpacity>
                <Text style={[styles.footerLink, { color: BrandColors.primary }]}>
                  Điều khoản dịch vụ
                </Text>
              </TouchableOpacity>
              <Text style={[styles.footerText, { color: NeutralColors.gray500 }]}> và </Text>
              <TouchableOpacity>
                <Text style={[styles.footerLink, { color: BrandColors.primary }]}>
                  Chính sách bảo mật
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
  },

  // Login Card styles
  loginCard: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: Spacing['2xl'],
  },
  titleSection: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing['2xl'],
    alignItems: 'flex-start',
  },
  welcomeText: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.normal,
    lineHeight: Typography.sizes.base * Typography.lineHeights.normal,
    marginBottom: Spacing.xs,
  },
  appTitle: {
    fontSize: Typography.sizes['4xl'],
    fontWeight: Typography.weights.extrabold,
    lineHeight: Typography.sizes['4xl'] * Typography.lineHeights.tight,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.normal,
    lineHeight: Typography.sizes.base * Typography.lineHeights.normal,
  },

  // Form Container styles
  formContainer: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing['2xl'],
  },

  // Input styles
  inputGroup: {
    marginBottom: Spacing.lg,
  },
  inputLabel: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
    lineHeight: Typography.sizes.sm * Typography.lineHeights.normal,
    marginBottom: Spacing.sm,
  },
  inputWrapper: {
    borderWidth: 2,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Platform.OS === 'ios' ? Spacing.md : Spacing.xs,
    ...Shadows.sm,
  },
  inputWrapperFocused: {
    ...Shadows.md,
  },
  input: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.normal,
    lineHeight: Typography.sizes.base * Typography.lineHeights.normal,
    padding: 0,
  },

  // Forgot Password styles
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: Spacing.lg,
    paddingVertical: Spacing.xs,
  },
  forgotPasswordText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.weights.semibold,
    lineHeight: Typography.sizes.sm * Typography.lineHeights.normal,
  },

  // Login Button styles
  loginButton: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
    ...Shadows.lg,
  },
  loginButtonDisabled: {
    opacity: 0.5,
  },
  loginButtonText: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.bold,
    lineHeight: Typography.sizes.base * Typography.lineHeights.normal,
    color: '#FFFFFF',
  },

  // Footer styles
  footer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Spacing.md,
  },
  footerText: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.normal,
    lineHeight: Typography.sizes.xs * Typography.lineHeights.relaxed,
  },
  footerLink: {
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.semibold,
    lineHeight: Typography.sizes.xs * Typography.lineHeights.relaxed,
  },
});

