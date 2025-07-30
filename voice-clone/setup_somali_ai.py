#!/usr/bin/env python3
"""
Complete Setup Guide for Somali AI Voice Assistant
Step-by-step setup and usage guide
"""

import sys
import os
from pathlib import Path
import subprocess

def print_header(title):
    """Print a formatted header"""
    print("\n" + "="*60)
    print(f"🚀 {title}")
    print("="*60)

def run_command(description, command):
    """Run a command with description"""
    print(f"\n📋 {description}")
    print(f"💻 Running: {command}")
    
    try:
        result = subprocess.run(command, shell=True, capture_output=True, text=True)
        if result.returncode == 0:
            print("✅ Success!")
            return True
        else:
            print(f"❌ Failed: {result.stderr}")
            return False
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def check_file_exists(filepath, description):
    """Check if a file exists"""
    if Path(filepath).exists():
        print(f"✅ {description}: {filepath}")
        return True
    else:
        print(f"❌ Missing {description}: {filepath}")
        return False

def main():
    """Complete setup guide"""
    
    print_header("Somali AI Voice Assistant Setup")
    
    print("""
🎯 What we're building:
   1. Record your Somali voice (3-10 seconds)
   2. Clone your voice using OpenVoice
   3. Build GPT-4 powered Somali AI assistant
   4. Voice-to-voice conversations in Somali

📋 Requirements:
   ✅ macOS with Apple Silicon (M1/M2) or Intel
   ✅ Python 3.9+ with required packages
   ✅ Microphone for recording
   ✅ OpenAI API key (optional, for GPT-4)
    """)
    
    # Step 1: Check environment
    print_header("Step 1: Environment Check")
    
    # Check Python version
    python_version = sys.version_info
    if python_version >= (3, 9):
        print(f"✅ Python {python_version.major}.{python_version.minor}.{python_version.micro}")
    else:
        print(f"❌ Python {python_version.major}.{python_version.minor} (need 3.9+)")
        return
    
    # Check essential files
    essential_files = [
        ("OpenVoice repository", "OpenVoice"),
        ("Voice recording script", "record_somali_voice.py"),
        ("Voice cloning script", "somali_voice_clone.py"),
        ("AI assistant script", "somali_ai_assistant.py"),
        ("OpenVoice checkpoints", "OpenVoice/checkpoints_v2/checkpoints_v2/converter/checkpoint.pth")
    ]
    
    all_files_present = True
    for description, filepath in essential_files:
        if not check_file_exists(filepath, description):
            all_files_present = False
    
    if not all_files_present:
        print("\n❌ Missing required files. Please ensure complete setup.")
        return
    
    # Step 2: Test setup
    print_header("Step 2: Test Basic Setup")
    
    print("🧪 Testing OpenVoice setup...")
    if run_command("Running OpenVoice test", "python3 simple_test.py"):
        print("✅ OpenVoice is ready!")
    else:
        print("❌ OpenVoice setup issues. Check the error above.")
        return
    
    # Step 3: Voice recording
    print_header("Step 3: Record Your Somali Voice")
    
    recordings_dir = Path("recordings")
    existing_recordings = list(recordings_dir.glob("*.wav")) if recordings_dir.exists() else []
    
    if existing_recordings:
        print(f"📁 Found {len(existing_recordings)} existing recording(s):")
        for recording in existing_recordings:
            print(f"   - {recording.name}")
        
        use_existing = input("\n🤔 Use existing recording? (y/n): ").strip().lower()
        if use_existing != 'y':
            print("\n🎤 Starting voice recording...")
            run_command("Recording your Somali voice", "python3 record_somali_voice.py")
    else:
        print("\n🎤 No existing recordings found. Let's record your voice!")
        run_command("Recording your Somali voice", "python3 record_somali_voice.py")
    
    # Step 4: Voice cloning
    print_header("Step 4: Clone Your Voice")
    
    cloned_voices_dir = Path("cloned_voices")
    existing_clones = list(cloned_voices_dir.glob("*.pth")) if cloned_voices_dir.exists() else []
    
    if existing_clones:
        print(f"🧬 Found {len(existing_clones)} cloned voice(s):")
        for clone in existing_clones:
            print(f"   - {clone.name}")
        
        clone_again = input("\n🤔 Clone voice again? (y/n): ").strip().lower()
        if clone_again == 'y':
            print("\n🔬 Starting voice cloning...")
            run_command("Cloning your Somali voice", "python3 somali_voice_clone.py")
    else:
        print("\n🔬 No cloned voices found. Let's clone your voice!")
        run_command("Cloning your Somali voice", "python3 somali_voice_clone.py")
    
    # Step 5: Setup OpenAI (optional)
    print_header("Step 5: OpenAI API Setup (Optional)")
    
    openai_key = os.getenv('OPENAI_API_KEY')
    if openai_key:
        print("✅ OpenAI API key found in environment")
    else:
        print("⚠️  No OpenAI API key found")
        print("   Without API key, the assistant will use fallback responses")
        print("   To get full GPT-4 integration:")
        print("   1. Get API key from: https://platform.openai.com/api-keys")
        print("   2. Set environment variable: export OPENAI_API_KEY='your-key-here'")
        
        setup_key = input("\n🤔 Do you want to set up OpenAI API key now? (y/n): ").strip().lower()
        if setup_key == 'y':
            api_key = input("Enter your OpenAI API key: ").strip()
            if api_key:
                print(f"\n💡 Add this to your shell profile (~/.zshrc or ~/.bash_profile):")
                print(f"   export OPENAI_API_KEY='{api_key}'")
                print("   Then restart your terminal or run: source ~/.zshrc")
    
    # Step 6: Test the complete system
    print_header("Step 6: Test Complete System")
    
    print("🧪 Testing the complete Somali AI Assistant...")
    print("   This will test:")
    print("   ✅ Voice cloning integration")
    print("   ✅ GPT-4 Somali responses")
    print("   ✅ Text-to-speech pipeline")
    
    test_system = input("\n🤔 Run complete system test? (y/n): ").strip().lower()
    if test_system == 'y':
        run_command("Testing Somali AI Assistant", "python3 somali_ai_assistant.py")
    
    # Final instructions
    print_header("🎉 Setup Complete!")
    
    print("""
✅ Your Somali AI Voice Assistant is ready!

📚 Quick Reference:
   🎤 Record voice:     python3 record_somali_voice.py
   🔬 Clone voice:      python3 somali_voice_clone.py  
   🤖 AI Assistant:     python3 somali_ai_assistant.py
   🧪 Test setup:       python3 simple_test.py

🚀 Usage Examples:
   1. Voice Chat: Run AI assistant and use voice input
   2. Text Chat: Type Somali questions, get Somali responses
   3. Voice Clone: Generate speech in your cloned voice

💡 Tips:
   - Speak clearly in Somali for best results
   - Use quiet environment for recording
   - Set OPENAI_API_KEY for full GPT-4 integration
   - Your cloned voice works for any Somali text

🌟 Perfect for:
   - Islamic education in Somali
   - Parenting guidance 
   - Language preservation
   - SaaS product demos
   - Da'wah content creation

Baraka Allahu feeki! (May Allah bless you!)
    """)

if __name__ == "__main__":
    main()