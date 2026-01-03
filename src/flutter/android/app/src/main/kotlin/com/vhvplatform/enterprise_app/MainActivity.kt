package com.vhvplatform.enterprise_app

import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.MethodChannel
import android.os.Bundle
import android.os.Build
import android.view.WindowManager

class MainActivity: FlutterActivity() {
    
    private val CHANNEL = "com.vhvplatform.enterprise_app/native"
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Configure status bar
        configureStatusBar()
    }
    
    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)
        
        // Setup method channel for native communication
        MethodChannel(flutterEngine.dartExecutor.binaryMessenger, CHANNEL).setMethodCallHandler { call, result ->
            when (call.method) {
                "getPlatformVersion" -> {
                    result.success("Android ${Build.VERSION.RELEASE}")
                }
                "getDeviceInfo" -> {
                    val deviceInfo = mapOf(
                        "brand" to Build.BRAND,
                        "model" to Build.MODEL,
                        "version" to Build.VERSION.RELEASE,
                        "sdk" to Build.VERSION.SDK_INT,
                        "manufacturer" to Build.MANUFACTURER
                    )
                    result.success(deviceInfo)
                }
                "getBuildConfig" -> {
                    val buildInfo = mapOf(
                        "packageName" to packageName,
                        "versionName" to packageManager.getPackageInfo(packageName, 0).versionName,
                        "versionCode" to if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
                            packageManager.getPackageInfo(packageName, 0).longVersionCode
                        } else {
                            @Suppress("DEPRECATION")
                            packageManager.getPackageInfo(packageName, 0).versionCode.toLong()
                        },
                        "buildType" to BuildConfig.BUILD_TYPE,
                        "environment" to BuildConfig.ENVIRONMENT
                    )
                    result.success(buildInfo)
                }
                else -> {
                    result.notImplemented()
                }
            }
        }
    }
    
    private fun configureStatusBar() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS)
            window.statusBarColor = android.graphics.Color.TRANSPARENT
        }
        
        // Enable edge-to-edge
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            window.setDecorFitsSystemWindows(false)
        }
    }
    
    override fun onDestroy() {
        super.onDestroy()
    }
}
