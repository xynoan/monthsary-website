document.addEventListener('DOMContentLoaded', () => {
    // Music player functionality
    const musicToggle = document.querySelector('.music-toggle');
    const backgroundMusic = document.getElementById('background-music');
    const musicText = document.querySelector('.music-text');
    const playIcon = document.querySelector('.music-toggle .fa-play');
    const musicMessage = document.getElementById('music-message');
    const closeMessageBtn = document.querySelector('.close-music-message');
    
    let isPlaying = false;
    
    // Add a floating tooltip to make it more noticeable
    const tooltip = document.createElement('div');
    tooltip.className = 'music-tooltip';
    tooltip.textContent = 'Click to play music!';
    document.body.appendChild(tooltip);
    
    // Position the tooltip
    function positionTooltip() {
        const toggleRect = musicToggle.getBoundingClientRect();
        tooltip.style.top = (toggleRect.bottom + 10) + 'px';
        tooltip.style.left = (toggleRect.left + toggleRect.width/2 - tooltip.offsetWidth/2) + 'px';
    }
    
    // Show tooltip on page load
    setTimeout(() => {
        positionTooltip();
        tooltip.classList.add('visible');
        
        // Hide tooltip after 5 seconds
        setTimeout(() => {
            tooltip.classList.remove('visible');
        }, 5000);
    }, 2000);
    
    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            backgroundMusic.pause();
            musicToggle.classList.remove('playing');
            musicText.textContent = 'Play Music';
            playIcon.style.display = 'inline-block';
        } else {
            backgroundMusic.play()
                .then(() => {
                    // Playback started successfully
                    tooltip.classList.remove('visible');
                    
                    // Show the music message when music starts playing
                    setTimeout(() => {
                        musicMessage.classList.add('visible');
                    }, 1000);
                })
                .catch(error => {
                    console.log("Music playback was prevented by the browser: ", error);
                    alert("Please click 'Play Music' again to enable sound!");
                });
            musicToggle.classList.add('playing');
            musicText.textContent = 'Pause Music';
            playIcon.style.display = 'none';
        }
        
        isPlaying = !isPlaying;
    });

    // Close message functionality
    closeMessageBtn.addEventListener('click', () => {
        musicMessage.classList.remove('visible');
    });

    // Continue button functionality
    const continueButton = document.querySelector('.continue-button');
    const timeline = document.querySelector('.timeline');
    
    continueButton.addEventListener('click', () => {
        timeline.scrollIntoView({ behavior: 'smooth' });
    });

    // Improved check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        // Element is considered in viewport when at least partially visible
        return (
            rect.bottom >= 0 &&
            rect.right >= 0 &&
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.left <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Add animation class when scrolling
    function checkVisibility() {
        const sections = document.querySelectorAll('.timeline-section');
        
        sections.forEach(section => {
            if (isInViewport(section)) {
                section.classList.add('visible');
            }
        });
    }

    // Initial check
    checkVisibility();

    // Check on scroll with throttling for performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(() => {
            checkVisibility();
        }, 10);
    });

    // Force check visibility again after a short delay to ensure all elements are properly checked
    setTimeout(checkVisibility, 500);
    setTimeout(checkVisibility, 1000);
    setTimeout(checkVisibility, 2000);

    // Smooth scrolling for the arrow down
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    scrollIndicator.addEventListener('click', () => {
        timeline.scrollIntoView({ behavior: 'smooth' });
    });

    // Heart confetti effect for the final section
    const finalMessage = document.getElementById('message');
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 2 + 's';
        heart.style.opacity = Math.random() * 0.5 + 0.5;
        
        heart.innerText = '❤️';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 5000);
    }

    // Only show hearts when final message is visible
    window.addEventListener('scroll', () => {
        if (finalMessage.classList.contains('visible')) {
            setTimeout(() => {
                setInterval(createHeart, 300);
            }, 1000);
        }
    });

    // Add CSS for hearts
    const style = document.createElement('style');
    style.innerHTML = `
        .heart {
            position: fixed;
            top: -1vh;
            font-size: 20px;
            transform: translateY(0);
            animation: fall linear forwards;
            z-index: 999;
        }
        
        @keyframes fall {
            to {
                transform: translateY(105vh);
            }
        }
    `;
    document.head.appendChild(style);

    // Add parallax effect to the background
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        document.body.style.backgroundPositionY = scrollY * 0.5 + 'px';
    });

    // Add hover effects to the timeline sections
    const timelineSections = document.querySelectorAll('.timeline-section');
    
    timelineSections.forEach(section => {
        section.addEventListener('mouseenter', () => {
            section.style.transform = 'scale(1.02)';
            section.style.transition = 'transform 0.3s ease';
        });
        
        section.addEventListener('mouseleave', () => {
            section.style.transform = 'scale(1)';
        });
    });

    // Create a typing effect for the final message
    const finalMessageText = document.querySelector('.final-message p');
    const originalText = finalMessageText.textContent;
    
    function typeWriter(element, text, i = 0) {
        if (i === 0) {
            element.textContent = '';
        }
        
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(() => typeWriter(element, text, i), 50);
        }
    }

    // Start typing effect when final message is visible
    window.addEventListener('scroll', () => {
        if (finalMessage.classList.contains('visible') && finalMessageText.textContent === originalText) {
            typeWriter(finalMessageText, originalText);
        }
    });

    // Virtual Punch Game functionality
    const character = document.getElementById('boyfriend-character');
    const stickman = document.getElementById('girlfriend-stickman');
    const punchButton = document.getElementById('punch-button');
    const punchCounter = document.getElementById('punch-counter');
    const punchMessage = document.getElementById('punch-message');
    
    // Punch responses
    const punchResponses = [
        "Ouch!",
        "That hurt!",
        "Hey!",
        "Whyyy?",
        "What did I do?",
        "Baeee!",
        "Stop it!",
        "Aray ko!",
        "Love you still!",
        "Not the face!",
        "Nakakapagod ka!",
        "Ang sakit!",
        "Ikaw tlga!",
        "Pero bakit?",
        "Sumabay pa bunso ko!"
    ];
    
    let punchCount = 0;
    let isPunched = false;
    
    function punch() {
        if (isPunched) return;
        isPunched = true;
        
        // Add punching class to stickman
        stickman.classList.add('punching');
        
        // Wait a bit before showing the punch impact
        setTimeout(() => {
            // Increase counter
            punchCount++;
            punchCounter.textContent = punchCount;
            
            // Save to localStorage for persistence
            localStorage.setItem('punchCount', punchCount);
            
            // Show random response
            const response = punchResponses[Math.floor(Math.random() * punchResponses.length)];
            punchMessage.textContent = response;
            punchMessage.classList.add('visible');
            
            // Add punched animation
            character.classList.add('punched');
            
            // Create flying hearts
            createFlyingHearts();
            
            // Reset after animation
            setTimeout(() => {
                character.classList.remove('punched');
                stickman.classList.remove('punching');
                isPunched = false;
                
                setTimeout(() => {
                    punchMessage.classList.remove('visible');
                }, 1000);
            }, 800);
        }, 200);
    }
    
    function createFlyingHearts() {
        const numHearts = 5;
        
        for (let i = 0; i < numHearts; i++) {
            const heart = document.createElement('div');
            heart.className = 'flying-heart';
            heart.textContent = '❤️';
            heart.style.setProperty('--x', (Math.random() * 200 - 100) + 'px');
            heart.style.setProperty('--y', (Math.random() * -150 - 50) + 'px');
            
            character.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 1000);
        }
    }
    
    // Check for existing punch count
    if (localStorage.getItem('punchCount')) {
        punchCount = parseInt(localStorage.getItem('punchCount'));
        punchCounter.textContent = punchCount;
    }
    
    // Event listeners
    punchButton.addEventListener('click', punch);
    character.addEventListener('click', punch);
}); 