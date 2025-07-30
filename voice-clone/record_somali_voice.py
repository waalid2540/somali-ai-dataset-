#!/usr/bin/env python3
"""
Somali Voice Recording Script for OpenVoice Cloning
Records 3-10 seconds of your Somali voice for voice cloning
"""

import sys
import os
import sounddevice as sd
import soundfile as sf
import numpy as np
from pathlib import Path
import time

def record_somali_voice():
    """Record Somali voice sample for cloning"""
    
    print("🎤 Somali Voice Recording for Voice Cloning")
    print("=" * 50)
    print()
    
    # Create recordings directory
    recordings_dir = Path("recordings")
    recordings_dir.mkdir(exist_ok=True)
    
    # Audio settings
    sample_rate = 22050  # Standard for voice cloning
    duration = 8  # seconds - good balance for quality
    
    print("📋 Recording Instructions:")
    print("   • Speak clearly in Somali")
    print("   • Use your natural voice tone")
    print("   • Record in a quiet environment")
    print("   • Speak for about 8 seconds")
    print()
    
    # Suggested Somali phrases for recording
    sample_phrases = [
        "Magacaygu waa [Your Name]. Waxaan ku hadlayaa afka Soomaaliga.",
        "Allaahu Akbar. Laa ilaaha illa Allah. Subhaan Allah wal hamdu lillah.",
        "Waan ku faraxsanahay inaan kula hadlayo afkeenna hooyo.",
        "Soomaaliya waa dal qurux badan oo taariikh dheer leh.",
        "Barashada luuqadda Soomaaliga waa muhiim u ah carruurteenna."
    ]
    
    print("💡 Suggested Somali phrases to record:")
    for i, phrase in enumerate(sample_phrases, 1):
        print(f"   {i}. {phrase}")
    print()
    
    # Get user choice
    while True:
        try:
            choice = input("Choose a phrase (1-5) or type 'custom' for your own: ").strip().lower()
            
            if choice == 'custom':
                text_to_record = input("Enter your Somali text: ").strip()
                break
            elif choice in ['1', '2', '3', '4', '5']:
                text_to_record = sample_phrases[int(choice) - 1]
                break
            else:
                print("Please enter 1-5 or 'custom'")
                
        except KeyboardInterrupt:
            print("\n❌ Recording cancelled.")
            return None
    
    print(f"\n📝 You will record: \"{text_to_record}\"")
    print()
    
    # Check audio devices
    try:
        devices = sd.query_devices()
        print("🎧 Available audio devices:")
        for i, device in enumerate(devices):
            if device['max_input_channels'] > 0:
                print(f"   {i}: {device['name']} (inputs: {device['max_input_channels']})")
        print()
    except Exception as e:
        print(f"⚠️  Could not list audio devices: {e}")
    
    # Start recording
    input("Press Enter when ready to start recording...")
    
    print("🔴 Recording in...")
    for i in range(3, 0, -1):
        print(f"   {i}...")
        time.sleep(1)
    
    print("🎤 RECORDING NOW! Speak your Somali phrase...")
    
    try:
        # Record audio
        audio_data = sd.rec(int(duration * sample_rate), 
                           samplerate=sample_rate, 
                           channels=1, 
                           dtype='float32')
        
        # Show progress
        for i in range(duration):
            time.sleep(1)
            print(f"   Recording... {i+1}/{duration} seconds")
        
        sd.wait()  # Wait for recording to finish
        
        print("✅ Recording complete!")
        
    except Exception as e:
        print(f"❌ Recording failed: {e}")
        return None
    
    # Save the recording
    timestamp = int(time.time())
    filename = f"somali_voice_{timestamp}.wav"
    filepath = recordings_dir / filename
    
    try:
        sf.write(filepath, audio_data, sample_rate)
        print(f"💾 Saved recording to: {filepath}")
        
        # Analyze the recording
        audio_duration = len(audio_data) / sample_rate
        audio_max = np.max(np.abs(audio_data))
        audio_rms = np.sqrt(np.mean(audio_data**2))
        
        print(f"\n📊 Recording Analysis:")
        print(f"   Duration: {audio_duration:.1f} seconds")
        print(f"   Max amplitude: {audio_max:.3f}")
        print(f"   RMS level: {audio_rms:.3f}")
        
        if audio_max < 0.01:
            print("   ⚠️  Recording seems very quiet. Try speaking louder.")
        elif audio_max > 0.95:
            print("   ⚠️  Recording might be clipped. Try speaking softer.")
        else:
            print("   ✅ Audio levels look good!")
        
        # Save metadata
        metadata_file = recordings_dir / f"somali_voice_{timestamp}_metadata.txt"
        with open(metadata_file, 'w', encoding='utf-8') as f:
            f.write(f"Somali Voice Recording Metadata\n")
            f.write(f"Timestamp: {timestamp}\n")
            f.write(f"Duration: {audio_duration:.1f} seconds\n")
            f.write(f"Sample Rate: {sample_rate} Hz\n")
            f.write(f"Text: {text_to_record}\n")
            f.write(f"Max Amplitude: {audio_max:.3f}\n")
            f.write(f"RMS Level: {audio_rms:.3f}\n")
        
        print(f"📄 Metadata saved to: {metadata_file}")
        
        return {
            'filepath': filepath,
            'text': text_to_record,
            'duration': audio_duration,
            'sample_rate': sample_rate,
            'metadata': metadata_file
        }
        
    except Exception as e:
        print(f"❌ Failed to save recording: {e}")
        return None

def main():
    """Main recording function"""
    
    try:
        # Check if sounddevice is available
        import sounddevice as sd
        import soundfile as sf
    except ImportError as e:
        print(f"❌ Missing audio library: {e}")
        print("   Install with: pip3 install sounddevice soundfile")
        return
    
    result = record_somali_voice()
    
    if result:
        print(f"\n🎉 Success! Your Somali voice is recorded.")
        print(f"   File: {result['filepath']}")
        print(f"   Text: {result['text']}")
        print(f"   Duration: {result['duration']:.1f}s")
        
        print(f"\n🚀 Next Steps:")
        print(f"   1. Use this recording to clone your voice with OpenVoice")
        print(f"   2. Generate Somali speech with your cloned voice")
        print(f"   3. Build Somali AI assistant with GPT-4")
        
    else:
        print(f"\n❌ Recording failed. Please try again.")

if __name__ == "__main__":
    main()