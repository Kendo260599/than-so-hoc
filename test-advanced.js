/**
 * Test Advanced Features
 * Copy and paste this code into browser console to test
 */

// Test data
const testData = {
  name: "Nguyễn Văn A",
  birthDate: "15/8/1990"
};

// Fill form with test data
document.getElementById('birthName').value = testData.name;
document.getElementById('day').value = "15";
document.getElementById('month').value = "8";
document.getElementById('year').value = "1990";

// Trigger form submission
document.getElementById('numerologyForm').dispatchEvent(new Event('submit'));

console.log('✅ Test form submitted with data:', testData);
