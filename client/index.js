// Mobile Navigation Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');

mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

const chatModal = document.getElementById("chatModal");
const floatingChatButton = document.getElementById("floatingChatButton");
const closeChat = document.getElementById("closeChat");
const chatBody = document.getElementById("chatBody");
const chatInput = document.getElementById("chatInput");
const sendMessageButton = document.getElementById("sendMessage");
const initialPrompt = document.getElementById("initialPrompt");

let messages = [];

function toggleChat() {
  chatModal.classList.toggle("hidden");
}

function renderMessages() {
  chatBody.innerHTML = "";
  if (messages.length === 0) {
    chatBody.appendChild(initialPrompt);
  } else {
    messages.forEach(msg => {
      const div = document.createElement("div");
      div.className = msg.sender === "user" ? "user-msg" : "bot-msg";
      div.textContent = msg.text;
      chatBody.appendChild(div);
    });
  }
}

async function sendMessage() {
  const input = chatInput.value.trim();
  if (!input) return;

  const userMessage = { sender: "user", text: input };
  messages.push(userMessage);
  chatInput.value = "";
  renderMessages();

  try {
    const res = await fetch("http://localhost:3001/api/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    const botMessage = { sender: "grok", text: data.reply };
    messages.push(botMessage);
  } catch (err) {
    console.error(err);
    messages.push({ sender: "grok", text: "Oops! Something went wrong." });
  }

  renderMessages();
}

floatingChatButton.addEventListener("click", toggleChat);
closeChat.addEventListener("click", toggleChat);
sendMessageButton.addEventListener("click", sendMessage);
chatInput.addEventListener("keydown", e => {
  if (e.key === "Enter") sendMessage();
});



document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.querySelector(".dropdown-toggle");
    const dropdown = toggle.closest(".dropdown");

    toggle.addEventListener("click", function (e) {
        e.preventDefault(); // Prevent the default anchor behavior
        dropdown.classList.toggle("open");
    });

    // Optional: click outside to close
    document.addEventListener("click", function (e) {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove("open");
        }
    });
});


  // Simple JavaScript for interactive elements
  document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            if (targetId) {
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Mobile navigation toggle
    const createMobileMenu = () => {
        const nav = document.querySelector('nav');
        const header = document.querySelector('header');
        
        const menuToggle = document.createElement('button');
        menuToggle.textContent = '☰ Menu';
        menuToggle.classList.add('mobile-menu-toggle');
        menuToggle.style.display = 'none';
        menuToggle.style.padding = '10px 15px';
        menuToggle.style.background = '#0066cc';
        menuToggle.style.color = '#fff';
        menuToggle.style.border = 'none';
        menuToggle.style.borderRadius = '4px';
        menuToggle.style.cursor = 'pointer';
        menuToggle.style.marginTop = '10px';
        
        header.querySelector('.logo-container').after(menuToggle);
        
        menuToggle.addEventListener('click', () => {
            nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
        });
        
        const updateMenu = () => {
            if (window.innerWidth <= 768) {
                menuToggle.style.display = 'block';
                nav.style.display = 'none';
            } else {
                menuToggle.style.display = 'none';
                nav.style.display = 'block';
            }
        };
        
        window.addEventListener('resize', updateMenu);
        updateMenu();
    };
    
    createMobileMenu();
    
    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('nav ul li a').forEach(link => {
        if (link.getAttribute('href').indexOf(currentPage) !== -1) {
            link.style.color = '#0066cc';
            link.style.fontWeight = '700';
        }
    });
});