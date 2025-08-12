// src/front/pages/Home.jsx
import React from 'react';
import { 
  RocketIcon, 
  CodeIcon, 
  BookOpenIcon, 
  PlayCircleIcon, 
  TrophyIcon, 
  CompassIcon,
  SparkleIcon,
  CheckCircleIcon
} from '../components/ui/Icons';

export const HomePage = ({ navigateTo }) => {
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

  const topics = [
    'Variables & Types', 'Functions', 'Arrays', 'Objects',
    'DOM Manipulation', 'Async/Await', 'ES6+', 'APIs'
  ];

  const stats = [
    {
      number: '500+',
      label: 'Interactive Examples',
      color: 'text-matcha-600 dark:text-matcha-400'
    },
    {
      number: '50+',
      label: 'Coding Challenges',
      color: 'text-wood-600 dark:text-wood-400'
    },
    {
      number: '24/7',
      label: 'Available Learning',
      color: 'text-blue-600 dark:text-blue-400'
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-matcha-600 via-matcha-500 to-wood-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20">
            <CodeIcon className="w-full h-full text-white/30" />
          </div>
          <div className="absolute top-32 right-20 w-16 h-16">
            <SparkleIcon className="w-full h-full text-white/20" />
          </div>
          <div className="absolute bottom-20 left-20 w-24 h-24">
            <TrophyIcon className="w-full h-full text-white/20" />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Master JavaScript
                  <span className="block text-yellow-300">Interactively</span>
                </h1>
                <p className="text-xl text-matcha-100 leading-relaxed max-w-2xl">
                  Learn JavaScript through hands-on coding, real-time feedback, 
                  and progressive challenges. Built for developers, by developers.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => navigateTo('documentation')}
                  className="group flex items-center justify-center space-x-3 px-8 py-4 bg-yellow-400 text-matcha-900 font-semibold rounded-lg hover:bg-yellow-300 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <RocketIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Start Learning</span>
                </button>
                <button 
                  onClick={() => navigateTo('playground')}
                  className="group flex items-center justify-center space-x-3 px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-matcha-600 transition-all duration-200"
                >
                  <PlayCircleIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Try Playground</span>
                </button>
              </div>

              {/* Quick Stats */}
              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-2 text-matcha-100">
                  <CheckCircleIcon className="w-4 h-4 text-green-400" />
                  <span className="text-sm">Free Forever</span>
                </div>
                <div className="flex items-center space-x-2 text-matcha-100">
                  <CheckCircleIcon className="w-4 h-4 text-green-400" />
                  <span className="text-sm">No Sign-up Required</span>
                </div>
                <div className="flex items-center space-x-2 text-matcha-100">
                  <CheckCircleIcon className="w-4 h-4 text-green-400" />
                  <span className="text-sm">Interactive Learning</span>
                </div>
              </div>
            </div>

            {/* Code Preview */}
            <div className="relative">
              <div className="bg-gray-900 dark:bg-gray-800 p-6 rounded-xl shadow-2xl border border-matcha-400/20 backdrop-blur-sm">
                {/* Terminal Header */}
                <div className="flex items-center space-x-2 mb-4 pb-3 border-b border-gray-700">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-400 text-sm font-mono ml-4">javascript</span>
                </div>
                
                {/* Code Content */}
                <pre className="text-matcha-300 font-mono text-sm leading-relaxed">
                  <code>{`// Welcome to JS Master
const skills = ['JavaScript', 'React', 'Node.js'];

skills.forEach(skill => {
    console.log(\`Learning \${skill}\`);
});

// Start your journey today!`}</code>
                </pre>
              </div>
              
              {/* Floating Icons */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center shadow-lg">
                <SparkleIcon className="w-4 h-4 text-yellow-800" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center shadow-lg">
                <CheckCircleIcon className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need to Master JavaScript
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our comprehensive platform provides all the tools and resources you need 
              to become a JavaScript expert.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <button 
                  key={index} 
                  onClick={() => navigateTo(feature.page)}
                  className="group text-left"
                >
                  <div className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border ${feature.borderColor} hover:border-opacity-60`}>
                    <div className={`w-12 h-12 ${feature.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                      <IconComponent className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white group-hover:text-matcha-600 dark:group-hover:text-matcha-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="py-20 bg-white dark:bg-gray-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              What You'll Learn
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Comprehensive curriculum covering all essential JavaScript concepts
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {topics.map((topic, index) => (
              <span 
                key={index} 
                className="group bg-gradient-to-r from-matcha-500 to-wood-500 text-white px-4 py-2 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-default"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-matcha-50 dark:bg-gray-900 transition-colors">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className={`text-4xl font-bold ${stat.color} mb-2`}>
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-matcha-600 to-wood-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4">
          <div className="mb-8">
            <RocketIcon className="w-16 h-16 text-yellow-300 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-6">
              Ready to Start Your JavaScript Journey?
            </h2>
            <p className="text-xl text-matcha-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands of developers learning JavaScript the interactive way. 
              Start coding today and see your skills grow.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigateTo('documentation')}
              className="group inline-flex items-center justify-center space-x-3 px-8 py-4 bg-yellow-400 text-matcha-900 font-bold rounded-lg hover:bg-yellow-300 transition-all duration-200 text-lg shadow-lg hover:shadow-xl hover:scale-105"
            >
              <span>Get Started Free</span>
              <RocketIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
            <button 
              onClick={() => navigateTo('playground')}
              className="group inline-flex items-center justify-center space-x-3 px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-matcha-600 transition-all duration-200 text-lg"
            >
              <PlayCircleIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Try It Now</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};