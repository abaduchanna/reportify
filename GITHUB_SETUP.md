# GitHub Setup Guide

This guide walks you through setting up the Reportify Punch Tracker repository on GitHub.

## Prerequisites

- GitHub account (abaduchanna)
- Git installed on your machine
- GitHub Personal Access Token (PAT): `[REDACTED]`

## Initial Repository Setup

### Step 1: Create Repository on GitHub

1. Go to https://github.com/new
2. Repository name: `reportify`
3. Select: **Private** (as required)
4. **Initialize with**: None (we'll push existing code)
5. Click "Create repository"

### Step 2: Clone and Setup Locally

```bash
# Navigate to your GitHub folder
cd "C:\Users\AbadUmairChanna\OneDrive - Verge Mobile\Documents\GitHub"

# Initialize git in the project directory
cd reportify
git init

# Add GitHub as remote
git remote add origin https://github.com/abaduchanna/reportify.git

# Configure git user (if not already configured)
git config --global user.email "your.email@example.com"
git config --global user.name "Abad Umair Channa"
```

### Step 3: Add Files and Initial Commit

```bash
# Stage all files
git add .

# Create initial commit
git commit -m "Initial commit: Reportify Punch Tracker v1.0.0"

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Authenticating with PAT

### Option 1: Store PAT Temporarily (First Push)

When prompted for password, paste your PAT:
```
Username: abaduchanna
Password: [REDACTED]
```

### Option 2: Store PAT in Git Credentials (Recommended)

#### Windows (Using Git Credential Manager):

1. When prompted for password, enter your PAT once
2. Select "Store this password" or similar option
3. Git will remember it for future operations

#### Manual Windows Credential Storage:

1. Open Credential Manager
2. Add Generic Credential
3. Internet address: `https://github.com`
4. Username: `abaduchanna`
5. Password: Your PAT

#### Using .netrc (Advanced):

1. Create `%USERPROFILE%\.netrc` file
2. Add:
```
machine github.com
login abaduchanna
password [REDACTED]
```

### Option 3: Configure Git SSH (Most Secure)

1. Generate SSH key:
```bash
ssh-keygen -t rsa -b 4096 -f %USERPROFILE%\.ssh\id_rsa
```

2. Add public key to GitHub:
   - Go to https://github.com/settings/keys
   - Click "New SSH key"
   - Paste contents of `~/.ssh/id_rsa.pub`

3. Update remote URL:
```bash
git remote set-url origin git@github.com:abaduchanna/reportify.git
```

## Daily Development Workflow

### Checking Status
```bash
git status
```

### Making Changes
```bash
# After making changes to files:
git add .
git commit -m "Describe your changes"
git push origin main
```

### Pulling Latest Changes
```bash
git pull origin main
```

## Setting Repository as Private

Your repository is already configured as private. To verify:

1. Go to https://github.com/abaduchanna/reportify/settings
2. Scroll to "Repository access"
3. Ensure "Private" is selected

## Adding Collaborators (If Needed)

1. Go to https://github.com/abaduchanna/reportify/settings/access
2. Click "Invite a collaborator"
3. Enter GitHub username
4. Set permissions (Pull, Push, Admin)

## Branch Protection Rules (Optional)

To protect main branch:

1. Go to https://github.com/abaduchanna/reportify/settings/branches
2. Click "Add rule"
3. Pattern name: `main`
4. Enable "Require a pull request before merging"
5. Enable "Dismiss stale pull request approvals"

## Releases and Tags

### Creating a Release

```bash
# Tag the version
git tag -a v1.0.0 -m "Release version 1.0.0"

# Push tags to GitHub
git push origin v1.0.0
```

On GitHub:
1. Go to Releases
2. Click "Draft a new release"
3. Select tag `v1.0.0`
4. Add title and release notes
5. Upload built `.exe` files
6. Publish release

## CI/CD with GitHub Actions (Optional)

To automate builds, create `.github/workflows/build.yml`:

```yaml
name: Build Reportify

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: windows-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build-win
      - uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/
```

## Security Best Practices

### 🔒 PAT Security

- ✅ Store in secure location
- ✅ Use Credential Manager when possible
- ✅ Don't commit PAT to repository
- ✅ Rotate PAT periodically
- ❌ Don't share PAT in messages/emails

### 🔐 Repository Secrets

If using CI/CD, store secrets in repository:

1. Go to Settings > Secrets and variables > Actions
2. Click "New repository secret"
3. Add `FIREBASE_CONFIG` with your Firebase configuration
4. Reference in workflows as `${{ secrets.FIREBASE_CONFIG }}`

### 📋 .gitignore Compliance

The repository includes `.gitignore` to prevent committing:
- `node_modules/`
- `.env` files
- Build outputs
- IDE settings
- Firebase credentials (in `.env`)

## Troubleshooting

### "Permission denied (publickey)"
- SSH key not properly configured
- Solution: Use HTTPS with PAT instead

### "fatal: could not read Username"
- Credentials not stored
- Solution: Run `git config --global credential.helper wincred`

### "Authentication failed"
- PAT expired or incorrect
- Solution: Verify PAT in Credential Manager, regenerate if needed

### Cannot push to remote
- Branch may be behind remote
- Solution: `git pull origin main` then `git push origin main`

## Git Aliases (Optional but Helpful)

```bash
# Add these to make commands shorter:
git config --global alias.st status
git config --global alias.cm commit -m
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ph push
git config --global alias.pl pull

# Usage:
git st          # instead of git status
git cm "message" # instead of git commit -m "message"
```

## Documentation

- [Git Official Documentation](https://git-scm.com/doc)
- [GitHub Help](https://docs.github.com/)
- [GitHub PAT Documentation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

## Next Steps

1. ✅ Initialize repository locally
2. ✅ Push initial commit to GitHub
3. ✅ Verify repository is private
4. ✅ Build application locally using `build.bat`
5. ✅ Create release and upload `.exe` files
6. ✅ Distribute to users

---

**Repository**: https://github.com/abaduchanna/reportify
**Visibility**: Private
**Status**: Ready for development and deployment
