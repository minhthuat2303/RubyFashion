export type NotificationChannelType =
  | 'email'
  | 'zalo'
  | 'messenger'
  | 'telegram'
  | 'whatsapp'
  | 'discord'
  | 'sms';

export type NotificationEventType =
  | 'contact_form'
  | 'booking_fitting'
  | 'booking_consultation'
  | 'rental_request'
  | 'purchase_request'
  | 'newsletter_subscribe'
  | 'review_submit'
  | 'question_ask'
  | 'callback_request';

export interface ChannelSettings {
  enabled: boolean;
  // Email SMTP
  smtpHost?: string;
  smtpPort?: number;
  emailUser?: string;
  emailPassword?: string;
  senderName?: string;
  recipientEmail?: string;
  
  // Zalo
  zaloWebhookUrl?: string;
  zaloAccessToken?: string;
  
  // Messenger
  facebookPageId?: string;
  pageAccessToken?: string;
  webhookVerifyToken?: string;
  
  // Telegram
  telegramBotToken?: string;
  telegramChatId?: string;
  
  // WhatsApp & Discord
  discordWebhookUrl?: string;
  whatsappApiKey?: string;
  
  // SMS
  smsApiKey?: string;
}

export interface EventSetting {
  id: NotificationEventType;
  name: string;
  description: string;
  enabled: boolean;
}

export interface NotificationTemplate {
  eventId: NotificationEventType;
  title: string;
  content: string;
}

export interface NotificationLog {
  id: string;
  timestamp: string;
  event: NotificationEventType;
  eventName: string;
  channel: NotificationChannelType;
  recipient: string;
  content: string;
  status: 'sent' | 'failed' | 'sending';
  errorDetails?: string;
  retryCount: number;
}

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  customerName: string;
  phone: string;
  timestamp: string;
  read: boolean;
  type: NotificationEventType;
}
