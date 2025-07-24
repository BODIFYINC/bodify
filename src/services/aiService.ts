
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyChXew438SvjG8xIVBbOhifxJN6TZrCKys");

const modelConfig = {
  temperature: 0.7,
  topK: 40,
  topP: 0.95,
  maxOutputTokens: 1024,
};

export async function getFitnessResponse(message: string): Promise<string> {
  try {
    console.log("Getting AI response for:", message);
    
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: modelConfig
    });
    
    // Detect message type for smart responses
    const messageType = detectMessageType(message);
    const enhancedPrompt = generatePrompt(message, messageType);
    
    const result = await model.generateContent(enhancedPrompt);
    const response = await result.response;
    let text = response.text();
    
    // Clean and format the response
    text = formatResponse(text, messageType);
    
    console.log("Successfully got AI response");
    return text;
  } catch (error) {
    console.error("AI service error:", error);
    return "I'm having trouble connecting right now 🤔 Please try again in a moment!";
  }
}

function detectMessageType(message: string): 'greeting' | 'question' | 'workout' | 'nutrition' | 'motivation' | 'general' {
  const lowerMessage = message.toLowerCase();
  
  if (/^(hi|hello|hey|sup|what's up|good morning|good afternoon|good evening)$/i.test(message.trim())) {
    return 'greeting';
  }
  
  if (lowerMessage.includes('workout') || lowerMessage.includes('exercise') || lowerMessage.includes('train') || lowerMessage.includes('gym')) {
    return 'workout';
  }
  
  if (lowerMessage.includes('food') || lowerMessage.includes('meal') || lowerMessage.includes('nutrition') || lowerMessage.includes('diet') || lowerMessage.includes('protein') || lowerMessage.includes('calories')) {
    return 'nutrition';
  }
  
  if (lowerMessage.includes('motivate') || lowerMessage.includes('motivation') || lowerMessage.includes('inspire') || lowerMessage.includes('encourage')) {
    return 'motivation';
  }
  
  if (message.endsWith('?')) {
    return 'question';
  }
  
  return 'general';
}

function generatePrompt(message: string, messageType: string): string {
  const basePrompt = `You are Bodify's AI fitness coach 💪. Be encouraging, concise, and use fitness emojis. Always use **bold** for key points and keep responses under 150 words. Be like a supportive gym buddy!`;
  
  switch (messageType) {
    case 'greeting':
      return `${basePrompt}
      
The user said: "${message}"

Respond with:
- A warm, energetic greeting with fitness emojis 💪🔥
- Ask how you can help with their fitness goals today
- Keep it under 30 words
- Be enthusiastic but professional

Example: "Hey there! 💪 Ready to crush your fitness goals today? 🔥 How can I help you get stronger? 🏋️‍♂️"`;

    case 'workout':
      return `${basePrompt}
      
The user asked about: "${message}"

Provide a structured response with:
- **Quick Answer**: Direct response with workout emoji 🏋️‍♂️
- **Key Tips**: 2-3 specific tips with emojis
- **Action Step**: One thing they can do right now
- Use **bold** for important terms
- Include motivational emojis 💪🔥⚡`;

    case 'nutrition':
      return `${basePrompt}
      
The user asked about nutrition: "${message}"

Structure your response:
- **Quick Answer**: Direct response with food emoji 🍗🥗
- **Nutrition Tips**: 2-3 specific recommendations with emojis
- **Pro Tip**: One actionable insight
- Use **bold** for important nutrients/foods
- Include relevant emojis 🥦💪🔥`;

    case 'motivation':
      return `${basePrompt}
      
The user needs motivation: "${message}"

Give them:
- **Motivational boost**: Energetic encouragement with emojis 🔥💪
- **Remember**: Why they started their journey
- **Action**: One small step they can take now
- Use power emojis: 💪🔥⚡🏆🎯
- Be their biggest cheerleader!`;

    case 'question':
      return `${basePrompt}
      
The user asked: "${message}"

Provide:
- **Answer**: Direct response with relevant emoji
- **Details**: 2-3 helpful points
- **Next Step**: What they should do
- Use **bold** for key concepts
- Include appropriate fitness emojis 🏋️‍♂️💪🔥`;

    default:
      return `${basePrompt}
      
The user said: "${message}"

Respond with:
- Clear, helpful information with fitness emojis
- Use **bold** for key points
- Keep it encouraging and actionable
- Include relevant emojis 💪🔥🏋️‍♂️
- Be their fitness buddy!`;
  }
}

function formatResponse(text: string, messageType: string): string {
  // Remove excessive newlines and clean up formatting
  text = text.replace(/\n{3,}/g, '\n\n');
  text = text.trim();
  
  // Ensure proper spacing after bold text
  text = text.replace(/\*\*([^*]+)\*\*/g, '**$1**');
  
  // Add fitness emojis if missing for certain types
  if (messageType === 'motivation' && !text.includes('💪') && !text.includes('🔥')) {
    text = text + ' 💪🔥';
  }
  
  // Clean up bullet points
  text = text.replace(/^[•·-]\s*/gm, '• ');
  
  // Ensure sections are properly spaced
  text = text.replace(/(\*\*[^*]+\*\*)\s*\n/g, '$1\n\n');
  
  return text;
}
