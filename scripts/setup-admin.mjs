#!/usr/bin/env node
/**
 * Generates admin credentials and writes/updates .env file.
 * Usage: node scripts/setup-admin.mjs [password]
 * If no password given, generates a random 16-char password.
 */
import { scryptSync, randomBytes } from 'node:crypto';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, '..', '.env');
const examplePath = resolve(__dirname, '..', '.env.example');

const password = process.argv[2] || randomBytes(12).toString('base64url').slice(0, 16);
const salt = randomBytes(16);
const hash = scryptSync(password, salt, 64);
const hashString = `scrypt:${salt.toString('hex')}:${hash.toString('hex')}`;
const sessionSecret = randomBytes(32).toString('hex');

// Read existing .env or start from .env.example or blank
let envContent = '';
if (existsSync(envPath)) {
    envContent = readFileSync(envPath, 'utf-8');
} else if (existsSync(examplePath)) {
    envContent = readFileSync(examplePath, 'utf-8');
}

function setEnvVar(content, key, value) {
    const regex = new RegExp(`^${key}=.*$`, 'm');
    if (regex.test(content)) {
        return content.replace(regex, `${key}=${value}`);
    }
    return content.trimEnd() + `\n${key}=${value}\n`;
}

envContent = setEnvVar(envContent, 'ADMIN_USERNAME', 'Ronni');
envContent = setEnvVar(envContent, 'ADMIN_PASSWORD_HASH', hashString);
envContent = setEnvVar(envContent, 'SESSION_SECRET', sessionSecret);

writeFileSync(envPath, envContent, 'utf-8');

console.log('--- Admin Credentials Generated ---');
console.log(`Username: Ronni`);
console.log(`Password: ${password}`);
console.log(`Hash:     ${hashString.slice(0, 30)}...`);
console.log(`Secret:   ${sessionSecret.slice(0, 16)}...`);
console.log(`Written to: ${envPath}`);
console.log('-----------------------------------');
