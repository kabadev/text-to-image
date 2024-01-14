import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";
import { StringOutputParser } from "langchain/schema/output_parser";

import {
	RunnablePassthrough,
	RunnableSequence,
} from "langchain/schema/runnable";
import OpenAI from "openai";
// import { formatConvHistory } from '/utils/formatConvHistory'

/**
 * Super Challenge:
 *
 * 1. Pass convHistory into the chain as conv_history at
 *    the point where we invoke it. Remember to make use
 *    of our formatConvHistory function!
 * 2. Update the standaloneQuestionTemplate to make use
 *    of convHistory.
 * 3. Make sure the answerChain has access to convHistory
 *    and edit answerTemplate to make use of it.
 * 4. Test by giving the chatbot some information and
 *    checking in the next question to see if it remembers it.
 *
 * */

const llm = new OpenAI({});

const standaloneQuestionTemplate =
	"Given a question, convert it to a standalone question. question: {question} standalone question:";
const standaloneQuestionPrompt = PromptTemplate.fromTemplate(
	standaloneQuestionTemplate
);

const answerTemplate = `
Your name is sabiAi and you are made by Lans Kaba. You are a helpful and enthusiastic support bot who can answer a any given question. if you don't know the answer chat at the conversation history you have if the answer is available. conversation_history:"human:what is my name?. you: my name is sabiAI, human:where are you from, you:I'm Just AI I'm from no where"  \nNow answer this question:`;
const answerPrompt = PromptTemplate.fromTemplate(answerTemplate);

const standaloneQuestionChain = standaloneQuestionPrompt
	.pipe(llm)
	.pipe(new StringOutputParser());

const answerChain = answerPrompt.pipe(llm).pipe(new StringOutputParser());

const chain = RunnableSequence.from([
	{
		standalone_question: standaloneQuestionChain,
		original_input: new RunnablePassthrough(),
	},
	{
		context: retrieverChain,
		question: ({ original_input }) => original_input.question,
	},
	answerChain,
]);

const convHistory = [];

async function progressConversation() {
	const userInput = document.getElementById("user-input");
	const chatbotConversation = document.getElementById(
		"chatbot-conversation-container"
	);
	const question = userInput.value;
	userInput.value = "";

	// add human message
	const newHumanSpeechBubble = document.createElement("div");
	newHumanSpeechBubble.classList.add("speech", "speech-human");
	chatbotConversation.appendChild(newHumanSpeechBubble);
	newHumanSpeechBubble.textContent = question;
	chatbotConversation.scrollTop = chatbotConversation.scrollHeight;
	const response = await chain.invoke({
		question: question,
	});
	convHistory.push(question);
	convHistory.push(response);

	// add AI message
	const newAiSpeechBubble = document.createElement("div");
	newAiSpeechBubble.classList.add("speech", "speech-ai");
	chatbotConversation.appendChild(newAiSpeechBubble);
	newAiSpeechBubble.textContent = response;
	chatbotConversation.scrollTop = chatbotConversation.scrollHeight;
}
