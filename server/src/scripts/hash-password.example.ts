#!/usr/bin/env node

/**
 * Password Hash Generator for Node.js Blog
 * =========================================
 * 
 * This is an example script for generating secure password hashes.
 * Copy this file to hash-password.ts and customize it with your password.
 * 
 * ⚠️  SECURITY WARNING: 
 * - Never commit your actual hash-password.ts file to version control
 * - Always use strong, unique passwords
 * - Delete the hash-password.ts file after generating your hash
 * - Only keep this .example.ts file in the repository
 * 
 * USAGE:
 * 1. Copy this file: cp hash-password.example.ts hash-password.ts
 * 2. Edit hash-password.ts and replace the placeholder password
 * 3. Run: npx ts-node hash-password.ts
 * 4. Copy the generated hash to your .env file's AUTHOR_PASSWORD_HASH
 * 5. Delete or secure hash-password.ts
 */

import bcrypt from 'bcrypt';

// ⚠️  REPLACE THIS PASSWORD WITH YOUR ACTUAL PASSWORD ⚠️
const password = 'your-secure-password-here';

async function generatePasswordHash(): Promise<void> {
  try {
    console.log('🔐 Generating secure password hash...\n');
    
    // Generate salt and hash with recommended rounds (12)
    const saltRounds = 12;
    const hash = await bcrypt.hash(password, saltRounds);
    
    console.log('✅ Password hash generated successfully!\n');
    console.log('📝 Copy the following hash to your .env file:');
    console.log('─'.repeat(60));
    console.log(`AUTHOR_PASSWORD_HASH=${hash}`);
    console.log('─'.repeat(60));
    console.log('\n🔒 Security Notes:');
    console.log('• Store this hash in your .env file (never commit .env)');
    console.log('• Delete this hash-password.ts file after use');
    console.log('• Use a strong, unique password');
    console.log('• The hash uses bcrypt with 12 salt rounds for security');
    console.log('• Never share your password or hash with anyone');
    
  } catch (error) {
    console.error('❌ Error generating password hash:', error);
    process.exit(1);
  }
}

// Verify password is not the default placeholder
if (password === 'your-secure-password-here') {
  console.error('❌ SECURITY ERROR: Please replace the placeholder password');
  console.error('   Edit hash-password.ts and set your actual password before running.');
  process.exit(1);
}

// Run the hash generation
generatePasswordHash();
