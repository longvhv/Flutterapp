# 🔥 Firebase Cloud Messaging Setup Guide

## 📋 Prerequisites

- Google account
- Firebase Console access
- Android app configured in Firebase

---

## 🚀 Setup Steps

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Enter project name: `VHV Enterprise App`
4. (Optional) Enable Google Analytics
5. Click **"Create project"**

### Step 2: Add Android App to Firebase

1. In Firebase Console, click **"Add app"** → Select **Android**
2. Enter package name: `com.vhvplatform.enterprise_app`
3. (Optional) Add app nickname: `VHV App`
4. (Optional) Add SHA-1 certificate:
   ```bash
   # Get debug SHA-1
   keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
   
   # Get release SHA-1 (after creating release keystore)
   keytool -list -v -keystore ~/upload-keystore.jks -alias upload
   ```
5. Click **"Register app"**

### Step 3: Download google-services.json

1. Click **"Download google-services.json"**
2. Move file to: `android/app/google-services.json`
   ```bash
   mv ~/Downloads/google-services.json android/app/
   ```
3. **IMPORTANT:** Add to `.gitignore` (already configured)

### Step 4: Add Firebase SDK to Android

Already configured in `android/app/build.gradle`:

```gradle
// Top-level build.gradle
buildscript {
    dependencies {
        classpath 'com.google.gms:google-services:4.4.0'
    }
}

// App-level build.gradle
plugins {
    id 'com.google.gms.google-services'  // Add this line
}

dependencies {
    // Firebase dependencies already in pubspec.yaml
}
```

### Step 5: Update build.gradle

Edit `android/app/build.gradle` and add **at the bottom**:

```gradle
// Add at the very bottom of the file
apply plugin: 'com.google.gms.google-services'
```

### Step 6: Get Dependencies

```bash
cd flutter
flutter pub get
```

---

## 🔧 Configuration for Multiple Flavors

### Dev Flavor

1. Create dev app in Firebase: `com.vhvplatform.enterprise_app.dev`
2. Download `google-services.json`
3. Rename to: `android/app/src/dev/google-services.json`

### Staging Flavor

1. Create staging app in Firebase: `com.vhvplatform.enterprise_app.staging`
2. Download `google-services.json`
3. Rename to: `android/app/src/staging/google-services.json`

### Prod Flavor

1. Keep main `google-services.json` in `android/app/`
2. Or create: `android/app/src/prod/google-services.json`

---

## 💻 Code Implementation

### Initialize Firebase in main.dart

```dart
import 'package:firebase_core/firebase_core.dart';
import 'core/services/firebase_service.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Initialize Firebase
  await Firebase.initializeApp();
  
  // Initialize Firebase Service
  await FirebaseService().initialize();
  
  runApp(MyApp());
}
```

### Request Notification Permissions

```dart
// Automatically handled in FirebaseService.initialize()
// Or manually:
FirebaseMessaging messaging = FirebaseMessaging.instance;

NotificationSettings settings = await messaging.requestPermission(
  alert: true,
  badge: true,
  sound: true,
);
```

### Get FCM Token

```dart
// Get token
final fcmService = FirebaseService();
String? token = fcmService.fcmToken;
print('FCM Token: $token');

// Send token to your backend
// await apiService.sendFCMToken(token);
```

### Subscribe to Topics

```dart
final fcmService = FirebaseService();

// Subscribe
await fcmService.subscribeToTopic('news');
await fcmService.subscribeToTopic('updates');

// Unsubscribe
await fcmService.unsubscribeFromTopic('news');
```

---

## 📱 Testing Push Notifications

### Option 1: Firebase Console

1. Go to Firebase Console → **Cloud Messaging**
2. Click **"Send your first message"**
3. Enter notification:
   - **Title:** "Test Notification"
   - **Text:** "Hello from Firebase!"
4. Click **"Next"**
5. Select target:
   - Choose app: `com.vhvplatform.enterprise_app`
   - Or test with FCM token
6. Click **"Review"** → **"Publish"**

### Option 2: cURL Command

```bash
# Get Server Key from Firebase Console → Project Settings → Cloud Messaging

curl -X POST https://fcm.googleapis.com/fcm/send \
  -H "Authorization: key=YOUR_SERVER_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "FCM_TOKEN_HERE",
    "notification": {
      "title": "Test Notification",
      "body": "Hello from cURL!",
      "icon": "@mipmap/ic_launcher",
      "color": "#3B82F6"
    },
    "data": {
      "route": "/notifications",
      "type": "info"
    }
  }'
```

### Option 3: Postman

1. **Method:** POST
2. **URL:** `https://fcm.googleapis.com/fcm/send`
3. **Headers:**
   - `Authorization: key=YOUR_SERVER_KEY`
   - `Content-Type: application/json`
4. **Body (raw JSON):**
   ```json
   {
     "to": "FCM_TOKEN_HERE",
     "notification": {
       "title": "Test from Postman",
       "body": "Testing push notifications",
       "icon": "@mipmap/ic_launcher",
       "color": "#3B82F6"
     },
     "data": {
       "route": "/home",
       "action": "open"
     }
   }
   ```

---

## 🎯 Notification Types

### 1. Notification-only Message

```json
{
  "to": "TOKEN",
  "notification": {
    "title": "New Update",
    "body": "Check out what's new!",
    "click_action": "FLUTTER_NOTIFICATION_CLICK"
  }
}
```

### 2. Data-only Message (Silent)

```json
{
  "to": "TOKEN",
  "data": {
    "type": "sync",
    "action": "refresh",
    "timestamp": "1234567890"
  }
}
```

### 3. Combined Message

```json
{
  "to": "TOKEN",
  "notification": {
    "title": "New Message",
    "body": "You have a new message"
  },
  "data": {
    "route": "/messages",
    "messageId": "12345",
    "senderId": "user123"
  }
}
```

### 4. Topic Message

```json
{
  "to": "/topics/news",
  "notification": {
    "title": "Breaking News",
    "body": "Important update for all users"
  }
}
```

---

## 🔔 Notification Handling

### Foreground

```dart
FirebaseMessaging.onMessage.listen((RemoteMessage message) {
  print('Foreground message: ${message.messageId}');
  // Show local notification
});
```

### Background

```dart
@pragma('vm:entry-point')
Future<void> _firebaseBackgroundHandler(RemoteMessage message) async {
  await Firebase.initializeApp();
  print('Background message: ${message.messageId}');
}

void main() {
  FirebaseMessaging.onBackgroundMessage(_firebaseBackgroundHandler);
}
```

### App Opened from Notification

```dart
// App in background
FirebaseMessaging.onMessageOpenedApp.listen((RemoteMessage message) {
  print('Notification tapped (background)');
  // Navigate to specific screen
});

// App terminated
FirebaseMessaging.instance.getInitialMessage().then((message) {
  if (message != null) {
    print('Notification tapped (terminated)');
    // Navigate to specific screen
  }
});
```

---

## 🎨 Notification Customization

### Android Notification Channel

```dart
const channel = AndroidNotificationChannel(
  'important_channel',
  'Important Notifications',
  description: 'High priority notifications',
  importance: Importance.high,
  playSound: true,
  enableVibration: true,
  ledColor: Color(0xFF3B82F6),
);
```

### Custom Sound

1. Add sound file to `android/app/src/main/res/raw/notification_sound.mp3`
2. Use in notification:
   ```dart
   const androidDetails = AndroidNotificationDetails(
     'channel_id',
     'Channel Name',
     sound: RawResourceAndroidNotificationSound('notification_sound'),
   );
   ```

### Custom Icon

1. Add icon to `android/app/src/main/res/drawable/notification_icon.png`
2. Use in notification:
   ```dart
   const androidDetails = AndroidNotificationDetails(
     'channel_id',
     'Channel Name',
     icon: 'notification_icon',
   );
   ```

---

## 🔍 Debugging

### Check FCM Token

```dart
String? token = await FirebaseMessaging.instance.getToken();
print('FCM Token: $token');
```

### Enable Debug Logging

```dart
// Android: adb logcat
// Look for: FirebaseMessaging, FCM
```

### Test Message Delivery

1. Firebase Console → Cloud Messaging
2. Send test message to FCM token
3. Check logs for delivery

### Common Issues

**Issue:** No notification received
- ✅ Check google-services.json is correct
- ✅ Verify package name matches
- ✅ Check notification permissions granted
- ✅ Ensure device has internet connection

**Issue:** Notification not showing in foreground
- ✅ Implement `FirebaseMessaging.onMessage` handler
- ✅ Show local notification manually

**Issue:** Token is null
- ✅ Wait for Firebase initialization
- ✅ Check Play Services are installed
- ✅ Retry getting token

---

## 📊 Analytics

Firebase automatically tracks:
- ✅ Notification delivery
- ✅ Notification opens
- ✅ Conversion events

View in Firebase Console → **Cloud Messaging** → **Reports**

---

## 🔐 Security Best Practices

1. **Never commit** `google-services.json` to public repos
2. **Use Server Key** only on backend (not in app)
3. **Validate** notification data before using
4. **Implement** token rotation
5. **Monitor** suspicious activity in Firebase Console

---

## 📚 Additional Resources

- [Firebase Cloud Messaging Docs](https://firebase.google.com/docs/cloud-messaging)
- [FlutterFire Documentation](https://firebase.flutter.dev/)
- [FCM HTTP v1 API](https://firebase.google.com/docs/cloud-messaging/http-server-ref)

---

## ✅ Checklist

- [ ] Created Firebase project
- [ ] Added Android app to Firebase
- [ ] Downloaded google-services.json
- [ ] Placed google-services.json in android/app/
- [ ] Added google-services plugin to build.gradle
- [ ] Ran `flutter pub get`
- [ ] Initialized Firebase in main.dart
- [ ] Tested notification in Firebase Console
- [ ] Got FCM token successfully
- [ ] Received test notification
- [ ] Implemented notification handlers
- [ ] Tested foreground notifications
- [ ] Tested background notifications
- [ ] Tested notification tap handling
- [ ] Subscribed to topics (optional)
- [ ] Customized notification UI (optional)

---

## 🎉 You're Ready!

Firebase Cloud Messaging is configured and ready to use!

**Next steps:**
1. Test notifications on physical device
2. Integrate with your backend
3. Implement custom notification actions
4. Add analytics tracking
5. Setup scheduled notifications

**Happy Coding! 🚀**
