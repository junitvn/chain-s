import { StyleSheet, View, Pressable } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

import { useThemeColor } from '@/hooks/use-theme-color';
import { ThemedText } from '@/components/themed-text';
import type { FormFieldProps, FileField } from './types';

interface FileInfo {
  uri: string;
  name: string;
  size?: number;
  mimeType?: string;
}

export function FileFieldComponent({
  field,
  value,
  onChange,
  error,
}: FormFieldProps<FileField>) {
  const borderColor = error
    ? '#E53935'
    : useThemeColor({ light: '#E0E0E0', dark: '#404040' }, 'background');
  const dropzoneBg = useThemeColor(
    { light: '#FAFAFA', dark: '#1E1E1E' },
    'background'
  );
  const fileBg = useThemeColor(
    { light: '#E3F2FD', dark: '#1A237E' },
    'background'
  );

  const files = value ? (Array.isArray(value) ? value : [value]) : [];

  const handlePick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        multiple: field.multiple ?? false,
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets) {
        const selectedFiles: FileInfo[] = result.assets.map((asset) => ({
          uri: asset.uri,
          name: asset.name,
          size: asset.size,
          mimeType: asset.mimeType ?? undefined,
        }));

        // Check file size
        if (field.maxSizeMB) {
          const maxBytes = field.maxSizeMB * 1024 * 1024;
          const oversized = selectedFiles.find(
            (f) => f.size && f.size > maxBytes
          );
          if (oversized) {
            // In a real app, you'd show an error toast
            console.warn(`File ${oversized.name} exceeds ${field.maxSizeMB}MB`);
            return;
          }
        }

        if (field.multiple) {
          onChange([...files, ...selectedFiles] as unknown as boolean[]);
        } else {
          onChange(selectedFiles[0] as unknown as null);
        }
      }
    } catch (err) {
      console.error('Error picking document:', err);
    }
  };

  const handleRemove = (index: number) => {
    if (field.multiple) {
      const newFiles = files.filter((_, i) => i !== index);
      onChange(newFiles as unknown as boolean[]);
    } else {
      onChange(null);
    }
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <View style={styles.container}>
      <ThemedText style={styles.label}>
        {field.label}
        {field.required && <ThemedText style={styles.required}> *</ThemedText>}
      </ThemedText>

      {field.helpText && (
        <ThemedText style={styles.helpText}>{field.helpText}</ThemedText>
      )}

      <Pressable
        style={[
          styles.dropzone,
          { borderColor, backgroundColor: dropzoneBg },
        ]}
        onPress={handlePick}
      >
        <ThemedText style={styles.dropzoneIcon}>📁</ThemedText>
        <ThemedText style={styles.dropzoneText}>
          Tap to select {field.multiple ? 'files' : 'a file'}
        </ThemedText>
        {field.accept && (
          <ThemedText style={styles.acceptText}>
            Accepted: {field.accept}
          </ThemedText>
        )}
        {field.maxSizeMB && (
          <ThemedText style={styles.acceptText}>
            Max size: {field.maxSizeMB}MB
          </ThemedText>
        )}
      </Pressable>

      {files.length > 0 && (
        <View style={styles.filesList}>
          {files.map((file, index) => {
            const fileInfo = file as unknown as FileInfo;
            return (
              <View
                key={index}
                style={[styles.fileItem, { backgroundColor: fileBg }]}
              >
                <View style={styles.fileInfo}>
                  <ThemedText style={styles.fileName} numberOfLines={1}>
                    {fileInfo.name}
                  </ThemedText>
                  {fileInfo.size && (
                    <ThemedText style={styles.fileSize}>
                      {formatFileSize(fileInfo.size)}
                    </ThemedText>
                  )}
                </View>
                <Pressable
                  style={styles.removeButton}
                  onPress={() => handleRemove(index)}
                >
                  <ThemedText style={styles.removeText}>✕</ThemedText>
                </Pressable>
              </View>
            );
          })}
        </View>
      )}

      {error && <ThemedText style={styles.error}>{error}</ThemedText>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  required: {
    color: '#E53935',
  },
  helpText: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 6,
  },
  dropzone: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
  },
  dropzoneIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  dropzoneText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  acceptText: {
    fontSize: 12,
    opacity: 0.6,
  },
  filesList: {
    marginTop: 12,
    gap: 8,
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: 14,
    fontWeight: '500',
  },
  fileSize: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: 2,
  },
  removeButton: {
    padding: 8,
  },
  removeText: {
    fontSize: 16,
    opacity: 0.7,
  },
  error: {
    color: '#E53935',
    fontSize: 12,
    marginTop: 4,
  },
});

