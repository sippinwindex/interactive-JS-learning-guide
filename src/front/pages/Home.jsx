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
  DocumentTextIcon,
  ArrowsExpandIcon,
  ExternalLinkIcon,
  ClockIcon,
  HeartIcon
} from '../components/ui/Icons';

const EnhancedHomePage = ({ navigateTo }) => {
  const heroRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const counterRefs = useRef([]);

  // Enhanced features with better descriptions
  const features = [
    {
      title: 'Interactive Documentation',
      description: 'Learn JavaScript concepts through hands-on examples with instant feedback and real-time code execution.',
      icon: BookOpenIcon,
      page: 'documentation',
      color: 'text-matcha-600 dark:text-matcha-400',
      bgColor: 'bg-matcha-50 dark:bg-matcha-900/20',
      borderColor: 'border-matcha-200 dark:border-matcha-800',
      benefits: ['Live Code Examples', 'Instant Feedback', 'Progressive Learning', 'Real-time Execution']
    },
    {
      title: 'Advanced Playground',
      description: 'Build full-stack projects with our powerful code editor featuring syntax highlighting, auto-completion, and live preview.',
      icon: CodeIcon,
      page: 'playground',
      color: 'text-wood-600 dark:text-wood-400',
      bgColor: 'bg-wood-50 dark:bg-wood-900/20',
      borderColor: 'border-wood-200 dark:border-wood-800',
      benefits: ['Multi-file Support', 'Live Preview', 'Auto-complete', 'Error Highlighting']
    },
    {
      title: 'Skill Challenges',
      description: 'Test your knowledge with progressive coding challenges designed to reinforce learning and build confidence.',
      icon: TrophyIcon,
      page: 'challenges',
      color: 'text-yellow-600 dark:text-yellow-400',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      borderColor: 'border-yellow-200 dark:border-yellow-800',
      benefits: ['Progressive Difficulty', 'Achievement System', 'Skill Tracking', 'Peer Comparison']
    },
    {
      title: 'Structured Learning',
      description: 'Follow our expertly crafted curriculum from beginner to advanced, with clear milestones and personalized progress tracking.',
      icon: CompassIcon,
      page: 'guide',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
      benefits: ['Curated Curriculum', 'Progress Tracking', 'Milestone System', 'Personalized Path']
    }
  ];

  // Enhanced stats with better descriptions
  const stats = [
    {
      number: '10,000+',
      label: 'Active Learners',
      description: 'Developers learning daily',
      color: 'text-matcha-600 dark:text-matcha-400',
      icon: SparkleIcon,
      countTo: 10000,
      suffix: '+'
    },
    {
      number: '500+',
      label: 'Code Examples',
      description: 'Interactive tutorials',
      color: 'text-wood-600 dark:text-wood-400',
      icon: DocumentTextIcon,
      countTo: 500,
      suffix: '+'
    },
    {
      number: '95%',
      label: 'Success Rate',
      description: 'Course completion',
      color: 'text-blue-600 dark:text-blue-400',
      icon: CheckCircleIcon,
      countTo: 95,
      suffix: '%'
    },
    {
      number: '24/7',
      label: 'Always Available',
      description: 'Learn at your pace',
      color: 'text-purple-600 dark:text-purple-400',
      icon: ClockIcon,
      countTo: 24,
      suffix: '/7'
    }
  ];

  // Learning path showcase
  const learningPath = [
    {
      step: '01',
      title: 'Foundation',
      description: 'Master JavaScript fundamentals with variables, functions, and control structures',
      icon: SparkleIcon,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      step: '02',
      title: 'Intermediate',
      description: 'Explore ES6+, async programming, and modern JavaScript patterns',
      icon: RocketIcon,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      step: '03',
      title: 'Advanced',
      description: 'Deep dive into performance, design patterns, and framework concepts',
      icon: LightbulbIcon,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20'
    },
    {
      step: '04',
      title: 'Expert',
      description: 'Build production-ready applications and contribute to open source',
      icon: TrophyIcon,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    }
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Frontend Developer at Google",
      content: "The interactive examples and real-time feedback helped me master JavaScript faster than any other platform. The playground is incredible!",
      avatar: "👩‍💻"
    },
    {
      name: "Michael Rodriguez",
      role: "Full-stack Engineer at Meta",
      content: "From zero to hero in JavaScript! The structured learning path and challenging exercises built my confidence step by step.",
      avatar: "👨‍💻"
    },
    {
      name: "Emily Watson",
      role: "Software Engineer at Netflix",
      content: "The depth of content and quality of explanations is outstanding. I still use it as a reference in my daily work.",
      avatar: "👩‍🔬"
    }
  ];

  // Floating background elements with enhanced positioning
  const floatingElements = [
    { icon: TerminalIcon, position: 'top-[8%] left-[8%]', size: 'w-16 h-16', delay: 0 },
    { icon: SparkleIcon, position: 'top-[15%] right-[12%]', size: 'w-12 h-12', delay: 500 },
    { icon: CodeIcon, position: 'top-[45%] left-[3%]', size: 'w-14 h-14', delay: 1000 },
    { icon: RocketIcon, position: 'bottom-[35%] left-[6%]', size: 'w-20 h-20', delay: 1500 },
    { icon: LightbulbIcon, position: 'bottom-[15%] right-[8%]', size: 'w-16 h-16', delay: 2000 },
    { icon: TrophyIcon, position: 'top-[60%] right-[4%]', size: 'w-12 h-12', delay: 2500 },
    { icon: BookOpenIcon, position: 'bottom-[60%] right-[15%]', size: 'w-14 h-14', delay: 3000 },
  ];

  useEffect(() => {
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
          setIsLoaded(true);
        }
      } else if (window.anime) {
        setIsLoaded(true);
        initializeAnimations();
      } else {
        setIsLoaded(true);
      }
    };

    loadAnimeJS();

    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const initializeAnimations = () => {
    if (!window.anime) return;

    const anime = window.anime;

    // Enhanced hero animations with more sophisticated timeline
    const heroTimeline = anime.timeline({
      easing: 'easeOutExpo',
    });

    heroTimeline
      .add({
        targets: '.hero-brand',
        opacity: [0, 1],
        scale: [0.5, 1],
        rotate: [45, 0],
        duration: 1000,
        easing: 'easeOutBounce'
      }, 0)
      .add({
        targets: '.hero-title',
        opacity: [0, 1],
        translateY: [80, 0],
        duration: 1200,
        easing: 'easeOutExpo'
      }, 300)
      .add({
        targets: '.hero-subtitle',
        opacity: [0, 1],
        translateY: [60, 0],
        duration: 1000,
      }, 600)
      .add({
        targets: '.hero-description',
        opacity: [0, 1],
        translateY: [40, 0],
        duration: 800,
      }, 900)
      .add({
        targets: '.hero-btn',
        opacity: [0, 1],
        translateY: [30, 0],
        scale: [0.8, 1],
        duration: 600,
        delay: anime.stagger(150),
        easing: 'easeOutBounce'
      }, 1200)
      .add({
        targets: '.trust-indicator',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 500,
        delay: anime.stagger(100)
      }, 1500);

    // Animated counter
    stats.forEach((stat, index) => {
      if (counterRefs.current[index] && stat.countTo) {
        anime({
          targets: { count: 0 },
          count: stat.countTo,
          duration: 2000,
          delay: 2000 + (index * 200),
          easing: 'easeOutExpo',
          update: function(anim) {
            const value = Math.round(anim.animatables[0].target.count);
            if (counterRefs.current[index]) {
              counterRefs.current[index].textContent = value + (stat.suffix || '');
            }
          }
        });
      }
    });

    // Enhanced feature cards with staggered entrance
    anime({
      targets: '.feature-card',
      opacity: [0, 1],
      translateY: [80, 0],
      rotateY: [30, 0],
      duration: 1000,
      delay: anime.stagger(200, {start: 2500}),
      easing: 'easeOutExpo'
    });

    // Feature benefits animation
    anime({
      targets: '.feature-benefit',
      opacity: [0, 1],
      translateX: [-20, 0],
      duration: 400,
      delay: anime.stagger(100, {start: 3500}),
      easing: 'easeOutQuad'
    });

    // Learning path animation
    anime({
      targets: '.path-step',
      opacity: [0, 1],
      translateY: [60, 0],
      scale: [0.8, 1],
      duration: 800,
      delay: anime.stagger(300, {start: 4000}),
      easing: 'easeOutBack'
    });

    // Testimonial animation
    anime({
      targets: '.testimonial-card',
      opacity: [0, 1],
      translateY: [40, 0],
      duration: 800,
      delay: 4500,
      easing: 'easeOutQuad'
    });

    // Code preview animation with typing effect
    anime({
      targets: '.code-preview',
      opacity: [0, 1],
      translateY: [50, 0],
      duration: 1000,
      delay: 5000,
      easing: 'easeOutQuad'
    });

    // Enhanced floating elements with complex movement patterns
    animateFloatingElements(anime);
  };

  const animateFloatingElements = (anime) => {
    floatingElements.forEach((element, index) => {
      // Initial fade-in
      anime({
        targets: `.floating-${index}`,
        opacity: [0, 0.6],
        scale: [0, 1],
        duration: 1000,
        delay: element.delay,
        easing: 'easeOutBounce'
      });

      // Continuous floating animation with unique patterns
      anime({
        targets: `.floating-${index}`,
        translateY: [0, -30 - (index * 5), 0],
        translateX: [0, Math.sin(index) * 15, 0],
        rotate: [0, index % 2 === 0 ? 15 : -15, 0],
        scale: [1, 1.1, 1],
        duration: 4000 + (index * 500),
        easing: 'easeInOutSine',
        loop: true,
        delay: element.delay + 1000
      });

      // Subtle rotation for some elements
      if (index % 3 === 0) {
        anime({
          targets: `.floating-${index}`,
          rotate: [0, 360],
          duration: 20000 + (index * 2000),
          easing: 'linear',
          loop: true,
          delay: element.delay + 2000
        });
      }
    });
  };

  const handleFeatureHover = (index, isEntering) => {
    if (!window.anime) return;

    const anime = window.anime;
    const card = document.querySelector(`[data-feature="${index}"]`);
    const icon = card?.querySelector('.feature-icon svg');
    const benefits = card?.querySelectorAll('.feature-benefit');

    if (isEntering) {
      anime({
        targets: card,
        scale: 1.08,
        translateY: -15,
        duration: 400,
        easing: 'easeOutQuart'
      });

      anime({
        targets: icon,
        rotate: [0, 360],
        scale: [1, 1.3, 1.1],
        duration: 800,
        easing: 'easeOutBounce'
      });

      anime({
        targets: benefits,
        opacity: [0.7, 1],
        translateX: [-5, 0],
        duration: 300,
        delay: anime.stagger(50),
        easing: 'easeOutQuad'
      });
    } else {
      anime({
        targets: card,
        scale: 1,
        translateY: 0,
        duration: 400,
        easing: 'easeOutQuart'
      });

      anime({
        targets: benefits,
        opacity: [1, 0.7],
        duration: 200,
        easing: 'easeOutQuad'
      });
    }
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

    // Enhanced button animation with ripple effect
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
      background: rgba(255,255,255,0.7);
      border-radius: 50%;
      transform: scale(0);
      pointer-events: none;
      z-index: 1000;
    `;

    button.style.position = 'relative';
    button.appendChild(ripple);

    // Animate ripple with multiple waves
    anime({
      targets: ripple,
      scale: [0, 6],
      opacity: [1, 0],
      duration: 800,
      easing: 'easeOutQuart',
      complete: () => ripple.remove()
    });

    // Enhanced button press animation
    anime({
      targets: button,
      scale: [1, 0.92, 1.05, 1],
      duration: 500,
      easing: 'easeOutBounce'
    });

    // Icon animation with multiple rotations
    anime({
      targets: icon,
      rotate: [0, 720],
      scale: [1, 1.4, 1],
      duration: 600,
      easing: 'easeOutBounce',
      complete: () => {
        // Page transition animation
        anime({
          targets: 'body',
          opacity: [1, 0.8, 1],
          duration: 300,
          easing: 'easeInOutQuad',
          complete: () => navigateTo(page)
        });
      }
    });
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-matcha-600 via-matcha-500 to-wood-600">
        <div className="text-center text-white">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent mx-auto mb-6"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <BrandIcon className="w-8 h-8" />
            </div>
          </div>
          <div className="text-lg font-medium mb-2">Preparing Your Learning Experience</div>
          <div className="text-sm opacity-80">Loading interactive animations...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-matcha-600 via-matcha-500 to-wood-600 text-white overflow-x-hidden relative">
      {/* Enhanced Floating Background Elements */}
      {floatingElements.map((element, index) => {
        const IconComponent = element.icon;
        return (
          <div 
            key={index}
            className={`floating-${index} absolute ${element.position} opacity-0 pointer-events-none`}
            style={{ zIndex: 1 }}
          >
            <IconComponent className={`${element.size} text-white`} />
          </div>
        );
      })}

      <div className="max-w-7xl mx-auto px-4 py-8 relative" style={{ zIndex: 10 }}>
        {/* Enhanced Hero Section */}
        <section className="text-center py-20 relative" ref={heroRef}>
          {/* Brand and Title */}
          <div className="hero-brand opacity-0 mb-8">
            <BrandIcon className="w-20 h-20 mx-auto mb-6" />
          </div>
          
          <h1 className="hero-title text-6xl lg:text-7xl font-bold leading-tight opacity-0 mb-4">
            Master JavaScript
          </h1>
          <h2 className="hero-subtitle text-4xl lg:text-5xl font-bold leading-tight opacity-0 mb-8">
            <span className="text-yellow-300">The Interactive Way</span>
          </h2>
          
          <p className="hero-description text-xl lg:text-2xl text-matcha-100 leading-relaxed max-w-4xl mx-auto mb-12 opacity-0">
            Transform from a JavaScript beginner to a confident developer through hands-on learning, 
            real-time feedback, and progressive challenges designed by industry experts.
          </p>
          
          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <button 
              onClick={(e) => handleButtonClick('documentation', e)}
              className="hero-btn group relative overflow-hidden flex items-center justify-center space-x-3 px-10 py-5 bg-yellow-400 text-matcha-900 font-bold rounded-xl hover:bg-yellow-300 transition-all duration-300 shadow-2xl text-lg opacity-0"
            >
              <RocketIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span>Start Learning Free</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>
            </button>
            <button 
              onClick={(e) => handleButtonClick('playground', e)}
              className="hero-btn group relative overflow-hidden flex items-center justify-center space-x-3 px-10 py-5 border-3 border-white text-white font-bold rounded-xl hover:bg-white hover:text-matcha-600 transition-all duration-300 text-lg opacity-0"
            >
              <PlayCircleIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span>Try Playground</span>
              <ArrowsExpandIcon className="w-5 h-5 ml-2 opacity-70 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-12 mb-12">
            {[
              { icon: CheckCircleIcon, text: "100% Free Forever", color: "text-green-400" },
              { icon: SparkleIcon, text: "No Signup Required", color: "text-yellow-400" },
              { icon: HeartIcon, text: "Built by Developers", color: "text-red-400" }
            ].map((item, index) => (
              <div key={index} className="trust-indicator flex items-center space-x-2 text-matcha-100 opacity-0">
                <item.icon className={`w-5 h-5 ${item.color}`} />
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </div>

          {/* Enhanced Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-6 hover:bg-opacity-20 transition-all duration-300 transform hover:-translate-y-2">
                    <IconComponent className={`w-8 h-8 ${stat.color} mx-auto mb-4`} />
                    <div 
                      ref={el => counterRefs.current[index] = el}
                      className="text-3xl lg:text-4xl font-bold mb-2"
                    >
                      0
                    </div>
                    <div className="font-semibold text-lg mb-1">{stat.label}</div>
                    <div className="text-sm text-matcha-200 opacity-80">{stat.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Enhanced Features Section */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Everything You Need to <span className="text-yellow-300">Master JavaScript</span>
            </h2>
            <p className="text-xl text-matcha-100 max-w-3xl mx-auto">
              Our comprehensive platform provides all the tools, resources, and guidance 
              you need for your JavaScript learning journey.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={index}
                  className={`feature-card bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl border-2 ${feature.borderColor} hover:border-opacity-80 cursor-pointer opacity-0 group`}
                  data-feature={index}
                  onMouseEnter={() => handleFeatureHover(index, true)}
                  onMouseLeave={() => handleFeatureHover(index, false)}
                  onClick={() => handleButtonClick(feature.page, { currentTarget: document.querySelector(`[data-feature="${index}"]`), preventDefault: () => {} })}
                >
                  <div className="flex items-start space-x-6">
                    <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <div className="feature-icon">
                        <IconComponent className={`w-8 h-8 ${feature.color}`} />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-matcha-600 dark:group-hover:text-matcha-400 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                        {feature.description}
                      </p>
                      
                      {/* Feature Benefits */}
                      <div className="grid grid-cols-2 gap-3">
                        {feature.benefits.map((benefit, benefitIndex) => (
                          <div key={benefitIndex} className="feature-benefit flex items-center space-x-2 opacity-70">
                            <CheckCircleIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">{benefit}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-6 flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-matcha-600 dark:group-hover:text-matcha-400 transition-colors">
                        <span>Explore {feature.title}</span>
                        <ExternalLinkIcon className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Learning Path Showcase */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Your <span className="text-yellow-300">JavaScript Journey</span>
            </h2>
            <p className="text-xl text-matcha-100 max-w-3xl mx-auto">
              Follow our proven learning path from complete beginner to JavaScript expert. 
              Each step builds upon the previous, ensuring solid understanding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {learningPath.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className={`path-step text-center opacity-0 group`}>
                  <div className="relative mb-6">
                    <div className={`w-24 h-24 ${step.bgColor} rounded-full flex items-center justify-center mx-auto border-4 border-white shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className={`w-10 h-10 ${step.color}`} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 text-matcha-900 rounded-full flex items-center justify-center font-bold text-sm">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-matcha-100 leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Join <span className="text-yellow-300">Successful Developers</span>
            </h2>
            <p className="text-xl text-matcha-100 max-w-3xl mx-auto">
              Hear from developers who transformed their careers through our interactive learning platform.
            </p>
          </div>

          <div className="testimonial-card max-w-4xl mx-auto bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 opacity-0">
            <div className="text-center">
              <div className="text-6xl mb-6">{testimonials[activeTestimonial].avatar}</div>
              <blockquote className="text-2xl font-medium mb-6 leading-relaxed">
                "{testimonials[activeTestimonial].content}"
              </blockquote>
              <div className="text-yellow-300 font-semibold text-lg">
                {testimonials[activeTestimonial].name}
              </div>
              <div className="text-matcha-200">
                {testimonials[activeTestimonial].role}
              </div>
            </div>
            
            {/* Testimonial indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeTestimonial ? 'bg-yellow-400 scale-125' : 'bg-white bg-opacity-30'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Code Preview Section */}
        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-yellow-300">Experience</span> Interactive Learning
            </h2>
            <p className="text-xl text-matcha-100 max-w-3xl mx-auto">
              See how our platform makes learning JavaScript engaging and effective with real-time feedback and interactive examples.
            </p>
          </div>

          <div className="code-preview bg-black bg-opacity-40 backdrop-blur-md rounded-2xl p-8 relative overflow-hidden opacity-0 shadow-2xl">
            {/* Enhanced Terminal Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-700">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-gray-400 text-sm font-mono ml-4 flex items-center">
                  <TerminalIcon className="w-4 h-4 mr-2" />
                  interactive-javascript-learning.js
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm">Live</span>
              </div>
            </div>
            
            <pre className="text-matcha-200 font-mono text-sm lg:text-base leading-relaxed overflow-x-auto">
              <code>{`// Interactive JavaScript Learning Platform
class JavaScriptMastery {
    constructor() {
        this.skills = ['basics', 'es6+', 'async', 'advanced'];
        this.progress = new Map();
        this.confidence = 0;
    }

    async learnInteractively() {
        console.log('🚀 Starting your JS journey...');
        
        for (const skill of this.skills) {
            await this.practiceWithFeedback(skill);
            this.updateProgress(skill, 'completed');
            console.log(\`✅ \${skill} mastered!\`);
        }
        
        return this.celebrateSuccess();
    }

    practiceWithFeedback(topic) {
        return new Promise(resolve => {
            console.log(\`📚 Learning \${topic}...\`);
            console.log(\`💡 Interactive examples loading...\`);
            console.log(\`✨ Real-time feedback active!\`);
            
            setTimeout(() => {
                this.confidence += 25;
                resolve(\`\${topic} knowledge acquired!\`);
            }, 1000);
        });
    }

    celebrateSuccess() {
        console.log(\`🏆 Congratulations! You're now a JavaScript expert!\`);
        console.log(\`📈 Confidence level: \${this.confidence}%\`);
        return 'Ready to build amazing applications! 🎉';
    }
}

// Start your journey today!
const journey = new JavaScriptMastery();
journey.learnInteractively();`}</code>
            </pre>
            
            {/* Code execution simulation */}
            <div className="mt-6 p-4 bg-gray-900 bg-opacity-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-green-400 text-sm font-mono">Console Output:</span>
              </div>
              <div className="font-mono text-sm space-y-1">
                <div className="text-blue-400">🚀 Starting your JS journey...</div>
                <div className="text-yellow-400">📚 Learning basics...</div>
                <div className="text-purple-400">💡 Interactive examples loading...</div>
                <div className="text-green-400">✨ Real-time feedback active!</div>
                <div className="text-green-400">✅ basics mastered!</div>
                <div className="text-gray-400">...</div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Final CTA Section */}
        <section className="text-center py-24">
          <div className="mb-12">
            <div className="flex items-center justify-center mb-8">
              <RocketIcon className="w-20 h-20 text-yellow-300 mr-6 animate-pulse" />
              <h2 className="text-5xl lg:text-6xl font-bold">
                Ready to Transform Your
                <span className="block text-yellow-300">JavaScript Skills?</span>
              </h2>
            </div>
            <p className="text-2xl text-matcha-100 mb-12 max-w-4xl mx-auto leading-relaxed">
              Join thousands of developers who chose interactive learning over traditional tutorials. 
              Start coding today and experience the difference hands-on learning makes.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <button 
              onClick={(e) => handleButtonClick('documentation', e)}
              className="group relative overflow-hidden inline-flex items-center justify-center space-x-4 px-12 py-6 bg-yellow-400 text-matcha-900 font-bold rounded-xl hover:bg-yellow-300 transition-all duration-300 text-xl shadow-2xl hover:shadow-3xl hover:scale-105"
            >
              <span>Start Learning Now</span>
              <RocketIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>
            </button>
            <button 
              onClick={(e) => handleButtonClick('playground', e)}
              className="group inline-flex items-center justify-center space-x-4 px-12 py-6 border-3 border-white text-white font-bold rounded-xl hover:bg-white hover:text-matcha-600 transition-all duration-300 text-xl hover:scale-105"
            >
              <PlayCircleIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span>Try Interactive Demo</span>
              <ExternalLinkIcon className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>

          {/* Final trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-matcha-100">
            <div className="flex items-center space-x-2">
              <CheckCircleIcon className="w-5 h-5 text-green-400" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <SparkleIcon className="w-5 h-5 text-yellow-400" />
              <span>Instant access</span>
            </div>
            <div className="flex items-center space-x-2">
              <HeartIcon className="w-5 h-5 text-red-400" />
              <span>Made with love for developers</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EnhancedHomePage;