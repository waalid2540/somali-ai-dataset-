# Supabase Email Configuration Setup

## 🚨 IMPORTANT: Email Confirmation Issues Fix

### Problem: 
Users signing up but not receiving confirmation emails or brand name showing as "Som AI Data" instead of "Somai Data"

### Solution:

## 1. Update Supabase Auth Settings

Go to your Supabase Dashboard → Authentication → Settings

### Email Templates Configuration:

#### Confirm Signup Template:
```html
<h2>Welcome to Somai Data!</h2>

<p>Hi {{ .Name }},</p>

<p>Thanks for signing up for <strong>Somai Data</strong> - your complete AI automation platform!</p>

<p>Please click the link below to confirm your account and start accessing your AI tools:</p>

<p><a href="{{ .ConfirmationURL }}" style="background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; margin: 20px 0;">✅ Confirm Your Account</a></p>

<p>Once confirmed, you'll have access to:</p>
<ul>
  <li>🤖 20+ Premium AI Tools</li>
  <li>📝 Content Creation Suite</li>
  <li>🚀 Business Automation</li>
  <li>💼 Professional Templates</li>
</ul>

<p><strong>Next Steps After Confirmation:</strong></p>
<ol>
  <li>Return to the Somai Data website</li>
  <li>Sign in with your credentials</li>
  <li>Start your $7.99/month subscription</li>
  <li>Access all premium AI tools immediately</li>
</ol>

<p>If you have any questions, reply to this email or visit our support page.</p>

<p>Welcome to the future of AI automation!</p>

<p><strong>The Somai Data Team</strong><br>
<a href="{{ .SiteURL }}">somaidata.com</a></p>

<hr>
<p style="font-size: 12px; color: #666;">If you didn't sign up for Somai Data, you can safely ignore this email.</p>
```

#### Reset Password Template:
```html
<h2>Reset Your Somai Data Password</h2>

<p>Hi there,</p>

<p>You requested to reset your password for your <strong>Somai Data</strong> account.</p>

<p>Click the link below to create a new password:</p>

<p><a href="{{ .ConfirmationURL }}" style="background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; margin: 20px 0;">🔑 Reset Password</a></p>

<p>If you didn't request this password reset, you can safely ignore this email.</p>

<p><strong>The Somai Data Team</strong><br>
<a href="{{ .SiteURL }}">somaidata.com</a></p>
```

## 2. SMTP Configuration (Recommended)

### Custom SMTP Setup:
Instead of using Supabase default emails, set up custom SMTP for better deliverability:

1. **Go to:** Authentication → Settings → SMTP Settings
2. **Enable custom SMTP**
3. **Use Gmail/SendGrid/Mailgun:**

#### Gmail SMTP Example:
```
Host: smtp.gmail.com
Port: 587
Username: your-business-email@gmail.com
Password: your-app-password
Sender Name: Somai Data
Sender Email: noreply@yourdomain.com
```

## 3. Auth Configuration

### Confirm Email Settings:
```
Enable email confirmations: ✅ ON
Double confirm email changes: ✅ ON
Enable email change confirmations: ✅ ON
Secure email change: ✅ ON
```

### Site URL Configuration:
```
Site URL: https://your-domain.com
Redirect URLs: 
- https://your-domain.com/auth/callback
- https://your-domain.com/dashboard
```

## 4. RLS (Row Level Security) Policies

Make sure your `users` table has proper RLS policies:

```sql
-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own profile
CREATE POLICY "Users can read own profile" ON users 
FOR SELECT USING (auth.uid() = id);

-- Allow users to update their own profile  
CREATE POLICY "Users can update own profile" ON users 
FOR UPDATE USING (auth.uid() = id);

-- Allow insert for new users (signup)
CREATE POLICY "Allow signup" ON users 
FOR INSERT WITH CHECK (auth.uid() = id);
```

## 5. Testing Email Confirmation

### Test Process:
1. Sign up with a test email
2. Check email inbox (and spam folder)  
3. Confirm email should arrive within 2 minutes
4. Click confirmation link
5. Should redirect to your app with confirmed status

### Troubleshooting:
- **No email received:** Check SMTP settings and spam folder
- **Wrong brand name:** Update email templates above
- **Broken confirmation link:** Check Site URL and Redirect URLs
- **Database error:** Check RLS policies and user table structure

## 6. Environment Variables

Make sure these are set in your deployment:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 7. Email Deliverability Tips

### Improve Email Delivery:
1. **Use custom domain** for sender email
2. **Set up SPF/DKIM** records
3. **Use professional SMTP** service (SendGrid, Mailgun)  
4. **Test with different email providers** (Gmail, Yahoo, Outlook)
5. **Monitor bounce rates** in Supabase dashboard

## ✅ Final Checklist:

- [ ] Updated email templates with "Somai Data" branding
- [ ] Configured custom SMTP (recommended)
- [ ] Set correct Site URL and Redirect URLs
- [ ] Enabled email confirmations
- [ ] Set up RLS policies
- [ ] Tested signup flow end-to-end
- [ ] Checked email deliverability across providers

---

**Need Help?** 
- Supabase Docs: https://supabase.com/docs/guides/auth
- Email Auth Guide: https://supabase.com/docs/guides/auth/auth-email