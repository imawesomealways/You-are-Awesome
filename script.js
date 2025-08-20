// QuantumQuill - Modern Multi-Tool Web Application JavaScript

// Configuration
const CONFIG = {
    GEMINI_API_KEY: 'AIzaSyC_E_nMjCfoC-9re5XUeQHpTugbYsXVcjo',
    GEMINI_API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent',
    SKELETON_DURATION: 2000, // 2 seconds
    ANIMATION_DURATION: 300
};

// Cost of Living Data for Indian Cities
const CITY_DATA = {
    mumbai: {
        name: 'Mumbai',
        rent: 40000,
        food: 15000,
        transport: 5000,
        utilities: 3000,
        entertainment: 8000,
        healthcare: 4000,
        education: 6000,
        miscellaneous: 5000,
        total: 86000
    },
    delhi: {
        name: 'Delhi',
        rent: 25000,
        food: 12000,
        transport: 4000,
        utilities: 2500,
        entertainment: 6000,
        healthcare: 3000,
        education: 5000,
        miscellaneous: 4000,
        total: 61500
    },
    bangalore: {
        name: 'Bangalore',
        rent: 30000,
        food: 13000,
        transport: 4500,
        utilities: 2800,
        entertainment: 7000,
        healthcare: 3500,
        education: 5500,
        miscellaneous: 4500,
        total: 70800
    },
    hyderabad: {
        name: 'Hyderabad',
        rent: 20000,
        food: 10000,
        transport: 3500,
        utilities: 2200,
        entertainment: 5000,
        healthcare: 2800,
        education: 4000,
        miscellaneous: 3500,
        total: 51000
    },
    chennai: {
        name: 'Chennai',
        rent: 22000,
        food: 11000,
        transport: 3800,
        utilities: 2400,
        entertainment: 5500,
        healthcare: 3000,
        education: 4500,
        miscellaneous: 3800,
        total: 56000
    },
    kolkata: {
        name: 'Kolkata',
        rent: 18000,
        food: 9000,
        transport: 3000,
        utilities: 2000,
        entertainment: 4500,
        healthcare: 2500,
        education: 3500,
        miscellaneous: 3000,
        total: 45500
    },
    pune: {
        name: 'Pune',
        rent: 25000,
        food: 11500,
        transport: 4000,
        utilities: 2300,
        entertainment: 6000,
        healthcare: 3200,
        education: 4800,
        miscellaneous: 4000,
        total: 60800
    },
    ahmedabad: {
        name: 'Ahmedabad',
        rent: 16000,
        food: 8500,
        transport: 2800,
        utilities: 1800,
        entertainment: 4000,
        healthcare: 2200,
        education: 3200,
        miscellaneous: 2800,
        total: 41300
    }
};

// Fallback Instagram Captions
const FALLBACK_CAPTIONS = {
    casual: [
        "Living my best life, one moment at a time ✨ Sometimes the simplest moments bring the greatest joy. Here's to embracing every beautiful second! #blessed #goodvibes #livingmybestlife #grateful #happiness",
        "Just another day in paradise 🌅 Finding magic in the ordinary and beauty in the everyday. Life is what happens when you're busy making memories! #paradise #blessed #grateful #lifeisgood #memories",
        "Chasing dreams and catching sunsets 🌇 Every ending is a new beginning, and every sunset promises a new dawn. Here's to never stopping the chase! #dreams #sunset #motivation #blessed #newbeginnings"
    ],
    professional: [
        "Excellence is not a destination, it's a journey 💼 Every challenge is an opportunity to grow, learn, and become better than yesterday. Committed to continuous improvement and professional growth. #excellence #professionalgrowth #leadership #success #motivation",
        "Innovation starts with a single idea 💡 Today's breakthrough was yesterday's impossible. Proud to be part of a team that turns vision into reality through dedication and hard work. #innovation #teamwork #success #leadership #growth",
        "Building bridges to tomorrow's success 🌉 Strategic thinking, collaborative effort, and unwavering commitment to excellence drive us forward. Every project is a step toward a brighter future. #strategy #collaboration #success #future #excellence"
    ],
    funny: [
        "My life is like a romantic comedy, except there's no romance and it's not funny 😂 But hey, at least I'm the star of my own show! Plot twist: I'm also the director, producer, and probably the janitor too. #lifereality #comedy #relatable #funny #plottwist",
        "I put the 'pro' in procrastination 😅 Why do today what you can dramatically overthink about doing tomorrow? It's not laziness, it's strategic planning with a side of existential crisis! #procrastination #relatable #funny #lifehacks #mood",
        "Currently accepting applications for a personal life coach, chef, and motivational speaker 📝 Must be willing to work for exposure and the occasional thank you. Previous experience dealing with chaos preferred but not required! #hiring #lifeneeds #funny #help #chaos"
    ],
    inspirational: [
        "Every sunrise brings new possibilities ☀️ Today is a blank canvas waiting for your masterpiece. Paint it with courage, color it with kindness, and frame it with gratitude. Your story is still being written! #inspiration #newday #possibilities #courage #gratitude",
        "The only impossible journey is the one you never begin 🚀 Take that first step, even if you can't see the whole staircase. Your future self is counting on the brave decisions you make today. #inspiration #journey #courage #future #brave",
        "Stars can't shine without darkness ⭐ Every challenge you face is shaping you into the person you're meant to become. Embrace the struggle, trust the process, and watch yourself transform. #inspiration #growth #challenges #transformation #strength"
    ],
    romantic: [
        "Love is not just a feeling, it's a choice we make every day 💕 In a world full of temporary things, you are my constant. Here's to choosing each other, again and again, through every season of life. #love #romance #forever #soulmate #blessed",
        "You are my favorite notification 📱💖 In this digital age, you're the only ping that makes my heart skip a beat. Thank you for being my person, my peace, and my greatest adventure. #love #romance #digital #heart #adventure",
        "Home is wherever you are 🏠❤️ Distance means nothing when someone means everything. You've turned every place we've been into a memory and every memory into a treasure. #love #home #romance #memories #treasure"
    ]
};

// DOM Elements
let elements = {};

// Application State
const state = {
    isLoading: false,
    currentTool: null,
    animationObserver: null
};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    initializeSkeletonLoader();
    initializeAnimations();
    initializeEventListeners();
    initializeMobileMenu();
});

// Initialize DOM Elements
function initializeElements() {
    elements = {
        skeletonLoader: document.getElementById('skeleton-loader'),
        mainApp: document.getElementById('main-app'),
        navToggle: document.querySelector('.nav-toggle'),
        navMenu: document.querySelector('.nav-menu'),
        
        // Instagram Caption Generator
        captionTopic: document.getElementById('caption-topic'),
        captionTone: document.getElementById('caption-tone'),
        captionHashtags: document.getElementById('caption-hashtags'),
        captionResult: document.getElementById('caption-result'),
        captionOutput: document.getElementById('caption-output'),
        
        // Job Calculator
        jobSatisfaction: document.getElementById('job-satisfaction'),
        workLifeBalance: document.getElementById('work-life-balance'),
        careerGrowth: document.getElementById('career-growth'),
        salarySatisfaction: document.getElementById('salary-satisfaction'),
        jobSecurity: document.getElementById('job-security'),
        emergencyFund: document.getElementById('emergency-fund'),
        jobResult: document.getElementById('job-result'),
        jobOutput: document.getElementById('job-output'),
        
        // Cost Comparison
        cityFrom: document.getElementById('city-from'),
        cityTo: document.getElementById('city-to'),
        currentSalary: document.getElementById('current-salary'),
        comparisonResult: document.getElementById('comparison-result'),
        comparisonOutput: document.getElementById('comparison-output')
    };
}

// Skeleton Loader Management
function initializeSkeletonLoader() {
    // Show skeleton loader for specified duration
    setTimeout(() => {
        hideSkeletonLoader();
    }, CONFIG.SKELETON_DURATION);
}

function hideSkeletonLoader() {
    if (elements.skeletonLoader && elements.mainApp) {
        elements.skeletonLoader.style.opacity = '0';
        elements.skeletonLoader.style.pointerEvents = 'none';
        
        setTimeout(() => {
            elements.skeletonLoader.style.display = 'none';
            elements.mainApp.classList.remove('hidden');
        }, CONFIG.ANIMATION_DURATION);
    }
}

// Animation Initialization
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    state.animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.glass-card, .feature-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        state.animationObserver.observe(el);
    });
}

// Event Listeners
function initializeEventListeners() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Tool card hover effects
    document.querySelectorAll('.tool-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Button hover effects
    document.querySelectorAll('.cta-button, .tool-button').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Mobile Menu
function initializeMobileMenu() {
    if (elements.navToggle && elements.navMenu) {
        elements.navToggle.addEventListener('click', function() {
            elements.navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
}

// Utility Functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function updateSliderValue(slider) {
    const valueSpan = slider.nextElementSibling;
    if (valueSpan && valueSpan.classList.contains('slider-value')) {
        valueSpan.textContent = slider.value;
    }
}

function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        const text = element.textContent || element.innerText;
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Copied to clipboard!', 'success');
        }).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showNotification('Copied to clipboard!', 'success');
        });
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--glass-bg);
        backdrop-filter: blur(20px);
        border: 1px solid var(--glass-border);
        color: var(--text-primary);
        padding: var(--spacing-md) var(--spacing-lg);
        border-radius: var(--radius-lg);
        z-index: var(--z-toast);
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// AI Content Catalyst Suite Functions

async function generateCaption() {
    const topic = elements.captionTopic.value.trim();
    const tone = elements.captionTone.value;
    const hashtags = elements.captionHashtags.value;
    
    if (!topic) {
        showNotification('Please describe your post first!', 'error');
        return;
    }
    
    const button = event.target;
    const buttonText = button.querySelector('.button-text');
    const buttonLoader = button.querySelector('.button-loader');
    
    // Show loading state
    buttonText.style.display = 'none';
    buttonLoader.classList.remove('hidden');
    button.disabled = true;
    
    try {
        const caption = await callGeminiAPI(topic, tone, hashtags);
        displayCaptionResult(caption);
    } catch (error) {
        console.error('API Error:', error);
        // Use fallback caption
        const fallbackCaption = getFallbackCaption(tone);
        displayCaptionResult(fallbackCaption);
        showNotification('Using offline mode - caption generated locally', 'info');
    } finally {
        // Hide loading state
        buttonText.style.display = 'inline';
        buttonLoader.classList.add('hidden');
        button.disabled = false;
    }
}

async function callGeminiAPI(topic, tone, hashtags) {
    const prompt = `Create an engaging Instagram caption for the following post:

Topic: ${topic}
Tone: ${tone}
Number of hashtags: ${hashtags}

Please create a caption that:
1. Matches the ${tone} tone perfectly
2. Is engaging and authentic
3. Includes exactly ${hashtags} relevant hashtags
4. Is optimized for Instagram engagement
5. Includes emojis where appropriate

The caption should be well-structured with the main text first, followed by the hashtags.`;

    const response = await fetch(`${CONFIG.GEMINI_API_URL}?key=${CONFIG.GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            contents: [{
                parts: [{
                    text: prompt
                }]
            }],
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 1024,
            }
        })
    });
    
    if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return data.candidates[0].content.parts[0].text;
    } else {
        throw new Error('Invalid API response format');
    }
}

function getFallbackCaption(tone) {
    const captions = FALLBACK_CAPTIONS[tone] || FALLBACK_CAPTIONS.casual;
    return captions[Math.floor(Math.random() * captions.length)];
}

function displayCaptionResult(caption) {
    elements.captionOutput.textContent = caption;
    elements.captionResult.classList.remove('hidden');
    elements.captionResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Interactive Decision Hub Functions

function calculateJobDecision() {
    const satisfaction = parseInt(elements.jobSatisfaction.value);
    const workLife = parseInt(elements.workLifeBalance.value);
    const growth = parseInt(elements.careerGrowth.value);
    const salary = parseInt(elements.salarySatisfaction.value);
    const security = parseInt(elements.jobSecurity.value);
    const emergency = parseInt(elements.emergencyFund.value);
    
    // Calculate weighted score
    const weights = {
        satisfaction: 0.25,
        workLife: 0.20,
        growth: 0.20,
        salary: 0.15,
        security: 0.20
    };
    
    const score = (
        satisfaction * weights.satisfaction +
        workLife * weights.workLife +
        growth * weights.growth +
        salary * weights.salary +
        security * weights.security
    );
    
    // Financial readiness factor
    const financialReadiness = Math.min(emergency / 6, 1); // 6 months is ideal
    const adjustedScore = score * (0.7 + 0.3 * financialReadiness);
    
    let recommendation, analysis, riskLevel, actionItems;
    
    if (adjustedScore >= 7.5) {
        recommendation = "Consider staying in your current job";
        riskLevel = "Low Risk";
        analysis = "Your current job situation appears to be quite positive across multiple dimensions. You have good job satisfaction, work-life balance, and growth opportunities. This is a strong foundation for career stability.";
        actionItems = [
            "Focus on maximizing growth opportunities in your current role",
            "Build stronger relationships with colleagues and management",
            "Consider asking for additional responsibilities or projects",
            "Continue building your emergency fund for future flexibility"
        ];
    } else if (adjustedScore >= 5.5) {
        recommendation = "Improve your current situation before considering a change";
        riskLevel = "Medium Risk";
        analysis = "Your job has some positive aspects but also areas that need attention. Before making a drastic change, try to address the specific issues that are causing dissatisfaction.";
        actionItems = [
            "Have an honest conversation with your manager about your concerns",
            "Identify specific areas for improvement and create an action plan",
            "Build your emergency fund to at least 6 months of expenses",
            "Start networking and exploring other opportunities passively",
            "Consider additional training or certifications to improve your position"
        ];
    } else {
        recommendation = "Seriously consider looking for a new job";
        riskLevel = "High Risk";
        analysis = "Multiple factors suggest that your current job situation may not be sustainable long-term. However, make sure you have a solid plan before making any moves.";
        actionItems = [
            "Start actively job searching while still employed",
            "Build your emergency fund to at least 3-6 months of expenses",
            "Update your resume and LinkedIn profile",
            "Network actively in your industry",
            "Consider what type of role and company culture would better suit you",
            "Don't quit until you have a solid offer from another company"
        ];
    }
    
    const result = `
<div class="decision-summary">
    <div class="score-display">
        <div class="score-circle">
            <span class="score-number">${adjustedScore.toFixed(1)}</span>
            <span class="score-label">/ 10</span>
        </div>
        <div class="risk-badge risk-${riskLevel.toLowerCase().replace(' ', '-')}">${riskLevel}</div>
    </div>
    
    <div class="recommendation">
        <h5>Recommendation:</h5>
        <p><strong>${recommendation}</strong></p>
    </div>
    
    <div class="analysis">
        <h5>Analysis:</h5>
        <p>${analysis}</p>
    </div>
    
    <div class="action-items">
        <h5>Action Items:</h5>
        <ul>
            ${actionItems.map(item => `<li>${item}</li>`).join('')}
        </ul>
    </div>
    
    <div class="factors-breakdown">
        <h5>Factor Breakdown:</h5>
        <div class="factor-grid">
            <div class="factor-item">
                <span class="factor-label">Job Satisfaction:</span>
                <span class="factor-value">${satisfaction}/10</span>
            </div>
            <div class="factor-item">
                <span class="factor-label">Work-Life Balance:</span>
                <span class="factor-value">${workLife}/10</span>
            </div>
            <div class="factor-item">
                <span class="factor-label">Career Growth:</span>
                <span class="factor-value">${growth}/10</span>
            </div>
            <div class="factor-item">
                <span class="factor-label">Salary Satisfaction:</span>
                <span class="factor-value">${salary}/10</span>
            </div>
            <div class="factor-item">
                <span class="factor-label">Job Security:</span>
                <span class="factor-value">${security}/10</span>
            </div>
            <div class="factor-item">
                <span class="factor-label">Emergency Fund:</span>
                <span class="factor-value">${emergency} months</span>
            </div>
        </div>
    </div>
</div>`;
    
    elements.jobOutput.innerHTML = result;
    elements.jobResult.classList.remove('hidden');
    elements.jobResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function compareCostOfLiving() {
    const fromCity = elements.cityFrom.value;
    const toCity = elements.cityTo.value;
    const salary = parseInt(elements.currentSalary.value) || 50000;
    
    if (fromCity === toCity) {
        showNotification('Please select different cities for comparison', 'error');
        return;
    }
    
    const fromData = CITY_DATA[fromCity];
    const toData = CITY_DATA[toCity];
    
    if (!fromData || !toData) {
        showNotification('City data not available', 'error');
        return;
    }
    
    // Calculate cost difference
    const costDifference = toData.total - fromData.total;
    const percentageDifference = ((costDifference / fromData.total) * 100).toFixed(1);
    
    // Calculate equivalent salary needed
    const equivalentSalary = Math.round(salary * (toData.total / fromData.total));
    const salaryDifference = equivalentSalary - salary;
    
    // Determine if move is financially beneficial
    let recommendation, analysis;
    if (costDifference < -5000) {
        recommendation = "Financially Beneficial Move";
        analysis = `Moving to ${toData.name} could significantly reduce your living costs. You could maintain the same lifestyle with a lower salary or save more money with your current income.`;
    } else if (costDifference < 5000) {
        recommendation = "Neutral Financial Impact";
        analysis = `The cost of living difference between ${fromData.name} and ${toData.name} is minimal. Your decision should be based on other factors like career opportunities, lifestyle preferences, and personal circumstances.`;
    } else {
        recommendation = "Higher Cost of Living";
        analysis = `Moving to ${toData.name} will increase your living costs. Make sure you have a salary increase or strong career prospects to justify the higher expenses.`;
    }
    
    const result = `
<div class="comparison-summary">
    <div class="cities-header">
        <div class="city-card">
            <h4>${fromData.name}</h4>
            <div class="total-cost">₹${fromData.total.toLocaleString()}/month</div>
        </div>
        <div class="vs-divider">VS</div>
        <div class="city-card">
            <h4>${toData.name}</h4>
            <div class="total-cost">₹${toData.total.toLocaleString()}/month</div>
        </div>
    </div>
    
    <div class="cost-difference">
        <div class="difference-amount ${costDifference > 0 ? 'higher' : 'lower'}">
            ${costDifference > 0 ? '+' : ''}₹${Math.abs(costDifference).toLocaleString()}
            <span class="percentage">(${percentageDifference > 0 ? '+' : ''}${percentageDifference}%)</span>
        </div>
        <div class="difference-label">Monthly Cost Difference</div>
    </div>
    
    <div class="salary-analysis">
        <h5>Salary Analysis:</h5>
        <div class="salary-grid">
            <div class="salary-item">
                <span class="salary-label">Current Salary:</span>
                <span class="salary-value">₹${salary.toLocaleString()}</span>
            </div>
            <div class="salary-item">
                <span class="salary-label">Equivalent Salary Needed:</span>
                <span class="salary-value">₹${equivalentSalary.toLocaleString()}</span>
            </div>
            <div class="salary-item">
                <span class="salary-label">Salary Difference:</span>
                <span class="salary-value ${salaryDifference > 0 ? 'higher' : 'lower'}">
                    ${salaryDifference > 0 ? '+' : ''}₹${Math.abs(salaryDifference).toLocaleString()}
                </span>
            </div>
        </div>
    </div>
    
    <div class="recommendation">
        <h5>Recommendation:</h5>
        <p><strong>${recommendation}</strong></p>
        <p>${analysis}</p>
    </div>
    
    <div class="cost-breakdown">
        <h5>Detailed Cost Breakdown:</h5>
        <div class="breakdown-grid">
            <div class="breakdown-header">
                <div>Category</div>
                <div>${fromData.name}</div>
                <div>${toData.name}</div>
                <div>Difference</div>
            </div>
            ${Object.keys(fromData).filter(key => key !== 'name' && key !== 'total').map(category => {
                const diff = toData[category] - fromData[category];
                return `
                <div class="breakdown-row">
                    <div class="category-name">${category.charAt(0).toUpperCase() + category.slice(1)}</div>
                    <div>₹${fromData[category].toLocaleString()}</div>
                    <div>₹${toData[category].toLocaleString()}</div>
                    <div class="${diff > 0 ? 'higher' : diff < 0 ? 'lower' : 'same'}">
                        ${diff > 0 ? '+' : ''}₹${diff.toLocaleString()}
                    </div>
                </div>`;
            }).join('')}
        </div>
    </div>
</div>`;
    
    elements.comparisonOutput.innerHTML = result;
    elements.comparisonResult.classList.remove('hidden');
    elements.comparisonResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Additional CSS for dynamic content (injected via JavaScript)
function injectDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .decision-summary, .comparison-summary {
            font-family: var(--font-primary);
        }
        
        .score-display {
            display: flex;
            align-items: center;
            gap: var(--spacing-lg);
            margin-bottom: var(--spacing-lg);
        }
        
        .score-circle {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: var(--gradient-primary);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: white;
        }
        
        .score-number {
            font-size: 1.5rem;
            font-weight: 700;
        }
        
        .score-label {
            font-size: 0.75rem;
            opacity: 0.8;
        }
        
        .risk-badge {
            padding: var(--spacing-sm) var(--spacing-md);
            border-radius: var(--radius-md);
            font-size: 0.875rem;
            font-weight: 600;
        }
        
        .risk-low-risk {
            background: var(--gradient-accent);
            color: white;
        }
        
        .risk-medium-risk {
            background: var(--gradient-warm);
            color: white;
        }
        
        .risk-high-risk {
            background: var(--gradient-secondary);
            color: white;
        }
        
        .recommendation, .analysis, .action-items, .factors-breakdown, .salary-analysis {
            margin-bottom: var(--spacing-lg);
        }
        
        .recommendation h5, .analysis h5, .action-items h5, .factors-breakdown h5, .salary-analysis h5 {
            color: var(--text-accent);
            margin-bottom: var(--spacing-sm);
            font-size: 1rem;
        }
        
        .action-items ul {
            list-style: none;
            padding: 0;
        }
        
        .action-items li {
            padding: var(--spacing-sm) 0;
            border-bottom: 1px solid var(--border-color);
            position: relative;
            padding-left: var(--spacing-lg);
        }
        
        .action-items li:before {
            content: '→';
            position: absolute;
            left: 0;
            color: var(--text-accent);
            font-weight: bold;
        }
        
        .factor-grid, .salary-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: var(--spacing-md);
        }
        
        .factor-item, .salary-item {
            display: flex;
            justify-content: space-between;
            padding: var(--spacing-sm);
            background: rgba(255, 255, 255, 0.02);
            border-radius: var(--radius-sm);
        }
        
        .factor-value, .salary-value {
            font-weight: 600;
            color: var(--text-accent);
        }
        
        .cities-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: var(--spacing-xl);
        }
        
        .city-card {
            text-align: center;
            padding: var(--spacing-lg);
            background: var(--glass-bg);
            border-radius: var(--radius-lg);
            flex: 1;
        }
        
        .city-card h4 {
            margin-bottom: var(--spacing-sm);
            color: var(--text-primary);
        }
        
        .total-cost {
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--text-accent);
        }
        
        .vs-divider {
            margin: 0 var(--spacing-lg);
            font-weight: 700;
            color: var(--text-muted);
        }
        
        .cost-difference {
            text-align: center;
            margin-bottom: var(--spacing-xl);
        }
        
        .difference-amount {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: var(--spacing-sm);
        }
        
        .difference-amount.higher {
            color: #ff6b6b;
        }
        
        .difference-amount.lower {
            color: #51cf66;
        }
        
        .percentage {
            font-size: 1rem;
            opacity: 0.8;
        }
        
        .difference-label {
            color: var(--text-muted);
            font-size: 0.875rem;
        }
        
        .breakdown-grid {
            display: grid;
            gap: var(--spacing-xs);
        }
        
        .breakdown-header, .breakdown-row {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            gap: var(--spacing-md);
            padding: var(--spacing-sm);
        }
        
        .breakdown-header {
            font-weight: 600;
            color: var(--text-accent);
            border-bottom: 2px solid var(--border-color);
        }
        
        .breakdown-row {
            border-bottom: 1px solid var(--border-color);
        }
        
        .category-name {
            text-transform: capitalize;
        }
        
        .higher {
            color: #ff6b6b;
        }
        
        .lower {
            color: #51cf66;
        }
        
        .same {
            color: var(--text-muted);
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        @media (max-width: 768px) {
            .cities-header {
                flex-direction: column;
                gap: var(--spacing-md);
            }
            
            .vs-divider {
                margin: 0;
            }
            
            .breakdown-header, .breakdown-row {
                grid-template-columns: 1fr;
                text-align: center;
            }
            
            .breakdown-header {
                display: none;
            }
            
            .breakdown-row {
                background: rgba(255, 255, 255, 0.02);
                border-radius: var(--radius-sm);
                margin-bottom: var(--spacing-sm);
            }
            
            .factor-grid, .salary-grid {
                grid-template-columns: 1fr;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize dynamic styles when DOM is loaded
document.addEventListener('DOMContentLoaded', injectDynamicStyles);

// Export functions for global access
window.scrollToSection = scrollToSection;
window.updateSliderValue = updateSliderValue;
window.copyToClipboard = copyToClipboard;
window.generateCaption = generateCaption;
window.calculateJobDecision = calculateJobDecision;
window.compareCostOfLiving = compareCostOfLiving;

