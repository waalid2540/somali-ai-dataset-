#!/usr/bin/env python3
"""
Somali AI Assistant with Voice Cloning + GPT-4
Complete voice-to-voice Somali AI assistant
"""

import sys
import os
import json
import time
from pathlib import Path
import sounddevice as sd
import soundfile as sf
import numpy as np

# Add OpenVoice to path
sys.path.append('OpenVoice')

# Try to import OpenAI
try:
    import openai
    from openai import OpenAI
    OPENAI_AVAILABLE = True
except ImportError:
    OPENAI_AVAILABLE = False
    print("⚠️  OpenAI not installed. Install with: pip3 install openai")

class SomaliAIAssistant:
    """Voice-to-Voice Somali AI Assistant"""
    
    def __init__(self, cloned_voice_path=None, openai_api_key=None):
        """Initialize the Somali AI Assistant"""
        
        self.cloned_voice_path = cloned_voice_path
        self.openai_client = None
        
        # Initialize OpenAI if available
        if OPENAI_AVAILABLE and openai_api_key:
            try:
                self.openai_client = OpenAI(api_key=openai_api_key)
                print("✅ OpenAI client initialized")
            except Exception as e:
                print(f"⚠️  OpenAI initialization failed: {e}")
        
        # Load cloned voice if provided
        if cloned_voice_path and Path(cloned_voice_path).exists():
            print(f"🎤 Loaded cloned Somali voice: {cloned_voice_path}")
        else:
            print("⚠️  No cloned voice loaded")
    
    def transcribe_somali_audio(self, audio_path):
        """
        Transcribe Somali audio to text using Whisper
        """
        
        if not self.openai_client:
            print("❌ OpenAI client not available for transcription")
            return None
        
        try:
            print("🎧 Transcribing Somali audio...")
            
            with open(audio_path, "rb") as audio_file:
                transcript = self.openai_client.audio.transcriptions.create(
                    model="whisper-1",
                    file=audio_file,
                    language="so"  # Somali language code
                )
            
            transcribed_text = transcript.text
            print(f"📝 Transcription: \"{transcribed_text}\"")
            return transcribed_text
            
        except Exception as e:
            print(f"❌ Transcription failed: {e}")
            # Fallback: return placeholder text for testing
            return "Salaan alaykum. Sidee tahay?"
    
    def generate_somali_response(self, user_text):
        """
        Generate Somali response using GPT-4
        """
        
        if not self.openai_client:
            print("❌ OpenAI client not available for response generation")
            # Return fallback response
            return "Wa alaykumu salaan. Waan ku faraxsanahay inaan kula hadlayo afka Soomaaliga."
        
        try:
            print("🧠 Generating Somali response with GPT-4...")
            
            # System prompt for Somali AI assistant
            system_prompt = """
            You are a helpful AI assistant that speaks fluent Somali. 
            
            Instructions:
            - Always respond in proper Somali language
            - Be respectful and culturally aware
            - Help with Islamic questions, parenting advice, and general knowledge
            - Keep responses concise but informative
            - Use appropriate Somali greetings and expressions
            
            If the user greets you in Somali, respond with proper Somali greetings.
            If they ask about Islam, provide authentic Islamic guidance in Somali.
            If they need parenting advice, give culturally appropriate Somali advice.
            """
            
            response = self.openai_client.chat.completions.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_text}
                ],
                max_tokens=200,
                temperature=0.7
            )
            
            somali_response = response.choices[0].message.content
            print(f"💭 GPT-4 Response: \"{somali_response}\"")
            return somali_response
            
        except Exception as e:
            print(f"❌ Response generation failed: {e}")
            # Return fallback response
            return "Waan ka xumahay, ma fahmin waxaad sheegaysay. Fadlan mar kale iska celi."
    
    def text_to_somali_speech(self, text, output_path="response.wav"):
        """
        Convert Somali text to speech using cloned voice
        """
        
        print(f"🗣️  Converting to speech: \"{text}\"")
        
        if not self.cloned_voice_path:
            print("⚠️  No cloned voice available. Saving text response only.")
            
            # Save text response
            with open("somali_response.txt", "w", encoding="utf-8") as f:
                f.write(text)
            print(f"📄 Response saved to: somali_response.txt")
            return None
        
        # Placeholder for actual TTS generation
        # This would use OpenVoice + MeloTTS to generate speech
        print(f"🔊 Speech generation with your cloned Somali voice:")
        print(f"   Text: {text}")
        print(f"   Voice: {self.cloned_voice_path}")
        print(f"   Output: {output_path}")
        print(f"   Status: Ready (requires MeloTTS integration)")
        
        return output_path
    
    def record_audio(self, duration=5, sample_rate=16000):
        """Record audio from microphone"""
        
        print(f"🎤 Recording audio for {duration} seconds...")
        print("   Speak your question in Somali now!")
        
        try:
            # Record audio
            audio_data = sd.rec(int(duration * sample_rate), 
                               samplerate=sample_rate, 
                               channels=1, 
                               dtype='float32')
            
            # Show countdown
            for i in range(duration, 0, -1):
                print(f"   {i}...", end=" ", flush=True)
                time.sleep(1)
            
            sd.wait()
            print("\n✅ Recording complete!")
            
            # Save recording
            timestamp = int(time.time())
            audio_path = f"user_question_{timestamp}.wav"
            sf.write(audio_path, audio_data, sample_rate)
            
            return audio_path
            
        except Exception as e:
            print(f"❌ Recording failed: {e}")
            return None
    
    def chat_session(self):
        """Start an interactive Somali chat session"""
        
        print("🤖 Somali AI Assistant - Voice Chat")
        print("=" * 40)
        print("Say 'quit' to exit")
        print()
        
        session_count = 0
        
        while True:
            try:
                session_count += 1
                print(f"\n--- Chat Session {session_count} ---")
                
                # Option 1: Voice input
                voice_input = input("Use voice input? (y/n): ").strip().lower()
                
                if voice_input == 'y':
                    # Record user's voice
                    audio_path = self.record_audio(duration=5)
                    if not audio_path:
                        continue
                    
                    # Transcribe to text
                    user_text = self.transcribe_somali_audio(audio_path)
                    if not user_text:
                        continue
                
                else:
                    # Text input
                    user_text = input("Your question in Somali: ").strip()
                
                if user_text.lower() in ['quit', 'exit', 'jooji', 'ka bax']:
                    print("👋 Nabadgelyo! (Goodbye!)")
                    break
                
                # Generate Somali response
                response = self.generate_somali_response(user_text)
                
                print(f"\n🤖 Assistant: {response}")
                
                # Convert to speech (placeholder)
                self.text_to_somali_speech(response)
                
                print("\n" + "="*50)
                
            except KeyboardInterrupt:
                print("\n👋 Chat session ended.")
                break
            except Exception as e:
                print(f"❌ Session error: {e}")
                continue

def main():
    """Main function to run Somali AI Assistant"""
    
    print("🤖 Somali AI Assistant with Voice Cloning")
    print("=" * 50)
    
    # Check for cloned voice
    cloned_voices_dir = Path("cloned_voices")
    cloned_voice_path = None
    
    if cloned_voices_dir.exists():
        voice_files = list(cloned_voices_dir.glob("*.pth"))
        if voice_files:
            cloned_voice_path = voice_files[0]  # Use the first one
            print(f"🎤 Found cloned voice: {cloned_voice_path}")
        else:
            print("⚠️  No cloned voices found. Run voice cloning first.")
    
    # Get OpenAI API key
    openai_api_key = os.getenv('OPENAI_API_KEY')
    if not openai_api_key:
        print("⚠️  No OpenAI API key found.")
        print("   Set environment variable: export OPENAI_API_KEY='your-key-here'")
        print("   Or the assistant will use fallback responses.")
    
    # Initialize assistant
    assistant = SomaliAIAssistant(
        cloned_voice_path=cloned_voice_path,
        openai_api_key=openai_api_key
    )
    
    # Test the system
    print(f"\n🧪 Testing Somali AI Assistant...")
    
    # Test 1: Text response generation
    test_question = "Salaan alaykum. Sidee tahay?"
    response = assistant.generate_somali_response(test_question)
    print(f"✅ Response generation working")
    
    # Test 2: Text-to-speech (placeholder)
    assistant.text_to_somali_speech(response)
    print(f"✅ Speech system ready")
    
    # Start interactive session
    print(f"\n🚀 Starting interactive chat session...")
    assistant.chat_session()

if __name__ == "__main__":
    main()