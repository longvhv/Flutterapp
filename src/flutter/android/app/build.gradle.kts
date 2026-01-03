import java.util.Properties
import java.io.FileInputStream

plugins {
    id("com.android.application")
    id("kotlin-android")
    id("dev.flutter.flutter-gradle-plugin")
}

// Load keystore properties
val keystoreProperties = Properties()
val keystorePropertiesFile = rootProject.file("key.properties")
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(FileInputStream(keystorePropertiesFile))
}

// Load local properties
val localProperties = Properties()
val localPropertiesFile = rootProject.file("local.properties")
if (localPropertiesFile.exists()) {
    localPropertiesFile.load(FileInputStream(localPropertiesFile))
}

val flutterVersionCode: String = localProperties.getProperty("flutter.versionCode") ?: "1"
val flutterVersionName: String = localProperties.getProperty("flutter.versionName") ?: "1.0.0"

android {
    namespace = "com.vhvplatform.enterprise_app"
    compileSdk = 35
    
    ndkVersion = flutter.ndkVersion

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    kotlinOptions {
        jvmTarget = "17"
    }

    sourceSets {
        getByName("main").java.srcDirs("src/main/kotlin")
    }

    defaultConfig {
        applicationId = "com.vhvplatform.enterprise_app"
        minSdk = 24
        targetSdk = 35
        versionCode = flutterVersionCode.toInt()
        versionName = flutterVersionName
        multiDexEnabled = true
        
        // Vector drawable support
        vectorDrawables.useSupportLibrary = true
        
        // Test instrumentation runner
        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    // Signing configurations
    signingConfigs {
        create("debug") {
            storeFile = file("debug.keystore")
            storePassword = "android"
            keyAlias = "androiddebugkey"
            keyPassword = "android"
        }
        
        create("release") {
            if (keystorePropertiesFile.exists()) {
                keyAlias = keystoreProperties.getProperty("keyAlias")
                keyPassword = keystoreProperties.getProperty("keyPassword")
                storeFile = keystoreProperties.getProperty("storeFile")?.let { file(it) }
                storePassword = keystoreProperties.getProperty("storePassword")
            }
        }
    }

    buildTypes {
        getByName("debug") {
            isDebuggable = true
            isMinifyEnabled = false
            isShrinkResources = false
            signingConfig = signingConfigs.getByName("debug")
            
            // Debug build config fields
            buildConfigField("String", "BUILD_TYPE", "\"debug\"")
            buildConfigField("Boolean", "DEBUG_MODE", "true")
        }

        getByName("release") {
            isDebuggable = false
            isMinifyEnabled = true
            isShrinkResources = true
            signingConfig = signingConfigs.getByName("release")
            
            // ProGuard files
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
            
            // Release build config fields
            buildConfigField("String", "BUILD_TYPE", "\"release\"")
            buildConfigField("Boolean", "DEBUG_MODE", "false")
        }
    }

    // Build flavors
    flavorDimensions += "environment"
    
    productFlavors {
        create("dev") {
            dimension = "environment"
            applicationIdSuffix = ".dev"
            versionNameSuffix = "-dev"
            
            resValue("string", "app_name", "VHV App (Dev)")
            buildConfigField("String", "API_BASE_URL", "\"https://dev-api.vhvplatform.com\"")
            buildConfigField("String", "ENVIRONMENT", "\"development\"")
        }
        
        create("staging") {
            dimension = "environment"
            applicationIdSuffix = ".staging"
            versionNameSuffix = "-staging"
            
            resValue("string", "app_name", "VHV App (Staging)")
            buildConfigField("String", "API_BASE_URL", "\"https://staging-api.vhvplatform.com\"")
            buildConfigField("String", "ENVIRONMENT", "\"staging\"")
        }
        
        create("prod") {
            dimension = "environment"
            
            resValue("string", "app_name", "VHV App")
            buildConfigField("String", "API_BASE_URL", "\"https://api.vhvplatform.com\"")
            buildConfigField("String", "ENVIRONMENT", "\"production\"")
        }
    }

    // Build features
    buildFeatures {
        buildConfig = true
        viewBinding = false
        dataBinding = false
    }

    // Packaging options
    packaging {
        resources {
            excludes += setOf(
                "META-INF/LICENSE",
                "META-INF/LICENSE.txt",
                "META-INF/NOTICE",
                "META-INF/NOTICE.txt",
                "META-INF/DEPENDENCIES",
                "META-INF/*.kotlin_module"
            )
        }
    }

    // Lint options
    lint {
        checkReleaseBuilds = false
        abortOnError = false
        disable += "InvalidPackage"
    }

    // Split APKs by ABI for smaller download sizes
    splits {
        abi {
            isEnable = true
            reset()
            include("armeabi-v7a", "arm64-v8a", "x86_64")
            isUniversalApk = true
        }
    }
}

flutter {
    source = "../.."
}

dependencies {
    val kotlinVersion = rootProject.extra["kotlinVersion"]
    implementation("org.jetbrains.kotlin:kotlin-stdlib:$kotlinVersion")
    
    // AndroidX
    implementation("androidx.core:core-ktx:1.15.0")
    implementation("androidx.appcompat:appcompat:1.7.0")
    implementation("com.google.android.material:material:1.12.0")
    
    // Multi-dex
    implementation("androidx.multidex:multidex:2.0.1")
    
    // Testing
    testImplementation("junit:junit:4.13.2")
    androidTestImplementation("androidx.test.ext:junit:1.2.1")
    androidTestImplementation("androidx.test.espresso:espresso-core:3.6.1")
}

// Apply Google Services plugin (Firebase)
apply(plugin = "com.google.gms.google-services")
