// Typewriter Effect
const typewriterText = "My Dearest Mahi,";
const letterContent = `From the moment I saw you, my world changed. Your smile, your laughter, and the way you look at me make my heart skip a beat. You are the most beautiful person I have ever known, inside and out.

Every moment with you feels like a dream. You make me a better person, and I am so grateful to have you in my life. I promise to love you, cherish you, and stand by you forever.

No matter where life takes us, my love for you will never fade. You are my everything, Mahi.`;

const signature = "Forever yours,\nTamim";

let typewriterIndex = 0;
let contentIndex = 0;

function typeWriter() {
    if (typewriterIndex < typewriterText.length) {
        document.getElementById("typewriter").textContent += typewriterText.charAt(typewriterIndex);
        typewriterIndex++;
        setTimeout(typeWriter, 100);
    } else if (contentIndex < letterContent.length) {
        document.getElementById("letter-content").textContent += letterContent.charAt(contentIndex);
        contentIndex++;
        setTimeout(typeWriter, 30);
    } else {
        document.getElementById("signature").textContent = signature;
    }
}

// Reveal Hidden Message with Confetti
document.getElementById("reveal-button").addEventListener("click", () => {
    document.getElementById("hidden-message").classList.remove("hidden");
    document.getElementById("reveal-button").style.display = "none";
    startConfetti();
});

// Heart Animation
function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "❤";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 3 + 2 + "s";
    document.getElementById("heart-container").appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 5000);
}

setInterval(createHeart, 300);

// Countdown Timer
const countdownDate = new Date("2023-12-31T00:00:00").getTime(); // Set your special date here

function updateCountdown() {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;

    if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById("timer").innerHTML = "We're together now! ❤️";
    }
}

const countdownInterval = setInterval(updateCountdown, 1000);

// Confetti Animation
function startConfetti() {
    const canvas = document.getElementById("confetti-canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiPieces = [];
    const colors = ["#e74c3c", "#3498db", "#2ecc71", "#f1c40f", "#9b59b6"];

    class Confetti {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height - canvas.height;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.size = Math.random() * 10 + 5;
            this.speed = Math.random() * 3 + 2;
            this.angle = Math.random() * 360;
        }

        update() {
            this.y += this.speed;
            this.angle += 0.1;
            if (this.y > canvas.height) {
                this.y = 0;
                this.x = Math.random() * canvas.width;
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            ctx.restore();
        }
    }

    for (let i = 0; i < 100; i++) {
        confettiPieces.push(new Confetti());
    }

    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confettiPieces.forEach((piece) => {
            piece.update();
            piece.draw();
        });
        requestAnimationFrame(animateConfetti);
    }

    animateConfetti();
}

// Start Typewriter Effect
typeWriter();