#!/usr/bin/env node

/**
 * Verification script for bank transfer redirection fix
 * This script checks that the redirection URLs in form-handler.js
 * point to the correct astrocline folder paths
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying Bank Transfer Redirection Fix\n');

// Check form-handler.js for correct redirection URLs
const formHandlerPath = path.join(__dirname, 'astrocline', 'js', 'form-handler.js');

try {
    const formHandlerContent = fs.readFileSync(formHandlerPath, 'utf8');

    console.log('📁 Checking form-handler.js...');

    // Check for the correct redirection URLs
    const correct1parUrl = 'https://rositarococo.com/astrocline/transferenciacbu-1par/';
    const correct2paresUrl = 'https://rositarococo.com/astrocline/transferenciacbu-2pares/';

    const incorrect1parUrl = 'https://rositarococo.com/transferenciacbu-1par.html';
    const incorrect2paresUrl = 'https://rositarococo.com/transferenciacbu-2pares.html';

    let hasCorrectUrls = true;
    let hasIncorrectUrls = false;

    if (formHandlerContent.includes(correct1parUrl) && formHandlerContent.includes(correct2paresUrl)) {
        console.log('✅ Correct astrocline redirection URLs found');
    } else {
        console.log('❌ Correct astrocline redirection URLs NOT found');
        hasCorrectUrls = false;
    }

    if (formHandlerContent.includes(incorrect1parUrl) || formHandlerContent.includes(incorrect2paresUrl)) {
        console.log('❌ Old root redirection URLs still present');
        hasIncorrectUrls = true;
    } else {
        console.log('✅ Old root redirection URLs removed');
    }

    // Extract the current redirection logic
    const redirectionMatch = formHandlerContent.match(/const transferUrl = window\.cartCount >= 2 \?\s*['"`]([^'"`]+)['"`]\s*:\s*['"`]([^'"`]+)['"`];/);

    if (redirectionMatch) {
        console.log('\n📋 Current Redirection Logic:');
        console.log(`   if (cartCount >= 2) → ${redirectionMatch[1]}`);
        console.log(`   else → ${redirectionMatch[2]}`);
    }

    console.log('\n🎯 Summary:');
    if (hasCorrectUrls && !hasIncorrectUrls) {
        console.log('✅ SUCCESS: Bank transfer redirection fix is correctly implemented!');
        console.log('   Users will now be redirected to astrocline folder pages.');
    } else {
        console.log('❌ ISSUE: Bank transfer redirection fix needs attention.');
    }

} catch (error) {
    console.error('❌ Error reading form-handler.js:', error.message);
}

// Check if astrocline transfer pages exist
console.log('\n📁 Checking transfer pages exist...');

const transferPages = [
    'astrocline/transferenciacbu-1par/index.html',
    'astrocline/transferenciacbu-2pares/index.html'
];

transferPages.forEach(page => {
    const pagePath = path.join(__dirname, page);
    if (fs.existsSync(pagePath)) {
        console.log(`✅ ${page} exists`);
    } else {
        console.log(`❌ ${page} missing`);
    }
});

console.log('\n🔗 Verification complete!');
console.log('\nTo test manually:');
console.log('1. Open astrocline checkout page');
console.log('2. Add products to cart');
console.log('3. Select "Transferencia Bancaria" payment method');
console.log('4. Confirm redirection goes to /astrocline/transferenciacbu-* pages');