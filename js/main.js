/**
 * UN-FAO DevSecOps Best Practices Website
 * Main JavaScript file for interactive elements
 */

document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    const handleToggleMenu = () => {
        mainNav.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        // Update accessibility attributes
        const isExpanded = mainNav.classList.contains('active');
        mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
        
        // Toggle menu icon
        const icon = mobileMenuToggle.querySelector('i');
        if (isExpanded) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    };
    
    mobileMenuToggle.addEventListener('click', handleToggleMenu);
    
    // Smooth scrolling for anchor links
    const handleSmoothScroll = (e) => {
        const href = e.currentTarget.getAttribute('href');
        
        if (href.startsWith('#') && href !== '#') {
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - headerHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if it's open
                if (mainNav.classList.contains('active')) {
                    handleToggleMenu();
                }
                
                // Update URL hash
                history.pushState(null, null, href);
            }
        }
    };
    
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    anchorLinks.forEach(link => {
        link.addEventListener('click', handleSmoothScroll);
        
        // Add keyboard accessibility
        link.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                handleSmoothScroll(e);
            }
        });
    });
    
    // Update navigation highlights based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.main-nav a, .footer-links a');
    
    const handleScrollHighlight = () => {
        const scrollPosition = window.scrollY + document.querySelector('.header').offsetHeight + 50;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    
    window.addEventListener('scroll', handleScrollHighlight);
    
    // Initialize current year in footer copyright
    const yearElement = document.querySelector('.current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}); 