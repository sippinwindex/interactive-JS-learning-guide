#!/bin/bash
echo "Verifying JavaScript Learning Module Structure..."
echo ""

# Count files in each directory
fundamentals_count=$(find src/front/data/modules/fundamentals -name "*.js" | wc -l)
dom_count=$(find src/front/data/modules/dom -name "*.js" | wc -l)
es6_count=$(find src/front/data/modules/es6 -name "*.js" | wc -l)
functional_count=$(find src/front/data/modules/functional -name "*.js" | wc -l)
async_count=$(find src/front/data/modules/async -name "*.js" | wc -l)
oop_count=$(find src/front/data/modules/oop -name "*.js" | wc -l)
advanced_count=$(find src/front/data/modules/advanced -name "*.js" | wc -l)

total_modules=$((fundamentals_count + dom_count + es6_count + functional_count + async_count + oop_count + advanced_count))

echo "Module Count by Category:"
echo "  Fundamentals: $fundamentals_count files"
echo "  DOM & Browser: $dom_count files"
echo "  ES6+ Features: $es6_count files"
echo "  Functional Programming: $functional_count files"
echo "  Async Programming: $async_count files"
echo "  Object-Oriented Programming: $oop_count files"
echo "  Advanced Concepts: $advanced_count files"
echo ""
echo "Total: $total_modules module files"
echo ""

# Check if main config file exists
if [ -f "src/front/data/learningContent.js" ]; then
    echo "Main configuration file exists"
else
    echo "Main configuration file missing"
fi

# List all created files
echo ""
echo "Complete File Structure:"
tree src/front/data/ -I node_modules 2>/dev/null || find src/front/data -type f | sort
