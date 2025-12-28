# UI Features Guide - Insect Detection System

## Overview

This document describes all the UI features that have been implemented to meet the requirements:
- ✅ No live video stream
- ✅ Show detected insect picture
- ✅ Show insect name
- ✅ Detection history display
- ✅ 5-second delay before light change
- ✅ 20-minute treatment duration

---

## Main UI Components

### 1. Detection Display Panel (Left Side)

This is the main panel that shows detected insect information.

**When Insect is Detected (ACTIVE):**
```
┌─────────────────────────────────────────┐
│  🚨 ACTIVE DETECTION                    │
├─────────────────────────────────────────┤
│                                         │
│     [CAPTURED INSECT IMAGE]             │
│     (Actual photo from detection)       │
│                                         │
├─────────────────────────────────────────┤
│  Detected Pest     │  Confidence Level  │
│  APHIDS           │  95%               │
├─────────────────────────────────────────┤
│  Date              │  Time              │
│  12/28/2025       │  5:02:35 PM        │
├─────────────────────────────────────────┤
│  LED Repellent     │                    │
│  🔵 Blue          │                    │
└─────────────────────────────────────────┘
```

**Features:**
- Shows the ACTUAL captured image (not live video)
- Displays insect name in large, bold text
- Shows confidence percentage from AI model
- Displays date and time of detection
- Shows which LED color is being used
- Visual LED indicator with color glow

**When No Detection (MONITORING):**
```
┌─────────────────────────────────────────┐
│  👁️ MONITORING                         │
├─────────────────────────────────────────┤
│                                         │
│           🐛 (Large Icon)               │
│                                         │
│       No Detection Yet                  │
│                                         │
│  The system is actively monitoring      │
│  for pests. Captured images will        │
│  appear when insects are detected.      │
│                                         │
└─────────────────────────────────────────┘
```

---

### 2. Detection History Panel (Right Side)

Shows a scrollable list of past detections with complete details.

```
┌─────────────────────────────────────┐
│  📊 Detection History               │
├─────────────────────────────────────┤
│                                     │
│  ┌────────────────────────────┐    │
│  │ APHIDS              95%    │    │
│  │ 📅 12/28/2025              │    │
│  │ 🕒 5:02:35 PM              │    │
│  │ 💡 LED: 🔵 Blue           │    │
│  └────────────────────────────┘    │
│                                     │
│  ┌────────────────────────────┐    │
│  │ THRIPS              87%    │    │
│  │ 📅 12/28/2025              │    │
│  │ 🕒 4:45:12 PM              │    │
│  │ 💡 LED: 🔴 Red            │    │
│  └────────────────────────────┘    │
│                                     │
│  ┌────────────────────────────┐    │
│  │ WHITEFLY            92%    │    │
│  │ 📅 12/28/2025              │    │
│  │ 🕒 4:30:05 PM              │    │
│  │ 💡 LED: 🔴 Red            │    │
│  └────────────────────────────┘    │
│                                     │
│  [Scrollable - Shows last 10]       │
│                                     │
└─────────────────────────────────────┘
```

**Information Displayed:**
1. **Insect Name** - Bold, prominent display
2. **Confidence %** - AI model confidence level
3. **Date** - When detection occurred
4. **Time** - Exact time of detection
5. **LED Color** - Which light pattern was used
   - 🔵 Blue for Aphids/Mites/RedSpider
   - 🔴 Red for Thrips/Whitefly
   - 🟣 Purple for Safe Mode

**Features:**
- Keeps last 10 detections
- Scrollable if more than fits on screen
- Updates in real-time
- Shows "No detections yet" when empty

---

### 3. Treatment Timer (Right Side)

Displays countdown when LED treatment is active.

```
┌─────────────────────────────────────┐
│  ⏱️ Treatment Timer                 │
├─────────────────────────────────────┤
│                                     │
│         19:45                       │
│      (MM:SS format)                 │
│                                     │
│  Treatment remaining                │
│                                     │
└─────────────────────────────────────┘
```

**Behavior:**
- Shows "00:00" when no treatment active
- Counts down from 20:00 when treatment starts
- Updates every 500ms
- Shows "INACTIVE" label when not treating
- Shows "ACTIVE" label during treatment

---

### 4. Alert Notifications (Top Right)

Pop-up alerts that appear when new insect is detected.

```
      ┌────────────────────────────┐
      │ 🐛 PEST DETECTED      [×]  │
      ├────────────────────────────┤
      │ Aphids detected!           │
      │ Confidence: 95%            │
      │ LED Repellent: Blue        │
      │ Treatment: 20 minutes      │
      └────────────────────────────┘
```

**Features:**
- Slides in from right side
- Auto-dismisses or manual close
- Shows key detection info
- Multiple alerts can stack
- Red border for emphasis

---

### 5. Analysis Panel (Right Side)

Shows current system status and active LED pattern.

```
┌─────────────────────────────────────┐
│  📊 Live Analysis                   │
├─────────────────────────────────────┤
│                                     │
│  Current Detection                  │
│  APHIDS                             │
│                                     │
│  LED Pattern                        │
│  Pattern 2 - Blue Light             │
│  Repellent Mode                     │
│                                     │
└─────────────────────────────────────┘
```

**Shows:**
- Currently detected pest (or "None")
- Active LED pattern number
- LED color and mode description
- Visual color indicator

---

### 6. Source Selector (Right Side)

Allows switching between camera sources.

```
┌─────────────────────────────────────┐
│  📹 Source Selection                │
├─────────────────────────────────────┤
│                                     │
│  ┌──────────┐  ┌──────────┐       │
│  │ ESP32-CAM│  │  Webcam  │       │
│  │  [ACTIVE]│  │          │       │
│  └──────────┘  └──────────┘       │
│                                     │
└─────────────────────────────────────┘
```

**Features:**
- Toggle between ESP32-CAM and Webcam
- Active source highlighted
- Instant switching

---

## Detection Flow (How It Works)

### Step-by-Step Process:

```
1. System Monitoring
   └─> Continuous image capture from ESP32-CAM/Webcam
       
2. Insect Detected (First Time)
   └─> Starts 5-second confirmation timer
       └─> Status: "Waiting for confirmation..."
           └─> LED stays in Purple (Safe Mode)

3. After 5 Seconds
   └─> If insect still present:
       ├─> ✅ Captures and saves image
       ├─> ✅ Encodes image to base64
       ├─> ✅ Sends to UI for display
       ├─> ✅ Changes LED color based on insect:
       │   ├─> Aphids/Mites/RedSpider → Blue
       │   └─> Thrips/Whitefly → Red
       ├─> ✅ Starts 20-minute timer
       ├─> ✅ Shows alert notification
       └─> ✅ Adds to detection history

4. During 20-Minute Treatment
   └─> LED color remains constant
       └─> Timer counts down
           └─> UI shows time remaining

5. After 20 Minutes
   └─> Treatment ends
       └─> LED returns to Purple (Safe Mode)
           └─> Ready for next detection
```

---

## UI Update Mechanism

### Real-Time Polling:

The UI polls the backend every 500ms (0.5 seconds) to get:
```javascript
GET /get_status
{
  "pest": "Aphids",           // Current insect name
  "pattern": 2,               // LED pattern number
  "confidence": 95,           // AI confidence %
  "active": true,             // Treatment active?
  "remaining_time": 1195,     // Seconds remaining
  "source": "esp32",          // Active camera source
  "image": "base64..."        // Captured image data
}
```

This ensures:
- ✅ Real-time updates without refresh
- ✅ Immediate alert notifications
- ✅ Live timer countdown
- ✅ Instant history updates

---

## Image Display Details

### How Captured Images Are Shown:

1. **Backend Process:**
   ```python
   # When insect confirmed after 5 seconds:
   cv2.imwrite(image_path, img)              # Save to disk
   _, buffer = cv2.imencode('.jpg', img)      # Encode to JPEG
   base64_image = base64.b64encode(buffer)    # Convert to base64
   ```

2. **Frontend Display:**
   ```javascript
   // Display base64 image directly
   <img src={`data:image/jpeg;base64,${detectionImage}`} />
   ```

3. **Benefits:**
   - No live video stream (as required)
   - Only shows captured detection moments
   - Efficient data transfer
   - No additional file requests needed

---

## LED Color Patterns

### Visual Guide:

**Pattern 1 - Purple (Safe/Growth Mode)**
```
🟣 Purple Light
- Default state
- No pests detected
- Promotes plant growth
```

**Pattern 2 - Blue (Repellent Mode)**
```
🔵 Blue Light
- For: Aphids, Mites, Red Spider
- Scientific basis: Repellent wavelength
- Duration: 20 minutes
```

**Pattern 4 - Red (Masking Mode)**
```
🔴 Red Light
- For: Thrips, Whitefly
- Scientific basis: Visual masking
- Duration: 20 minutes
```

---

## Responsive Design

The UI adapts to different screen sizes:

**Desktop (1920px+):**
- 2-column layout
- Left: Detection display (larger)
- Right: Controls and history (smaller)

**Tablet (768px - 1200px):**
- Single column layout
- Full-width components
- Stacked vertically

**Mobile (< 768px):**
- Optimized for small screens
- Touch-friendly buttons
- Larger text and icons

---

## Accessibility Features

1. **High Contrast Colors:**
   - Red for alerts and danger
   - Green for success
   - Blue for information
   - Clear text against backgrounds

2. **Large, Readable Text:**
   - Detection names: 28-42px
   - Timer: 48px
   - Body text: 14-16px

3. **Icons:**
   - React Icons library
   - Clear, recognizable symbols
   - Paired with text labels

4. **Status Indicators:**
   - Color-coded LED dots
   - Pulsing animations
   - Text labels for clarity

---

## Animation Effects

1. **Alert Notifications:**
   - Slide-in from right
   - Smooth 0.3s transition

2. **Status Indicators:**
   - Pulsing glow effect
   - 2s animation cycle

3. **Hover Effects:**
   - Button lift on hover
   - Shadow expansion
   - Color changes

4. **Insect Icon:**
   - Subtle pulse when active
   - Scale animation (1.0 → 1.05)

---

## Summary

### What Users See:

✅ **NO LIVE VIDEO** - Only captured images when insects are detected
✅ **INSECT PICTURES** - Actual photos displayed with detection
✅ **INSECT NAMES** - Clear, bold display of detected species
✅ **DETECTION HISTORY** - Complete log with date, time, confidence, LED color
✅ **5-SECOND DELAY** - Visible waiting period before LED changes
✅ **20-MINUTE TIMER** - Countdown display shows treatment duration

### What Users Don't See:

❌ Live video streaming
❌ Continuous camera feed
❌ Real-time video playback

### What Makes This Special:

- **Focused on Detections:** Only shows important moments
- **Complete Information:** All relevant data in one place
- **Professional Design:** Clean, modern interface
- **Real-Time Updates:** No page refresh needed
- **Historical Tracking:** Keep records of all detections
- **Scientific Accuracy:** LED colors based on research

---

## Technical Excellence

- **React 18** - Latest framework version
- **500ms Polling** - Near real-time updates
- **Base64 Encoding** - Efficient image transfer
- **Component Architecture** - Modular, maintainable
- **Responsive CSS** - Works on all devices
- **Error Handling** - Graceful failures
- **State Management** - Proper React hooks
- **API Integration** - Clean REST endpoints

---

Last Updated: 2025-12-28
