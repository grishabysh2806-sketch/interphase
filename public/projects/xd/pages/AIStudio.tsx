
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Button } from '../components/ui/Button';
import { Reveal } from '../components/ui/Reveal';

export const AIStudio: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('');
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    const checkKey = async () => {
      // @ts-ignore
      if (window.aistudio && window.aistudio.hasSelectedApiKey) {
        // @ts-ignore
        const has = await window.aistudio.hasSelectedApiKey();
        setHasKey(has);
      } else {
        // Fallback for dev if window.aistudio is not injected yet
        setHasKey(true);
      }
    };
    checkKey();
  }, []);

  const handleSelectKey = async () => {
    // @ts-ignore
    if (window.aistudio && window.aistudio.openSelectKey) {
      // @ts-ignore
      await window.aistudio.openSelectKey();
      setHasKey(true); // Assume success
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImage(result);
        // Extract base64 data
        setImageBase64(result.split(',')[1]);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateVideo = async () => {
    if (!imageBase64) return;
    setIsGenerating(true);
    setStatus('Инициализация Veo...');
    setGeneratedVideoUrl(null);

    try {
      // Create new instance to ensure fresh key
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        image: {
          imageBytes: imageBase64,
          mimeType: 'image/png', 
        },
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9' 
        }
      });

      setStatus('Veo создает магию... (это может занять минуту)');
      
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        operation = await ai.operations.getVideosOperation({operation: operation});
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        setGeneratedVideoUrl(`${downloadLink}&key=${process.env.API_KEY}`);
        setStatus('Готово!');
      } else {
        setStatus('Ошибка: Видео не сгенерировано');
      }

    } catch (error) {
      console.error(error);
      setStatus('Произошла ошибка. Попробуйте выбрать API ключ заново.');
      setHasKey(false);
    } finally {
      setIsGenerating(false);
    }
  };

  if (!hasKey) {
    return (
      <div className="min-h-screen bg-black pt-32 flex flex-col items-center justify-center p-6">
        <div className="glass-panel p-10 rounded-3xl text-center max-w-lg border border-white/10">
          <h1 className="text-3xl font-bold text-white mb-4">AI Studio Access</h1>
          <p className="text-zinc-400 mb-8">
            Для использования генеративной модели Veo требуется доступ к Paid API Key.
            Пожалуйста, выберите ваш ключ или проект.
          </p>
          <Button onClick={handleSelectKey} size="lg">Выбрать API ключ</Button>
          <div className="mt-6 text-xs text-zinc-500">
            <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="underline hover:text-white">
              Подробнее о биллинге
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black pt-32 pb-20 transition-colors duration-500">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-blue-500 font-mono text-sm uppercase tracking-widest mb-2 block">Experimental</span>
            <h1 className="text-5xl md:text-7xl font-bold text-zinc-900 dark:text-white mb-6">AI Studio: Veo</h1>
            <p className="text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
              Оживите историю. Загрузите архивное фото или изображение локации, и нейросеть Veo создаст из него кинематографичное видео.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Input Section */}
          <Reveal width="100%" delay={100}>
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-[2rem] p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">1. Загрузите изображение</h3>
              
              <div className="border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-2xl p-8 text-center hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors relative">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {image ? (
                  <div className="relative rounded-xl overflow-hidden aspect-video">
                    <img src={image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="py-12">
                    <svg className="w-12 h-12 text-zinc-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <span className="text-zinc-500 font-medium">Нажмите или перетащите фото</span>
                  </div>
                )}
              </div>

              <div className="mt-8">
                <Button 
                  onClick={generateVideo} 
                  disabled={!image || isGenerating} 
                  className="w-full py-4 text-lg"
                >
                  {isGenerating ? 'Генерация...' : 'Создать видео'}
                </Button>
                {status && (
                  <p className="mt-4 text-center text-sm text-zinc-500 animate-pulse">{status}</p>
                )}
              </div>
            </div>
          </Reveal>

          {/* Output Section */}
          <Reveal width="100%" delay={200}>
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-[2rem] p-8 shadow-xl h-full flex flex-col">
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">2. Результат</h3>
              
              <div className="flex-1 bg-zinc-100 dark:bg-black rounded-2xl flex items-center justify-center overflow-hidden min-h-[300px]">
                {generatedVideoUrl ? (
                  <video 
                    src={generatedVideoUrl} 
                    controls 
                    autoPlay 
                    loop 
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="text-center p-8">
                    <div className="w-16 h-16 bg-zinc-200 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                    </div>
                    <p className="text-zinc-500">Здесь появится ваше видео</p>
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
};
