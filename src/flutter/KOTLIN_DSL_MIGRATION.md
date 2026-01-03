# 📘 Gradle Kotlin DSL Migration Guide

Complete guide for migrating from Groovy (.gradle) to Kotlin DSL (.gradle.kts)

---

## 🎯 Why Kotlin DSL?

### Advantages
- ✅ **Type-safe:** Compile-time checking for build scripts
- ✅ **IDE support:** Code completion, navigation, refactoring
- ✅ **Null safety:** Kotlin's null-safety in build scripts
- ✅ **Modern syntax:** Cleaner, more readable code
- ✅ **Better errors:** More helpful error messages
- ✅ **Consistency:** Use Kotlin everywhere (app + build scripts)

### Disadvantages (Minor)
- ⚠️ Slightly slower IDE sync (first time)
- ⚠️ More strict syntax requirements
- ⚠️ Learning curve if unfamiliar with Kotlin

**Overall: Benefits far outweigh drawbacks!**

---

## 📋 Syntax Conversion Reference

### Basic Syntax

#### String Literals
```kotlin
// Groovy
id 'com.android.application'
implementation 'androidx.core:core-ktx:1.15.0'

// Kotlin DSL
id("com.android.application")
implementation("androidx.core:core-ktx:1.15.0")
```

#### Property Assignment
```kotlin
// Groovy
compileSdk 35
applicationId "com.example.app"
versionCode 1
versionName "1.0.0"

// Kotlin DSL
compileSdk = 35
applicationId = "com.example.app"
versionCode = 1
versionName = "1.0.0"
```

#### Boolean Properties
```kotlin
// Groovy
debuggable true
minifyEnabled false
shrinkResources true

// Kotlin DSL
isDebuggable = true
isMinifyEnabled = false
isShrinkResources = true
```

#### Method Calls
```kotlin
// Groovy
exclude 'META-INF/LICENSE'
include 'arm64-v8a', 'armeabi-v7a'

// Kotlin DSL
exclude("META-INF/LICENSE")
include("arm64-v8a", "armeabi-v7a")
```

### Build Types

```kotlin
// Groovy
buildTypes {
    debug {
        debuggable true
        minifyEnabled false
    }
    release {
        debuggable false
        minifyEnabled true
    }
}

// Kotlin DSL
buildTypes {
    getByName("debug") {
        isDebuggable = true
        isMinifyEnabled = false
    }
    getByName("release") {
        isDebuggable = false
        isMinifyEnabled = true
    }
}
```

### Product Flavors

```kotlin
// Groovy
flavorDimensions "environment"

productFlavors {
    dev {
        dimension "environment"
        applicationIdSuffix ".dev"
    }
    prod {
        dimension "environment"
    }
}

// Kotlin DSL
flavorDimensions += "environment"

productFlavors {
    create("dev") {
        dimension = "environment"
        applicationIdSuffix = ".dev"
    }
    create("prod") {
        dimension = "environment"
    }
}
```

### Dependencies

```kotlin
// Groovy
dependencies {
    implementation 'androidx.core:core-ktx:1.15.0'
    implementation 'com.google.android.material:material:1.12.0'
    testImplementation 'junit:junit:4.13.2'
}

// Kotlin DSL
dependencies {
    implementation("androidx.core:core-ktx:1.15.0")
    implementation("com.google.android.material:material:1.12.0")
    testImplementation("junit:junit:4.13.2")
}
```

### Signing Configs

```kotlin
// Groovy
signingConfigs {
    debug {
        storeFile file('debug.keystore')
        storePassword 'android'
        keyAlias 'androiddebugkey'
        keyPassword 'android'
    }
}

// Kotlin DSL
signingConfigs {
    create("debug") {
        storeFile = file("debug.keystore")
        storePassword = "android"
        keyAlias = "androiddebugkey"
        keyPassword = "android"
    }
}
```

### Build Config Fields

```kotlin
// Groovy
buildConfigField "String", "API_URL", '"https://api.example.com"'
buildConfigField "Boolean", "DEBUG_MODE", "true"
buildConfigField "int", "VERSION_CODE", "1"

// Kotlin DSL
buildConfigField("String", "API_URL", "\"https://api.example.com\"")
buildConfigField("Boolean", "DEBUG_MODE", "true")
buildConfigField("int", "VERSION_CODE", "1")
```

### Resource Values

```kotlin
// Groovy
resValue "string", "app_name", "My App"

// Kotlin DSL
resValue("string", "app_name", "My App")
```

### ProGuard Files

```kotlin
// Groovy
proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'

// Kotlin DSL
proguardFiles(
    getDefaultProguardFile("proguard-android-optimize.txt"),
    "proguard-rules.pro"
)
```

### Packaging Options

```kotlin
// Groovy
packagingOptions {
    exclude 'META-INF/LICENSE'
    exclude 'META-INF/NOTICE'
}

// Kotlin DSL
packaging {
    resources {
        excludes += setOf(
            "META-INF/LICENSE",
            "META-INF/NOTICE"
        )
    }
}
```

### Splits

```kotlin
// Groovy
splits {
    abi {
        enable true
        reset()
        include 'armeabi-v7a', 'arm64-v8a'
        universalApk true
    }
}

// Kotlin DSL
splits {
    abi {
        isEnable = true
        reset()
        include("armeabi-v7a", "arm64-v8a")
        isUniversalApk = true
    }
}
```

### Lint Options

```kotlin
// Groovy
lintOptions {
    checkReleaseBuilds false
    abortOnError false
    disable 'InvalidPackage'
}

// Kotlin DSL
lint {
    checkReleaseBuilds = false
    abortOnError = false
    disable += "InvalidPackage"
}
```

---

## 🔧 Complete File Examples

### build.gradle.kts (Root)

```kotlin
import org.gradle.api.file.Directory

buildscript {
    extra.apply {
        set("kotlinVersion", "2.1.0")
    }
    
    repositories {
        google()
        mavenCentral()
    }

    dependencies {
        classpath("com.android.tools.build:gradle:8.9.1")
        classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:${extra["kotlinVersion"]}")
        classpath("com.google.gms:google-services:4.4.2")
    }
}

allprojects {
    repositories {
        google()
        mavenCentral()
    }
}

val newBuildDir: Directory = rootProject.layout.buildDirectory.dir("../../build").get()
rootProject.layout.buildDirectory.value(newBuildDir)

subprojects {
    val newSubprojectBuildDir: Directory = newBuildDir.dir(project.name)
    project.layout.buildDirectory.value(newSubprojectBuildDir)
}

subprojects {
    project.evaluationDependsOn(":app")
}

tasks.register<Delete>("clean") {
    delete(rootProject.layout.buildDirectory)
}
```

### settings.gradle.kts

```kotlin
pluginManagement {
    val flutterSdkPath = run {
        val properties = java.util.Properties()
        file("local.properties").inputStream().use { properties.load(it) }
        val flutterSdkPath = properties.getProperty("flutter.sdk")
        require(flutterSdkPath != null) { "flutter.sdk not set in local.properties" }
        flutterSdkPath
    }
    
    includeBuild("$flutterSdkPath/packages/flutter_tools/gradle")
    
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }

    plugins {
        id("dev.flutter.flutter-gradle-plugin") version "1.0.0" apply false
    }
}

plugins {
    id("dev.flutter.flutter-plugin-loader") version "1.0.0"
    id("com.android.application") version "8.9.1" apply false
    id("org.jetbrains.kotlin.android") version "2.1.0" apply false
}

include(":app")
```

### app/build.gradle.kts (Simplified Example)

```kotlin
import java.util.Properties
import java.io.FileInputStream

plugins {
    id("com.android.application")
    id("kotlin-android")
    id("dev.flutter.flutter-gradle-plugin")
}

// Load properties
val keystoreProperties = Properties()
val keystorePropertiesFile = rootProject.file("key.properties")
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(FileInputStream(keystorePropertiesFile))
}

android {
    namespace = "com.example.app"
    compileSdk = 35

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    kotlinOptions {
        jvmTarget = "17"
    }

    defaultConfig {
        applicationId = "com.example.app"
        minSdk = 24
        targetSdk = 35
        versionCode = 1
        versionName = "1.0.0"
    }

    buildTypes {
        getByName("release") {
            isMinifyEnabled = true
            isShrinkResources = true
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
}

dependencies {
    implementation("androidx.core:core-ktx:1.15.0")
    implementation("androidx.appcompat:appcompat:1.7.0")
    implementation("com.google.android.material:material:1.12.0")
}

apply(plugin = "com.google.gms.google-services")
```

---

## 🎓 Advanced Features

### Type-Safe Accessors

```kotlin
// Access build types and flavors in a type-safe way
android {
    buildTypes {
        val release by getting {
            isMinifyEnabled = true
        }
        val debug by getting {
            isDebuggable = true
        }
    }
}
```

### Extension Functions

```kotlin
// Create custom extension functions
fun Project.getVersionCode(): Int {
    val properties = Properties()
    file("version.properties").inputStream().use { properties.load(it) }
    return properties.getProperty("versionCode").toInt()
}

// Use in build script
android {
    defaultConfig {
        versionCode = getVersionCode()
    }
}
```

### Variable Sharing

```kotlin
// In root build.gradle.kts
extra["compileSdkVersion"] = 35
extra["minSdkVersion"] = 24

// In app/build.gradle.kts
val compileSdkVersion: Int by rootProject.extra
val minSdkVersion: Int by rootProject.extra

android {
    compileSdk = compileSdkVersion
    defaultConfig {
        minSdk = minSdkVersion
    }
}
```

---

## 🛠️ Migration Steps

### Step-by-Step Process

1. **Backup your project**
   ```bash
   git commit -am "Backup before Kotlin DSL migration"
   ```

2. **Rename files**
   ```bash
   cd android
   mv build.gradle build.gradle.kts
   mv settings.gradle settings.gradle.kts
   mv app/build.gradle app/build.gradle.kts
   ```

3. **Update syntax**
   - Replace single quotes with double quotes
   - Add parentheses to method calls
   - Add `=` to property assignments
   - Add `is` prefix to boolean properties
   - Use `getByName()` for existing build types
   - Use `create()` for new flavors

4. **Test**
   ```bash
   ./gradlew clean
   flutter clean
   flutter pub get
   flutter run
   ```

5. **Fix any errors**
   - Read error messages carefully
   - Check syntax conversion reference
   - Use IDE quick fixes

---

## 📚 Resources

### Official Documentation
- [Gradle Kotlin DSL Primer](https://docs.gradle.org/current/userguide/kotlin_dsl.html)
- [Android Gradle Plugin DSL Reference](https://developer.android.com/reference/tools/gradle-api)
- [Migrating build logic from Groovy to Kotlin](https://docs.gradle.org/current/userguide/migrating_from_groovy_to_kotlin_dsl.html)

### Useful Tools
- **Android Studio:** Built-in Kotlin DSL support
- **Gradle Wrapper:** Update with `./gradlew wrapper --gradle-version=8.7`
- **Build Scan:** Debug build issues with `--scan` flag

---

## ✅ Checklist

- [ ] Backed up project
- [ ] Renamed .gradle files to .gradle.kts
- [ ] Updated all string literals to double quotes
- [ ] Added parentheses to method calls
- [ ] Fixed property assignments with `=`
- [ ] Updated boolean properties with `is` prefix
- [ ] Converted build types to use `getByName()`
- [ ] Converted flavors to use `create()`
- [ ] Updated packaging options
- [ ] Tested build with `./gradlew clean build`
- [ ] Tested Flutter build
- [ ] Verified all flavors work
- [ ] Committed changes

---

**Migration complete! Enjoy type-safe build scripts! 🎉**
