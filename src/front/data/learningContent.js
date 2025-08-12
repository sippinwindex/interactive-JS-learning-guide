// src/front/data/learningContent.js - Central content management
export const learningPaths = {
  fundamentals: {
    title: 'JavaScript Fundamentals',
    icon: 'SparkleIcon',
    description: 'Master the building blocks of JavaScript',
    estimatedTime: '3-4 weeks',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    modules: [
      'variables-types',
      'operators-expressions',
      'control-flow',
      'functions-basics',
      'arrays-objects',
      'strings-numbers',
      'error-handling-basics'
    ]
  },
  
  domAndBrowser: {
    title: 'DOM & Browser APIs',
    icon: 'CodeIcon',
    description: 'Learn to interact with web pages',
    estimatedTime: '2-3 weeks',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    modules: [
      'dom-basics',
      'event-handling',
      'form-validation',
      'browser-storage',
      'fetch-ajax',
      'timers-intervals'
    ]
  },

  es6Modern: {
    title: 'Modern ES6+ Features',
    icon: 'RocketIcon',
    description: 'Use cutting-edge JavaScript features',
    estimatedTime: '2-3 weeks',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    modules: [
      'let-const-scope',
      'arrow-functions',
      'destructuring',
      'spread-rest',
      'modules',
      'classes',
      'maps-sets'
    ]
  },

  functionalProgramming: {
    title: 'Functional Programming',
    icon: 'LightbulbIcon',
    description: 'Learn functional programming concepts',
    estimatedTime: '3-4 weeks',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    modules: [
      'higher-order-functions',
      'map-filter-reduce',
      'closures-scope',
      'pure-functions',
      'composition',
      'immutability'
    ]
  },

  asynchronous: {
    title: 'Async Programming',
    icon: 'ClockIcon',
    description: 'Master asynchronous JavaScript',
    estimatedTime: '3-4 weeks',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    modules: [
      'callbacks',
      'promises',
      'async-await',
      'event-loop',
      'error-handling-async',
      'async-patterns'
    ]
  },

  objectOriented: {
    title: 'Object-Oriented Programming',
    icon: 'CogIcon',
    description: 'Build with objects and classes',
    estimatedTime: '2-3 weeks',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    modules: [
      'objects-creation',
      'prototypes',
      'es6-classes',
      'inheritance',
      'getters-setters',
      'static-methods'
    ]
  },

  advanced: {
    title: 'Advanced Concepts',
    icon: 'TrophyIcon',
    description: 'Deep dive into advanced topics',
    estimatedTime: '4-6 weeks',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    modules: [
      'memory-management',
      'performance',
      'design-patterns',
      'testing',
      'debugging',
      'security'
    ]
  }
};

export const moduleContentMap = {
  'variables-types': () => import('./modules/fundamentals/VariablesTypes'),
  'operators-expressions': () => import('./modules/fundamentals/OperatorsExpressions'),
  'control-flow': () => import('./modules/fundamentals/ControlFlow'),
  'functions-basics': () => import('./modules/fundamentals/FunctionsBasics'),
  'arrays-objects': () => import('./modules/fundamentals/ArraysObjects'),
  'strings-numbers': () => import('./modules/fundamentals/StringsNumbers'),
  'error-handling-basics': () => import('./modules/fundamentals/ErrorHandlingBasics'),
  
  'dom-basics': () => import('./modules/dom/DomBasics'),
  'event-handling': () => import('./modules/dom/EventHandling'),
  'form-validation': () => import('./modules/dom/FormValidation'),
  'browser-storage': () => import('./modules/dom/BrowserStorage'),
  'fetch-ajax': () => import('./modules/dom/FetchAjax'),
  'timers-intervals': () => import('./modules/dom/TimersIntervals'),
  
  'let-const-scope': () => import('./modules/es6/LetConstScope'),
  'arrow-functions': () => import('./modules/es6/ArrowFunctions'),
  'destructuring': () => import('./modules/es6/Destructuring'),
  'spread-rest': () => import('./modules/es6/SpreadRest'),
  'modules': () => import('./modules/es6/Modules'),
  'classes': () => import('./modules/es6/Classes'),
  'maps-sets': () => import('./modules/es6/MapsSets'),
  
  'higher-order-functions': () => import('./modules/functional/HigherOrderFunctions'),
  'map-filter-reduce': () => import('./modules/functional/MapFilterReduce'),
  'closures-scope': () => import('./modules/functional/ClosuresScope'),
  'pure-functions': () => import('./modules/functional/PureFunctions'),
  'composition': () => import('./modules/functional/Composition'),
  'immutability': () => import('./modules/functional/Immutability'),
  
  'callbacks': () => import('./modules/async/Callbacks'),
  'promises': () => import('./modules/async/Promises'),
  'async-await': () => import('./modules/async/AsyncAwait'),
  'event-loop': () => import('./modules/async/EventLoop'),
  'error-handling-async': () => import('./modules/async/ErrorHandlingAsync'),
  'async-patterns': () => import('./modules/async/AsyncPatterns'),
  
  'objects-creation': () => import('./modules/oop/ObjectsCreation'),
  'prototypes': () => import('./modules/oop/Prototypes'),
  'es6-classes': () => import('./modules/oop/ES6Classes'),
  'inheritance': () => import('./modules/oop/Inheritance'),
  'getters-setters': () => import('./modules/oop/GettersSetters'),
  'static-methods': () => import('./modules/oop/StaticMethods'),
  
  'memory-management': () => import('./modules/advanced/MemoryManagement'),
  'performance': () => import('./modules/advanced/Performance'),
  'design-patterns': () => import('./modules/advanced/DesignPatterns'),
  'testing': () => import('./modules/advanced/Testing'),
  'debugging': () => import('./modules/advanced/Debugging'),
  'security': () => import('./modules/advanced/Security')
};

export const getPathProgress = (pathKey, completedLessons) => {
  const path = learningPaths[pathKey];
  if (!path) return 0;
  
  const pathLessons = path.modules || [];
  const completedInPath = pathLessons.filter(module => 
    completedLessons.includes(module)
  ).length;
  
  return pathLessons.length > 0 ? (completedInPath / pathLessons.length) * 100 : 0;
};

export const getAllModules = () => {
  return Object.values(learningPaths).flatMap(path => path.modules || []);
};

export const getModulesByPath = (pathKey) => {
  return learningPaths[pathKey]?.modules || [];
};