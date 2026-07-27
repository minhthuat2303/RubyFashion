import {
  NotificationChannelType,
  NotificationEventType,
  ChannelSettings,
  NotificationLog
} from '../types/notification';

// Helper to play subtle notification chime sound using Web Audio API
export const playNotificationSound = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
    
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.35);
  } catch (e) {
    console.log('Audio playback prevented or unsupported:', e);
  }
};

// Variable interpolation helper
export const interpolateTemplate = (
  templateStr: string,
  vars: Record<string, string>
): string => {
  let result = templateStr;
  Object.keys(vars).forEach((key) => {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
    result = result.replace(regex, vars[key] || '');
  });
  return result;
};

// Clean Architecture Notification Service Engine with Queue & 3-Retry logic
class NotificationServiceEngine {
  // Simulate Background Job dispatch to configured providers with retry logic
  public async dispatchNotification(
    event: NotificationEventType,
    eventName: string,
    channels: Record<NotificationChannelType, ChannelSettings>,
    content: string,
    recipientInfo: string,
    onLogCreated?: (log: NotificationLog) => void
  ): Promise<NotificationLog[]> {
    const results: NotificationLog[] = [];
    const activeChannels = (Object.keys(channels) as NotificationChannelType[]).filter(
      (ch) => channels[ch]?.enabled
    );

    for (const channel of activeChannels) {
      const logId = 'log-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6);
      let success = false;
      let attempt = 0;
      let errorMsg = '';

      // Try up to 3 retries as requested
      while (attempt < 3 && !success) {
        attempt++;
        try {
          // Simulate channel API execution
          success = await this.sendChannelApi(channel, channels[channel]);
          if (!success) {
            errorMsg = `Lỗi kết nối Cổng API ${channel.toUpperCase()} (Lần thử ${attempt}/3)`;
          }
        } catch (err: any) {
          errorMsg = err.message || `Lỗi phản hồi từ dịch vụ ${channel}`;
          success = false;
        }
      }

      const logItem: NotificationLog = {
        id: logId,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' ' + new Date().toLocaleDateString('vi-VN'),
        event,
        eventName,
        channel,
        recipient: recipientInfo || channels[channel]?.recipientEmail || 'Admin',
        content,
        status: success ? 'sent' : 'failed',
        errorDetails: success ? undefined : errorMsg,
        retryCount: attempt
      };

      results.push(logItem);
      if (onLogCreated) onLogCreated(logItem);
    }

    return results;
  }

  // Simulated provider connector with clean retry response
  private async sendChannelApi(
    channel: NotificationChannelType,
    config: ChannelSettings
  ): Promise<boolean> {
    // 95% simulated success rate for demonstration
    await new Promise((resolve) => setTimeout(resolve, 300));
    if (channel === 'email' && !config.emailUser && !config.smtpHost) return false;
    if (channel === 'telegram' && !config.telegramBotToken) return false;
    if (channel === 'zalo' && !config.zaloWebhookUrl && !config.zaloAccessToken) return false;
    if (channel === 'discord' && !config.discordWebhookUrl) return false;
    return true;
  }
}

export const notificationEngine = new NotificationServiceEngine();
