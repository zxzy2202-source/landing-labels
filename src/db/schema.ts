import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

// 1. admin_users
export const adminUsers = sqliteTable('admin_users', {
  id: text('id').primaryKey(),
  username: text('username').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: text('role').notNull().default('admin'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

// 2. site_settings (core configuration)
export const siteSettings = sqliteTable('site_settings', {
  key: text('key').primaryKey(),
  value: text('value').notNull(), // Stores JSON-serialized settings, e.g. general, us, ca, eu, seo
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

// 3. contact_inquiries
export const contactInquiries = sqliteTable('contact_inquiries', {
  id: text('id').primaryKey(),
  clientName: text('client_name').notNull(),
  contactMethod: text('contact_method').notNull(),
  productCategory: text('product_category').notNull(),
  quantity: integer('quantity').notNull(),
  technicalSpecs: text('technical_specs'),
  status: text('status').notNull().default('pending'), // 'pending', 'processed', 'archived'
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

// 4. quote_requests (报价请求，含预估金额)
export const quoteRequests = sqliteTable('quote_requests', {
  id: text('id').primaryKey(),
  clientName: text('client_name').notNull(),
  contactMethod: text('contact_method').notNull(),
  productCategory: text('product_category').notNull(),
  quantity: integer('quantity').notNull(),
  technicalSpecs: text('technical_specs'),
  estimatedAmount: real('estimated_amount').notNull().default(0.0), // 预估金额
  status: text('status').notNull().default('pending'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

// 5. sample_requests (样品申请，含物流追踪)
export const sampleRequests = sqliteTable('sample_requests', {
  id: text('id').primaryKey(),
  clientName: text('client_name').notNull(),
  contactMethod: text('contact_method').notNull(),
  productCategory: text('product_category').notNull(),
  quantity: integer('quantity').notNull(),
  technicalSpecs: text('technical_specs'),
  trackingNumber: text('tracking_number'), // 物流追踪号
  status: text('status').notNull().default('pending'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

// 6. product_overrides
export const productOverrides = sqliteTable('product_overrides', {
  id: text('id').primaryKey(),
  categoryIndex: integer('category_index').notNull(),
  itemIndex: integer('item_index').notNull(),
  title: text('title'),
  desc: text('desc'),
  longDesc: text('long_desc'),
  imgUrl: text('img_url'),
  isEnabled: integer('is_enabled').notNull().default(1), // 1: true, 0: false
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

// 7. blog_posts
export const blogPosts = sqliteTable('blog_posts', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  coverImage: text('cover_image'),
  seoTitle: text('seo_title'),
  seoDescription: text('seo_description'),
  seoKeywords: text('seo_keywords'),
  isPublished: integer('is_published').notNull().default(1),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

// 8. media_files (必须存 width, height, alt, size, webp_thumb_url)
export const mediaFiles = sqliteTable('media_files', {
  id: text('id').primaryKey(),
  fileName: text('file_name').notNull(),
  url: text('url').notNull(),
  width: integer('width'),
  height: integer('height'),
  alt: text('alt'),
  size: integer('size'), // bytes
  webpThumbUrl: text('webp_thumb_url').notNull(), // WebP 400px thumb url
  categoryId: text('category_id'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

// 9. media_categories
export const mediaCategories = sqliteTable('media_categories', {
  id: text('id').primaryKey(),
  name: text('name').notNull().unique(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

// 10. image_slots (映射 slot_key 到 media_file_id)
export const imageSlots = sqliteTable('image_slots', {
  slotKey: text('slot_key').primaryKey(),
  mediaFileId: text('media_file_id'), // can be null if fallback is used
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

// 11. activity_log (记录管理员所有操作)
export const activityLog = sqliteTable('activity_log', {
  id: text('id').primaryKey(),
  adminUserId: text('admin_user_id'),
  action: text('action').notNull(),
  details: text('details'), // JSON string with details
  ipAddress: text('ip_address'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});
