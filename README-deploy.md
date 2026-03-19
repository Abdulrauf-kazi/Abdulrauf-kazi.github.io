# Final Deployment to abdulrauf-kazi.github.io

Since your site is at the root domain (`https://abdulrauf-kazi.github.io/`), we don't need any extra configuration. Pushing this code will **completely replace** the old site.

### Step 1: Initialize Git and Connect to GitHub
Run these commands in your terminal:

```bash
# 1. Initialize git (if not already done)
git init

# 2. Add your repository as the remote (assuming same repo)
# If this errors, it's already added.
git remote add origin https://github.com/abdulrauf-kazi/abdulrauf-kazi.github.io.git

# 3. Stage all new portfolio files
git add .

# 4. Commit changes
git commit -m "feat: replace old site with new optimized portfolio"

# 5. FORCE push to main (to overwrite the old site completely)
git push -u origin main --force
```

### Step 2: Set GitHub Actions as the Source
After pushing, do this on GitHub.com:
1. Go to your **abdulrauf-kazi.github.io** repository.
2. Click **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.

### Step 3: Monitor the Build
- Go to the **Actions** tab.
- Look for the "Deploy to GitHub Pages" workflow.
- Once it finishes, refresh `https://abdulrauf-kazi.github.io/`. Your new site is live!
