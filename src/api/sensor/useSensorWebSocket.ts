import { useEffect, useRef, useState, useCallback } from 'react';

type SensorStatus =
  | 'ready'
  | 'initializing'
  | 'measuring_temperature'
  | 'temperature_complete'
  | 'measuring_heartrate'
  | 'calculating'
  | 'saving'
  | 'complete'
  | 'error';

export interface SensorResult {
  user_id: number;
  username: string;
  heart_rate: number;
  temperature: number;
}

export interface SensorMessage {
  status: SensorStatus;
  message: string;
  user_id?: number;
  username?: string;
  progress?: number;
  current_value?: number;
  elapsed?: number;
  temperature?: number;
  result?: SensorResult;
}

interface UseSensorWebSocketOptions {
  onMessage?: (message: SensorMessage) => void;
  onComplete?: (result: SensorResult) => void;
  onError?: (error: string) => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
}

export const useSensorWebSocket = (
  userId: number | null,
  options?: UseSensorWebSocketOptions
) => {
  const [isConnected, setIsConnected] = useState(false);
  const [latestMessage, setLatestMessage] = useState<SensorMessage | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const optionsRef = useRef(options);

  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  const connect = useCallback(() => {
    if (!userId || wsRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/api/fated-match/ws/measure/${userId}`;

    try {
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        queueMicrotask(() => {
          setIsConnected(true);
          setError(null);
        });
        optionsRef.current?.onConnect?.();
      };

      ws.onmessage = event => {
        try {
          const message: SensorMessage = JSON.parse(event.data);
          queueMicrotask(() => {
            setLatestMessage(message);
          });
          optionsRef.current?.onMessage?.(message);

          if (message.status === 'complete' && message.result) {
            optionsRef.current?.onComplete?.(message.result);
          } else if (message.status === 'error') {
            queueMicrotask(() => {
              setError(message.message);
            });
            optionsRef.current?.onError?.(message.message);
          }
        } catch (err) {
          console.error('웹소켓 메시지 파싱 실패:', err);
        }
      };

      ws.onerror = event => {
        console.error('웹소켓 에러:', event);
        const errorMessage = '웹소켓 연결 오류가 발생했습니다.';
        queueMicrotask(() => {
          setError(errorMessage);
        });
        optionsRef.current?.onError?.(errorMessage);
      };

      ws.onclose = () => {
        queueMicrotask(() => {
          setIsConnected(false);
        });
        optionsRef.current?.onDisconnect?.();
      };

      wsRef.current = ws;
    } catch (err) {
      console.error('웹소켓 연결 실패:', err);
      const errorMessage = '웹소켓 연결에 실패했습니다.';
      queueMicrotask(() => {
        setError(errorMessage);
      });
      optionsRef.current?.onError?.(errorMessage);
    }
  }, [userId]);

  const disconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!userId) {
      return;
    }

    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/api/fated-match/ws/measure/${userId}`;

    let mounted = true;

    try {
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        if (!mounted) return;
        queueMicrotask(() => {
          setIsConnected(true);
          setError(null);
        });
        optionsRef.current?.onConnect?.();
      };

      ws.onmessage = event => {
        if (!mounted) return;
        try {
          const message: SensorMessage = JSON.parse(event.data);
          queueMicrotask(() => {
            setLatestMessage(message);
          });
          optionsRef.current?.onMessage?.(message);

          if (message.status === 'complete' && message.result) {
            optionsRef.current?.onComplete?.(message.result);
          } else if (message.status === 'error') {
            queueMicrotask(() => {
              setError(message.message);
            });
            optionsRef.current?.onError?.(message.message);
          }
        } catch (err) {
          console.error('웹소켓 메시지 파싱 실패:', err);
        }
      };

      ws.onerror = event => {
        if (!mounted) return;
        console.error('웹소켓 에러:', event);
        const errorMessage = '웹소켓 연결 오류가 발생했습니다.';
        queueMicrotask(() => {
          setError(errorMessage);
        });
        optionsRef.current?.onError?.(errorMessage);
      };

      ws.onclose = () => {
        if (!mounted) return;
        queueMicrotask(() => {
          setIsConnected(false);
        });
        optionsRef.current?.onDisconnect?.();
      };

      wsRef.current = ws;
    } catch (err) {
      if (!mounted) return;
      console.error('웹소켓 연결 실패:', err);
      const errorMessage = '웹소켓 연결에 실패했습니다.';
      queueMicrotask(() => {
        setError(errorMessage);
      });
      optionsRef.current?.onError?.(errorMessage);
    }

    return () => {
      mounted = false;
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [userId]);

  return {
    isConnected,
    latestMessage,
    error,
    connect,
    disconnect,
  };
};
