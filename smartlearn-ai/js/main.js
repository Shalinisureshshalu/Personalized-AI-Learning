/**
 * SmartLearn AI - Enhanced Main JavaScript
 * 
 * This file handles:
 * 1. Authentication simulation (AWS Amplify simulation)
 * 2. Adaptive recommendations (Amazon Personalize simulation)
 * 3. AI Tutor responses (Amazon Bedrock simulation)
 * 4. Progress tracking with localStorage
 * 5. Achievements system
 * 6. Activity logging
 * 7. Navigation and UI interactions
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
        
        // Load user stats
        loadUserStats();
    } else {
        // User is not logged in
        if (authLink) authLink.style.display = 'block';
        if (logoutLink) logoutLink.style.display = 'none';
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
    
    // Initialize user progress if not exists
    initializeUserProgress();
    
    // Simulate AWS Amplify authentication delay
    showLoadingMessage('Authenticating with AWS Amplify...');
    
    setTimeout(() => {
        closeAuthModal();
        
        // Show success message
        alert(`Welcome, ${userName}! You're now authenticated.`);
        
        // Log activity
        logActivity('login', 'Logged into SmartLearn AI');
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    }, 1000);
}

/**
 * Initialize user progress data
 */
function initializeUserProgress() {
    if (!localStorage.getItem('smartlearn_progress')) {
        const progress = {
            coursesEnrolled: 4,
            lessonsCompleted: 12,
            learningHours: 24,
            goalProgress: 85,
            achievements: ['quick-learner', '7-day-streak', 'curious-mind'],
            chatSessions: 50,
            weeklyActivity: []
        };
        localStorage.setItem('smartlearn_progress', JSON.stringify(progress));
    }
}

/**
 * Load and display user stats
 */
function loadUserStats() {
    const progress = JSON.parse(localStorage.getItem('smartlearn_progress') || '{}');
    
    if (document.getElementById('stat-courses')) {
        document.getElementById('stat-courses').textContent = progress.coursesEnrolled || 0;
    }
    if (document.getElementById('stat-completed')) {
        document.getElementById('stat-completed').textContent = progress.lessonsCompleted || 0;
    }
    if (document.getElementById('stat-hours')) {
        document.getElementById('stat-hours').textContent = (progress.learningHours || 0) + 'h';
    }
    if (document.getElementById('stat-progress')) {
        document.getElementById('stat-progress').textContent = (progress.goalProgress || 0) + '%';
    }
}

/**
 * Handle logout
 * Clears localStorage and redirects to home
 */
function logout() {
    // Log activity before logging out
    logActivity('logout', 'Logged out from SmartLearn AI');
    
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
            icon: '🐍',
            color: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)'
        },
        {
            id: 2,
            title: 'Web Development Basics',
            description: 'Build your first website with HTML, CSS, and JavaScript.',
            duration: '12 hours',
            rating: 4.9,
            icon: '🌐',
            color: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)'
        },
        {
            id: 3,
            title: 'Data Science Fundamentals',
            description: 'Introduction to data analysis, visualization, and basic statistics.',
            duration: '10 hours',
            rating: 4.7,
            icon: '📊',
            color: 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
        }
    ],
    intermediate: [
        {
            id: 4,
            title: 'Advanced JavaScript',
            description: 'Master modern JavaScript, ES6+, async programming, and design patterns.',
            duration: '15 hours',
            rating: 4.9,
            icon: '⚡',
            color: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)'
        },
        {
            id: 5,
            title: 'Machine Learning Basics',
            description: 'Learn machine learning algorithms and implement your first models.',
            duration: '20 hours',
            rating: 4.8,
            icon: '🤖',
            color: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)'
        },
        {
            id: 6,
            title: 'Cloud Computing with AWS',
            description: 'Understand cloud concepts and deploy applications on AWS.',
            duration: '18 hours',
            rating: 4.7,
            icon: '☁️',
            color: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)'
        }
    ],
    advanced: [
        {
            id: 7,
            title: 'Deep Learning with Neural Networks',
            description: 'Build advanced neural networks and deep learning models.',
            duration: '30 hours',
            rating: 4.9,
            icon: '🧠',
            color: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)'
        },
        {
            id: 8,
            title: 'Advanced System Design',
            description: 'Design scalable distributed systems used by tech giants.',
            duration: '25 hours',
            rating: 4.8,
            icon: '🏗️',
            color: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)'
        },
        {
            id: 9,
            title: 'Natural Language Processing',
            description: 'Build AI systems that understand and generate human language.',
            duration: '28 hours',
            rating: 4.9,
            icon: '💬',
            color: 'linear-gradient(135deg, #F43F5E 0%, #E11D48 100%)'
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
            <div class="course-image" style="background: ${course.color}">
                <span>${course.icon}</span>
            </div>
            <div class="course-content">
                <span class="course-level">${course.title.split(' ')[0]}</span>
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                <div class="course-meta">
                    <span class="course-duration"><i class="far fa-clock"></i> ${course.duration}</span>
                    <span class="course-rating"><i class="fas fa-star"></i> ${course.rating}</span>
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
    
    // Log activity
    logActivity('level-change', `Changed learning level to ${newLevel}`);
    
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
 * AI Tutor response database with expanded topics
 * Simulates Amazon Bedrock AI responses
 */
const aiTutorResponses = {
    greetings: [
        "Hello! I'm your AI tutor, ready to help you learn. What would you like to explore today?",
        "Hi there! I can help you understand any concept. Just ask me a question!",
        "Welcome! I'm here to guide you through your learning journey. What topic interests you?"
    ],
    machine_learning: [
        "Machine Learning is a subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed. It focuses on developing algorithms that can access data and use it to learn patterns and make decisions.\n\nThere are three main types of ML:\n\n1. **Supervised Learning** - Learning from labeled data\n2. **Unsupervised Learning** - Finding patterns in unlabeled data\n3. **Reinforcement Learning** - Learning through trial and error\n\nWould you like me to explain any of these in more detail?",
        
        "Great question! Machine learning is all about finding patterns in data. Think of it like teaching a child - you show examples, and the system learns to recognize similar patterns in new examples.\n\n**Key concepts include:**\n- **Training Data**: The examples we use to teach\n- **Model**: The system that makes predictions\n- **Features**: The characteristics we measure\n- **Labels**: The correct answers we're learning to predict\n\nWhat aspect interests you most?"
    ],
    neural_networks: [
        "Neural networks are computing systems inspired by biological neural networks in our brains. They consist of interconnected nodes (neurons) organized in layers.\n\n**Key Components:**\n- **Input Layer**: Receives the data\n- **Hidden Layers**: Process the data\n- **Output Layer**: Produces the result\n\nEach connection has a weight that adjusts as the network learns. This is how networks 'learn' from data!",
        
        "Neural networks are like layers of decision-makers working together! Each 'neuron' takes inputs, processes them, and passes the output to the next layer.\n\nThink of it like a team where:\n- First layer sees raw features\n- Each subsequent layer builds on previous learnings\n- Final layer makes the prediction\n\nThis is why they're called 'deep' learning when there are many layers!"
    ],
    python: [
        "Python is a versatile, beginner-friendly programming language known for its clean syntax and readability. It's excellent for:\n\n- **Web Development** (Django, Flask)\n- **Data Science & ML** (pandas, scikit-learn)\n- **Automation & Scripting**\n- **And much more!**\n\n**Why learn Python?**\n- Easy to read and write\n- Huge community support\n- Extensive libraries\n- High demand in job market\n\nWould you like to start with basic syntax?",
        
        "Python is one of the most popular programming languages, especially for AI and data science!\n\n**Getting Started:**\n1. Install Python from python.org\n2. Use an IDE like VS Code or PyCharm\n3. Start with basic syntax: variables, loops, functions\n4. Practice with small projects\n\nThe philosophy: 'Simple is better than complex!'"
    ],
    web_development: [
        "Web development involves creating websites and web applications. The three core technologies are:\n\n1. **HTML** - Structure and content\n2. **CSS** - Styling and presentation\n3. **JavaScript** - Interactivity and behavior\n\nModern web development also includes frameworks like React, Vue, and Angular for building complex applications.",
        
        "Great question! Web development is all about creating interactive websites.\n\n**Start with:**\n- **HTML**: Learn to structure content\n- **CSS**: Make it look beautiful\n- **JavaScript**: Add interactivity\n\nThen move to frameworks like React or Vue for modern, efficient development!"
    ],
    data_science: [
        "Data Science is an interdisciplinary field that uses scientific methods, processes, and systems to extract knowledge from data. It combines:\n\n- **Statistics** & Mathematics\n- **Programming** (Python/R)\n- **Domain Knowledge**\n\n**Key Tools:**\n- Python & R\n- Pandas & NumPy\n- Scikit-learn\n- TensorFlow & PyTorch\n\nWhat area interests you most?",
        
        "Data Science is one of the most in-demand fields today!\n\n**Career Path:**\n1. Learn Python basics\n2. Study statistics & math\n3. Master data analysis with pandas\n4. Learn machine learning basics\n5. Build portfolio projects\n\nWould you like recommendations for specific courses?"
    ],
    career: [
        "Starting a career in tech is exciting! Here's a roadmap:\n\n1. **Choose your path**: Frontend, Backend, Data Science, DevOps, etc.\n2. **Learn fundamentals**: Programming, data structures, algorithms\n3. **Build projects**: Create a portfolio of real work\n4. **Network**: Join communities, attend meetups\n5. **Apply**: Don't be afraid to start small!\n\n**Top skills employers want:**\n- Problem-solving\n- Communication\n- Continuous learning\n\nWhat role are you interested in?",
        
        "The tech industry offers amazing opportunities! Here's how to prepare:\n\n**For Developer Roles:**\n- Master at least one programming language\n- Understand data structures & algorithms\n- Build real projects\n- Learn version control (Git)\n\n**For Data Science:**\n- Strong math & statistics foundation\n- Python/R proficiency\n- Machine learning knowledge\n\nWould you like specific course recommendations?"
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
    
    if (lowerMessage.includes('machine learning') || lowerMessage.includes('ml ') || lowerMessage.includes('machine learn')) {
        return 'machine_learning';
    }
    if (lowerMessage.includes('neural network') || lowerMessage.includes('deep learning') || lowerMessage.includes('neural net') || lowerMessage.includes('deep learn')) {
        return 'neural_networks';
    }
    if (lowerMessage.includes('python') || lowerMessage.includes('code') || lowerMessage.includes('programming')) {
        return 'python';
    }
    if (lowerMessage.includes('web') || lowerMessage.includes('html') || lowerMessage.includes('css') || lowerMessage.includes('javascript') || lowerMessage.includes('website')) {
        return 'web_development';
    }
    if (lowerMessage.includes('data') || lowerMessage.includes('analysis') || lowerMessage.includes('statistics') || lowerMessage.includes('data science')) {
        return 'data_science';
    }
    if (lowerMessage.includes('career') || lowerMessage.includes('job') || lowerMessage.includes('interview') || lowerMessage.includes('resume') || lowerMessage.includes('employ')) {
        return 'career';
    }
    if (lowerMessage.includes('study') || lowerMessage.includes('learn') || lowerMessage.includes('tips') || lowerMessage.includes('help')) {
        return 'study_tips';
    }
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey') || lowerMessage.includes('start') || lowerMessage.includes('help')) {
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
    
    // Update chat sessions count
    updateChatSessions();
    
    // Simulate Bedrock processing time
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`[Amazon Bedrock] Generated response for topic: ${topic}`);
            resolve(response);
        }, 1500);
    });
}

/**
 * Update chat sessions count
 */
function updateChatSessions() {
    let progress = JSON.parse(localStorage.getItem('smartlearn_progress') || '{}');
    progress.chatSessions = (progress.chatSessions || 0) + 1;
    localStorage.setItem('smartlearn_progress', JSON.stringify(progress));
    
    // Check for achievements
    checkAchievements();
}

/**
 * Check and unlock achievements
 */
function checkAchievements() {
    let progress = JSON.parse(localStorage.getItem('smartlearn_progress') || '{}');
    const achievements = progress.achievements || [];
    
    // Check for 'curious mind' achievement
    if (progress.chatSessions >= 50 && !achievements.includes('curious-mind')) {
        achievements.push('curious-mind');
        showAchievementNotification('Curious Mind', 'You had 50 chats with AI Tutor!');
    }
    
    // Check for other achievements
    if (progress.lessonsCompleted >= 10 && !achievements.includes('dedicated-learner')) {
        achievements.push('dedicated-learner');
        showAchievementNotification('Dedicated Learner', 'You completed 10 lessons!');
    }
    
    progress.achievements = achievements;
    localStorage.setItem('smartlearn_progress', JSON.stringify(progress));
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

/**
 * Log user activity
 */
function logActivity(type, description) {
    let activities = JSON.parse(localStorage.getItem('smartlearn_activities') || '[]');
    const activity = {
        type: type,
        description: description,
        timestamp: new Date().toISOString()
    };
    activities.unshift(activity);
    // Keep only last 20 activities
    activities = activities.slice(0, 20);
    localStorage.setItem('smartlearn_activities', JSON.stringify(activities));
}
