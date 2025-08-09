import React from 'react';

export const HomePage = ({ navigateTo }) => {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section - Matcha Theme */}
      <section className="relative overflow-hidden bg-gradient-to-br from-matcha-600 via-matcha-500 to-wood-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">
                Master JavaScript
                <span className="block text-yellow-300">Interactively</span>
              </h1>
              <p className="text-xl mb-8 text-matcha-100">
                Learn JavaScript through hands-on coding, real-time feedback, 
                and progressive challenges. Built for developers, by developers.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => navigateTo('documentation')}
                  className="px-8 py-3 bg-yellow-400 text-matcha-900 font-semibold rounded-lg hover:bg-yellow-300 transition-colors shadow-lg"
                >
                  🚀 Start Learning
                </button>
                <button 
                  onClick={() => navigateTo('playground')}
                  className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-matcha-600 transition-colors"
                >
                  💻 Try Playground
                </button>
              </div>
            </div>
            <div className="bg-gray-900 dark:bg-gray-800 p-6 rounded-xl shadow-2xl border border-matcha-400/20">
              <pre className="text-matcha-300">
                <code>{`// Welcome to JS Master
const skills = ['JavaScript', 'React', 'Node.js'];

skills.forEach(skill => {
    console.log(\`Learning \${skill}\`);
});

// Start your journey today! 🚀`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Everything You Need to Master JavaScript
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Interactive Documentation',
                description: 'Learn JavaScript with live code examples and instant feedback',
                icon: '📚',
                page: 'documentation',
                color: 'text-matcha-600 dark:text-matcha-400'
              },
              {
                title: 'Live Playground',
                description: 'Write HTML, CSS, and JavaScript with real-time preview',
                icon: '🎮',
                page: 'playground',
                color: 'text-wood-600 dark:text-wood-400'
              },
              {
                title: 'Coding Challenges',
                description: 'Test your skills with progressive challenges and earn badges',
                icon: '🏆',
                page: 'challenges',
                color: 'text-matcha-700 dark:text-matcha-300'
              },
              {
                title: 'Learning Guide',
                description: 'Structured path from beginner to advanced JavaScript',
                icon: '🧭',
                page: 'guide',
                color: 'text-wood-700 dark:text-wood-300'
              }
            ].map((feature, index) => (
              <button 
                key={index} 
                onClick={() => navigateTo(feature.page)}
                className="group"
              >
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700">
                  <div className={`text-4xl mb-4 ${feature.color}`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="py-20 bg-white dark:bg-gray-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            What You'll Learn
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Variables & Types', 'Functions', 'Arrays', 'Objects',
              'DOM Manipulation', 'Async/Await', 'ES6+', 'APIs'
            ].map((topic, index) => (
              <span 
                key={index} 
                className="bg-gradient-to-r from-matcha-500 to-wood-500 text-white px-4 py-2 rounded-full font-medium shadow-md hover:shadow-lg transition-shadow"
                style={{ fontSize: '1rem' }}
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
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <div className="text-3xl font-bold text-matcha-600 dark:text-matcha-400 mb-2">500+</div>
              <div className="text-gray-600 dark:text-gray-300">Interactive Examples</div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <div className="text-3xl font-bold text-wood-600 dark:text-wood-400 mb-2">50+</div>
              <div className="text-gray-600 dark:text-gray-300">Coding Challenges</div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <div className="text-3xl font-bold text-matcha-600 dark:text-matcha-400 mb-2">24/7</div>
              <div className="text-gray-600 dark:text-gray-300">Available Learning</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Matcha Theme */}
      <section className="py-20 bg-gradient-to-r from-matcha-600 to-wood-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your JavaScript Journey?</h2>
          <p className="text-xl mb-8 text-matcha-100">
            Join thousands of developers learning JavaScript the interactive way
          </p>
          <button 
            onClick={() => navigateTo('documentation')}
            className="inline-block px-8 py-4 bg-yellow-400 text-matcha-900 font-bold rounded-lg hover:bg-yellow-300 transition-colors text-lg shadow-lg"
          >
            Get Started Free 🚀
          </button>
        </div>
      </section>
    </div>
  );
};