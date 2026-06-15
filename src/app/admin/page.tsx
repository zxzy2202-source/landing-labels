'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Inbox,
  Settings,
  Image as ImageIcon,
  Sliders,
  Database,
  LogOut,
  Upload,
  Copy,
  Plus,
  Check,
  X,
  ChevronRight,
  Globe,
  SlidersHorizontal,
  Edit,
  Save,
  ExternalLink,
  Loader2,
  FileText,
  Search,
  Eye,
  Trash2
} from 'lucide-react';
import { SiteSettingsData } from '@/lib/siteSettingsTypes';
import { DEFAULT_PRODUCTS, ProductCategory } from '@/lib/productsData';

// Describe slot keys
const SLOT_DESCRIPTIONS: Record<string, string> = {
  logo_header: '页眉主标志 Logo (PNG)',
  hero_bg: 'Hero 横幅背景大图',
  vanguard_video: '先锋版块工厂介绍视频 (MP4)',
  hub_video_poster: '流体枢纽视频封面图',
  hub_video: '流体枢纽版块工厂生产流程视频 (MP4)',
  gallery_1: '工厂画廊轮播图 1',
  gallery_2: '工厂画廊轮播图 2',
  gallery_3: '工厂画廊轮播图 3',
  gallery_4: '工厂画廊轮播图 4',
  products_cat_0: '食品与饮料罐分类主图',
  products_cat_1: '个人护理与健康分类主图',
  products_cat_2: '工业与物流分类主图',
  products_cat_3: '安全与环保认证分类主图',
  products_cat_4: '奢华与定制工艺分类主图',
  certifications_img: '认证徽章组合横幅',
  logo_footer: '页脚栏标志 Logo (PNG)',
};

interface SlotItem {
  slotKey: string;
  fallbackUrl: string;
  mediaFileId: string | null;
  boundUrl: string | null;
  boundFileName: string | null;
}

interface MediaFile {
  id: string;
  fileName: string;
  url: string;
  width: number | null;
  height: number | null;
  alt: string | null;
  size: number | null;
  webpThumbUrl: string;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'inquiries' | 'settings' | 'media' | 'slots' | 'products'>('inquiries');
  const [subTabInquiries, setSubTabInquiries] = useState<'contacts' | 'quotes' | 'samples'>('contacts');
  
  // App Global Status
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // DB States
  const [inquiries, setInquiries] = useState<{ contacts: any[]; quotes: any[]; samples: any[] }>({
    contacts: [],
    quotes: [],
    samples: []
  });
  const [settings, setSettings] = useState<SiteSettingsData | null>(null);
  const [mediaList, setMediaList] = useState<MediaFile[]>([]);
  const [slots, setSlots] = useState<SlotItem[]>([]);
  const [productOverrides, setProductOverrides] = useState<any[]>([]);

  // Search/Filter States
  const [mediaSearch, setMediaSearch] = useState('');
  const [productSearch, setProductSearch] = useState('');

  // Editing Temporary States
  const [editingSettings, setSettingsForm] = useState<SiteSettingsData | null>(null);
  const [editingProduct, setEditingProduct] = useState<{
    categoryIndex: number;
    itemIndex: number;
    title: string;
    desc: string;
    longDesc: string;
    imgUrl: string;
    isEnabled: boolean;
  } | null>(null);

  // Modals / Overlays
  const [isMediaSelectorOpen, setIsMediaSelectorOpen] = useState(false);
  const [selectorTarget, setSelectorTarget] = useState<{
    type: 'slot' | 'product';
    slotKey?: string;
    productIndex?: { catIdx: number; itemIdx: number };
  } | null>(null);

  // Clipboard copies trackers
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  // File Upload state
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadAlt, setUploadAlt] = useState('');

  // Toast Notifier Helper
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Fetch all core system data
  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const [inqRes, setRes, medRes, slotRes, prodRes] = await Promise.all([
        fetch('/api/admin/inquiries'),
        fetch('/api/admin/settings'),
        fetch('/api/admin/media'),
        fetch('/api/admin/slots'),
        fetch('/api/admin/products')
      ]);

      if (inqRes.status === 401 || setRes.status === 401) {
        router.push('/admin/login');
        return;
      }

      const inqData = await inqRes.json();
      const setData = await setRes.json();
      const medData = await medRes.json();
      const slotData = await slotRes.json();
      const prodData = await prodRes.json();

      setInquiries(inqData);
      setSettings(setData);
      setSettingsForm(setData);
      setMediaList(medData.files || []);
      setSlots(slotData.slots || []);
      setProductOverrides(prodData.overrides || []);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      showToast('加载系统数据失败，请重试。', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/admin/logout', { method: 'POST' });
      if (res.ok) {
        showToast('已成功退出登录。');
        router.push('/admin/login');
      } else {
        showToast('退出登录失败。', 'error');
      }
    } catch (err) {
      showToast('退出登录时发生网络错误。', 'error');
    }
  };

  // -------------------------------------------------------------
  // TAB 1: INQUIRIES LOGICS
  // -------------------------------------------------------------
  const handleInquiryStatusChange = async (type: 'contact' | 'quote' | 'sample', id: string, status: string) => {
    try {
      const res = await fetch('/api/admin/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, id, status })
      });
      if (res.ok) {
        showToast('询盘状态已成功更新。');
        // Refresh locally instead of full reload
        setInquiries(prev => {
          const key = type === 'contact' ? 'contacts' : type === 'quote' ? 'quotes' : 'samples';
          return {
            ...prev,
            [key]: prev[key].map(item => item.id === id ? { ...item, status } : item)
          };
        });
      } else {
        showToast('更新状态失败。', 'error');
      }
    } catch (err) {
      showToast('网络错误，更新状态失败。', 'error');
    }
  };

  const handleQuoteAmountUpdate = async (id: string, amount: string) => {
    const floatVal = parseFloat(amount);
    if (isNaN(floatVal)) {
      showToast('请输入有效的预估金额数值。', 'error');
      return;
    }
    try {
      const res = await fetch('/api/admin/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'quote', id, estimatedAmount: floatVal })
      });
      if (res.ok) {
        showToast('预估报价金额已更新。');
        setInquiries(prev => ({
          ...prev,
          quotes: prev.quotes.map(q => q.id === id ? { ...q, estimatedAmount: floatVal } : q)
        }));
      } else {
        showToast('更新报价金额失败。', 'error');
      }
    } catch (err) {
      showToast('网络错误，更新报价金额失败。', 'error');
    }
  };

  const handleSampleTrackingUpdate = async (id: string, trackingNumber: string) => {
    try {
      const res = await fetch('/api/admin/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'sample', id, trackingNumber })
      });
      if (res.ok) {
        showToast('样品快递单号已更新。');
        setInquiries(prev => ({
          ...prev,
          samples: prev.samples.map(s => s.id === id ? { ...s, trackingNumber } : s)
        }));
      } else {
        showToast('更新快递单号失败。', 'error');
      }
    } catch (err) {
      showToast('网络错误，更新单号失败。', 'error');
    }
  };

  // -------------------------------------------------------------
  // TAB 2: SITE SETTINGS LOGICS
  // -------------------------------------------------------------
  const handleSettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSettings) return;

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingSettings)
      });
      if (res.ok) {
        setSettings(editingSettings);
        showToast('站点配置已成功保存！');
      } else {
        const errData = await res.json();
        showToast(errData.error || '保存站点配置失败。', 'error');
      }
    } catch (err) {
      showToast('网络错误，保存设置失败。', 'error');
    }
  };

  const handleSettingsFieldChange = (section: keyof SiteSettingsData, field: string, value: string) => {
    if (!editingSettings) return;
    setSettingsForm(prev => {
      if (!prev) return null;
      if (section === 'seo' || section === 'hero' || section === 'contact') {
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [field]: value
          }
        };
      }
      return prev;
    });
  };

  const handleGeoFieldChange = (geoCode: string, field: string, value: string) => {
    if (!editingSettings) return;
    setSettingsForm(prev => {
      if (!prev) return null;
      const currentGeo = prev.geo[geoCode] || { hero: {} };
      return {
        ...prev,
        geo: {
          ...prev.geo,
          [geoCode]: {
            hero: {
              ...currentGeo.hero,
              [field]: value
            }
          }
        }
      };
    });
  };

  // -------------------------------------------------------------
  // TAB 3: MEDIA LIBRARY LOGICS
  // -------------------------------------------------------------
  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const inferredVideo = !file.type && /\.(mp4|mov|m4v|webm|ogg)$/i.test(file.name);
      const isVideo = file.type.startsWith('video/') || inferredVideo;

      if (isVideo) {
        const contentType = file.type || 'video/mp4';
        const presignRes = await fetch('/api/admin/media/presign', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileName: file.name,
            contentType,
          }),
        });

        const presignData = await presignRes.json();
        if (!presignRes.ok || !presignData.success) {
          showToast(presignData.error || '视频上传初始化失败。', 'error');
          return;
        }

        const uploadRes = await fetch(presignData.uploadUrl, {
          method: 'PUT',
          body: file,
        });

        if (!uploadRes.ok) {
          const uploadText = await uploadRes.text();
          showToast(`视频直传到云端失败：${uploadRes.status} ${uploadText.slice(0, 120)}`, 'error');
          return;
        }

        const registerRes = await fetch('/api/admin/media/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileName: file.name,
            url: presignData.fileUrl,
            alt: uploadAlt || file.name,
            size: file.size,
            contentType,
          }),
        });

        const registerData = await registerRes.json();
        if (registerRes.ok && registerData.success) {
          showToast('视频上传成功。');
          setMediaList(prev => [registerData.media, ...prev]);
          setUploadAlt('');
          if (fileInputRef.current) fileInputRef.current.value = '';
        } else {
          showToast(registerData.error || '视频登记失败。', 'error');
        }

        return;
      }

      const formData = new FormData();
      formData.append('file', file);
      formData.append('alt', uploadAlt || file.name);

      const res = await fetch('/api/admin/media', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast('图片上传成功。');
        setMediaList(prev => [data.media, ...prev]);
        setUploadAlt('');
        if (fileInputRef.current) fileInputRef.current.value = '';
      } else {
        showToast(data.error || '图片上传失败。', 'error');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : '网络错误，上传文件失败。';
      showToast(message, 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(text);
    showToast('链接已成功复制到剪贴板。', 'success');
    setTimeout(() => {
      setCopiedUrl(null);
    }, 2000);
  };

  // Filtered media list based on search
  const filteredMedia = mediaList.filter(m =>
    m.fileName.toLowerCase().includes(mediaSearch.toLowerCase()) ||
    (m.alt && m.alt.toLowerCase().includes(mediaSearch.toLowerCase()))
  );

  // -------------------------------------------------------------
  // TAB 4: IMAGE SLOTS LOGICS
  // -------------------------------------------------------------
  const openMediaSelector = (target: { type: 'slot' | 'product'; slotKey?: string; productIndex?: { catIdx: number; itemIdx: number } }) => {
    setSelectorTarget(target);
    setIsMediaSelectorOpen(true);
  };

  const selectMediaForTarget = async (media: MediaFile) => {
    if (!selectorTarget) return;

    if (selectorTarget.type === 'slot' && selectorTarget.slotKey) {
      const key = selectorTarget.slotKey;
      try {
        const res = await fetch('/api/admin/slots', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slotKey: key, mediaFileId: media.id })
        });
        if (res.ok) {
          showToast(`已成功将图片绑定至插槽 ${key}。`);
          setSlots(prev => prev.map(s => s.slotKey === key ? {
            ...s,
            mediaFileId: media.id,
            boundUrl: media.url,
            boundFileName: media.fileName
          } : s));
        } else {
          showToast('绑定插槽失败。', 'error');
        }
      } catch (err) {
        showToast('网络错误，绑定插槽失败。', 'error');
      }
    } else if (selectorTarget.type === 'product') {
      if (editingProduct) {
        setEditingProduct(prev => prev ? { ...prev, imgUrl: media.url } : null);
        showToast('已为产品选择图片。');
      }
    }

    setIsMediaSelectorOpen(false);
    setSelectorTarget(null);
  };

  const handleUnbindSlot = async (slotKey: string) => {
    try {
      const res = await fetch('/api/admin/slots', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slotKey, mediaFileId: null })
      });
      if (res.ok) {
        showToast(`已成功解绑插槽 ${slotKey}。`);
        setSlots(prev => prev.map(s => s.slotKey === slotKey ? {
          ...s,
          mediaFileId: null,
          boundUrl: null,
          boundFileName: null
        } : s));
      } else {
        showToast('解绑插槽失败。', 'error');
      }
    } catch (err) {
      showToast('网络错误，解绑插槽失败。', 'error');
    }
  };

  // -------------------------------------------------------------
  // TAB 5: PRODUCT OVERRIDES LOGICS
  // -------------------------------------------------------------
  const getOverrideForProduct = (catIdx: number, itemIdx: number) => {
    const id = `${catIdx}-${itemIdx}`;
    return productOverrides.find(o => o.id === id);
  };

  const getProductDisplayData = (category: ProductCategory, item: any, catIdx: number, itemIdx: number) => {
    const override = getOverrideForProduct(catIdx, itemIdx);
    return {
      title: override?.title || item.title,
      desc: override?.desc || item.desc,
      longDesc: override?.longDesc || item.longDesc,
      img: override?.imgUrl || item.img,
      isEnabled: override ? override.isEnabled === 1 : true,
      isOverridden: !!override
    };
  };

  const startEditingProduct = (catIdx: number, itemIdx: number, item: any) => {
    const override = getOverrideForProduct(catIdx, itemIdx);
    setEditingProduct({
      categoryIndex: catIdx,
      itemIndex: itemIdx,
      title: override?.title || item.title,
      desc: override?.desc || item.desc,
      longDesc: override?.longDesc || item.longDesc,
      imgUrl: override?.imgUrl || item.img,
      isEnabled: override ? override.isEnabled === 1 : true
    });
  };

  const handleProductFormSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    try {
      const res = await fetch('/api/admin/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProduct)
      });
      if (res.ok) {
        showToast('产品自定义设置已成功保存！');
        const id = `${editingProduct.categoryIndex}-${editingProduct.itemIndex}`;
        
        // Update local overrides array
        setProductOverrides(prev => {
          const index = prev.findIndex(o => o.id === id);
          const val = {
            id,
            categoryIndex: editingProduct.categoryIndex,
            itemIndex: editingProduct.itemIndex,
            title: editingProduct.title,
            desc: editingProduct.desc,
            longDesc: editingProduct.longDesc,
            imgUrl: editingProduct.imgUrl,
            isEnabled: editingProduct.isEnabled ? 1 : 0,
            updatedAt: new Date().toISOString()
          };

          if (index !== -1) {
            return prev.map((item, idx) => idx === index ? val : item);
          } else {
            return [...prev, val];
          }
        });

        setEditingProduct(null);
      } else {
        showToast('保存产品自定义设置失败。', 'error');
      }
    } catch (err) {
      showToast('网络错误，保存产品设置失败。', 'error');
    }
  };


  // -------------------------------------------------------------
  // HTML RENDER OUTLINE
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row text-gray-800">
      
      {/* Toast Notice banner */}
      {toast && (
        <div className={`fixed bottom-5 right-5 z-[9999] p-4 rounded-lg shadow-xl flex items-center gap-3 animate-slide-up ${
          toast.type === 'error' ? 'bg-red-600 text-white' : toast.type === 'info' ? 'bg-[#1a2a3a] text-white' : 'bg-[#007d85] text-white'
        }`}>
          <span>{toast.type === 'error' ? '❌' : toast.type === 'info' ? 'ℹ️' : '✓'}</span>
          <p className="font-bold text-sm tracking-wide">{toast.message}</p>
        </div>
      )}

      {/* Media Selector Overlay modal */}
      {isMediaSelectorOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99999] flex justify-center items-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full h-[85vh] flex flex-col overflow-hidden border border-gray-100">
            <div className="p-5 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <div>
                <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">从媒体库选择图片</h3>
                <p className="text-xs text-gray-500 mt-1">选择一张现有图片绑定到您的目标插槽或产品中。</p>
              </div>
              <button
                onClick={() => { setIsMediaSelectorOpen(false); setSelectorTarget(null); }}
                className="p-1 rounded-full hover:bg-gray-200 transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            
            <div className="p-4 border-b border-gray-100 flex items-center gap-3">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={mediaSearch}
                onChange={(e) => setMediaSearch(e.target.value)}
                placeholder="搜索已上传的文件名..."
                className="w-full text-sm outline-none border-none py-1 text-gray-800 font-medium"
              />
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {filteredMedia.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-200 rounded-lg">
                  <ImageIcon className="w-12 h-12 text-gray-300 mb-2" />
                  <p className="text-sm font-semibold text-gray-400">未找到匹配的媒体文件。</p>
                  <p className="text-xs text-gray-400 mt-1">请先在“媒体库管理”标签页中上传图片资源。</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {filteredMedia.map((media) => (
                    <div
                      key={media.id}
                      onClick={() => selectMediaForTarget(media)}
                      className="group relative cursor-pointer border border-gray-200 rounded-lg overflow-hidden hover:border-[#007d85] hover:shadow-md transition-all bg-white"
                    >
                      <div className="aspect-square bg-gray-100 relative flex items-center justify-center p-2">
                        <img
                          src={media.webpThumbUrl}
                          alt={media.fileName}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div className="p-2 border-t border-gray-100">
                        <p className="text-xs text-gray-900 font-bold truncate">{media.fileName}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">
                          {media.width && media.height ? `${media.width}x${media.height}` : '视频 / 未知'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
              <button
                onClick={() => { setIsMediaSelectorOpen(false); setSelectorTarget(null); }}
                className="px-4 py-2 text-xs font-bold uppercase text-gray-600 hover:text-gray-900 transition-colors"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Left Sidebar (Navigation) */}
      <aside className="w-full md:w-64 bg-[#1a2a3a] text-white flex flex-col flex-shrink-0">
        
        {/* Brand Header */}
        <div className="p-5 bg-black/10 border-b border-white/5 flex items-center gap-3">
          <img
            src="/vercel.svg"
            alt="知信纸业"
            className="h-12 w-auto object-contain"
          />
          <div>
            <h2 className="text-xs font-extrabold tracking-wider text-white uppercase">知信后台</h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">控制中心 v1.2</p>
          </div>
        </div>

        {/* User Info Bar */}
        <div className="px-5 py-4 border-b border-white/5 flex items-center gap-3 bg-black/5">
          <div className="w-8 h-8 rounded-full bg-[#007d85] flex items-center justify-center font-bold text-sm">
            A
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-white truncate">系统管理员</p>
            <p className="text-[9px] text-[#00e5ff] font-extrabold tracking-wide uppercase mt-0.5">当前在线</p>
          </div>
        </div>

        {/* Tab Links */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-xs font-bold transition-all uppercase tracking-wider ${
              activeTab === 'inquiries' ? 'bg-[#007d85] text-white shadow-lg shadow-[#007d85]/20' : 'text-gray-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-3">
              <Inbox className="w-4 h-4" />
              询盘与申请管理
            </span>
            {/* Show pending badge if any */}
            {(inquiries.contacts.filter(c => c.status === 'pending').length +
              inquiries.quotes.filter(q => q.status === 'pending').length +
              inquiries.samples.filter(s => s.status === 'pending').length) > 0 && (
              <span className="bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">
                {inquiries.contacts.filter(c => c.status === 'pending').length +
                  inquiries.quotes.filter(q => q.status === 'pending').length +
                  inquiries.samples.filter(s => s.status === 'pending').length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-xs font-bold transition-all uppercase tracking-wider ${
              activeTab === 'settings' ? 'bg-[#007d85] text-white shadow-lg shadow-[#007d85]/20' : 'text-gray-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4" />
            全局站点配置
          </button>

          <button
            onClick={() => setActiveTab('media')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-xs font-bold transition-all uppercase tracking-wider ${
              activeTab === 'media' ? 'bg-[#007d85] text-white shadow-lg shadow-[#007d85]/20' : 'text-gray-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            媒体库管理
          </button>

          <button
            onClick={() => setActiveTab('slots')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-xs font-bold transition-all uppercase tracking-wider ${
              activeTab === 'slots' ? 'bg-[#007d85] text-white shadow-lg shadow-[#007d85]/20' : 'text-gray-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Sliders className="w-4 h-4" />
            图片插槽绑定
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-xs font-bold transition-all uppercase tracking-wider ${
              activeTab === 'products' ? 'bg-[#007d85] text-white shadow-lg shadow-[#007d85]/20' : 'text-gray-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Database className="w-4 h-4" />
            产品矩阵自定义
          </button>
        </nav>

        {/* Live Site & Logout */}
        <div className="p-4 border-t border-white/5 space-y-2 bg-black/10">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-white/5 hover:bg-white/10 text-xs font-bold rounded text-white transition-all uppercase tracking-wider"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            访问前台网站
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-red-950/40 hover:bg-red-900 text-red-300 hover:text-white text-xs font-bold rounded transition-all uppercase tracking-wider border border-red-900/40"
          >
            <LogOut className="w-3.5 h-3.5" />
            安全退出
          </button>
        </div>
      </aside>

      {/* Main Panel Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header navbar */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 flex-shrink-0 z-20 shadow-sm">
          <div className="flex items-center gap-3">
            <h1 className="text-md font-black text-gray-900 uppercase tracking-wide">
              {activeTab === 'inquiries' && '询盘与申请收件箱'}
              {activeTab === 'settings' && '全局站点配置中心'}
              {activeTab === 'media' && '媒体库管理 (S3/云存储)'}
              {activeTab === 'slots' && '图片插槽动态绑定'}
              {activeTab === 'products' && '产品矩阵内容自定义'}
            </h1>
          </div>
          <div className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            服务器：数据库已连接
          </div>
        </header>

        {/* Dynamic Center Panel Wrapper */}
        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[300px]">
              <Loader2 className="w-10 h-10 text-[#007d85] animate-spin mb-4" />
              <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">正在加载控制面板内容...</p>
            </div>
          ) : (
            <div className="max-w-7xl mx-auto space-y-6">

              {/* ------------------------------------------------------------- */}
              {/* TAB 1: INQUIRIES PANELS */}
              {/* ------------------------------------------------------------- */}
              {activeTab === 'inquiries' && (
                <div className="space-y-6">
                  {/* Status metrics counters */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">联系询盘</p>
                        <h4 className="text-2xl font-black text-gray-900 mt-1">共 {inquiries.contacts.length} 个</h4>
                        <p className="text-[10px] text-gray-500 font-bold mt-1 uppercase">
                          {inquiries.contacts.filter(c => c.status === 'pending').length} 个待处理请求
                        </p>
                      </div>
                      <div className="p-3 bg-teal-50 text-[#007d85] rounded-full">
                        <Inbox className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">报价申请</p>
                        <h4 className="text-2xl font-black text-gray-900 mt-1">共 {inquiries.quotes.length} 个</h4>
                        <p className="text-[10px] text-gray-500 font-bold mt-1 uppercase">
                          {inquiries.quotes.filter(q => q.status === 'pending').length} 个需要预估金额
                        </p>
                      </div>
                      <div className="p-3 bg-teal-50 text-[#007d85] rounded-full">
                        <FileText className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">样品寄送申请</p>
                        <h4 className="text-2xl font-black text-gray-900 mt-1">共 {inquiries.samples.length} 个</h4>
                        <p className="text-[10px] text-gray-500 font-bold mt-1 uppercase">
                          {inquiries.samples.filter(s => s.status === 'pending').length} 个待处理发货
                        </p>
                      </div>
                      <div className="p-3 bg-teal-50 text-[#007d85] rounded-full">
                        <Globe className="w-6 h-6" />
                      </div>
                    </div>
                  </div>

                  {/* Sub-tabs switch */}
                  <div className="bg-white p-1 rounded-lg shadow-sm border border-gray-200 flex space-x-1">
                    <button
                      onClick={() => setSubTabInquiries('contacts')}
                      className={`flex-1 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all ${
                        subTabInquiries === 'contacts' ? 'bg-[#1a2a3a] text-white shadow' : 'text-gray-600 hover:text-gray-950 hover:bg-gray-50'
                      }`}
                    >
                      日常联系表单 ({inquiries.contacts.length})
                    </button>
                    <button
                      onClick={() => setSubTabInquiries('quotes')}
                      className={`flex-1 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all ${
                        subTabInquiries === 'quotes' ? 'bg-[#1a2a3a] text-white shadow' : 'text-gray-600 hover:text-gray-950 hover:bg-gray-50'
                      }`}
                    >
                      在线报价申请 ({inquiries.quotes.length})
                    </button>
                    <button
                      onClick={() => setSubTabInquiries('samples')}
                      className={`flex-1 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all ${
                        subTabInquiries === 'samples' ? 'bg-[#1a2a3a] text-white shadow' : 'text-gray-600 hover:text-gray-950 hover:bg-gray-50'
                      }`}
                    >
                      样品物流寄送 ({inquiries.samples.length})
                    </button>
                  </div>

                  {/* INQUIRY TABLES */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    
                    {/* contacts Sub-Tab */}
                    {subTabInquiries === 'contacts' && (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-wider border-b border-gray-200">
                              <th className="p-4">提交日期</th>
                              <th className="p-4">客户详情</th>
                              <th className="p-4">联系方式</th>
                              <th className="p-4">产品品类</th>
                              <th className="p-4">目标数量</th>
                              <th className="p-4">定制技术要求</th>
                              <th className="p-4">状态</th>
                              <th className="p-4 text-right">操作</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100 text-sm">
                            {inquiries.contacts.length === 0 ? (
                              <tr>
                                <td colSpan={8} className="p-8 text-center text-gray-400 font-bold">
                                  收件箱中暂无日常联系询盘记录。
                                </td>
                              </tr>
                            ) : (
                              inquiries.contacts.map((contact) => (
                                <tr key={contact.id} className="hover:bg-gray-50/50 transition-colors">
                                  <td className="p-4 font-semibold text-gray-500 whitespace-nowrap">
                                    {new Date(contact.createdAt).toLocaleString()}
                                  </td>
                                  <td className="p-4 font-bold text-gray-950 whitespace-nowrap">{contact.clientName}</td>
                                  <td className="p-4 font-medium text-gray-700">{contact.contactMethod}</td>
                                  <td className="p-4 whitespace-nowrap">
                                    <span className="px-2 py-0.5 bg-blue-50 text-[#007d85] rounded text-[11px] font-bold">
                                      {contact.productCategory}
                                    </span>
                                  </td>
                                  <td className="p-4 font-bold text-gray-900">{contact.quantity.toLocaleString()}</td>
                                  <td className="p-4 max-w-xs truncate text-gray-600 font-medium" title={contact.technicalSpecs}>
                                    {contact.technicalSpecs || '无'}
                                  </td>
                                  <td className="p-4 whitespace-nowrap">
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${
                                      contact.status === 'processed' ? 'bg-emerald-50 text-emerald-700' :
                                      contact.status === 'archived' ? 'bg-gray-100 text-gray-500' : 'bg-red-50 text-red-600 font-black animate-pulse'
                                    }`}>
                                      {contact.status === 'pending' ? '待处理' : contact.status === 'processed' ? '已处理' : '已归档'}
                                    </span>
                                  </td>
                                  <td className="p-4 text-right whitespace-nowrap space-x-1">
                                    <button
                                      onClick={() => handleInquiryStatusChange('contact', contact.id, 'processed')}
                                      className="px-2 py-1 bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-600 rounded text-xs font-bold transition-all uppercase tracking-wide border border-emerald-200"
                                    >
                                      处理完毕
                                    </button>
                                    <button
                                      onClick={() => handleInquiryStatusChange('contact', contact.id, 'archived')}
                                      className="px-2 py-1 bg-gray-50 hover:bg-gray-500 hover:text-white text-gray-500 rounded text-xs font-bold transition-all uppercase tracking-wide border border-gray-250"
                                    >
                                      归档
                                    </button>
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* quotes Sub-Tab */}
                    {subTabInquiries === 'quotes' && (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-wider border-b border-gray-200">
                              <th className="p-4">提交日期</th>
                              <th className="p-4">客户详情</th>
                              <th className="p-4">联系方式</th>
                              <th className="p-4">产品品类</th>
                              <th className="p-4">目标数量</th>
                              <th className="p-4">定制技术要求</th>
                              <th className="p-4">预估金额 ($)</th>
                              <th className="p-4">状态</th>
                              <th className="p-4 text-right">操作</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100 text-sm">
                            {inquiries.quotes.length === 0 ? (
                              <tr>
                                <td colSpan={9} className="p-8 text-center text-gray-400 font-bold">
                                  收件箱中暂无报价申请记录。
                                </td>
                              </tr>
                            ) : (
                              inquiries.quotes.map((quote) => {
                                // Simple local ref state for inputs
                                return (
                                  <tr key={quote.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="p-4 font-semibold text-gray-500 whitespace-nowrap">
                                      {new Date(quote.createdAt).toLocaleString()}
                                    </td>
                                    <td className="p-4 font-bold text-gray-950 whitespace-nowrap">{quote.clientName}</td>
                                    <td className="p-4 font-medium text-gray-700">{quote.contactMethod}</td>
                                    <td className="p-4 whitespace-nowrap">
                                      <span className="px-2 py-0.5 bg-blue-50 text-[#007d85] rounded text-[11px] font-bold">
                                        {quote.productCategory}
                                      </span>
                                    </td>
                                    <td className="p-4 font-bold text-gray-900">{quote.quantity.toLocaleString()}</td>
                                    <td className="p-4 max-w-xs truncate text-gray-600 font-medium" title={quote.technicalSpecs}>
                                      {quote.technicalSpecs || '无'}
                                    </td>
                                    <td className="p-4">
                                      <div className="flex items-center gap-2">
                                        <input
                                          type="number"
                                          defaultValue={quote.estimatedAmount || 0}
                                          onBlur={(e) => handleQuoteAmountUpdate(quote.id, e.target.value)}
                                          placeholder="预估金额"
                                          className="w-20 px-2 py-1 text-xs border border-gray-350 bg-gray-50 font-bold rounded focus:ring-1 focus:ring-[#007d85]"
                                        />
                                      </div>
                                    </td>
                                    <td className="p-4 whitespace-nowrap">
                                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${
                                        quote.status === 'processed' ? 'bg-emerald-50 text-emerald-700' :
                                        quote.status === 'archived' ? 'bg-gray-100 text-gray-500' : 'bg-red-50 text-red-600 font-black animate-pulse'
                                      }`}>
                                        {quote.status === 'pending' ? '待处理' : quote.status === 'processed' ? '已处理' : '已归档'}
                                      </span>
                                    </td>
                                    <td className="p-4 text-right whitespace-nowrap space-x-1">
                                      <button
                                        onClick={() => handleInquiryStatusChange('quote', quote.id, 'processed')}
                                        className="px-2 py-1 bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-600 rounded text-xs font-bold transition-all uppercase tracking-wide border border-emerald-200"
                                      >
                                        处理完毕
                                      </button>
                                      <button
                                        onClick={() => handleInquiryStatusChange('quote', quote.id, 'archived')}
                                        className="px-2 py-1 bg-gray-50 hover:bg-gray-500 hover:text-white text-gray-500 rounded text-xs font-bold transition-all uppercase tracking-wide border border-gray-250"
                                      >
                                        归档
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })
                            )}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* samples Sub-Tab */}
                    {subTabInquiries === 'samples' && (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-wider border-b border-gray-200">
                              <th className="p-4">提交日期</th>
                              <th className="p-4">客户详情</th>
                              <th className="p-4">联系方式</th>
                              <th className="p-4">产品品类</th>
                              <th className="p-4">目标数量</th>
                              <th className="p-4">定制技术要求</th>
                              <th className="p-4">物流追踪单号</th>
                              <th className="p-4">状态</th>
                              <th className="p-4 text-right">操作</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100 text-sm">
                            {inquiries.samples.length === 0 ? (
                              <tr>
                                <td colSpan={9} className="p-8 text-center text-gray-400 font-bold">
                                  收件箱中暂无样品申请记录。
                                </td>
                              </tr>
                            ) : (
                              inquiries.samples.map((sample) => {
                                return (
                                  <tr key={sample.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="p-4 font-semibold text-gray-500 whitespace-nowrap">
                                      {new Date(sample.createdAt).toLocaleString()}
                                    </td>
                                    <td className="p-4 font-bold text-gray-950 whitespace-nowrap">{sample.clientName}</td>
                                    <td className="p-4 font-medium text-gray-700">{sample.contactMethod}</td>
                                    <td className="p-4 whitespace-nowrap">
                                      <span className="px-2 py-0.5 bg-blue-50 text-[#007d85] rounded text-[11px] font-bold">
                                        {sample.productCategory}
                                      </span>
                                    </td>
                                    <td className="p-4 font-bold text-gray-900">{sample.quantity.toLocaleString()}</td>
                                    <td className="p-4 max-w-xs truncate text-gray-600 font-medium" title={sample.technicalSpecs}>
                                      {sample.technicalSpecs || '无'}
                                    </td>
                                    <td className="p-4">
                                      <input
                                        type="text"
                                        defaultValue={sample.trackingNumber || ''}
                                        onBlur={(e) => handleSampleTrackingUpdate(sample.id, e.target.value)}
                                        placeholder="填写物流单号"
                                        className="w-28 px-2 py-1 text-xs border border-gray-350 bg-gray-50 rounded focus:ring-1 focus:ring-[#007d85] font-semibold text-gray-800"
                                      />
                                    </td>
                                    <td className="p-4 whitespace-nowrap">
                                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${
                                        sample.status === 'processed' ? 'bg-emerald-50 text-emerald-700' :
                                        sample.status === 'archived' ? 'bg-gray-100 text-gray-500' : 'bg-red-50 text-red-600 font-black animate-pulse'
                                      }`}>
                                        {sample.status === 'pending' ? '待寄送' : sample.status === 'processed' ? '已寄送' : '已归档'}
                                      </span>
                                    </td>
                                    <td className="p-4 text-right whitespace-nowrap space-x-1">
                                      <button
                                        onClick={() => handleInquiryStatusChange('sample', sample.id, 'processed')}
                                        className="px-2 py-1 bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-600 rounded text-xs font-bold transition-all uppercase tracking-wide border border-emerald-200"
                                      >
                                        发货处理
                                      </button>
                                      <button
                                        onClick={() => handleInquiryStatusChange('sample', sample.id, 'archived')}
                                        className="px-2 py-1 bg-gray-50 hover:bg-gray-500 hover:text-white text-gray-500 rounded text-xs font-bold transition-all uppercase tracking-wide border border-gray-250"
                                      >
                                        归档
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })
                            )}
                          </tbody>
                        </table>
                      </div>
                    )}

                  </div>
                </div>
              )}


              {/* ------------------------------------------------------------- */}
              {/* TAB 2: SITE SETTINGS PANELS */}
              {/* ------------------------------------------------------------- */}
              {activeTab === 'settings' && editingSettings && (
                <form onSubmit={handleSettingsSubmit} className="space-y-6">
                  
                  {/* SEO CONFIG */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-5 py-4 bg-gray-50 border-b border-gray-200">
                      <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider flex items-center gap-2">
                        <Globe className="w-4.5 h-4.5 text-[#007d85]" />
                        搜索引擎优化 (SEO) 元数据设置
                      </h3>
                    </div>
                    <div className="p-5 space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">SEO 页面标题 (Title)</label>
                        <input
                          type="text"
                          value={editingSettings.seo.title}
                          onChange={(e) => handleSettingsFieldChange('seo', 'title', e.target.value)}
                          className="w-full text-sm border border-gray-300 rounded px-3 py-2 bg-gray-50 focus:bg-white outline-none focus:border-[#007d85] font-semibold text-gray-900 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">Meta 网页描述 (Description - 推荐 150-160 个字符)</label>
                        <textarea
                          rows={3}
                          value={editingSettings.seo.description}
                          onChange={(e) => handleSettingsFieldChange('seo', 'description', e.target.value)}
                          className="w-full text-sm border border-gray-300 rounded px-3 py-2 bg-gray-50 focus:bg-white outline-none focus:border-[#007d85] font-medium text-gray-750 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">SEO 核心关键词 (Keywords - 英文逗号分隔)</label>
                        <input
                          type="text"
                          value={editingSettings.seo.keywords}
                          onChange={(e) => handleSettingsFieldChange('seo', 'keywords', e.target.value)}
                          className="w-full text-sm border border-gray-300 rounded px-3 py-2 bg-gray-50 focus:bg-white outline-none focus:border-[#007d85] font-semibold text-gray-900 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* HERO CONFIG */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-5 py-4 bg-gray-50 border-b border-gray-200">
                      <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider flex items-center gap-2">
                        <SlidersHorizontal className="w-4.5 h-4.5 text-[#007d85]" />
                        首屏大横幅 (Hero Section) 核心文案自定义
                      </h3>
                    </div>
                    <div className="p-5 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">首屏标题主文本 (Title)</label>
                          <input
                            type="text"
                            value={editingSettings.hero.title}
                            onChange={(e) => handleSettingsFieldChange('hero', 'title', e.target.value)}
                            className="w-full text-sm border border-gray-300 rounded px-3 py-2 bg-gray-50 focus:bg-white outline-none focus:border-[#007d85] font-bold text-gray-950 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">高亮标色文本 (Highlight Text)</label>
                          <input
                            type="text"
                            value={editingSettings.hero.highlightText}
                            onChange={(e) => handleSettingsFieldChange('hero', 'highlightText', e.target.value)}
                            className="w-full text-sm border border-gray-300 rounded px-3 py-2 bg-gray-50 focus:bg-white outline-none focus:border-[#007d85] font-bold text-gray-950 transition-colors"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">首屏副标题/宣传语 (Description)</label>
                        <textarea
                          rows={3}
                          value={editingSettings.hero.description}
                          onChange={(e) => handleSettingsFieldChange('hero', 'description', e.target.value)}
                          className="w-full text-sm border border-gray-300 rounded px-3 py-2 bg-gray-50 focus:bg-white outline-none focus:border-[#007d85] font-medium text-gray-750 transition-colors"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">主 CTA 按钮文字</label>
                          <input
                            type="text"
                            value={editingSettings.hero.btnPrimaryText}
                            onChange={(e) => handleSettingsFieldChange('hero', 'btnPrimaryText', e.target.value)}
                            className="w-full text-sm border border-gray-300 rounded px-3 py-2 bg-gray-50 focus:bg-white outline-none focus:border-[#007d85] font-semibold text-gray-900 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">主 CTA 按钮跳转链接</label>
                          <input
                            type="text"
                            value={editingSettings.hero.btnPrimaryLink}
                            onChange={(e) => handleSettingsFieldChange('hero', 'btnPrimaryLink', e.target.value)}
                            className="w-full text-sm border border-gray-300 rounded px-3 py-2 bg-gray-50 focus:bg-white outline-none focus:border-[#007d85] font-medium text-gray-800 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">次 CTA 按钮文字</label>
                          <input
                            type="text"
                            value={editingSettings.hero.btnSecondaryText}
                            onChange={(e) => handleSettingsFieldChange('hero', 'btnSecondaryText', e.target.value)}
                            className="w-full text-sm border border-gray-300 rounded px-3 py-2 bg-gray-50 focus:bg-white outline-none focus:border-[#007d85] font-semibold text-gray-900 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">次 CTA 按钮跳转链接</label>
                          <input
                            type="text"
                            value={editingSettings.hero.btnSecondaryLink}
                            onChange={(e) => handleSettingsFieldChange('hero', 'btnSecondaryLink', e.target.value)}
                            className="w-full text-sm border border-gray-300 rounded px-3 py-2 bg-gray-50 focus:bg-white outline-none focus:border-[#007d85] font-medium text-gray-800 transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* GEO-SPECIFIC CUSTOM OVERRIDES */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-5 py-4 bg-gray-50 border-b border-gray-200">
                      <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider flex items-center gap-2">
                        <Globe className="w-4.5 h-4.5 text-[#007d85]" />
                        国际化市场 / 区域 GEO 覆盖设置 (美国/us、加拿大/ca、欧洲/eu 路由)
                      </h3>
                    </div>
                    <div className="p-5 divide-y divide-gray-100 space-y-5">
                      
                      {/* USA overrides */}
                      <div className="pt-2 first:pt-0 space-y-3">
                        <h4 className="text-xs font-black text-[#007d85] uppercase tracking-widest flex items-center gap-2">
                          🇺🇸 美国市场路线 (/us) 首屏大图文案覆盖
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="md:col-span-1">
                            <label className="block text-[9px] font-extrabold text-gray-500 uppercase tracking-widest mb-1">美国站专属标题</label>
                            <input
                              type="text"
                              value={editingSettings.geo.us?.hero?.title || ''}
                              onChange={(e) => handleGeoFieldChange('us', 'title', e.target.value)}
                              className="w-full text-xs border border-gray-300 rounded px-2 py-1.5 bg-gray-50 focus:bg-white outline-none focus:border-[#007d85] font-bold text-gray-950 transition-colors"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-[9px] font-extrabold text-gray-500 uppercase tracking-widest mb-1">美国站专属副标题/描述</label>
                            <textarea
                              rows={1.5}
                              value={editingSettings.geo.us?.hero?.description || ''}
                              onChange={(e) => handleGeoFieldChange('us', 'description', e.target.value)}
                              className="w-full text-xs border border-gray-300 rounded px-2 py-1.5 bg-gray-50 focus:bg-white outline-none focus:border-[#007d85] font-medium text-gray-750 transition-colors"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Canada overrides */}
                      <div className="pt-5 space-y-3">
                        <h4 className="text-xs font-black text-[#007d85] uppercase tracking-widest flex items-center gap-2">
                          🇨🇦 加拿大市场路线 (/ca) 首屏大图文案覆盖
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="md:col-span-1">
                            <label className="block text-[9px] font-extrabold text-gray-500 uppercase tracking-widest mb-1">加拿大站专属标题</label>
                            <input
                              type="text"
                              value={editingSettings.geo.ca?.hero?.title || ''}
                              onChange={(e) => handleGeoFieldChange('ca', 'title', e.target.value)}
                              className="w-full text-xs border border-gray-300 rounded px-2 py-1.5 bg-gray-50 focus:bg-white outline-none focus:border-[#007d85] font-bold text-gray-950 transition-colors"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-[9px] font-extrabold text-gray-500 uppercase tracking-widest mb-1">加拿大站专属副标题/描述</label>
                            <textarea
                              rows={1.5}
                              value={editingSettings.geo.ca?.hero?.description || ''}
                              onChange={(e) => handleGeoFieldChange('ca', 'description', e.target.value)}
                              className="w-full text-xs border border-gray-300 rounded px-2 py-1.5 bg-gray-50 focus:bg-white outline-none focus:border-[#007d85] font-medium text-gray-750 transition-colors"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Europe overrides */}
                      <div className="pt-5 space-y-3">
                        <h4 className="text-xs font-black text-[#007d85] uppercase tracking-widest flex items-center gap-2">
                          🇪🇺 欧洲市场路线 (/eu) 首屏大图文案覆盖
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="md:col-span-1">
                            <label className="block text-[9px] font-extrabold text-gray-500 uppercase tracking-widest mb-1">欧洲站专属标题</label>
                            <input
                              type="text"
                              value={editingSettings.geo.eu?.hero?.title || ''}
                              onChange={(e) => handleGeoFieldChange('eu', 'title', e.target.value)}
                              className="w-full text-xs border border-gray-300 rounded px-2 py-1.5 bg-gray-50 focus:bg-white outline-none focus:border-[#007d85] font-bold text-gray-950 transition-colors"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-[9px] font-extrabold text-gray-500 uppercase tracking-widest mb-1">欧洲站专属副标题/描述</label>
                            <textarea
                              rows={1.5}
                              value={editingSettings.geo.eu?.hero?.description || ''}
                              onChange={(e) => handleGeoFieldChange('eu', 'description', e.target.value)}
                              className="w-full text-xs border border-gray-300 rounded px-2 py-1.5 bg-gray-50 focus:bg-white outline-none focus:border-[#007d85] font-medium text-gray-750 transition-colors"
                            />
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* CONTACT & CHANNELS */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-5 py-4 bg-gray-50 border-b border-gray-200">
                      <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider flex items-center gap-2">
                        <Inbox className="w-4.5 h-4.5 text-[#007d85]" />
                        工厂基础联络方式与表单提交通道 (Routing)
                      </h3>
                    </div>
                    <div className="p-5 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">工厂实际物理地址 (Address)</label>
                          <input
                            type="text"
                            value={editingSettings.contact.address}
                            onChange={(e) => handleSettingsFieldChange('contact', 'address', e.target.value)}
                            className="w-full text-sm border border-gray-300 rounded px-3 py-2 bg-gray-50 focus:bg-white outline-none focus:border-[#007d85] font-semibold text-gray-900 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">官方电话热线 (Phone)</label>
                          <input
                            type="text"
                            value={editingSettings.contact.phone}
                            onChange={(e) => handleSettingsFieldChange('contact', 'phone', e.target.value)}
                            className="w-full text-sm border border-gray-300 rounded px-3 py-2 bg-gray-50 focus:bg-white outline-none focus:border-[#007d85] font-medium text-gray-800 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">官方联络邮箱 (Email)</label>
                          <input
                            type="text"
                            value={editingSettings.contact.email}
                            onChange={(e) => handleSettingsFieldChange('contact', 'email', e.target.value)}
                            className="w-full text-sm border border-gray-300 rounded px-3 py-2 bg-gray-50 focus:bg-white outline-none focus:border-[#007d85] font-semibold text-gray-900 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">WhatsApp 客服号码 (例如 +8618092117618)</label>
                          <input
                            type="text"
                            value={editingSettings.contact.whatsapp}
                            onChange={(e) => handleSettingsFieldChange('contact', 'whatsapp', e.target.value)}
                            className="w-full text-sm border border-gray-300 rounded px-3 py-2 bg-gray-50 focus:bg-white outline-none focus:border-[#007d85] font-semibold text-gray-900 transition-colors"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">Formspree 表单提交通道 ID (例如 xjg...)</label>
                          <input
                            type="text"
                            value={editingSettings.contact.formspreeId}
                            onChange={(e) => handleSettingsFieldChange('contact', 'formspreeId', e.target.value)}
                            className="w-full text-sm border border-gray-300 rounded px-3 py-2 bg-gray-50 focus:bg-white outline-none focus:border-[#007d85] font-mono text-gray-800 transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SAVE TRIGGER BAR */}
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-[#007d85] hover:bg-[#1a2a3a] text-white rounded shadow-lg shadow-[#007d85]/10 text-xs font-black uppercase tracking-widest flex items-center gap-2.5 transition-all"
                    >
                      <Save className="w-4.5 h-4.5" />
                      保存全局站点配置
                    </button>
                  </div>

                </form>
              )}


              {/* ------------------------------------------------------------- */}
              {/* TAB 3: MEDIA LIBRARY */}
              {/* ------------------------------------------------------------- */}
              {activeTab === 'media' && (
                <div className="space-y-6">
                  
                  {/* drag/upload block */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
                      <div className="md:col-span-2">
                        <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider mb-1">上传新媒体资源</h3>
                        <p className="text-xs text-gray-500">文件将通过本地 Sharp 引擎自动压缩。大文件会自动生成 400 像素的高性能缩略图，保证前台极速加载。</p>
                      </div>
                      <div className="flex flex-col sm:flex-row items-center gap-3">
                        <input
                          type="text"
                          value={uploadAlt}
                          onChange={(e) => setUploadAlt(e.target.value)}
                          placeholder="可选：图片 Alt 文本描述（SEO 优化）..."
                          className="flex-1 w-full text-xs border border-gray-300 rounded px-3 py-2.5 bg-gray-50 outline-none focus:border-[#007d85] text-gray-800 font-semibold"
                        />
                        <button
                          type="button"
                          disabled={isUploading}
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full sm:w-auto px-5 py-2.5 bg-[#007d85] hover:bg-[#1a2a3a] text-white rounded text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all shrink-0"
                        >
                          {isUploading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Upload className="w-4 h-4" />
                          )}
                          选择文件
                        </button>
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleMediaUpload}
                          accept="image/*,video/mp4"
                          className="hidden"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Filter & Library view */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center gap-3">
                      <Search className="w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={mediaSearch}
                        onChange={(e) => setMediaSearch(e.target.value)}
                        placeholder="搜索已上传的文件名或 Alt 描述..."
                        className="w-full text-sm outline-none border-none py-1 bg-transparent text-gray-800 font-semibold"
                      />
                    </div>

                    <div className="p-5">
                      {filteredMedia.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-150 rounded-lg">
                          <ImageIcon className="w-16 h-16 text-gray-300 mb-3" />
                          <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">您的媒体库中暂无资源。</p>
                          <p className="text-xs text-gray-400 mt-1">请使用上方的选择器上传图片或视频文件。</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                          {filteredMedia.map((media) => {
                            const isSelectedCopy = copiedUrl === media.url;
                            const kbSize = media.size ? Math.round(media.size / 102.4) / 10 : 0;
                            const isVideo = /\.(mp4|mov|m4v|webm|ogg)$/i.test(media.fileName) || /\/video\//i.test(media.url) || media.url.endsWith('.mp4');
                            return (
                              <div key={media.id} className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                                <div className="aspect-video bg-gray-100 relative overflow-hidden flex items-center justify-center p-3">
                                  {isVideo ? (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-center px-4">
                                      <div className="text-3xl mb-2">🎬</div>
                                      <p className="text-[11px] font-black text-gray-700 uppercase tracking-wider">视频资源</p>
                                      <p className="text-[10px] text-gray-400 mt-1 break-all">{media.fileName}</p>
                                    </div>
                                  ) : (
                                    <img
                                      src={media.webpThumbUrl}
                                      alt={media.fileName}
                                      className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                                    />
                                  )}
                                  <span className="absolute top-2 left-2 px-1.5 py-0.5 bg-black/60 backdrop-blur-sm rounded text-[8px] font-black text-white uppercase tracking-wider">
                                    {kbSize} KB
                                  </span>
                                  {media.width && media.height && (
                                    <span className="absolute top-2 right-2 px-1.5 py-0.5 bg-[#007d85]/90 rounded text-[8px] font-black text-white uppercase tracking-wider">
                                      {media.width}x{media.height}
                                    </span>
                                  )}
                                </div>
                                <div className="p-3 bg-white flex-1 flex flex-col justify-between">
                                  <div className="mb-3">
                                    <p className="text-xs font-black text-gray-900 truncate" title={media.fileName}>
                                      {media.fileName}
                                    </p>
                                    <p className="text-[10px] text-gray-400 italic truncate mt-0.5">
                                      Alt 描述: {media.alt || '未提供 Alt 说明'}
                                    </p>
                                  </div>
                                  <div className="flex gap-2">
                                    <a
                                      href={media.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-gray-100 hover:bg-gray-200 text-[10px] font-bold rounded text-gray-700 transition-colors uppercase tracking-wider"
                                    >
                                      <Eye className="w-3.5 h-3.5" />
                                      查看原图
                                    </a>
                                    <button
                                      onClick={() => copyToClipboard(media.url)}
                                      className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-[10px] font-bold rounded transition-colors uppercase tracking-wider ${
                                        isSelectedCopy
                                          ? 'bg-emerald-600 text-white'
                                          : 'bg-[#007d85] hover:bg-[#1a2a3a] text-white'
                                      }`}
                                    >
                                      {isSelectedCopy ? (
                                        <>
                                          <Check className="w-3.5 h-3.5" />
                                          已复制
                                        </>
                                      ) : (
                                        <>
                                          <Copy className="w-3.5 h-3.5" />
                                          复制链接
                                        </>
                                      )}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              )}


              {/* ------------------------------------------------------------- */}
              {/* TAB 4: IMAGE SLOT BINDINGS */}
              {/* ------------------------------------------------------------- */}
              {activeTab === 'slots' && (
                <div className="space-y-6">
                  
                  <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-md">
                    <div className="flex">
                      <span className="text-amber-600 font-bold mr-3 text-lg">💡</span>
                      <div>
                        <h4 className="text-xs font-black text-amber-900 uppercase tracking-wider">图片插槽绑定机制说明</h4>
                        <p className="text-xs text-amber-700 font-medium mt-1">
                          系统注册了落地页中的 13 个核心图片与视频展示点（插槽）。默认状态下，它们显示出厂的高转化率预设资源。您可以从媒体库中绑定自定义资源来覆盖特定板块，随时点击解绑即可无缝还原至出厂默认资源。
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-wider border-b border-gray-200">
                            <th className="p-4 w-1/4">落地页目标插槽</th>
                            <th className="p-4 w-1/3">出厂默认资源 URL</th>
                            <th className="p-4">当前绑定的自定义资源</th>
                            <th className="p-4 text-right">绑定关系控制</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-sm">
                          {slots.map((slot) => {
                            const isOverridden = !!slot.mediaFileId && !!slot.boundUrl;
                            return (
                              <tr key={slot.slotKey} className="hover:bg-gray-50/50 transition-colors">
                                <td className="p-4">
                                  <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden shrink-0">
                                      <img
                                        src={slot.boundUrl || slot.fallbackUrl}
                                        alt={slot.slotKey}
                                        className="max-h-full max-w-full object-contain"
                                        onError={(e) => {
                                          // Silently fallback if video
                                          (e.target as HTMLElement).style.display = 'none';
                                        }}
                                      />
                                      {/* Simple indicator for videos */}
                                      {slot.slotKey.includes('video') && (
                                        <span className="text-[8px] font-black text-[#007d85]">视频</span>
                                      )}
                                    </div>
                                    <div>
                                      <p className="text-xs font-black text-gray-950 font-mono tracking-tight">{slot.slotKey}</p>
                                      <p className="text-[10px] text-gray-500 font-semibold mt-0.5">
                                        {SLOT_DESCRIPTIONS[slot.slotKey] || '通用插槽点位'}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td className="p-4">
                                  <p className="text-xs font-mono font-medium text-gray-400 max-w-sm truncate" title={slot.fallbackUrl}>
                                    {slot.fallbackUrl}
                                  </p>
                                </td>
                                <td className="p-4">
                                  {isOverridden ? (
                                    <div className="space-y-1">
                                      <p className="text-xs font-black text-[#007d85] flex items-center gap-1">
                                        <Check className="w-3.5 h-3.5" />
                                        已成功绑定自定义资源
                                      </p>
                                      <p className="text-[10px] font-mono text-gray-500 max-w-xs truncate" title={slot.boundFileName || ''}>
                                        {slot.boundFileName}
                                      </p>
                                    </div>
                                  ) : (
                                    <span className="text-xs font-semibold text-gray-400 italic">
                                      使用出厂预设默认资源
                                    </span>
                                  )}
                                </td>
                                <td className="p-4 text-right whitespace-nowrap space-x-1.5">
                                  {isOverridden && (
                                    <button
                                      onClick={() => handleUnbindSlot(slot.slotKey)}
                                      className="px-2.5 py-1.5 bg-red-50 hover:bg-red-600 hover:text-white text-red-600 rounded text-xs font-bold transition-all uppercase tracking-wider border border-red-200"
                                    >
                                      解绑 / 还原
                                    </button>
                                  )}
                                  <button
                                    onClick={() => openMediaSelector({ type: 'slot', slotKey: slot.slotKey })}
                                    className="px-2.5 py-1.5 bg-[#007d85] hover:bg-[#1a2a3a] text-white rounded text-xs font-bold transition-all uppercase tracking-wider flex items-center gap-1.5 inline-flex"
                                  >
                                    <Edit className="w-3.5 h-3.5" />
                                    更换图片
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              )}


              {/* ------------------------------------------------------------- */}
              {/* TAB 5: PRODUCT OVERRIDES */}
              {/* ------------------------------------------------------------- */}
              {activeTab === 'products' && (
                <div className="space-y-6">
                  
                  {/* Category grids */}
                  <div className="grid grid-cols-1 gap-6">
                    {DEFAULT_PRODUCTS.map((category, catIdx) => (
                      <div key={category.category} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        
                        <div className="px-5 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                          <div>
                            <h3 className="text-xs font-black text-[#007d85] uppercase tracking-widest">
                              大类 {catIdx + 1}: {category.category}
                            </h3>
                            <p className="text-[10px] text-gray-500 font-semibold mt-0.5">
                              核心宣传语: "{category.tagline}" (绑定插槽 products_cat_{catIdx} 控制该大类前台的主视觉图)
                            </p>
                          </div>
                        </div>

                        <div className="p-5">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {category.items.map((item, itemIdx) => {
                              const display = getProductDisplayData(category, item, catIdx, itemIdx);
                              const isEditingThis = editingProduct && editingProduct.categoryIndex === catIdx && editingProduct.itemIndex === itemIdx;
                              
                              return (
                                <div
                                  key={`${catIdx}-${itemIdx}`}
                                  className={`border rounded-lg p-4 flex flex-col justify-between transition-all ${
                                    display.isEnabled ? 'bg-white border-gray-200 hover:shadow-md' : 'bg-gray-100 border-gray-300 opacity-60'
                                  } ${display.isOverridden ? 'ring-1 ring-[#007d85]/40 border-[#007d85]/30' : ''}`}
                                >
                                  
                                  <div>
                                    <div className="flex justify-between items-start gap-3">
                                      <div className="aspect-video w-20 bg-gray-50 rounded border border-gray-200 overflow-hidden flex items-center justify-center p-1.5 shrink-0">
                                        <img
                                          src={display.img}
                                          alt={display.title}
                                          className="max-h-full max-w-full object-contain"
                                        />
                                      </div>
                                      <div className="overflow-hidden flex-1">
                                        <h4 className="text-xs font-black text-gray-900 truncate flex items-center gap-1.5">
                                          {display.title}
                                          {display.isOverridden && (
                                            <span className="bg-[#007d85] text-white text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider scale-90">
                                              已自定义
                                            </span>
                                          )}
                                        </h4>
                                        <p className="text-[10px] text-gray-400 font-semibold mt-0.5 truncate">{display.desc}</p>
                                      </div>
                                    </div>
                                    <div className="mt-3 text-xs text-gray-650 bg-gray-50 p-2.5 rounded font-medium h-24 overflow-y-auto leading-relaxed border border-gray-100">
                                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">弹窗详细描述 (弹出内容)</p>
                                      {display.longDesc}
                                    </div>
                                  </div>

                                  <div className="mt-4 flex justify-between items-center border-t border-gray-100 pt-3">
                                    <span className={`text-[10px] font-black uppercase tracking-wider ${
                                      display.isEnabled ? 'text-emerald-600' : 'text-gray-400'
                                    }`}>
                                      {display.isEnabled ? '前台展示中' : '已下架 / 隐藏'}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => startEditingProduct(catIdx, itemIdx, item)}
                                      className="px-2.5 py-1.5 bg-gray-100 hover:bg-[#007d85] hover:text-white text-gray-700 rounded text-xs font-bold transition-all uppercase tracking-wider border border-gray-200 flex items-center gap-1.5"
                                    >
                                      <Edit className="w-3.5 h-3.5" />
                                      编辑单品
                                    </button>
                                  </div>

                                </div>
                              );
                            })}
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>

                  {/* Editing Drawer Form Overlay */}
                  {editingProduct && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex justify-end">
                      <div className="bg-white w-full max-w-lg h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-slide-left border-l border-gray-100">
                        
                        <div className="p-5 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                          <div>
                            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">
                              自定义覆盖单品信息 [{editingProduct.categoryIndex + 1} - {editingProduct.itemIndex + 1}]
                            </h3>
                            <p className="text-[10px] text-[#007d85] font-bold uppercase mt-1">
                              大类 {DEFAULT_PRODUCTS[editingProduct.categoryIndex].category} 矩阵子项
                            </p>
                                  </div>
                        </div>

                        <form onSubmit={handleProductFormSave} className="flex-1 overflow-y-auto p-5 space-y-4">
                          
                          <div>
                            <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">自定义单品名称</label>
                            <input
                              type="text"
                              value={editingProduct.title}
                              onChange={(e) => setEditingProduct(prev => prev ? { ...prev, title: e.target.value } : null)}
                              className="w-full text-sm border border-gray-300 rounded px-3 py-2 bg-gray-50 focus:bg-white outline-none focus:border-[#007d85] font-bold text-gray-950 transition-colors"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">卡片简短描述（前台卡片展示）</label>
                            <input
                              type="text"
                              value={editingProduct.desc}
                              onChange={(e) => setEditingProduct(prev => prev ? { ...prev, desc: e.target.value } : null)}
                              className="w-full text-sm border border-gray-300 rounded px-3 py-2 bg-gray-50 focus:bg-white outline-none focus:border-[#007d85] font-medium text-gray-750 transition-colors"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">弹窗详细描述文案 (弹窗内容)</label>
                            <textarea
                              rows={5}
                              value={editingProduct.longDesc}
                              onChange={(e) => setEditingProduct(prev => prev ? { ...prev, longDesc: e.target.value } : null)}
                              className="w-full text-sm border border-gray-300 rounded px-3 py-2 bg-gray-50 focus:bg-white outline-none focus:border-[#007d85] font-medium text-gray-750 transition-colors"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">自定义单品展示图片 URL</label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={editingProduct.imgUrl}
                                onChange={(e) => setEditingProduct(prev => prev ? { ...prev, imgUrl: e.target.value } : null)}
                                className="flex-1 text-xs border border-gray-300 rounded px-3 py-2 bg-gray-50 focus:bg-white outline-none focus:border-[#007d85] font-mono text-gray-800 transition-colors"
                                required
                              />
                              <button
                                type="button"
                                onClick={() => openMediaSelector({ type: 'product' })}
                                className="px-3 bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 text-xs font-bold rounded transition-colors uppercase tracking-wider flex items-center gap-1 shrink-0"
                              >
                                <ImageIcon className="w-3.5 h-3.5" />
                                媒体库
                              </button>
                            </div>
                          </div>

                          <div className="pt-3">
                            <label className="flex items-center gap-3 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={editingProduct.isEnabled}
                                onChange={(e) => setEditingProduct(prev => prev ? { ...prev, isEnabled: e.target.checked } : null)}
                                className="w-4 h-4 rounded border-gray-300 text-[#007d85] focus:ring-[#007d85]"
                              />
                              <div>
                                <span className="text-xs font-black text-gray-900 uppercase tracking-wider block">启用此单品在前台展示</span>
                                <span className="text-[10px] text-gray-400 font-semibold block mt-0.5">取消勾选后，该不干胶单品卡片将不会在前台对客户展示。</span>
                              </div>
                            </label>
                          </div>

                        </form>

                        <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3 shrink-0">
                          <button
                            type="button"
                            onClick={() => setEditingProduct(null)}
                            className="px-4 py-2 text-xs font-bold uppercase text-gray-600 hover:text-gray-900 transition-colors"
                          >
                            取消
                          </button>
                          <button
                            type="button"
                            onClick={handleProductFormSave}
                            className="px-5 py-2 bg-[#007d85] hover:bg-[#1a2a3a] text-white rounded text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all"
                          >
                            <Save className="w-4.5 h-4.5" />
                            保存自定义覆盖
                          </button>
                        </div>

                      </div>
                    </div>
                  )}
                </div>
              )}

            </div>
          )}
        </div>

      </main>
    </div>
  );
}
