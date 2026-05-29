// app.js

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. 부드러운 스크롤 (Smooth Scrolling)
    // 네비게이션 메뉴 클릭 시 해당 섹션으로 부드럽게 이동합니다.
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // 고정된 헤더 높이만큼 여백을 줍니다.
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. 스크롤 반응형 헤더 (Sticky Header Effect)
    // 스크롤을 내리면 헤더의 배경이 조금 더 진해지고 그림자가 생깁니다.
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(18, 18, 18, 0.95)';
            header.style.boxShadow = '0 4px 15px rgba(0,0,0,0.5)';
            header.style.transition = 'all 0.3s ease';
        } else {
            header.style.background = 'rgba(18, 18, 18, 0.8)';
            header.style.boxShadow = 'none';
        }
    });

    // 3. 스크롤 애니메이션 (Intersection Observer)
    // 사용자가 스크롤을 내려 요소가 화면에 보일 때 부드럽게 나타나는 효과입니다.
    const observerOptions = {
        threshold: 0.1, // 요소의 10%가 화면에 보일 때 실행
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // 한 번 나타나면 다시 애니메이션을 실행하지 않음
            }
        });
    }, observerOptions);

    // 애니메이션을 적용할 요소들 선택 (섹션, 비디오 카드, 갤러리 아이템)
    const fadeElements = document.querySelectorAll('.content-section, .video-card, .gallery-item');
    fadeElements.forEach(el => {
        el.classList.add('fade-in'); // CSS와 연동하기 위해 초기 클래스 추가
        observer.observe(el);
    });
});