import { useCallback, useState } from 'react';
import html2canvas from 'html2canvas';

interface CaptureOptions {
  fileName?: string;
  backgroundColor?: string;
  scale?: number;
  ignoreElements?: string[];
}

export const useCaptureScreen = () => {
  const [isCapturing, setIsCapturing] = useState(false);

  const captureScreen = useCallback(
    async (
      elementId: string,
      options: CaptureOptions = {}
    ): Promise<void> => {
      const {
        fileName = 'reachyou-result.png',
        backgroundColor = '#ffffff',
        scale = 2,
        ignoreElements = [],
      } = options;

      setIsCapturing(true);

      try {
        const element = document.getElementById(elementId);

        if (!element) {
          throw new Error(`Element with id "${elementId}" not found`);
        }

        const canvas = await html2canvas(element, {
          backgroundColor,
          scale,
          useCORS: true,
          allowTaint: true,
          logging: false,
          ignoreElements: (el) => {
            return ignoreElements.some(selector => el.matches?.(selector));
          },
        });

        const dataUrl = canvas.toDataURL('image/png');

        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Failed to capture screen:', error);
        throw error;
      } finally {
        setIsCapturing(false);
      }
    },
    []
  );

  return { captureScreen, isCapturing };
};
