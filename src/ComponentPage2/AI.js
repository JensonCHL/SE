import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_KEY,
});
const openai = new OpenAIApi(configuration);

const getRecommendation = async (eventDetails, healthData) => {
  const prompt = `
  Based on the following event details and health data, provide a personalized recommendation.

  Event Details:
  Title: ${eventDetails.title}
  Start Time: ${eventDetails.start_time}
  End Time: ${eventDetails.end_time}
  Description: ${eventDetails.description}
  Location: ${eventDetails.location}
  Type: ${eventDetails.type}

  Health Data:
  Steps: ${healthData.steps}
  Heart Rate: ${healthData.heart_rate} bpm
  Sleep Hours: ${healthData.sleep_hours}

  Recommendation:
  `;

  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: prompt,
    max_tokens: 150,
  });

  return response.data.choices[0].text.trim();
};
