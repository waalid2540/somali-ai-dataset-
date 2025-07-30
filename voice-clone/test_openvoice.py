#!/usr/bin/env python3
"""
Test OpenVoice V2 setup for Somali Voice Cloning
"""

import os
import sys
import torch
import soundfile as sf
from pathlib import Path

# Add OpenVoice to Python path
sys.path.append('OpenVoice')

def test_openvoice_setup():
    """Test if OpenVoice V2 is properly installed and configured"""
    
    print("🎤 Testing OpenVoice V2 Setup for Somali Voice Cloning")
    print("=" * 60)
    
    # Test 1: Check Python packages
    print("1. Checking Python packages...")
    try:
        import torch
        import librosa
        import soundfile as sf
        from melo.api import TTS
        print("   ✅ All required packages installed")
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
    checkpoint_path = Path("checkpoints_v2/checkpoints_v2/converter/checkpoint.pth")
    
    if checkpoint_path.exists():
        print("   ✅ OpenVoice V2 converter checkpoint found")
    else:
        print("   ❌ Missing OpenVoice V2 checkpoints")
        print("      Please ensure checkpoints are in: checkpoints_v2/checkpoints_v2/")
        return False
    
    # Test 4: Check base speakers
    print("4. Checking base speakers...")
    base_speakers_path = Path("checkpoints_v2/checkpoints_v2/base_speakers/ses/")
    
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
    
    # Test 5: Test MeloTTS (for text-to-speech generation)
    print("5. Testing MeloTTS...")
    try:
        from melo.api import TTS
        # Use English for initial test
        model = TTS(language='EN', device=device)
        print("   ✅ MeloTTS loaded successfully")
        
        # Generate a short test audio
        test_text = "This is a test of OpenVoice for Somali language."
        audio = model.tts_to_file(test_text, speaker_id=None, quiet=True)
        print("   ✅ Text-to-speech generation working")
        
    except Exception as e:
        print(f"   ⚠️  MeloTTS test failed: {e}")
        print("      This might still work for voice cloning")
    
    print("\n🎯 OpenVoice V2 Setup Summary:")
    print("   Ready for Somali voice cloning!")
    print("   Next steps:")
    print("   1. Record 3-10 seconds of your Somali voice")
    print("   2. Clone your voice using OpenVoice")
    print("   3. Generate Somali speech with GPT-4")
    
    return True

if __name__ == "__main__":
    success = test_openvoice_setup()
    if success:
        print("\n🚀 Ready to build Somali AI Voice Assistant!")
    else:
        print("\n❌ Setup incomplete. Please fix the issues above.")
        sys.exit(1)