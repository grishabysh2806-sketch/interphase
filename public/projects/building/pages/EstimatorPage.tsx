import React, { useState } from 'react';
import { generateConstructionEstimate } from '../services/geminiService';
import { EstimateResult } from '../types';
import { 
  Calculator, 
  Loader2, 
  Hammer, 
  DollarSign, 
  Calendar, 
  AlertTriangle,
  ClipboardList,
  CheckCircle,
  FileText
} from 'lucide-react';
import { useModal } from '../contexts/ModalContext';

const EstimatorPage: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [estimate, setEstimate] = useState<EstimateResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const { openCallModal } = useModal();

  const handleEstimate = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);
    setEstimate(null);

    try {
      const result = await generateConstructionEstimate(prompt);
      setEstimate(result);
    } catch (err) {
      console.error(err);
      setError("Не удалось составить смету. Пожалуйста, попробуйте уточнить запрос или повторите позже.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
        handleEstimate();
    }
  }

  return (
    <div className="min-h-screen bg-stone-100 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center p-3 bg-construction-yellow rounded-full mb-4 shadow-lg">
                <Calculator className="w-8 h-8 text-construction-black" />
            </div>
            <h1 className="text-4xl font-black text-gray-900 mb-2">Умный Калькулятор Сметы</h1>
            <p className="text-gray-600 max-w-xl mx-auto">
                Опишите вашу задачу простыми словами, и наш ИИ-инженер составит предварительную смету, список материалов и график работ.
            </p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-8 border border-gray-200">
            <div className="bg-construction-dark p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-gray-400 text-sm font-mono">ai_estimator_v2.0.exe</span>
            </div>
            <div className="p-6">
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                    Описание проекта
                </label>
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Например: Хочу построить гараж 6x4 метра из пеноблоков, с односкатной крышей и бетонным полом..."
                    className="w-full h-40 p-4 bg-gray-50 border-2 border-gray-200 rounded-lg focus:border-construction-yellow focus:ring-0 transition-colors resize-none text-gray-800 placeholder-gray-400 text-lg"
                />
                <div className="flex justify-between items-center mt-4">
                    <p className="text-xs text-gray-400">
                        *Нажмите Ctrl + Enter для отправки
                    </p>
                    <button
                        onClick={handleEstimate}
                        disabled={isLoading || !prompt.trim()}
                        className={`flex items-center gap-2 px-8 py-3 rounded font-bold text-white transition-all transform 
                            ${isLoading || !prompt.trim() 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-construction-black hover:bg-gray-800 hover:-translate-y-1 shadow-lg'
                            }`}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Расчет...
                            </>
                        ) : (
                            <>
                                <Hammer className="w-5 h-5" />
                                Рассчитать смету
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>

        {/* Error Message */}
        {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded shadow-sm flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0" />
                <p className="text-red-700">{error}</p>
            </div>
        )}

        {/* Result Section */}
        {estimate && (
            <div className="space-y-6 animate-fade-in-up">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-construction-yellow">
                        <div className="flex items-center gap-3 mb-2 text-gray-500">
                            <DollarSign className="w-5 h-5" />
                            <span className="text-sm font-bold uppercase">Итоговая стоимость</span>
                        </div>
                        <div className="text-3xl font-black text-gray-900">
                            {estimate.totalEstimatedCost.toLocaleString('ru-RU')} ₽
                        </div>
                        <div className="text-sm text-gray-400 mt-1">
                             ≈ {Math.round(estimate.laborCost / estimate.totalEstimatedCost * 100)}% работы
                        </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
                        <div className="flex items-center gap-3 mb-2 text-gray-500">
                            <Calendar className="w-5 h-5" />
                            <span className="text-sm font-bold uppercase">Сроки</span>
                        </div>
                        <div className="text-3xl font-black text-gray-900">
                            {estimate.timelineDays} дней
                        </div>
                        <div className="text-sm text-gray-400 mt-1">
                            Ориентировочное время
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500">
                        <div className="flex items-center gap-3 mb-2 text-gray-500">
                            <FileText className="w-5 h-5" />
                            <span className="text-sm font-bold uppercase">Проект</span>
                        </div>
                        <div className="text-lg font-bold text-gray-900 leading-tight line-clamp-2">
                            {estimate.projectName}
                        </div>
                    </div>
                </div>

                {/* Detailed Breakdown */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                        <h3 className="font-bold text-xl text-gray-800 flex items-center gap-2">
                            <ClipboardList className="w-5 h-5 text-construction-yellow" />
                            Детализация расходов
                        </h3>
                    </div>
                    <div className="p-6">
                        <p className="text-gray-600 mb-6 italic border-l-4 border-gray-300 pl-4 py-1">
                            "{estimate.description}"
                        </p>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b-2 border-gray-100 text-sm uppercase text-gray-500 tracking-wider">
                                        <th className="pb-3 pl-2">Материал / Работы</th>
                                        <th className="pb-3 text-center">Кол-во</th>
                                        <th className="pb-3 text-right">Цена ед.</th>
                                        <th className="pb-3 text-right pr-2">Сумма</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {estimate.materials.map((item, idx) => (
                                        <tr key={idx} className="hover:bg-yellow-50/50 transition-colors">
                                            <td className="py-3 pl-2 font-medium text-gray-800">{item.item}</td>
                                            <td className="py-3 text-center text-gray-600">
                                                {item.quantity} <span className="text-xs text-gray-400">{item.unit}</span>
                                            </td>
                                            <td className="py-3 text-right text-gray-600">{item.cost.toLocaleString()} ₽</td>
                                            <td className="py-3 text-right pr-2 font-bold text-gray-800">
                                                {(item.cost * item.quantity).toLocaleString()} ₽
                                            </td>
                                        </tr>
                                    ))}
                                    <tr className="bg-gray-50 font-bold">
                                        <td className="py-4 pl-2 text-gray-800">Стоимость строительных работ</td>
                                        <td className="py-4 text-center text-gray-600">-</td>
                                        <td className="py-4 text-center text-gray-600">-</td>
                                        <td className="py-4 text-right pr-2 text-construction-black">
                                            {estimate.laborCost.toLocaleString()} ₽
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Recommendations */}
                <div className="bg-construction-dark text-white rounded-xl shadow-lg p-6">
                    <h3 className="font-bold text-xl mb-4 text-construction-yellow flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        Рекомендации эксперта
                    </h3>
                    <ul className="space-y-3">
                        {estimate.recommendations.map((rec, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                                <div className="min-w-[24px] h-6 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold text-construction-yellow mt-0.5">
                                    {idx + 1}
                                </div>
                                <span className="text-gray-300 leading-relaxed">{rec}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="text-center pt-8">
                     <p className="text-gray-500 text-sm mb-4">Это предварительный расчет. Для точной сметы требуется выезд замерщика.</p>
                     <button 
                        onClick={openCallModal}
                        className="inline-block bg-construction-yellow text-black font-bold px-8 py-3 rounded hover:bg-yellow-400 transition-colors"
                     >
                        Заказать выезд инженера
                     </button>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default EstimatorPage;