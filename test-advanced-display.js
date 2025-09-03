/**
 * Advanced Features Display Test
 * Run this in browser console to test Advanced Features
 */

function testAdvancedFeatures() {
  console.log('🧪 Testing Advanced Features Display...');
  
  // Step 1: Fill form with test data
  console.log('📝 Step 1: Filling form...');
  const birthName = document.getElementById('birthName');
  const day = document.getElementById('day');
  const month = document.getElementById('month');
  const year = document.getElementById('year');
  
  if (birthName && day && month && year) {
    birthName.value = "Nguyễn Thị Hà";
    day.value = "15";
    month.value = "8";
    year.value = "1990";
    console.log('✅ Form filled successfully');
  } else {
    console.error('❌ Form elements not found');
    return;
  }
  
  // Step 2: Submit form
  console.log('🚀 Step 2: Submitting form...');
  const form = document.getElementById('numerologyForm');
  if (form) {
    // Trigger submit event
    const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
    form.dispatchEvent(submitEvent);
    console.log('✅ Form submitted');
    
    // Step 3: Check Advanced Features after delay
    setTimeout(() => {
      console.log('🔍 Step 3: Checking Advanced Features...');
      
      const advancedContainer = document.getElementById('advanced-features');
      if (advancedContainer) {
        console.log('📦 Advanced container found');
        console.log('Display style:', advancedContainer.style.display);
        console.log('Has content:', advancedContainer.innerHTML.length > 0);
        
        if (advancedContainer.style.display !== 'none' && advancedContainer.innerHTML.length > 0) {
          console.log('✅ Advanced Features are visible!');
          
          // Check tabs
          const tabs = document.querySelectorAll('.tab-btn');
          console.log(`📊 Found ${tabs.length} tabs:`, Array.from(tabs).map(t => t.textContent));
          
          // Check content panels
          const panels = document.querySelectorAll('.tab-panel');
          console.log(`🎛️ Found ${panels.length} panels`);
          
          // Test tab switching
          if (tabs.length > 1) {
            console.log('🔄 Testing tab switching...');
            tabs[1].click(); // Click second tab
            setTimeout(() => {
              const activeTab = document.querySelector('.tab-btn.active');
              const activePanel = document.querySelector('.tab-panel.active');
              console.log('Active tab:', activeTab ? activeTab.textContent : 'None');
              console.log('Active panel ID:', activePanel ? activePanel.id : 'None');
              console.log('✅ Tab switching works!');
            }, 500);
          }
          
          console.log('🎉 All Advanced Features tests PASSED!');
        } else {
          console.error('❌ Advanced Features not visible');
          console.log('Debug info:', {
            container: !!advancedContainer,
            display: advancedContainer.style.display,
            contentLength: advancedContainer.innerHTML.length,
            innerHTML: advancedContainer.innerHTML.substring(0, 200) + '...'
          });
        }
      } else {
        console.error('❌ Advanced Features container not found');
      }
    }, 2000);
    
  } else {
    console.error('❌ Form not found');
  }
}

// Auto-run test
console.log('%c🔮 HÀ UYÊN Advanced Features Test Console', 'color: #8b5cf6; font-size: 16px; font-weight: bold;');
console.log('=====================================');
console.log('🧪 Run: testAdvancedFeatures()');
console.log('📝 Or wait 3 seconds for auto-test...');

setTimeout(() => {
  testAdvancedFeatures();
}, 3000);
