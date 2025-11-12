

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

async function readEnvLocal() {
  const p = path.resolve(process.cwd(), '.env.local');
  if (!fs.existsSync(p)) return {};
  const content = fs.readFileSync(p, 'utf8');
  const lines = content.split(/\r?\n/);
  const env = {};
  for (let line of lines) {
    line = line.trim();
    if (!line || line.startsWith('#')) continue;
    const idx = line.indexOf('=');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    env[key] = val;
  }
  return env;
}

async function main() {
  const [,, email, password, ...nameParts] = process.argv;
  const name = nameParts.join(' ') || 'Admin User';
  if (!email || !password) {
    console.error('Usage: node scripts/createAdminUser.js email password "Full Name"');
    process.exit(1);
  }

  const env = await readEnvLocal();
  const mongoUri = env.MONGODB_URI || process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error('MONGODB_URI not found in .env.local or environment');
    process.exit(1);
  }

  console.log('Connecting to MongoDB...');
  await mongoose.connect(mongoUri, { dbName: undefined });

  try {
    const hashed = await bcrypt.hash(password, 10);
    const usersColl = mongoose.connection.collection('users');
    const update = {
      $set: {
        name,
        email,
        password: hashed,
        role: 'admin',
        provider: 'credentials',
        updatedAt: new Date(),
      },
      $setOnInsert: {
        createdAt: new Date(),
      },
    };

    const res = await usersColl.updateOne({ email }, update, { upsert: true });
    if (res.upsertedCount && res.upsertedCount > 0) {
      console.log(`Admin user created: ${email}`);
    } else {
      console.log(`Admin user updated/ensured: ${email}`);
    }
  } catch (err) {
    console.error('Error creating admin user:', err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

main();
