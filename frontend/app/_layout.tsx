import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#1a1a2e' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Tafssil AI' }} />
        <Stack.Screen name="new-project/index" options={{ title: 'مشروع جديد' }} />
        <Stack.Screen name="new-project/camera" options={{ title: 'تصوير' }} />
        <Stack.Screen name="new-project/gallery" options={{ title: 'رفع صور' }} />
        <Stack.Screen name="measurements/index" options={{ title: 'القياسات' }} />
        <Stack.Screen name="measurements/standard-sizes" options={{ title: 'المقاسات القياسية' }} />
        <Stack.Screen name="measurements/custom" options={{ title: 'قياسات مخصصة' }} />
        <Stack.Screen name="patterns/index" options={{ title: 'نوع الباترون' }} />
        <Stack.Screen name="patterns/simple" options={{ title: 'باترون بسيط' }} />
        <Stack.Screen name="patterns/professional" options={{ title: 'باترون احترافي' }} />
        <Stack.Screen name="preview" options={{ title: 'معاينة الباترون' }} />
        <Stack.Screen name="notes" options={{ title: 'الملاحظات' }} />
        <Stack.Screen name="report" options={{ title: 'التقرير النهائي' }} />
      </Stack>
    </>
  );
}
