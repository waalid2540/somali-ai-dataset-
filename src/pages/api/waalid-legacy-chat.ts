// API endpoint for Waalid Legacy AI Parenting Coach
import { NextApiRequest, NextApiResponse } from 'next';
import barakahService from '../../services/barakah-agent-service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, language, familyContext, userId } = req.body;

    if (!message || !userId) {
      return res.status(400).json({ error: 'Message and user ID are required' });
    }

    // Build enhanced input for the parenting agent
    const agentInput = {
      request: message,
      language: language || 'english',
      familyContext: {
        parentName: familyContext?.parentName || 'Parent',
        childAge: familyContext?.children?.[0]?.age || 'unknown',
        location: familyContext?.location || 'Western country',
        challenges: familyContext?.children?.flatMap((child: any) => child.challenges) || [],
        subscriptionTier: familyContext?.subscriptionTier || 'free'
      },
      userApiKeys: {} // Use your backend API keys
    };

    console.log('🤲 Waalid Legacy AI - Processing parenting request:', {
      message: message.substring(0, 100) + '...',
      language,
      parentName: agentInput.familyContext.parentName
    });

    // Execute the Waalid Legacy parenting agent
    const executionId = await barakahService.executeAgent(
      'waalid-legacy-parenting',
      agentInput
    );

    console.log('✅ Parenting guidance generated:', executionId);

    // Wait for completion and get the smart guidance
    let result = null;
    let attempts = 0;
    const maxAttempts = 120; // 2 minutes timeout for full AI processing

    while (attempts < maxAttempts && !result) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const executionStatus = await barakahService.getExecution(executionId);
      
      if (executionStatus?.status === 'completed') {
        result = executionStatus.result;
        break;
      } else if (executionStatus?.status === 'failed') {
        throw new Error(executionStatus.error || 'Agent execution failed');
      }
      
      attempts++;
    }

    if (!result) {
      // Fallback response if agent takes too long
      const fallbackGuidance = generateFallbackGuidance(message, language);
      return res.status(200).json({
        response: fallbackGuidance,
        language: language || 'english',
        source: 'fallback'
      });
    }

    // Extract the smart guidance from the execution steps
    const executionStatus = await barakahService.getExecution(executionId);
    let guidance = null;
    let followUp = [];
    let resources = [];
    
    if (executionStatus && executionStatus.steps) {
      // Find the execute step which contains the AI-generated guidance
      const executeStep = executionStatus.steps.find(step => step.type === 'execute');
      if (executeStep && executeStep.output) {
        guidance = executeStep.output.deliverable || executeStep.output;
        followUp = executeStep.output.guidance?.followUp || [];
        resources = executeStep.output.guidance?.resources || [];
      }
    }
    
    // Fallback if no guidance found
    if (!guidance) {
      guidance = result.deliverable || result.guidance || result;
    }
    
    return res.status(200).json({
      response: guidance,
      language: language || 'english',
      followUp: followUp,
      resources: resources,
      source: 'waalid-legacy-ai'
    });

  } catch (error) {
    console.error('❌ Waalid Legacy AI Error:', error);
    
    // Provide a graceful fallback response
    const fallbackGuidance = generateFallbackGuidance(
      req.body.message, 
      req.body.language || 'english'
    );
    
    return res.status(200).json({
      response: fallbackGuidance,
      language: req.body.language || 'english',
      source: 'fallback'
    });
  }
}

function generateFallbackGuidance(message: string, language: string) {
  const fallbackResponses = {
    english: `🤲 Assalamu Alaikum, dear parent!

I understand you're seeking guidance about: "${message.substring(0, 100)}..."

While I'm connecting to my full wisdom database, here's some immediate Islamic guidance:

🎯 Remember that every challenge with our children is an opportunity for growth - both for them and for us as parents.

📚 The Prophet (SAW) said: "Every child is born upon fitrah (natural goodness)." Trust in your child's inherent goodness.

🌍 As Somali Muslims in the West, we have the unique opportunity to raise children who can bridge two beautiful worlds with confidence and pride.

🤲 Make dua for guidance: "Rabbana hab lana min azwajina wa dhurriyyatina qurrata a'yunin wa aj'alna lil-muttaqina imama" (Our Lord, grant us from among our wives and offspring comfort to our eyes and make us an example for the righteous.)

Please try asking your question again, and I'll provide more detailed, personalized guidance. Barakallahu feeki!`,

    somali: `🤲 Assalamu Alaikum, hooyo/aabo qaaliga ah!

Waan fahmayaa inaad raadineyso hagid ku saabsan: "${message.substring(0, 100)}..."

Halkan waa talo deg deg ah:

🎯 Xusuuso in dhibaato kasta oo carruurteena la jirto ay tahay fursad horumar loo sameeyo - iyaga iyo annaga toona.

📚 Nabiga (SCW) wuxuu yidhi: "Caruur kasta waxay ku dhashaa fitrah (dabiici wanaagsan)."

🤲 Ducada u samee: Allah ha ku hanuuniyo qoyskiinna.

Fadlan su'aashada mar kale waydiiso, waxaan ku siin doonaa hagid buuxda. Barakallahu feeki!`,

    arabic: `🤲 السلام عليكم أيها الوالد الكريم!

أفهم أنك تطلب التوجيه حول: "${message.substring(0, 100)}..."

إليك بعض التوجيهات الإسلامية الفورية:

🎯 تذكر أن كل تحدٍ مع أطفالنا هو فرصة للنمو - لهم ولنا كوالدين.

📚 قال النبي ﷺ: "كل مولود يولد على الفطرة"

🤲 ادع بـ: "ربنا هب لنا من أزواجنا وذرياتنا قرة أعين واجعلنا للمتقين إماماً"

برجاء إعادة طرح سؤالك، وسأقدم لك إرشاداً مفصلاً وشخصياً. بارك الله فيك!`
  };

  return fallbackResponses[language as keyof typeof fallbackResponses] || fallbackResponses.english;
}