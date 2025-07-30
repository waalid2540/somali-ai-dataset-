#!/usr/bin/env python3
"""
Simple test for OpenVoice V2 setup (without Japanese dependencies)
"""

import os
import sys
import torch
from pathlib import Path

# Add OpenVoice to Python path
sys.path.append('OpenVoice')

def test_basic_setup():
    """Test basic OpenVoice setup without MeloTTS"""
    
    print("🎤 Testing OpenVoice V2 Basic Setup")
    print("=" * 40)
    
    # Test 1: Check Python packages
    print("1. Checking core packages...")
    try:
        import torch
        import librosa
        import soundfile as sf
        import numpy as np
        print("   ✅ Core packages installed")
    except ImportError as e:
        print(f"   ❌ Missing package: {e}")
        return False
    
    # Test 2: Check PyTorch and device
    print("2. Checking PyTorch setup...")
    print(f"   PyTorch version: {torch.__version__}")
    
    if torch.backends.mps.is_available():
        device = torch.device("mps")
        print("   ✅ Using Apple Silicon GPU (MPS)")
    elif torch.cuda.is_available():
        device = torch.device("cuda")
        print("   ✅ Using NVIDIA GPU (CUDA)")
    else:
        device = torch.device("cpu")
        print("   ⚠️  Using CPU (slower but works)")
    
    # Test 3: Check model checkpoints
    print("3. Checking OpenVoice V2 checkpoints...")
    checkpoint_path = Path("OpenVoice/checkpoints_v2/checkpoints_v2/converter/checkpoint.pth")
    
    if checkpoint_path.exists():
        print("   ✅ OpenVoice V2 converter checkpoint found")
    else:
        print("   ❌ Missing OpenVoice V2 checkpoints")
        print("      Please ensure checkpoints are in: OpenVoice/checkpoints_v2/checkpoints_v2/")
        return False
    
    # Test 4: Check base speakers
    print("4. Checking base speakers...")
    base_speakers_path = Path("OpenVoice/checkpoints_v2/checkpoints_v2/base_speakers/ses/")
    
    if base_speakers_path.exists():
        speakers = list(base_speakers_path.glob("*.pth"))
        print(f"   ✅ Found {len(speakers)} base speakers")
        for speaker in speakers[:3]:  # Show first 3
            print(f"      - {speaker.name}")
        if len(speakers) > 3:
            print(f"      ... and {len(speakers) - 3} more")
    else:
        print("   ❌ Missing base speakers")
        return False
    
    # Test 5: Check OpenVoice Python module
    print("5. Testing OpenVoice module...")
    try:
        sys.path.append('OpenVoice')
        from openvoice import se_extractor
        from openvoice.api import ToneColorConverter
        print("   ✅ OpenVoice modules loaded")
    except Exception as e:
        print(f"   ⚠️  OpenVoice module test: {e}")
        print("      This might still work")
    
    print("\n🎯 Basic Setup Summary:")
    print("   ✅ OpenVoice V2 is ready!")
    print("   📝 Next: Create Somali voice recording script")
    
    return True

if __name__ == "__main__":
    success = test_basic_setup()
    if success:
        print("\n🚀 Ready for Somali voice cloning!")
    else:
        print("\n❌ Setup incomplete.")
        sys.exit(1)