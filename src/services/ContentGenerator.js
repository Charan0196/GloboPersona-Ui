class ContentGenerator {
    static subjects = [
        "Quick question about the project",
        "Following up on our discussion",
        "Thoughts on the new proposal",
        "Meeting schedule for next week",
        "Update on the latest developments",
        "Collaboration opportunity",
        "Feedback on your recent work",
        "Ideas for improvement",
        "Quick sync needed",
        "Resource sharing",
        "Project milestone update",
        "Team coordination",
        "Documentation review",
        "Planning session invite",
        "Progress report",
        "Strategy discussion",
        "Weekly check-in",
        "Important announcement",
        "Request for input",
        "Sharing insights"
    ];

    static messageTemplates = [
        "Hi! I wanted to reach out regarding {topic}. Would love to hear your thoughts on this.",
        "Hello! I've been thinking about {topic} and thought you might have some valuable insights.",
        "Hey there! Quick question about {topic}. Do you have a moment to discuss?",
        "Hi! I came across something interesting related to {topic} and wanted to share it with you.",
        "Hello! I'd appreciate your perspective on {topic} when you get a chance.",
        "Hey! Just wanted to touch base about {topic}. Let me know what you think.",
        "Hi there! I've been working on {topic} and would value your input.",
        "Hello! Hope you're doing well. I wanted to discuss {topic} with you.",
        "Hey! I have some ideas about {topic} that I'd like to run by you.",
        "Hi! Could we schedule some time to talk about {topic}?",
        "Hello! I think {topic} could benefit from your expertise.",
        "Hey there! I wanted to get your feedback on {topic}.",
        "Hi! I've made some progress on {topic} and wanted to update you.",
        "Hello! Let's collaborate on {topic} - I think we could create something great.",
        "Hey! I noticed some interesting developments in {topic}.",
        "Hi there! Your experience with {topic} would be really helpful here.",
        "Hello! I'd like to explore {topic} further with your input.",
        "Hey! Quick update on {topic} - thought you should know.",
        "Hi! I have a proposal regarding {topic} that might interest you.",
        "Hello! Let's sync up about {topic} when you're available."
    ];

    static replyTemplates = [
        "Thanks for reaching out! I'd be happy to discuss this further.",
        "Great question! Here are my thoughts on that...",
        "I appreciate you sharing this. I have some ideas that might help.",
        "Absolutely! I think this is a great opportunity for collaboration.",
        "Thanks for the update! This looks really promising.",
        "I'm glad you brought this up. Let's definitely explore this together.",
        "This is interesting! I'd love to contribute to this.",
        "Thank you! I have some experience with this that might be useful.",
        "Great timing! I was just thinking about something similar.",
        "I appreciate your perspective on this. Here's what I think...",
        "Thanks for looping me in! I'm definitely interested.",
        "This sounds like a valuable initiative. Count me in!",
        "I'm happy to help with this. When would be a good time to discuss?",
        "Thanks for the heads up! I'll take a look and get back to you.",
        "Great idea! I think we should move forward with this.",
        "I appreciate you thinking of me for this. I'd be glad to participate.",
        "This aligns well with what we've been working on. Let's sync up!",
        "Thanks for sharing! I have some thoughts that might add value.",
        "I'm excited about this opportunity. Let's make it happen!",
        "Thank you! I'll review this and share my feedback soon."
    ];

    static topics = [
        "the upcoming project deadline",
        "the new feature implementation",
        "team collaboration strategies",
        "process improvements",
        "resource allocation",
        "the quarterly goals",
        "technical architecture",
        "user feedback analysis",
        "performance optimization",
        "documentation updates",
        "code review practices",
        "testing strategies",
        "deployment procedures",
        "security enhancements",
        "scalability considerations",
        "integration approaches",
        "design patterns",
        "best practices",
        "knowledge sharing",
        "innovation initiatives"
    ];

    /**
     * Generates a random email subject
     */
    static generateSubject() {
        return this.subjects[Math.floor(Math.random() * this.subjects.length)];
    }

    /**
     * Generates a random email message
     */
    static generateMessage() {
        const template = this.messageTemplates[Math.floor(Math.random() * this.messageTemplates.length)];
        const topic = this.topics[Math.floor(Math.random() * this.topics.length)];
        return template.replace('{topic}', topic);
    }

    /**
     * Generates a positive reply message
     */
    static generateReply(originalSubject) {
        const reply = this.replyTemplates[Math.floor(Math.random() * this.replyTemplates.length)];
        return reply;
    }

    /**
     * Generates a reply subject based on original subject
     */
    static generateReplySubject(originalSubject) {
        return `Re: ${originalSubject}`;
    }

    /**
     * Generates a follow-up message
     */
    static generateFollowUp() {
        const followUps = [
            "Just following up on my previous message. Any thoughts?",
            "Wanted to circle back on this. Do you have any updates?",
            "Checking in to see if you had a chance to review this.",
            "Following up on our last conversation. What do you think?",
            "Just wanted to make sure this didn't get lost. Any feedback?",
            "Touching base again on this topic. Let me know your thoughts!",
            "Quick follow-up: have you had time to consider this?",
            "Wanted to reconnect on this. Is now a good time to discuss?",
            "Circling back to see if you need any additional information.",
            "Just checking in on the status of this. Any progress?"
        ];
        
        return followUps[Math.floor(Math.random() * followUps.length)];
    }
}

module.exports = ContentGenerator;
