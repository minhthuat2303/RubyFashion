import React, { useState } from 'react';
import {
  Bell,
  Send,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Search,
  MessageCircle,
  Mail,
  Smartphone,
  Sparkles
} from 'lucide-react';
import {
  NotificationChannelType,
  NotificationEventType,
  ChannelSettings,
  EventSetting,
  NotificationTemplate,
  NotificationLog
} from '../../types/notification';
import { notificationEngine, interpolateTemplate } from '../../services/notificationService';
import { useApp } from '../../context/AppContext';

export const NotificationCenter: React.FC = () => {
  const { showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'channels' | 'events' | 'templates' | 'logs'>('channels');

  // Show/Hide password toggle maps
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});

  const toggleSecret = (key: string) => {
    setShowSecrets((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // 1. CHANNELS STATE
  const [channels, setChannels] = useState<Record<NotificationChannelType, ChannelSettings>>({
    email: {
      enabled: true,
      smtpHost: 'smtp.gmail.com',
      smtpPort: 587,
      emailUser: 'maisondesOie.couture@gmail.com',
      emailPassword: 'app_password_secret_123',
      senderName: 'Maison De Soie Couture',
      recipientEmail: 'admin.rubyfashion@gmail.com'
    },
    zalo: {
      enabled: true,
      zaloWebhookUrl: 'https://openapi.zalo.me/v2.0/oa/message',
      zaloAccessToken: 'zalo_access_token_secret_999'
    },
    messenger: {
      enabled: true,
      facebookPageId: '1009823489234',
      pageAccessToken: 'facebook_page_token_secret_888',
      webhookVerifyToken: 'verify_token_123'
    },
    telegram: {
      enabled: true,
      telegramBotToken: '689234892:AAFx_telegram_bot_token',
      telegramChatId: '-100189238912'
    },
    whatsapp: {
      enabled: false,
      whatsappApiKey: 'wa_api_key_secret'
    },
    discord: {
      enabled: true,
      discordWebhookUrl: 'https://discord.com/api/webhooks/12345/abcde_token'
    },
    sms: {
      enabled: false,
      smsApiKey: 'sms_api_key_secret'
    }
  });

  // 2. EVENTS STATE
  const [events, setEvents] = useState<EventSetting[]>([
    { id: 'contact_form', name: 'Gửi form liên hệ', description: 'Khi khách hàng điền form liên hệ', enabled: true },
    { id: 'booking_fitting', name: 'Đặt lịch thử đồ VIP', description: 'Khi khách chọn lịch thử đồ tại showroom', enabled: true },
    { id: 'booking_consultation', name: 'Đặt lịch tư vấn may đo', description: 'Khi khách đăng ký thiết kế riêng', enabled: true },
    { id: 'rental_request', name: 'Yêu cầu thuê trang phục', description: 'Khi khách nhấn nút Đặt Thuê Ngay', enabled: true },
    { id: 'purchase_request', name: 'Yêu cầu mua sản phẩm', description: 'Khi khách gửi thông tin mua đồ', enabled: true },
    { id: 'newsletter_subscribe', name: 'Đăng ký nhận tin mới', description: 'Khi khách đăng ký email nhận ưu đãi', enabled: true },
    { id: 'review_submit', name: 'Gửi đánh giá & phản hồi', description: 'Khi khách gửi cảm nhận trải nghiệm', enabled: true },
    { id: 'question_ask', name: 'Đặt câu hỏi tư vấn', description: 'Khi khách gửi thắc mắc trên sản phẩm', enabled: true },
    { id: 'callback_request', name: 'Yêu cầu gọi lại nhanh', description: 'Khi khách yêu cầu hotline gọi tư vấn', enabled: true }
  ]);

  // 3. TEMPLATES STATE
  const [templates, setTemplates] = useState<NotificationTemplate[]>([
    {
      eventId: 'booking_fitting',
      title: '🔔 CÓ LỊCH HẸN THỬ ĐỒ MỚI',
      content:
        'Khách {{customer_name}} (SĐT: {{phone}}) vừa đặt lịch thử {{service}} cho mẫu {{product}} vào ngày {{date}} lúc {{time}}.'
    },
    {
      eventId: 'contact_form',
      title: '📩 CÓ LIÊN HỆ MỚI TỪ KHÁCH HÀNG',
      content:
        'Khách {{customer_name}} (SĐT: {{phone}}, Email: {{email}}) vừa gửi lời nhắn: "{{message}}" lúc {{time}}.'
    },
    {
      eventId: 'rental_request',
      title: '🛍️ KHÁCH YÊU CẦU THUÊ TRANG PHỤC',
      content:
        'Khách {{customer_name}} (SĐT: {{phone}}) muốn đặt thuê mẫu {{product}} cho sự kiện ngày {{date}}.'
    }
  ]);

  const [selectedTemplateEvent, setSelectedTemplateEvent] =
    useState<NotificationEventType>('booking_fitting');

  // 4. LOGS STATE
  const [logs, setLogs] = useState<NotificationLog[]>([
    {
      id: 'log-1',
      timestamp: '10:15 - 24/07/2026',
      event: 'booking_fitting',
      eventName: 'Đặt lịch thử đồ VIP',
      channel: 'telegram',
      recipient: 'Chat ID: -100189238912',
      content: 'Khách Nguyễn Thị Anh (0988888888) đặt lịch thử Áo Dài Couture ngày 25/07.',
      status: 'sent',
      retryCount: 1
    },
    {
      id: 'log-2',
      timestamp: '10:14 - 24/07/2026',
      event: 'contact_form',
      eventName: 'Gửi form liên hệ',
      channel: 'email',
      recipient: 'admin.rubyfashion@gmail.com',
      content: 'Khách Lê Hoàng Yến gửi yêu cầu tư vấn váy cưới may đo.',
      status: 'sent',
      retryCount: 1
    },
    {
      id: 'log-3',
      timestamp: '09:45 - 24/07/2026',
      event: 'rental_request',
      eventName: 'Yêu cầu thuê trang phục',
      channel: 'zalo',
      recipient: 'Zalo OA Webhook',
      content: 'Khách Trần Minh Tuấn (0912345678) cần thuê Vest Chú Rể.',
      status: 'failed',
      errorDetails: 'Lỗi 401: Zalo Access Token đã hết hạn',
      retryCount: 3
    }
  ]);

  const [logSearch, setLogSearch] = useState('');

  // Channel Tester Action
  const handleTestChannel = async (channel: NotificationChannelType) => {
    showToast(`⏳ Đang kiểm tra kết nối cổng ${channel.toUpperCase()}...`, 'info');
    const resultLogs = await notificationEngine.dispatchNotification(
      'booking_fitting',
      'Kiểm tra kết nối Kênh Thông Báo',
      { [channel]: channels[channel] } as any,
      `[Test Connection] Thông báo kiểm tra kết nối từ Admin RubyFashion tới kênh ${channel.toUpperCase()}.`,
      'Admin Test'
    );

    if (resultLogs.length > 0) {
      const res = resultLogs[0];
      setLogs((prev) => [res, ...prev]);
      if (res.status === 'sent') {
        showToast(`✅ Kiểm tra kết nối kênh ${channel.toUpperCase()} THÀNH CÔNG!`, 'success');
      } else {
        showToast(`❌ Kết nối ${channel.toUpperCase()} thất bại: ${res.errorDetails}`, 'error');
      }
    }
  };

  // Channel Toggle
  const toggleChannelEnabled = (ch: NotificationChannelType) => {
    setChannels((prev) => ({
      ...prev,
      [ch]: { ...prev[ch], enabled: !prev[ch].enabled }
    }));
    showToast('✅ Đã cập nhật trạng thái bật/tắt kênh!', 'success');
  };

  // Event Toggle
  const toggleEventEnabled = (evId: NotificationEventType) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === evId ? { ...e, enabled: !e.enabled } : e))
    );
    showToast('✅ Đã lưu cấu hình nhận sự kiện thông báo!', 'success');
  };

  // Current selected template
  const currentTemplate =
    templates.find((t) => t.eventId === selectedTemplateEvent) || {
      eventId: selectedTemplateEvent,
      title: '🔔 CÓ THÔNG BÁO MỚI',
      content: 'Khách {{customer_name}} (SĐT: {{phone}}) vừa thực hiện yêu cầu lúc {{time}}.'
    };

  const handleSaveTemplate = (title: string, content: string) => {
    setTemplates((prev) => {
      const exists = prev.some((t) => t.eventId === selectedTemplateEvent);
      if (exists) {
        return prev.map((t) =>
          t.eventId === selectedTemplateEvent ? { ...t, title, content } : t
        );
      } else {
        return [...prev, { eventId: selectedTemplateEvent, title, content }];
      }
    });
    showToast('✅ Đã lưu mẫu thông báo thành công!', 'success');
  };

  const filteredLogs = logs.filter(
    (l) =>
      l.eventName.toLowerCase().includes(logSearch.toLowerCase()) ||
      l.content.toLowerCase().includes(logSearch.toLowerCase()) ||
      l.channel.toLowerCase().includes(logSearch.toLowerCase())
  );

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-amber-200/80 shadow-sm space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl gold-gradient-bg text-white flex items-center justify-center font-bold shadow">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif-title font-bold text-stone-900 text-lg">
              Trung Tâm Thông Báo (Notification Center)
            </h3>
            <p className="text-xs text-stone-500">
              Tự động gửi thông báo đến Email, Zalo, Messenger, Telegram, Discord khi có khách hàng
            </p>
          </div>
        </div>

        {/* Action Tabs Bar */}
        <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-2xl text-xs font-bold">
          <button
            onClick={() => setActiveTab('channels')}
            className={`px-3.5 py-2 rounded-xl transition-all ${
              activeTab === 'channels'
                ? 'bg-amber-500 text-stone-950 shadow'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            Kênh Thông Báo
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`px-3.5 py-2 rounded-xl transition-all ${
              activeTab === 'events'
                ? 'bg-amber-500 text-stone-950 shadow'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            Sự Kiện
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`px-3.5 py-2 rounded-xl transition-all ${
              activeTab === 'templates'
                ? 'bg-amber-500 text-stone-950 shadow'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            Mẫu Thông Báo
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-3.5 py-2 rounded-xl transition-all ${
              activeTab === 'logs'
                ? 'bg-amber-500 text-stone-950 shadow'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            Lịch Sử Gửi
          </button>
        </div>
      </div>

      {/* ================= TAB 1: KÊNH THÔNG BÁO ================= */}
      {activeTab === 'channels' && (
        <div className="space-y-6">
          <p className="text-xs text-stone-500">
            💡 Bạn có thể bật nhiều kênh cùng lúc. Khi có khách hàng gửi form, hệ thống sẽ tự động gửi đồng thời đến các kênh được bật.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. EMAIL SMTP */}
            <div className="bg-stone-50 p-5 rounded-3xl border border-amber-200/60 space-y-4 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-red-600" />
                  <h4 className="font-serif-title font-bold text-stone-900 text-sm">
                    Thông Báo qua Email (SMTP)
                  </h4>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={channels.email.enabled}
                    onChange={() => toggleChannelEnabled('email')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>

              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">SMTP Host</label>
                    <input
                      type="text"
                      value={channels.email.smtpHost || ''}
                      onChange={(e) =>
                        setChannels({
                          ...channels,
                          email: { ...channels.email, smtpHost: e.target.value }
                        })
                      }
                      className="w-full p-2.5 bg-white border rounded-xl"
                    />
                    <p className="text-[10px] text-stone-400 mt-0.5">Ví dụ: smtp.gmail.com</p>
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Port</label>
                    <input
                      type="number"
                      value={channels.email.smtpPort || 587}
                      onChange={(e) =>
                        setChannels({
                          ...channels,
                          email: { ...channels.email, smtpPort: Number(e.target.value) }
                        })
                      }
                      className="w-full p-2.5 bg-white border rounded-xl"
                    />
                    <p className="text-[10px] text-stone-400 mt-0.5">Mặc định: 587 hoặc 465</p>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Email Người Gửi</label>
                  <input
                    type="text"
                    value={channels.email.emailUser || ''}
                    onChange={(e) =>
                      setChannels({
                        ...channels,
                        email: { ...channels.email, emailUser: e.target.value }
                      })
                    }
                    className="w-full p-2.5 bg-white border rounded-xl"
                  />
                  <p className="text-[10px] text-stone-400 mt-0.5">Gmail hoặc Email doanh nghiệp</p>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">
                    Mật Khẩu Mật / App Password
                  </label>
                  <div className="relative">
                    <input
                      type={showSecrets['emailPass'] ? 'text' : 'password'}
                      value={channels.email.emailPassword || ''}
                      onChange={(e) =>
                        setChannels({
                          ...channels,
                          email: { ...channels.email, emailPassword: e.target.value }
                        })
                      }
                      className="w-full p-2.5 pr-9 bg-white border rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => toggleSecret('emailPass')}
                      className="absolute right-2.5 top-2.5 text-stone-400 hover:text-stone-700"
                    >
                      {showSecrets['emailPass'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-[10px] text-stone-400 mt-0.5">SMTP Gmail nên dùng App Password</p>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleTestChannel('email')}
                    className="px-4 py-2 bg-red-600 text-white rounded-xl font-bold flex items-center gap-1.5 shadow hover:bg-red-700 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" /> Gửi Email Thử
                  </button>
                </div>
              </div>
            </div>

            {/* 2. ZALO OA */}
            <div className="bg-stone-50 p-5 rounded-3xl border border-amber-200/60 space-y-4 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-blue-600" />
                  <h4 className="font-serif-title font-bold text-stone-900 text-sm">
                    Thông Báo qua Zalo Official Account
                  </h4>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={channels.zalo.enabled}
                    onChange={() => toggleChannelEnabled('zalo')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Webhook URL Zalo OA</label>
                  <input
                    type="text"
                    value={channels.zalo.zaloWebhookUrl || ''}
                    onChange={(e) =>
                      setChannels({
                        ...channels,
                        zalo: { ...channels.zalo, zaloWebhookUrl: e.target.value }
                      })
                    }
                    className="w-full p-2.5 bg-white border rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Access Token Zalo</label>
                  <div className="relative">
                    <input
                      type={showSecrets['zaloToken'] ? 'text' : 'password'}
                      value={channels.zalo.zaloAccessToken || ''}
                      onChange={(e) =>
                        setChannels({
                          ...channels,
                          zalo: { ...channels.zalo, zaloAccessToken: e.target.value }
                        })
                      }
                      className="w-full p-2.5 pr-9 bg-white border rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => toggleSecret('zaloToken')}
                      className="absolute right-2.5 top-2.5 text-stone-400 hover:text-stone-700"
                    >
                      {showSecrets['zaloToken'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-[10px] text-stone-400 mt-0.5">Token này lấy trong phần Cài đặt Zalo OA</p>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleTestChannel('zalo')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold flex items-center gap-1.5 shadow hover:bg-blue-700 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" /> Kiểm Tra Kết Nối Zalo
                  </button>
                </div>
              </div>
            </div>

            {/* 3. TELEGRAM BOT */}
            <div className="bg-stone-50 p-5 rounded-3xl border border-amber-200/60 space-y-4 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Send className="w-5 h-5 text-sky-500" />
                  <h4 className="font-serif-title font-bold text-stone-900 text-sm">
                    Thông Báo qua Telegram Bot (Khuyên dùng - Siêu Nhanh)
                  </h4>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={channels.telegram.enabled}
                    onChange={() => toggleChannelEnabled('telegram')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Telegram Bot Token</label>
                  <div className="relative">
                    <input
                      type={showSecrets['teleToken'] ? 'text' : 'password'}
                      value={channels.telegram.telegramBotToken || ''}
                      onChange={(e) =>
                        setChannels({
                          ...channels,
                          telegram: { ...channels.telegram, telegramBotToken: e.target.value }
                        })
                      }
                      className="w-full p-2.5 pr-9 bg-white border rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => toggleSecret('teleToken')}
                      className="absolute right-2.5 top-2.5 text-stone-400 hover:text-stone-700"
                    >
                      {showSecrets['teleToken'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-[10px] text-stone-400 mt-0.5">Tạo bot miễn phí qua @BotFather trên Telegram</p>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Telegram Chat ID</label>
                  <input
                    type="text"
                    value={channels.telegram.telegramChatId || ''}
                    onChange={(e) =>
                      setChannels({
                        ...channels,
                        telegram: { ...channels.telegram, telegramChatId: e.target.value }
                      })
                    }
                    className="w-full p-2.5 bg-white border rounded-xl font-mono"
                  />
                  <p className="text-[10px] text-stone-400 mt-0.5">ID nhóm chat hoặc ID cá nhân của Admin</p>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleTestChannel('telegram')}
                    className="px-4 py-2 bg-sky-500 text-white rounded-xl font-bold flex items-center gap-1.5 shadow hover:bg-sky-600 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" /> Gửi Thử Telegram
                  </button>
                </div>
              </div>
            </div>

            {/* 4. DISCORD WEBHOOK */}
            <div className="bg-stone-50 p-5 rounded-3xl border border-amber-200/60 space-y-4 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-indigo-600" />
                  <h4 className="font-serif-title font-bold text-stone-900 text-sm">
                    Thông Báo qua Discord Webhook
                  </h4>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={channels.discord.enabled}
                    onChange={() => toggleChannelEnabled('discord')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Discord Webhook URL</label>
                  <input
                    type="text"
                    value={channels.discord.discordWebhookUrl || ''}
                    onChange={(e) =>
                      setChannels({
                        ...channels,
                        discord: { ...channels.discord, discordWebhookUrl: e.target.value }
                      })
                    }
                    className="w-full p-2.5 bg-white border rounded-xl"
                  />
                  <p className="text-[10px] text-stone-400 mt-0.5">Tạo Webhook trong Cài đặt channel Discord</p>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleTestChannel('discord')}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold flex items-center gap-1.5 shadow hover:bg-indigo-700 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" /> Gửi Thử Discord
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: SỰ KIỆN CẦN THÔNG BÁO ================= */}
      {activeTab === 'events' && (
        <div className="space-y-6">
          <div>
            <h4 className="font-serif-title font-bold text-stone-900 text-base">
              Chọn Các Sự Kiện Bạn Muốn Nhận Thông Báo
            </h4>
            <p className="text-xs text-stone-500">
              Đánh dấu tích vào những hành động của khách hàng mà bạn muốn hệ thống tự động thông báo
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {events.map((ev) => (
              <label
                key={ev.id}
                className={`p-4 rounded-2xl border-2 flex items-start gap-3 cursor-pointer transition-all ${
                  ev.enabled
                    ? 'border-amber-500 bg-amber-50/50 shadow-sm'
                    : 'border-stone-200 bg-white hover:border-amber-200'
                }`}
              >
                <input
                  type="checkbox"
                  checked={ev.enabled}
                  onChange={() => toggleEventEnabled(ev.id)}
                  className="mt-1 w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
                />
                <div>
                  <p className="font-bold text-stone-900 text-xs">{ev.name}</p>
                  <p className="text-[11px] text-stone-500 mt-0.5 leading-tight">{ev.description}</p>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 3: MẪU THÔNG BÁO & PREVIEW ================= */}
      {activeTab === 'templates' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Template Form (Left Col 7) */}
            <div className="lg:col-span-7 space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  Chọn Sự Kiện Để Chỉnh Sửa Mẫu
                </label>
                <select
                  value={selectedTemplateEvent}
                  onChange={(e) => setSelectedTemplateEvent(e.target.value as any)}
                  className="w-full p-3 bg-stone-50 border rounded-2xl font-bold text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                >
                  {events.map((ev) => (
                    <option key={ev.id} value={ev.id}>
                      {ev.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  Tiêu Đề Thông Báo
                </label>
                <input
                  type="text"
                  value={currentTemplate.title}
                  onChange={(e) => handleSaveTemplate(e.target.value, currentTemplate.content)}
                  className="w-full p-3 bg-stone-50 border rounded-2xl font-bold text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  Nội Dung Mẫu Thông Báo (Hỗ trợ biến số)
                </label>
                <textarea
                  rows={5}
                  value={currentTemplate.content}
                  onChange={(e) => handleSaveTemplate(currentTemplate.title, e.target.value)}
                  className="w-full p-3 bg-stone-50 border rounded-2xl font-mono text-xs leading-relaxed focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              {/* Supported Dynamic Variables Legend */}
              <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-200 text-xs space-y-2">
                <p className="font-bold text-amber-950">💡 Danh Sách Các Biến Động Hỗ Trợ:</p>
                <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                  {['customer_name', 'phone', 'email', 'service', 'product', 'date', 'time', 'message'].map((v) => (
                    <span
                      key={v}
                      onClick={() =>
                        handleSaveTemplate(
                          currentTemplate.title,
                          currentTemplate.content + ` {{${v}}}`
                        )
                      }
                      className="px-2 py-0.5 bg-white border border-amber-300 rounded text-amber-900 cursor-pointer hover:bg-amber-100"
                    >
                      {`{{${v}}}`}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Template Preview Card (Right Col 5) */}
            <div className="lg:col-span-5 bg-stone-900 text-white p-5 rounded-3xl space-y-3 sticky top-6 shadow-xl border border-stone-800">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider border-b border-stone-800 pb-2">
                <Sparkles className="w-4 h-4 animate-pulse" /> Xem Trực Tiếp Mẫu Thông Báo
              </div>

              <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 space-y-2 text-xs">
                <p className="font-bold text-amber-300 text-sm">{currentTemplate.title}</p>
                <p className="text-stone-300 whitespace-pre-wrap leading-relaxed">
                  {interpolateTemplate(currentTemplate.content, {
                    customer_name: 'Nguyễn Văn A',
                    phone: '0988888888',
                    email: 'nguyenvana@gmail.com',
                    service: 'Thử đồ VIP',
                    product: 'Áo Dài Couture 2026',
                    date: '25/07/2026',
                    time: '10:15',
                    message: 'Muốn thuê áo dài cưới cho ngày đám hỏi'
                  })}
                </p>
              </div>

              <p className="text-[10px] text-stone-400 text-center font-mono">
                Bản xem trước dữ liệu mẫu thực tế sẽ gửi tới máy Admin
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 4: LỊCH SỬ GỬI & TÌM KIẾM ================= */}
      {activeTab === 'logs' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Tìm trong lịch sử gửi..."
                value={logSearch}
                onChange={(e) => setLogSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-stone-100 border border-stone-300 rounded-xl text-xs focus:bg-white focus:outline-none"
              />
            </div>

            <button
              type="button"
              onClick={() => {
                setLogs([]);
                showToast('✅ Đã xóa toàn bộ lịch sử gửi thông báo!', 'info');
              }}
              className="text-rose-600 hover:text-rose-800 text-xs font-bold px-3 py-1.5 rounded-xl border border-rose-200 hover:bg-rose-50"
            >
              Xóa Lịch Sử
            </button>
          </div>

          <div className="overflow-x-auto border border-amber-200/60 rounded-2xl text-xs">
            <table className="w-full text-left">
              <thead className="bg-stone-100 text-stone-700 font-bold">
                <tr>
                  <th className="p-3">Thời Gian</th>
                  <th className="p-3">Sự Kiện</th>
                  <th className="p-3">Kênh</th>
                  <th className="p-3">Người Nhận</th>
                  <th className="p-3">Trạng Thái</th>
                  <th className="p-3">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-amber-50/40 transition-colors">
                    <td className="p-3 font-mono text-stone-500 whitespace-nowrap">{log.timestamp}</td>
                    <td className="p-3 font-bold text-stone-900">{log.eventName}</td>
                    <td className="p-3 uppercase font-mono font-bold text-amber-800">{log.channel}</td>
                    <td className="p-3 font-medium text-stone-700">{log.recipient}</td>
                    <td className="p-3">
                      {log.status === 'sent' ? (
                        <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Đã gửi
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-rose-100 text-rose-800 px-2.5 py-1 rounded-full font-bold" title={log.errorDetails}>
                          <AlertCircle className="w-3.5 h-3.5" /> Lỗi (Thử {log.retryCount}/3)
                        </span>
                      )}
                    </td>
                    <td className="p-3">
                      {log.status === 'failed' && (
                        <button
                          type="button"
                          onClick={() => handleTestChannel(log.channel)}
                          className="px-2 py-1 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded font-bold flex items-center gap-1"
                        >
                          <RefreshCw className="w-3 h-3" /> Gửi lại
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
