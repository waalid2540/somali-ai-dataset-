#!/usr/bin/env python3
"""
Somali Voice Cloning Pipeline using OpenVoice V2
Clones your Somali voice and generates speech from text
"""

import sys
import os
import torch
import torchaudio
import librosa
import soundfile as sf
import numpy as np
from pathlib import Path
import time

# Add OpenVoice to Python path
sys.path.append('OpenVoice')

def clone_somali_voice(reference_audio_path, output_dir="cloned_voices"):
    """
    Clone a Somali voice using OpenVoice V2
    
    Args:
        reference_audio_path: Path to the reference Somali voice recording
        output_dir: Directory to save the cloned voice model
    
    Returns:
        dict: Information about the cloned voice
    """
    
    print("🔬 Somali Voice Cloning with OpenVoice V2")
    print("=" * 50)
    
    try:
        from openvoice import se_extractor
        from openvoice.api import ToneColorConverter
    except ImportError as e:
        print(f"❌ OpenVoice import failed: {e}")
        print("   Make sure OpenVoice is properly installed")
        return None
    
    # Setup device
    if torch.backends.mps.is_available():
        device = "mps"
        print("🚀 Using Apple Silicon GPU (MPS)")
    elif torch.cuda.is_available():
        device = "cuda"
        print("🚀 Using NVIDIA GPU (CUDA)")
    else:
        device = "cpu"
        print("💻 Using CPU")
    
    # Paths to OpenVoice models
    ckpt_converter = 'OpenVoice/checkpoints_v2/checkpoints_v2/converter'
    
    print(f"📁 Loading OpenVoice models from: {ckpt_converter}")
    
    try:
        # Initialize the tone color converter
        tone_color_converter = ToneColorConverter(f'{ckpt_converter}/config.json', device=device)
        tone_color_converter.load_ckpt(f'{ckpt_converter}/checkpoint.pth')
        
        print("✅ OpenVoice converter loaded successfully")
        
    except Exception as e:
        print(f"❌ Failed to load OpenVoice converter: {e}")
        return None
    
    # Load and process the reference audio
    print(f"🎵 Processing reference audio: {reference_audio_path}")
    
    try:
        # Load audio file
        if not Path(reference_audio_path).exists():
            print(f"❌ Reference audio file not found: {reference_audio_path}")
            return None
        
        # Load audio with librosa
        audio, sr = librosa.load(reference_audio_path, sr=None)
        
        # Ensure audio is the right sample rate (16kHz for SE)
        if sr != 16000:
            audio = librosa.resample(audio, orig_sr=sr, target_sr=16000)
            sr = 16000
            print(f"🔄 Resampled audio to 16kHz")
        
        # Save processed audio temporarily
        temp_audio_path = "temp_reference.wav"
        sf.write(temp_audio_path, audio, sr)
        
        print(f"✅ Audio processed: {len(audio)/sr:.1f}s at {sr}Hz")
        
    except Exception as e:
        print(f"❌ Failed to process reference audio: {e}")
        return None
    
    # Extract speaker embedding (tone color)
    print("🧬 Extracting speaker embedding from your Somali voice...")
    
    try:
        # Extract speaker embedding
        target_se, audio_name = se_extractor.get_se(
            temp_audio_path, 
            tone_color_converter, 
            vad=False  # Voice Activity Detection
        )
        
        print("✅ Speaker embedding extracted successfully")
        
        # Create output directory
        output_path = Path(output_dir)
        output_path.mkdir(exist_ok=True)
        
        # Save the speaker embedding
        timestamp = int(time.time())
        se_save_path = output_path / f"somali_voice_embedding_{timestamp}.pth"
        torch.save(target_se, se_save_path)
        
        print(f"💾 Speaker embedding saved to: {se_save_path}")
        
        # Clean up temporary file
        if os.path.exists(temp_audio_path):
            os.remove(temp_audio_path)
        
        # Return cloning information
        cloned_voice_info = {
            'embedding_path': se_save_path,
            'original_audio': reference_audio_path,
            'timestamp': timestamp,
            'device': device,
            'audio_duration': len(audio) / sr,
            'sample_rate': sr,
            'embedding_shape': target_se.shape if hasattr(target_se, 'shape') else 'unknown'
        }
        
        print(f"\n🎉 Voice Cloning Complete!")
        print(f"   Embedding saved: {se_save_path}")
        print(f"   Original duration: {cloned_voice_info['audio_duration']:.1f}s")
        print(f"   Device used: {device}")
        
        return cloned_voice_info
        
    except Exception as e:
        print(f"❌ Failed to extract speaker embedding: {e}")
        # Clean up temporary file
        if os.path.exists(temp_audio_path):
            os.remove(temp_audio_path)
        return None

def generate_somali_speech(text, cloned_voice_path, output_path="output.wav", base_speaker="en-newest"):
    """
    Generate Somali speech using cloned voice
    
    Args:
        text: Somali text to convert to speech
        cloned_voice_path: Path to the cloned voice embedding
        output_path: Where to save the generated audio
        base_speaker: Base speaker model to use
    
    Returns:
        str: Path to generated audio file
    """
    
    print(f"🗣️  Generating Somali Speech")
    print(f"Text: \"{text}\"")
    print("=" * 50)
    
    try:
        from openvoice.api import ToneColorConverter
        # We'll need MeloTTS for text-to-speech generation
        # For now, let's create a placeholder that explains the process
        
        print("📝 Speech Generation Process:")
        print("   1. Convert Somali text to phonemes")
        print("   2. Generate base speech with MeloTTS")
        print("   3. Apply your cloned voice tone color")
        print("   4. Save final Somali speech audio")
        
        # This is where we would integrate with MeloTTS
        # But MeloTTS has Japanese dependency issues on macOS
        
        print(f"\n⚠️  Note: Full speech generation requires MeloTTS")
        print(f"   Your voice is successfully cloned at: {cloned_voice_path}")
        print(f"   Next: Integrate with GPT-4 for Somali AI assistant")
        
        return None
        
    except Exception as e:
        print(f"❌ Speech generation failed: {e}")
        return None

def main():
    """Main voice cloning function"""
    
    print("🎤 Somali Voice Cloning System")
    print("=" * 40)
    
    # Check for recorded voice files
    recordings_dir = Path("recordings")
    if not recordings_dir.exists() or not list(recordings_dir.glob("*.wav")):
        print("❌ No voice recordings found!")
        print("   Please run: python3 record_somali_voice.py first")
        return
    
    # List available recordings
    audio_files = list(recordings_dir.glob("*.wav"))
    print(f"📁 Found {len(audio_files)} voice recording(s):")
    
    for i, audio_file in enumerate(audio_files, 1):
        print(f"   {i}. {audio_file.name}")
    
    # Get user choice
    if len(audio_files) == 1:
        chosen_file = audio_files[0]
        print(f"🎯 Using: {chosen_file.name}")
    else:
        try:
            choice = int(input(f"\nChoose recording (1-{len(audio_files)}): ")) - 1
            chosen_file = audio_files[choice]
        except (ValueError, IndexError):
            print("❌ Invalid choice")
            return
    
    # Clone the voice
    print(f"\n🔬 Cloning voice from: {chosen_file}")
    cloning_result = clone_somali_voice(chosen_file)
    
    if cloning_result:
        print(f"\n✅ Voice cloning successful!")
        
        # Test speech generation (placeholder for now)
        test_text = "Salaan alaykum. Magacaygu waa AI Assistant. Waxaan ku hadlayaa afka Soomaaliga."
        print(f"\n🧪 Testing speech generation...")
        generate_somali_speech(test_text, cloning_result['embedding_path'])
        
        print(f"\n🚀 Next Steps:")
        print(f"   1. Your Somali voice is cloned and ready!")
        print(f"   2. Embedding saved at: {cloning_result['embedding_path']}")
        print(f"   3. Ready to integrate with GPT-4 for Somali AI assistant")
        
    else:
        print(f"\n❌ Voice cloning failed. Please check the audio file and try again.")

if __name__ == "__main__":
    main()