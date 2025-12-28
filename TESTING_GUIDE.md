# Testing Guide - UI Button Functionality & Image Capture

## Quick Start Testing

### Prerequisites
1. Python 3.8+ installed
2. Node.js 14+ installed
3. Webcam connected (for webcam testing)
4. Model file `best.pt` present in root directory

### Setup Steps

#### 1. Install Backend Dependencies
```bash
pip install -r requirements.txt
```

#### 2. Install Frontend Dependencies
```bash
cd frontend
npm install
```

### Running the Application

#### Terminal 1 - Backend Server
```bash
python server.py
```
Expected output:
```
 * Running on http://0.0.0.0:5000
```

#### Terminal 2 - React Frontend
```bash
cd frontend
npm start
```
Expected output:
```
Compiled successfully!
You can now view frontend in the browser.
  Local:            http://localhost:3000
```

## Test Cases

### Test 1: UI Button - ESP32-CAM Switch
**Steps**:
1. Open browser to `http://localhost:3000`
2. Click the **ESP32-CAM** button
3. Check button highlights as active

**Expected Result**:
- ✅ ESP32-CAM button appears highlighted/active
- ✅ No error messages
- ✅ System status shows "Online"

**Actual behavior**: Button sets source to 'esp32' and waits for ESP32 to POST images

---

### Test 2: UI Button - Webcam Switch
**Steps**:
1. Click the **Webcam** button
2. Grant camera permissions if prompted
3. Check button highlights as active

**Expected Result**:
- ✅ Webcam button appears highlighted/active
- ✅ No error messages
- ✅ Camera LED turns on (if your webcam has one)
- ✅ Console shows webcam processing started

**Possible Issues**:
- ❌ Alert: "Failed to switch to Webcam" - Camera in use by another app
- ❌ Alert: "Failed to switch to Webcam" - No camera connected
- ❌ Permission denied - Browser needs camera permissions

**Solutions**:
- Close other apps using webcam (Zoom, Skype, etc.)
- Check camera connection
- Grant permissions in browser settings

---

### Test 3: Image Capture on Detection (Webcam)
**Note**: This requires having actual insects to detect, or using test images

**Steps**:
1. Switch to Webcam
2. Hold up a picture of an insect (Aphids, Mites, Thrips, Whitefly) to camera
3. Wait 5 seconds for confirmation
4. Check if image appears in UI

**Expected Result**:
- ✅ After 5 seconds, captured image appears in main display area
- ✅ Image shows bounding box around detected insect
- ✅ Label shows pest name and confidence %
- ✅ Alert notification appears at top
- ✅ Detection info panel shows:
  - Pest name
  - Confidence level
  - Current date and time
  - LED color (Blue for Aphids/Mites, Red for Thrips/Whitefly)
- ✅ Timer starts (20 minutes)
- ✅ Detection added to history list

**File System Check**:
```bash
ls detected_images/
```
Should show: `{PestName}_{timestamp}.jpg`

---

### Test 4: Image Persistence
**Steps**:
1. After detection, move insect away from camera
2. Wait a few seconds
3. Check UI

**Expected Result**:
- ✅ Captured image still visible
- ✅ Detection info shows "NO CURRENT THREATS"
- ✅ Last detection information displayed
- ✅ Image persists until next detection

---

### Test 5: Multiple Detections
**Steps**:
1. Detect one insect type (e.g., Aphids)
2. Wait for capture
3. Detect different insect type (e.g., Thrips)
4. Wait for capture

**Expected Result**:
- ✅ New image replaces old image
- ✅ Detection history shows both detections
- ✅ Alerts show for both detections
- ✅ LED color changes based on new detection
- ✅ Two image files in `detected_images/` directory

---

### Test 6: Error Handling - No Camera
**Steps**:
1. Disconnect webcam (or ensure no camera available)
2. Click Webcam button

**Expected Result**:
- ✅ Alert message: "Failed to switch to Webcam. Please ensure your Webcam is connected..."
- ✅ Source does not change
- ✅ ESP32-CAM remains active

---

### Test 7: Status Polling
**Steps**:
1. Open browser console (F12)
2. Watch network tab
3. Look for requests to `/get_status`

**Expected Result**:
- ✅ `/get_status` called every 500ms
- ✅ Response includes:
  ```json
  {
    "pest": "None" or "{PestName}",
    "pattern": 1-4,
    "confidence": 0-100,
    "active": true/false,
    "remaining_time": seconds,
    "source": "esp32" or "webcam",
    "image": "base64..." or null
  }
  ```

---

### Test 8: Detection History
**Steps**:
1. Perform multiple detections (3-5)
2. Check Detection History panel on right side

**Expected Result**:
- ✅ History shows up to 10 recent detections
- ✅ Each entry shows:
  - Pest name
  - Confidence %
  - Date
  - Time
- ✅ Most recent detection at top
- ✅ Oldest detections removed when limit exceeded

---

## Visual Verification Checklist

### When No Detection
- [ ] Placeholder icon (bug) visible in main area
- [ ] Status badge shows "MONITORING"
- [ ] Message: "No insects detected yet"
- [ ] ESP32-CAM or Webcam button highlighted
- [ ] System status shows "Online"

### When Detection Active
- [ ] Captured image visible in main area
- [ ] Bounding box visible around insect
- [ ] Label shows "{PestName} {XX}%"
- [ ] Status badge shows "ACTIVE DETECTION" (red)
- [ ] Alert notification at top
- [ ] Detection info grid shows all details
- [ ] LED indicator shows correct color
- [ ] Timer shows countdown (20:00 → 19:59...)

### When Detection Cleared
- [ ] Image still visible
- [ ] Status badge shows "NO CURRENT THREATS" (green)
- [ ] Detection info shows "Last Detected"
- [ ] History updated with detection

---

## Debugging Tips

### Backend Issues

**Check Backend Logs**:
```bash
# In terminal running server.py
# Look for:
- "Waiting for confirmation..." - Detection started
- Error messages about model loading
- Error messages about image saving
```

**Check Image Files**:
```bash
ls -lh detected_images/
# Should show JPEG files with timestamps
```

**Test Model Loading**:
```bash
python -c "from ultralytics import YOLO; model = YOLO('best.pt'); print('Model loaded')"
```

### Frontend Issues

**Check Browser Console**:
- F12 → Console tab
- Look for errors in red
- Check for failed API calls

**Check Network Tab**:
- F12 → Network tab
- Filter: "Fetch/XHR"
- Look for `/get_status` and `/switch_source` calls
- Check response codes (200 = success, 500 = error)

**Clear Cache**:
```bash
# In frontend directory
rm -rf node_modules
npm install
npm start
```

### Common Issues

**Issue**: "No module named 'ultralytics'"
**Solution**: `pip install -r requirements.txt`

**Issue**: "Cannot find module 'axios'"
**Solution**: `cd frontend && npm install`

**Issue**: "Failed to open webcam"
**Solutions**:
- Close other apps using camera
- Try different browser
- Check camera permissions
- Restart computer

**Issue**: "Images not displaying"
**Solutions**:
- Check backend console for errors
- Verify `detected_images/` directory exists
- Check browser console for base64 errors
- Verify `/get_status` returns image data

**Issue**: "Detection not happening"
**Solutions**:
- Check confidence threshold (default 45%)
- Ensure good lighting
- Use clear images of insects
- Check if model file (best.pt) is present
- Verify insect is in PEST_CLASSES list

---

## Performance Metrics

Expected performance:
- **Status polling**: 500ms (2 updates/second)
- **Webcam FPS**: ~10 FPS
- **Detection delay**: 5 seconds (confirmation period)
- **Image capture time**: <100ms
- **Base64 encoding**: <50ms
- **API response time**: <100ms

---

## Manual Test Checklist

Before marking PR as complete:

- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] ESP32-CAM button works
- [ ] Webcam button works
- [ ] Webcam error handling works (unplug camera test)
- [ ] Image capture works on detection
- [ ] Images saved to detected_images/
- [ ] Images display in UI
- [ ] Bounding boxes visible
- [ ] Detection info accurate
- [ ] LED color correct
- [ ] Timer counts down
- [ ] Alerts appear
- [ ] History updates
- [ ] Multiple detections work
- [ ] Source switching works
- [ ] No console errors
- [ ] No memory leaks (run for 5+ minutes)

---

## Test Data

If you don't have real insects, you can use:
1. **Printed images** of insects from the internet
2. **Photos on phone screen** of insects
3. **Sample test images** (if provided in repo)

Search for images of:
- Aphids
- Spider Mites
- Red Spider Mites
- Thrips
- Whitefly

Print or display them to the camera for testing.

---

## Automated Testing (Future)

For automated testing, consider:
- Unit tests for backend functions
- Integration tests for API endpoints
- E2E tests with Selenium/Playwright
- Mock image data for consistent testing

---

## Support

If you encounter issues:
1. Check this guide first
2. Review UI_FUNCTIONALITY_GUIDE.md
3. Check backend logs
4. Check browser console
5. Create issue with details
