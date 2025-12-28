# YOLO Model Information

## Model Version Verification

This document contains the verified information about the YOLO model used in this project.

### Model Details

- **YOLO Version**: YOLOv11
- **Model Size**: Nano (n)
- **Full Model Name**: YOLOv11n
- **Model File**: `best.pt`
- **Architecture File**: `yolo11n.yaml`

### Model Configuration

- **Task**: Object Detection
- **Number of Classes**: 5
- **Detected Classes**:
  1. Aphids
  2. Mites
  3. RedSpider
  4. Thrips
  5. Whitefly

### Training Information

- **Training Date**: 2025-12-23
- **Model Architecture**: DetectionModel
- **Backbone**: Custom YOLOv11n architecture with:
  - Conv layers
  - C3k2 blocks
  - SPPF (Spatial Pyramid Pooling Fast)
  - C2PSA (Cross-Stage Partial with Self-Attention)

### Verification Method

The model version was verified by inspecting the model file structure:
```python
from ultralytics import YOLO
import torch

model = YOLO('best.pt')
model_data = torch.load('best.pt', map_location='cpu', weights_only=False)

# The yaml_file field in the model architecture confirms:
# yaml_file: yolo11n.yaml
```

### Key Findings

✅ **Confirmed**: This project uses **YOLOv11n** (YOLO version 11, Nano size)
- The model architecture file is `yolo11n.yaml`
- Model was trained on 2025-12-23
- Optimized for insect detection with 5 specific classes

### Why YOLOv11n?

**YOLOv11n** (Nano) is the smallest and fastest variant of YOLOv11:
- **Nano size**: Optimized for edge devices and real-time applications
- **Ideal for ESP32-CAM**: Low computational requirements
- **Fast inference**: Quick detection suitable for IoT applications
- **Good accuracy**: Maintains detection quality while being lightweight

### Documentation Updates

All project documentation has been updated to correctly reference YOLOv11n instead of the previous YOLOv8 references:
- README.md
- INSTALLATION.md
- PROJECT_SUMMARY.md
- SYSTEM_CHECK_REPORT.md
- VSCODE_INSTALLATION_GUIDE.md
- server.py

---

**Last Verified**: December 28, 2025
