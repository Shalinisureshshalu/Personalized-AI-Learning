/**
 * SmartLearn AI - Main JavaScript
 * 
 * This file handles:
 * 1. Authentication simulation (AWS Amplify simulation)
 * 2. Adaptive recommendations (Amazon Personalize simulation)
 * 3. AI Tutor responses (Amazon Bedrock simulation)
 * 4. Navigation and UI interactions
 */

// ========================================
// AWS Amplify Authentication Simulation
// ========================================

/**
 * Check if user is authenticated
 * Uses localStorage to simulate AWS Amplify authentication state
 */
function checkAuth() {
    const userName = localStorage.getItem('smartlearn_username');
    const userLevel = localStorage.getItem('smartlearn_level');
    
    const authLink = document.getElementById('auth-link');
    const logoutLink = document.getElementById('logout-link');
    
    if (userName && userLevel) {
        // User is logged in
        if (authLink) authLink.style.display = 'none';
        if (logoutLink) logoutLink.style.display = 'block';
        
        // Update dashboard if on dashboard page
        const userNameElement = document.getElementById('user-name');
        const userLevelElement = document.getElementById('user-level');
        
        if (userNameElement) userNameElement.textContent = userName;
        if (userLevelElement) userLevelElement.textContent = userLevel;
        
        // Update level buttons on dashboard
        updateLevelButtons(userLevel);
        
        // Redirect to dashboard if on home page and trying to access dashboard
        const currentPage = window.location.pathname;
        if (currentPage.includes('index.html') || currentPage.endsWith('/')) {
            // User is on home page, allow them to stay
        }
    } else {
        // User is not logged in
        if (authLink) authLink.style.display = 'block';
        if (logoutLink) logoutLink.style.display = 'none';
        
        // Redirect to home if trying to access protected pages
        const currentPage = window.location.pathname;
        if (currentPage.includes('dashboard.html') || currentPage.includes('tutor.html')) {
            // Allow access for demo purposes, but show login prompt
        }
    }
}

/**
 * Handle login form submission
 * Simulates AWS Amplify authentication
 */
function handleLogin(event) {
    event.preventDefault();
    
    const nameInput = document.getElementById('login-name');
    const levelInput = document.getElementById('login-level');
    
    const userName = nameInput.value.trim();
    const userLevel = levelInput.value;
    
    if (!userName || !userLevel) {
        alert('Please fill in all fields');
        return;
    }
    
    // Store user data in localStorage (simulating AWS Amplify)
    localStorage.setItem('smartlearn_username', userName);
    localStorage.setItem('smartlearn_level', userLevel);
    localStorage.setItem('smartlearn_isLoggedIn', 'true');
    
    // Simulate AWS Amplify authentication delay
    showLoadingMessage('Authenticating with AWS Amplify...');
    
    setTimeout(() => {
        closeAuthModal();
        
        // Show success message
        alert(`Welcome, ${userName}! You're now authenticated.`);
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    }, 1000);
}

/**
 * Handle logout
 * Clears localStorage and redirects to home
 */
function logout() {
    // Clear all user data
    localStorage.removeItem('smartlearn_username');
    localStorage.removeItem('smartlearn_level');
    localStorage.removeItem('smartlearn_isLoggedIn');
    
    // Redirect to home
    window.location.href = 'index.html';
}

/**
 * Open authentication modal
 */
function openAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) {
        modal.classList.add('active');
    }
}

/**
 * Close authentication modal
 */
function closeAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) {
        modal.classList.remove('active');
    }
    
    // Reset form
    const form = document.getElementById('login-form');
    if (form) {
        form.reset();
    }
}

/**
 * Show loading message (simulating AWS operations)
 */
function showLoadingMessage(message) {
    console.log(`[AWS Amplify] ${message}`);
}

// ========================================
// Amazon Personalize Simulation
// ========================================

/**
 * Course data for different learning levels
 * Simulates Amazon Personalize recommendations
 */
const courseDatabase = {
    beginner: [
        {
            id: 1,
            title: 'Introduction to Programming',
            description: 'Learn the fundamentals of programming with Python. Perfect for absolute beginners.',
            duration: '8 hours',
            rating: 4.8,
            icon: '🐍'
        },
        {
            id: 2,
            title: 'Web Development Basics',
            description: 'Build your first website with HTML, CSS, and JavaScript.',
            duration: '12 hours',
            rating: 4.9,
            icon: '🌐'
        },
        {
            id: 3,
            title: 'Data Science Fundamentals',
            description: 'Introduction to data analysis, visualization, and basic statistics.',
            duration: '10 hours',
            rating: 4.7,
            icon: '📊'
        }
    ],
    intermediate: [
        {
            id: 4,
            title: 'Advanced JavaScript',
            description: 'Master modern JavaScript, ES6+, async programming, and design patterns.',
            duration: '15 hours',
            rating: 4.9,
            icon: '⚡'
        },
        {
            id: 5,
            title: 'Machine Learning Basics',
            description: 'Learn machine learning algorithms and implement your first models.',
            duration: '20 hours',
            rating: 4.8,
            icon: '🤖'
        },
        {
            id: 6,
            title: 'Cloud Computing with AWS',
            description: 'Understand cloud concepts and deploy applications on AWS.',
            duration: '18 hours',
            rating: 4.7,
            icon: '☁️'
        }
    ],
    advanced: [
        {
            id: 7,
            title: 'Deep Learning with Neural Networks',
            description: 'Build advanced neural networks and deep learning models.',
            duration: '30 hours',
            rating: 4.9,
            icon: '🧠'
        },
        {
            id: 8,
            title: 'Advanced System Design',
            description: 'Design scalable distributed systems used by tech giants.',
            duration: '25 hours',
            rating: 4.8,
            icon: '🏗️'
        },
        {
            id: 9,
            title: 'Natural Language Processing',
            description: 'Build AI systems that understand and generate human language.',
            duration: '28 hours',
            rating: 4.9,
            icon: '💬'
        }
    ]
};

/**
 * Load recommended courses based on user's learning level
 * Simulates Amazon Personalize adaptive recommendations
 */
function loadRecommendedCourses() {
    const coursesContainer = document.getElementById('courses-container');
    if (!coursesContainer) return;
    
    // Get user's learning level from localStorage
    const userLevel = localStorage.getItem('smartlearn_level') || 'beginner';
    
    // Get courses for the user's level
    const courses = courseDatabase[userLevel] || courseDatabase.beginner;
    
    // Simulate Amazon Personalize processing delay
    console.log('[Amazon Personalize] Fetching personalized recommendations...');
    
    // Clear container
    coursesContainer.innerHTML = '';
    
    // Display recommendations header
    const headerElement = document.querySelector('.section-header p');
    if (headerElement) {
        headerElement.textContent = `Based on your ${userLevel} level - Powered by Amazon Personalize`;
    }
    
    // Render courses
    courses.forEach((course, index) => {
        const courseCard = createCourseCard(course, index);
        coursesContainer.innerHTML += courseCard;
    });
    
    console.log(`[Amazon Personalize] Displaying ${courses.length} recommendations for ${userLevel} level`);
}

/**
 * Create HTML for a course card
 */
function createCourseCard(course, index) {
    return `
        <div class="course-card" style="animation-delay: ${index * 0.1}s">
            <div class="course-image">${course.icon}</div>
            <div class="course-content">
                <span class="course-level">${course.title.split(' ')[0]}</span>
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                <div class="course-meta">
                    <span class="course-duration">⏱️ ${course.duration}</span>
                    <span class="course-rating">⭐ ${course.rating}</span>
                </div>
            </div>
        </div>
    `;
}

/**
 * Change user's learning level
 * Simulates Amazon Personalize adapting to user preferences
 */
function changeLevel(newLevel) {
    // Update localStorage
    localStorage.setItem('smartlearn_level', newLevel);
    
    // Update UI
    updateLevelButtons(newLevel);
    
    // Update dashboard display
    const userLevelElement = document.getElementById('user-level');
    if (userLevelElement) {
        userLevelElement.textContent = newLevel;
    }
    
    // Reload courses with new level
    loadRecommendedCourses();
    
    // Show notification
    console.log(`[Amazon Personalize] Learning level changed to: ${newLevel}`);
}

/**
 * Update level button states in the UI
 */
function updateLevelButtons(activeLevel) {
    const levelButtons = document.querySelectorAll('.level-btn');
    
    levelButtons.forEach(btn => {
        const level = btn.dataset.level;
        if (level === activeLevel) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// ========================================
// Amazon Bedrock AI Tutor Simulation
// ========================================

/**
 * AI Tutor response database
 * Simulates Amazon Bedrock AI responses
 */
const aiTutorResponses = {
    greetings: [
        "Hello! I'm your AI tutor, ready to help you learn. What would you like to explore today?",
        "Hi there! I can help you understand any concept. Just ask me a question!",
        "Welcome! I'm here to guide you through your learning journey. What topic interests you?"
    ],
    machine_learning: [
        "Machine Learning is a subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed. It focuses on developing algorithms that can access data and use it to learn patterns and make decisions.\n\nThere are three main types of ML:\n\n1. **Supervised Learning** - Learning from labeled data\n2. **Unsupervised Learning** - Finding patterns in unlabeled data\n3. **Reinforcement Learning** - Learning through trial and error",
        
        "Great question! Machine learning is all about finding patterns in data. Think of it like teaching a child - you show examples, and the system learns to recognize similar patterns in new examples.\n\nKey concepts include:\n- **Training Data**: The examples we use to teach\n- **Model**: The system that makes predictions\n- **Features**: The characteristics we measure\n- **Labels**: The correct answers we're learning to predict"
    ],
    neural_networks: [
        "Neural networks are computing systems inspired by biological neural networks in our brains. They consist of interconnected nodes (neurons) organized in layers.\n\n**Key Components:**\n- **Input Layer**: Receives the data\n- **Hidden Layers**: Process the data\n- **Output Layer**: Produces the result\n\nEach connection has a weight that adjusts as the network learns.",
        
        "Neural networks are like layers of decision-makers working together! Each 'neuron' takes inputs, processes them, and passes the output to the next layer.\n\nThink of it like a team where:\n- First layer sees raw features\n- Each subsequent layer builds on previous learnings\n- Final layer makes the prediction\n\nThis is why they're called 'deep' learning when there are many layers!"
    ],
    python: [
        "Python is a versatile, beginner-friendly programming language known for its clean syntax and readability. It's excellent for:\n\n- Web Development (Django, Flask)\n- Data Science & ML (pandas, scikit-learn)\n- Automation & Scripting\n- And much more!\n\n**Why learn Python?**\n- Easy to read and write\n- Huge community support\n- Extensive libraries\n- High demand in job market",
        
        "Python is one of the most popular programming languages, especially for AI and data science!\n\n**Getting Started:**\n1. Install Python from python.org\n2. Use an IDE like VS Code or PyCharm\n3. Start with basic syntax: variables, loops, functions\n4. Practice with small projects\n\nThe philosophy: 'Simple is better than complex!'"
    ],
    study_tips: [
        "Here are some effective study strategies:\n\n1. **Active Recall**: Test yourself instead of re-reading\n2. **Spaced Repetition**: Review material at increasing intervals\n3. **Pomodoro Technique**: Study for 25 min, rest for 5 min\n4. **Teach Others**: Explaining helps cement understanding\n5. **Stay Curious**: Connect topics to real-world applications\n\nRemember: Quality over quantity!",
        
        "Want to learn more effectively? Try these tips:\n\n🔹 **Break it down**: Large topics become manageable\n🔹 **Code daily**: Practice makes permanent\n🔹 **Make mistakes**: They're your best teachers\n🔹 **Join communities**: Learn from others\n🔹 **Build projects**: Apply what you learn\n\nThe key is consistency - small daily steps lead to big results!"
    ],
    default: [
        "That's a great question! Let me help you understand this better.\n\nCould you provide more details about what specific aspect you'd like to learn? For example:\n- What programming language are you using?\n- What is your current skill level?\n- What project are you working on?\n\nThis will help me give you more targeted advice!",
        
        "Interesting question! I'd love to help you explore this topic.\n\nTo give you the best answer, could you tell me:\n1. What background knowledge do you have?\n2. What are you trying to achieve?\n3. Are you working on a specific project?\n\nWith more context, I can provide more relevant guidance!"
    ]
};

/**
 * Detect the topic of user's question
 */
function detectTopic(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('machine learning') || lowerMessage.includes('ml') || lowerMessage.includes('machine learn')) {
        return 'machine_learning';
    }
    if (lowerMessage.includes('neural network') || lowerMessage.includes('deep learning') || lowerMessage.includes('neural net')) {
        return 'neural_networks';
    }
    if (lowerMessage.includes('python') || lowerMessage.includes('code') || lowerMessage.includes('programming')) {
        return 'python';
    }
    if (lowerMessage.includes('study') || lowerMessage.includes('learn') || lowerMessage.includes('tips') || lowerMessage.includes('help')) {
        return 'study_tips';
    }
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey') || lowerMessage.includes('start')) {
        return 'greetings';
    }
    
    return 'default';
}

/**
 * Generate AI response based on user message
 * Simulates Amazon Bedrock AI response generation
 */
function generateAIResponse(userMessage) {
    console.log('[Amazon Bedrock] Processing request...');
    
    const topic = detectTopic(userMessage);
    const responses = aiTutorResponses[topic] || aiTutorResponses.default;
    
    // Randomly select a response variation
    const randomIndex = Math.floor(Math.random() * responses.length);
    const response = responses[randomIndex];
    
    // Simulate Bedrock processing time
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`[Amazon Bedrock] Generated response for topic: ${topic}`);
            resolve(response);
        }, 1500);
    });
}

/**
 * Send a message in the chat
 */
async function sendMessage(event) {
    event.preventDefault();
    
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Clear input
    input.value = '';
    
    // Add user message to chat
    addUserMessage(message);
    
    // Show typing indicator
    showTypingIndicator();
    
    // Generate AI response
    const aiResponse = await generateAIResponse(message);
    
    // Hide typing indicator
    hideTypingIndicator();
    
    // Add AI response to chat
    addBotMessage(aiResponse);
}

/**
 * Send a quick question
 */
async function sendQuickQuestion(question) {
    const input = document.getElementById('chat-input');
    input.value = question;
    
    // Trigger form submission
    const event = new Event('submit');
    sendMessage(event);
}

/**
 * Add user message to chat
 */
function addUserMessage(message) {
    const chatContainer = document.getElementById('chat-container');
    const time = getCurrentTime();
    
    const messageHTML = `
        <div class="chat-message user-message">
            <div class="message-avatar user-avatar">👤</div>
            <div class="message-content">
                <p>${escapeHtml(message)}</p>
            </div>
            <div class="message-time">${time}</div>
        </div>
    `;
    
    chatContainer.insertAdjacentHTML('beforeend', messageHTML);
    scrollToBottom();
}

/**
 * Add bot message to chat
 */
function addBotMessage(message) {
    const chatContainer = document.getElementById('chat-container');
    const time = getCurrentTime();
    
    // Convert markdown-like formatting to HTML
    const formattedMessage = formatMessage(message);
    
    const messageHTML = `
        <div class="chat-message bot-message">
            <div class="message-avatar bot-avatar">🤖</div>
            <div class="message-content">
                ${formattedMessage}
            </div>
            <div class="message-time">${time}</div>
        </div>
    `;
    
    chatContainer.insertAdjacentHTML('beforeend', messageHTML);
    scrollToBottom();
}

/**
 * Format message with simple markdown
 */
function formatMessage(message) {
    // Convert **text** to <strong>text</strong>
    let formatted = message.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Convert line breaks to <br>
    formatted = formatted.replace(/\n/g, '<br>');
    
    // Wrap in paragraph
    return `<p>${formatted}</p>`;
}

/**
 * Show typing indicator
 */
function showTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
        indicator.style.display = 'flex';
        scrollToBottom();
    }
}

/**
 * Hide typing indicator
 */
function hideTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
        indicator.style.display = 'none';
    }
}

/**
 * Scroll chat to bottom
 */
function scrollToBottom() {
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
}

/**
 * Get current time formatted
 */
function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ========================================
// Utility Functions
// ========================================

/**
 * Scroll to features section
 */
function scrollToFeatures() {
    const features = document.getElementById('features');
    if (features) {
        features.scrollIntoView({ behavior: 'smooth' });
    }
}

/**
 * Handle navbar scroll effect
 */
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
}

// ========================================
// Event Listeners
// ========================================

// Add scroll listener for navbar
window.addEventListener('scroll', handleNavbarScroll);

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('auth-modal');
    if (event.target === modal) {
        closeAuthModal();
    }
});

// Add enter key support for chat input
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && event.target.id === 'chat-input') {
        // Don't submit on Enter in chat input (let user use Shift+Enter for new line if needed)
        // But we want to submit on plain Enter
        if (!event.shiftKey) {
            event.preventDefault();
            const form = event.target.closest('.chat-input-form');
            if (form) {
                form.dispatchEvent(new Event('submit'));
            }
        }
    }
});

console.log('SmartLearn AI - JavaScript loaded successfully!');
console.log('=============================================');
console.log('Simulated AWS Services:');
console.log('  - AWS Amplify: Authentication');
console.log('  - Amazon Bedrock: AI Tutor');
console.log('  - Amazon Personalize: Recommendations');
console.log('=============================================');
