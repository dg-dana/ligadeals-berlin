# Cloudinary Account Setup Instructions

This guide will help you set up a Cloudinary account and configure image optimization for your Liga Deals Berlin blog.

## 1. Create a Cloudinary Account

1. Visit [https://cloudinary.com/users/register_free](https://cloudinary.com/users/register_free)
2. Sign up for a free account (includes 25GB storage and 25GB bandwidth/month)
3. Verify your email address

## 2. Get Your Cloudinary Credentials

After signing in:

1. Go to the [Cloudinary Console Dashboard](https://console.cloudinary.com/)
2. You'll see your **Account Details** section with:
   - **Cloud Name** - Your unique cloud name
   - **API Key** - Your API key for authentication
   - **API Secret** - Your API secret (click "Show" to reveal)

## 3. Configure Environment Variables

Add the following to your `.env.local` file:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

Replace the placeholder values with your actual credentials from the dashboard.

## 4. Install Cloudinary SDK

The Cloudinary SDK dependency needs to be installed:

```bash
npm install cloudinary
```

## 5. Verify Installation

After configuration, you can test the setup:

```bash
npm run dev
```

## 6. Upload Folder Structure

Images will be automatically organized in Cloudinary with this structure:

- `blog-images/` - General blog images
- `sanity-uploads/` - Images uploaded through Sanity CMS

## 7. Image Optimization Features

Once configured, your images will automatically benefit from:

### Automatic Optimization
- **Format conversion**: Automatic WebP/AVIF delivery to supported browsers
- **Quality optimization**: Intelligent quality adjustment
- **Responsive images**: Multiple sizes generated automatically
- **Lazy loading**: Blurred placeholders for better UX

### Transformation Options
- **Resize**: Scale images while maintaining aspect ratio
- **Crop**: Smart cropping with face detection
- **Thumbnails**: Generate thumbnails with automatic focus
- **Retina support**: High-DPI display optimization

## 8. Usage Examples

### Basic Upload
```typescript
import { uploadImage } from '@/lib/cloudinary/upload';

const result = await uploadImage('path/to/image.jpg', {
  folder: 'blog-images',
  tags: ['article', 'featured']
});
```

### Image Transformation
```typescript
import { resize, crop, thumbnail } from '@/lib/cloudinary/transform';

// Resize to max 800px width
const resizedUrl = resize(publicId, 800);

// Crop to 400x300 with face detection
const croppedUrl = crop(publicId, 400, 300, 'face');

// Generate thumbnail
const thumbUrl = thumbnail(publicId, 200);
```

### Responsive Images
```typescript
import { getNextImageProps } from '@/lib/cloudinary/transform';

const imageProps = getNextImageProps(publicId, 1920);
// Returns: { src, srcSet, sizes }
```

### Sanity Integration
```typescript
import { uploadSanityImageToCloudinary } from '@/sanity/lib/cloudinary';

// Upload Sanity image to Cloudinary
const result = await uploadSanityImageToCloudinary(sanityImageAsset);
```

## 9. Best Practices

### Security
- Keep your API Secret private (never commit to git)
- Use signed URLs for sensitive content
- Implement upload presets for user uploads

### Performance
- Use `quality: 'auto'` for automatic quality optimization
- Enable `format: 'auto'` for automatic format selection
- Implement lazy loading for images below the fold

### Organization
- Use consistent folder structures
- Tag images for easy searching
- Set up automatic backups

## 10. Free Tier Limits

Cloudinary's free tier includes:
- **Storage**: 25 GB
- **Bandwidth**: 25 GB/month
- **Transformations**: 25,000/month
- **Images**: Unlimited

For most blogs, this is more than sufficient. Monitor usage in the [Cloudinary Console](https://console.cloudinary.com/).

## 11. Advanced Features (Optional)

### Upload Presets
Create presets in the Cloudinary console for consistent transformations:
1. Go to Settings > Upload
2. Create a new preset with your desired settings
3. Use the preset name in your upload calls

### Auto-tagging
Enable auto-tagging in Settings > Add-ons:
- Google Auto Tagging
- Amazon Rekognition
- Imagga Auto Tagging

### AI Background Removal
Enable AI background removal for product images:
```typescript
import { transform } from '@/lib/cloudinary/transform';

const noBgUrl = cloudinary.url(publicId, {
  effect: 'background_removal'
});
```

## 12. Monitoring and Analytics

Track your image delivery performance:
1. Visit [Analytics Dashboard](https://console.cloudinary.com/analytics)
2. Monitor:
   - Bandwidth usage
   - Storage consumption
   - Transformation credits
   - Popular images

## 13. Troubleshooting

### Images Not Loading
- Verify environment variables are set correctly
- Check cloud name matches your account
- Ensure images are uploaded to the correct folder

### Upload Errors
- Verify API credentials
- Check file size limits (free tier: 10MB per file)
- Ensure proper network connectivity

### Transformation Issues
- Verify public_id is correct
- Check transformation syntax
- Review Cloudinary documentation for valid parameters

## Support

- **Documentation**: [https://cloudinary.com/documentation](https://cloudinary.com/documentation)
- **Community**: [https://community.cloudinary.com](https://community.cloudinary.com)
- **Support**: [https://support.cloudinary.com](https://support.cloudinary.com)

---

Your Cloudinary setup is now complete! Images uploaded to your blog will automatically be optimized for performance and delivered in the best format for each user's browser.
