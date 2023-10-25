const chatbotToggler = document.querySelector(".chatbot-toggler");
const chatbotToggler2 = document.querySelector(".chatbot-toggler2");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatbox2 = document.querySelector(".chatbox2");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; // Variable to store user's message
const API_KEY = "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"; // Paste your API key here

const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; // return chat <li> element
}

  const conversation = [];

// Function to set up the initial conversation with an insurance-related prompt
const initializeConversation = () => {
    conversation.length = 0; // Clear the conversation history
    conversation.push(
        { role: "system", content: "You are a helpful insurance professional." },
        { role: "assistant", content: "Please provide information about your insurance needs:" }
    );
};

// Call the initializeConversation function to start a new insurance-related conversation
initializeConversation();

const generateResponse = (chatElement) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = chatElement.querySelector("p");

    // Define the prompt for insurance-related conversations
    const insurancePrompt = "insurance chatbot";

    // Define the properties and message for the API request
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: conversation // Use the conversation array
        })
    };

    // Send POST request to API, get response, and set the response as paragraph text
    fetch(API_URL, requestOptions)
        .then((res) => res.json())
        .then((data) => {
            // Extract the content from the response
            const assistantResponse = data.choices[0].message.content.trim();

            // Limit the response to the first 30 words
            const limitedResponse = assistantResponse.split(' ').slice(0, 30).join(' ');

            // Check if the response is longer than 30 words
            if (assistantResponse.split(' ').length > 30) {
                // If so, add a "View More" option
                const viewMoreButton = document.createElement('button');
                viewMoreButton.textContent = 'View More';
                viewMoreButton.classList.add('view-more-button');
                messageElement.innerHTML = `${limitedResponse}... `;
                messageElement.appendChild(viewMoreButton);

                // Add an event listener to show the full response when the "View More" button is clicked
                viewMoreButton.addEventListener('click', () => {
                    messageElement.textContent = assistantResponse;
                });
            } else {
                // If not, display the full response
                messageElement.textContent = assistantResponse;
            }
            
            // Append the assistant's response to the conversation
            conversation.push({ role: "assistant", content: assistantResponse });
            
            
        })

        .catch(() => {
            messageElement.classList.add("error");
            messageElement.textContent = "Oops! Something went wrong. Please try again.";
        })
        .finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
};


const handleChat = () => {
    userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
    if(!userMessage) return;

    // Clear the input textarea and set its height to default
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

      // Append the user's message to the conversation
    conversation.push({ role: "user", content: userMessage });

    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
    
    setTimeout(() => {
        // Display "Thinking..." message while waiting for the response
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
}

chatInput.addEventListener("input", () => {
    // Adjust the height of the input textarea based on its content
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    // If Enter key is pressed without Shift key and the window 
    // width is greater than 800px, handle the chat
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));


//  PREMIUM QUOTATION
    function calculateResult(rate) {
      const inputValue = parseFloat(document.getElementById('inputValue').value);
      if (isNaN(inputValue)) {
        alert('Please enter a valid number.');
        return;
      }

      const result = inputValue * rate;
      document.getElementById('result').textContent = `Your Premium is: ${result}`;
    }

    // Event listeners for button clicks
    document.getElementById('publicLiability').addEventListener('click', () => {
      calculateResult(0.005);
    });

    document.getElementById('professionalIndemnity').addEventListener('click', () => {
      calculateResult(0.01);
    });

    document.getElementById('bidBond').addEventListener('click', () => {
      calculateResult(0.005);
    });

    document.getElementById('plantmachinery').addEventListener('click', () => {
      calculateResult(0.0075);
    });

     document.getElementById('fidelityGuarantee').addEventListener('click', () => {
      calculateResult(0.0075);
    });


     //QUOTATION BUTTON
    closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot2"));
    chatbotToggler2.addEventListener("click", () => document.body.classList.toggle("show-chatbot2"));