# Admin Area - "Go to Website" Button

## ✅ Feature Added

### Location
**Admin Sidebar** - Top of the navigation, right below the "TBN ADMIN" header

### Design
- **Prominent Gold Button**: Matches the site's premium color scheme
- **Icon**: External link icon that rotates on hover
- **Text**: "Go to Website"
- **Opens in New Tab**: Uses `target="_blank"` so admin panel stays open

### Visual Details
```
Background: Primary Gold (#d4af37)
Text Color: Primary Navy (dark blue)
Hover Effect: Changes to white background
Shadow: Large shadow that increases on hover
Animation: Slight upward movement (-translate-y-0.5) on hover
Icon Animation: Rotates 12 degrees on hover
```

### User Experience
1. **Always Visible**: Fixed at the top of the sidebar
2. **One Click Access**: Instantly opens the main website
3. **New Tab**: Keeps admin panel open for easy switching
4. **Professional**: Matches the premium aesthetic of the site

### Code Location
**File**: `/src/components/admin/Sidebar.tsx`
**Lines**: 28-36

### How It Works
```tsx
<Link
    href="/"
    target="_blank"
    className="flex items-center justify-center space-x-2 px-4 py-3 mb-8 rounded-xl bg-primary-gold text-primary-navy font-bold hover:bg-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 group"
>
    <ExternalLink size={18} className="group-hover:rotate-12 transition-transform" />
    <span>Go to Website</span>
</Link>
```

## 🎨 Visual Hierarchy

**Admin Sidebar Structure** (Top to Bottom):
1. **TBN ADMIN** header (with shield icon)
2. **"Go to Website" button** ← NEW! (Gold, prominent)
3. Navigation menu items
4. Logout button (at bottom)

## ✅ Benefits

1. **Quick Access**: Admins can instantly preview the live site
2. **Context Switching**: Easy to switch between admin and public view
3. **Quality Control**: Check how changes look on the live site
4. **Professional**: Matches the premium design aesthetic

## 🚀 Test It

1. Go to any admin page:
   - http://localhost:3000/admin
   - http://localhost:3000/admin/blogs
   - http://localhost:3000/admin/messages
   - http://localhost:3000/admin/settings

2. Look at the top of the sidebar

3. Click the gold "Go to Website" button

4. Main website opens in a new tab!

## 📸 Expected Appearance

```
┌─────────────────────────────┐
│  🛡️  TBN ADMIN              │
├─────────────────────────────┤
│                             │
│  🔗 Go to Website           │  ← Gold button
│     (Prominent & Clickable) │
│                             │
├─────────────────────────────┤
│  📊 Dashboard               │
│  ✉️  Messages               │
│  📝 Blog Posts              │
│  👥 Subscribers             │
│  🛡️  Services               │
│  👤 Users                   │
│  ⚙️  Settings               │
│                             │
│         (space)             │
│                             │
│  🚪 Logout                  │
└─────────────────────────────┘
```

Perfect! The admin area now has easy access to the main website.
