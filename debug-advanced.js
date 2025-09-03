/**
 * Debug utility for testing advanced features
 * Open browser console and paste this code to test
 */

window.testAdvancedFeatures = function() {
  console.log('🧪 Testing Advanced Features...');
  
  // Test 1: Fill form with sample data
  console.log('📝 Step 1: Filling form with sample data...');
  document.getElementById('birthName').value = "Nguyễn Văn An";
  document.getElementById('day').value = "15";
  document.getElementById('month').value = "8";
  document.getElementById('year').value = "1990";
  
  // Test 2: Submit form
  console.log('🚀 Step 2: Submitting form...');
  setTimeout(() => {
    const form = document.getElementById('numerologyForm');
    if (form) {
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
      form.dispatchEvent(submitEvent);
      
      // Test 3: Check if advanced features appear
      setTimeout(() => {
        console.log('🔍 Step 3: Checking advanced features...');
        const advancedSection = document.getElementById('advanced-features');
        if (advancedSection && advancedSection.style.display !== 'none') {
          console.log('✅ Advanced features are visible!');
          
          // Test tabs
          const tabs = document.querySelectorAll('.tab-btn');
          console.log(`📊 Found ${tabs.length} tabs:`, Array.from(tabs).map(t => t.textContent));
          
          // Test crystal content
          const crystalPanel = document.getElementById('crystal-panel');
          if (crystalPanel) {
            console.log('💎 Crystal panel content found');
          }
          
          console.log('🎉 All tests passed! Advanced features are working!');
        } else {
          console.error('❌ Advanced features not visible');
          console.log('Debug info:', {
            advancedSection: !!advancedSection,
            display: advancedSection?.style.display,
            innerHTML: advancedSection?.innerHTML.substring(0, 100)
          });
        }
      }, 2000);
    } else {
      console.error('❌ Form not found');
    }
  }, 100);
};

// Auto test when console is opened
console.log(`
🔮 HÀ UYÊN Numerology Debug Console
=====================================
🧪 To test advanced features, run: testAdvancedFeatures()
📝 Or manually fill the form and submit

Available tests:
- testAdvancedFeatures() - Full test suite
- document.getElementById('advanced-features') - Check container
`);

// Auto-run test in 3 seconds
setTimeout(() => {
  if (confirm('🧪 Auto-test advanced features?')) {
    testAdvancedFeatures();
  }
}, 3000);
