import React, { useEffect, useRef, useState } from 'react';
import { 
  RocketIcon, 
  CodeIcon, 
  BookOpenIcon, 
  PlayCircleIcon, 
  TrophyIcon, 
  CompassIcon,
  SparkleIcon,
  CheckCircleIcon,
  LightbulbIcon,
  BrandIcon,
  TerminalIcon,
  DocumentTextIcon
} from '../components/ui/Icons';

const EnhancedHomePage = ({ navigateTo }) => {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const progressRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const features = [
    {
      title: 'Interactive Documentation',
      description: 'Learn JavaScript with live code examples and instant feedback',
      icon: BookOpenIcon,
      page: 'documentation',
      color: 'text-matcha-600 dark:text-matcha-400',
      bgColor: 'bg-matcha-50 dark:bg-matcha-900/20',
      borderColor: 'border-matcha-200 dark:border-matcha-800'
    },
    {
      title: 'Live Playground',
      description: 'Write HTML, CSS, and JavaScript with real-time preview',
      icon: CodeIcon,
      page: 'playground',
      color: 'text-wood-600 dark:text-wood-400',
      bgColor: 'bg-wood-50 dark:bg-wood-900/20',
      borderColor: 'border-wood-200 dark:border-wood-800'
    },
    {
      title: 'Coding Challenges',
      description: 'Test your skills with progressive challenges and earn badges',
      icon: TrophyIcon,
      page: 'challenges',
      color: 'text-yellow-600 dark:text-yellow-400',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      borderColor: 'border-yellow-200 dark:border-yellow-800'
    },
    {
      title: 'Learning Guide',
      description: 'Structured path from beginner to advanced JavaScript',
      icon: CompassIcon,
      page: 'guide',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800'
    }
  ];

  const floatingElements = [
    { icon: TerminalIcon, position: 'top-[10%] left-[10%]', size: 'w-12 h-12' },
    { icon: SparkleIcon, position: 'top-[20%] right-[15%]', size: 'w-10 h-10' },
    { icon: RocketIcon, position: 'bottom-[30%] left-[5%]', size: 'w-16 h-16' },
    { icon: LightbulbIcon, position: 'bottom-[10%] right-[10%]', size: 'w-12 h-12' }
  ];

  const stats = [
    {
      number: '500+',
      label: 'Interactive Examples',
      color: 'text-matcha-600 dark:text-matcha-400',
      icon: DocumentTextIcon
    },
    {
      number: '50+',
      label: 'Coding Challenges',
      color: 'text-wood-600 dark:text-wood-400',
      icon: TrophyIcon
    },
    {
      number: '24/7',
      label: 'Available Learning',
      color: 'text-blue-600 dark:text-blue-400',
      icon: CheckCircleIcon
    }
  ];

  useEffect(() => {
    // Load Anime.js dynamically
    const loadAnimeJS = async () => {
      if (typeof window !== 'undefined' && !window.anime) {
        try {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/animejs@3.2.1/lib/anime.min.js';
          script.onload = () => {
            setIsLoaded(true);
            initializeAnimations();
          };
          document.head.appendChild(script);
        } catch (error) {
          console.warn('Failed to load Anime.js:', error);
          setIsLoaded(true); // Fallback to show content without animations
        }
      } else if (window.anime) {
        setIsLoaded(true);
        initializeAnimations();
      } else {
        setIsLoaded(true);
      }
    };

    loadAnimeJS();
  }, []);

  const initializeAnimations = () => {
    if (!window.anime) return;

    const anime = window.anime;

    // Hero animations with timeline
    const heroTimeline = anime.timeline({
      easing: 'easeOutExpo',
    });

    heroTimeline
      .add({
        targets: '.hero-title',
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 1200,
      }, 300)
      .add({
        targets: '.hero-subtitle',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 1000,
      }, 500)
      .add({
        targets: '.hero-btn',
        opacity: [0, 1],
        translateY: [20, 0],
        scale: [0.9, 1],
        duration: 800,
        delay: anime.stagger(200),
        easing: 'easeOutBounce'
      }, 800)
      .add({
        targets: '.stats-item',
        opacity: [0, 1],
        translateY: [20, 0],
        scale: [0.9, 1],
        duration: 600,
        delay: anime.stagger(100),
        easing: 'easeOutBack'
      }, 1000);

    // Feature cards animation
    anime({
      targets: '.feature-card',
      opacity: [0, 1],
      translateY: [50, 0],
      rotateY: [15, 0],
      duration: 1000,
      delay: anime.stagger(150, {start: 1500}),
      easing: 'easeOutExpo'
    });

    // Feature icons animation with rotation
    anime({
      targets: '.feature-icon',
      scale: [0, 1],
      rotate: [180, 0],
      duration: 800,
      delay: anime.stagger(150, {start: 2000}),
      easing: 'easeOutBounce'
    });

    // Progress bar animation
    anime({
      targets: '.progress-fill',
      width: ['0%', '85%'],
      duration: 2000,
      delay: 2500,
      easing: 'easeInOutQuad'
    });

    // Code preview animation
    anime({
      targets: '.code-preview',
      opacity: [0, 1],
      translateY: [30, 0],
      duration: 800,
      delay: 3000,
      easing: 'easeOutQuad'
    });

    // Floating elements continuous animation
    animateFloatingElements(anime);
  };

  const animateFloatingElements = (anime) => {
    // Base floating animation for all elements
    anime({
      targets: '.floating-element',
      translateY: [0, -20, 0],
      duration: 4000,
      easing: 'easeInOutSine',
      loop: true,
      delay: anime.stagger(500)
    });

    // Individual unique animations for each floating element
    anime({
      targets: '.floating-1',
      rotate: [0, 15, 0],
      scale: [1, 1.1, 1],
      duration: 3000,
      easing: 'easeInOutSine',
      loop: true
    });

    anime({
      targets: '.floating-2',
      rotate: [0, 360],
      duration: 8000,
      easing: 'linear',
      loop: true
    });

    anime({
      targets: '.floating-3',
      translateX: [0, 10, 0],
      scale: [1, 1.15, 1],
      duration: 3500,
      easing: 'easeInOutSine',
      loop: true,
      delay: 1000
    });

    anime({
      targets: '.floating-4',
      rotate: [0, -20, 20, 0],
      duration: 4500,
      easing: 'easeInOutSine',
      loop: true,
      delay: 500
    });
  };

  const handleFeatureHover = (index, isEntering) => {
    if (!window.anime) return;

    const anime = window.anime;
    const card = document.querySelector(`[data-feature="${index}"]`);
    const icon = card?.querySelector('.feature-icon svg');

    if (isEntering) {
      anime({
        targets: card,
        scale: 1.05,
        translateY: -10,
        duration: 300,
        easing: 'easeOutQuad'
      });

      anime({
        targets: icon,
        rotate: [0, 360],
        scale: [1, 1.2, 1],
        duration: 800,
        easing: 'easeOutBounce'
      });
    } else {
      anime({
        targets: card,
        scale: 1,
        translateY: 0,
        duration: 300,
        easing: 'easeOutQuad'
      });
    }
  };

  const handleFeatureClick = (page, index) => {
    if (!window.anime) {
      navigateTo(page);
      return;
    }

    const anime = window.anime;
    const card = document.querySelector(`[data-feature="${index}"]`);
    const icon = card?.querySelector('.feature-icon svg');

    anime({
      targets: card,
      scale: [1, 0.95, 1.05, 1],
      duration: 400,
      easing: 'easeInOutQuad'
    });

    anime({
      targets: icon,
      rotate: [0, 720],
      scale: [1, 1.3, 1],
      duration: 600,
      easing: 'easeOutBounce',
      complete: () => navigateTo(page)
    });
  };

  const handleButtonClick = (page, event) => {
    event.preventDefault();
    
    if (!window.anime) {
      navigateTo(page);
      return;
    }

    const anime = window.anime;
    const button = event.currentTarget;
    const icon = button.querySelector('svg');

    // Create ripple effect
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const ripple = document.createElement('div');
    ripple.className = 'ripple-effect';
    ripple.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: 20px;
      height: 20px;
      margin-left: -10px;
      margin-top: -10px;
      background: rgba(255,255,255,0.6);
      border-radius: 50%;
      transform: scale(0);
      pointer-events: none;
      z-index: 1000;
    `;

    button.style.position = 'relative';
    button.appendChild(ripple);

    // Animate ripple
    anime({
      targets: ripple,
      scale: [0, 4],
      opacity: [1, 0],
      duration: 600,
      easing: 'easeOutQuad',
      complete: () => ripple.remove()
    });

    // Animate button
    anime({
      targets: button,
      scale: [1, 0.95, 1],
      duration: 200,
      easing: 'easeInOutQuad'
    });

    // Animate icon
    anime({
      targets: icon,
      rotate: [0, 360],
      scale: [1, 1.2, 1],
      duration: 400,
      easing: 'easeOutBounce',
      complete: () => navigateTo(page)
    });
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-matcha-600 via-matcha-500 to-wood-600">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <div>Loading amazing animations...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-matcha-600 via-matcha-500 to-wood-600 text-white overflow-x-hidden relative">
      {/* Floating Background Elements */}
      {floatingElements.map((element, index) => {
        const IconComponent = element.icon;
        return (
          <div 
            key={index}
            className={`floating-element floating-${index + 1} absolute ${element.position} opacity-30 pointer-events-none`}
          >
            <IconComponent className={`${element.size} text-white`} />
          </div>
        );
      })}

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-16 relative" ref={heroRef}>
          <div className="flex items-center justify-center mb-6">
            <BrandIcon className="w-16 h-16 mr-4" />
            <h1 className="hero-title text-5xl lg:text-6xl font-bold leading-tight opacity-0">
              Master JavaScript
              <span className="block text-yellow-300">Interactively</span>
            </h1>
          </div>
          
          <p className="hero-subtitle text-xl text-matcha-100 leading-relaxed max-w-3xl mx-auto mb-8 opacity-0">
            Learn JavaScript through hands-on coding, real-time feedback, 
            and progressive challenges. Built for developers, by developers.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button 
              onClick={(e) => handleButtonClick('documentation', e)}
              className="hero-btn group flex items-center justify-center space-x-3 px-8 py-4 bg-yellow-400 text-matcha-900 font-semibold rounded-lg hover:bg-yellow-300 transition-all duration-200 shadow-lg opacity-0"
            >
              <RocketIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Start Learning</span>
            </button>
            <button 
              onClick={(e) => handleButtonClick('playground', e)}
              className="hero-btn group flex items-center justify-center space-x-3 px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-matcha-600 transition-all duration-200 opacity-0"
            >
              <PlayCircleIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Try Playground</span>
            </button>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center justify-center space-x-8 mb-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="stats-item flex items-center space-x-2 text-matcha-100 opacity-0">
                  <IconComponent className="w-4 h-4 text-green-400" />
                  <span className="text-sm font-medium">{stat.label}</span>
                </div>
              );
            })}
          </div>

          {/* Progress Section */}
          <div className="progress-section text-center mb-8" ref={progressRef}>
            <h3 className="text-lg mb-4 flex items-center justify-center">
              <CheckCircleIcon className="w-5 h-5 mr-2 text-green-400" />
              Join thousands of developers learning JavaScript
            </h3>
            <div className="progress-bar w-full max-w-md mx-auto h-2 bg-white bg-opacity-20 rounded-full overflow-hidden mb-4">
              <div className="progress-fill h-full bg-gradient-to-r from-yellow-400 to-matcha-400 rounded-full" style={{ width: '0%' }}></div>
            </div>
            <div className="flex items-center justify-center space-x-6 text-matcha-100">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center space-x-1">
                  <span className="font-bold text-yellow-300">{stat.number}</span>
                  <span className="text-sm">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16" ref={featuresRef}>
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className={`feature-card bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border ${feature.borderColor} hover:border-opacity-60 cursor-pointer opacity-0`}
                data-feature={index}
                onMouseEnter={() => handleFeatureHover(index, true)}
                onMouseLeave={() => handleFeatureHover(index, false)}
                onClick={() => handleFeatureClick(feature.page, index)}
              >
                <div className={`w-12 h-12 ${feature.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <div className="feature-icon">
                    <IconComponent className={`w-6 h-6 ${feature.color}`} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white group-hover:text-matcha-600 dark:group-hover:text-matcha-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </section>

        {/* Code Preview Section */}
        <section className="code-preview bg-black bg-opacity-30 backdrop-blur-md rounded-xl p-8 relative overflow-hidden opacity-0 mb-16">
          {/* Terminal Header */}
          <div className="flex items-center space-x-2 mb-4 pb-3 border-b border-gray-700">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-gray-400 text-sm font-mono ml-4 flex items-center">
              <TerminalIcon className="w-4 h-4 mr-2" />
              javascript
            </span>
          </div>
          
          <pre className="text-matcha-200 font-mono text-sm lg:text-base leading-relaxed overflow-x-auto">
            <code>{`// Welcome to JS Master
const skills = ['JavaScript', 'React', 'Node.js'];

skills.forEach(skill => {
    console.log(\`Learning \${skill}\`);
});

// Start your journey today!
const journey = {
    start: () => console.log('🚀 Let\'s code!'),
    learn: () => console.log('📚 Understanding concepts...'),
    practice: () => console.log('💻 Building projects...'),
    master: () => console.log('🏆 Becoming expert!')
};

journey.start();`}</code>
          </pre>
        </section>

        {/* CTA Section */}
        <section className="text-center py-16">
          <div className="mb-8">
            <div className="flex items-center justify-center mb-6">
              <RocketIcon className="w-16 h-16 text-yellow-300 mr-4" />
              <h2 className="text-4xl font-bold">
                Ready to Start Your JavaScript Journey?
              </h2>
            </div>
            <p className="text-xl text-matcha-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands of developers learning JavaScript the interactive way. 
              Start coding today and see your skills grow.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={(e) => handleButtonClick('documentation', e)}
              className="group inline-flex items-center justify-center space-x-3 px-8 py-4 bg-yellow-400 text-matcha-900 font-bold rounded-lg hover:bg-yellow-300 transition-all duration-200 text-lg shadow-lg hover:shadow-xl hover:scale-105"
            >
              <span>Get Started Free</span>
              <RocketIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
            <button 
              onClick={(e) => handleButtonClick('playground', e)}
              className="group inline-flex items-center justify-center space-x-3 px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-matcha-600 transition-all duration-200 text-lg"
            >
              <PlayCircleIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Try It Now</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EnhancedHomePage;