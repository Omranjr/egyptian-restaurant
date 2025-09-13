# Google OAuth Setup Test

## Quick Test Steps:

1. **Check Environment Variables**
   ```bash
   # Make sure these are set in .env.local:
   NEXTAUTH_SECRET="your-secret"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```

2. **Test API Endpoint**
   Visit: http://localhost:3000/api/auth/providers
   Should return JSON with Google provider info

3. **Test Sign-in Flow**
   - Go to http://localhost:3000
   - Click "Sign In with Google" 
   - Should redirect to Google OAuth consent screen
   - After consent, should redirect back to your app

## Common Issues & Solutions:

### "400: malformed request" error:
- Check that GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are correct
- Verify authorized origins and redirect URIs in Google Cloud Console

### "redirect_uri_mismatch" error:
- Make sure redirect URI is exactly: `http://localhost:3000/api/auth/callback/google`
- Check that authorized JavaScript origins includes: `http://localhost:3000`

### "Configuration" error:
- Ensure NEXTAUTH_SECRET is set and not empty
- Restart dev server after changing .env.local

### Sign-in button does nothing:
- Check browser console for JavaScript errors
- Verify component has "use client" directive
- Make sure `signIn("google")` is called correctly

## Debug URLs:
- Providers: http://localhost:3000/api/auth/providers  
- Session: http://localhost:3000/api/auth/session
- CSRF Token: http://localhost:3000/api/auth/csrf
