import React, { useState } from 'react';
import { MapPin, Calendar, Ruler, ArrowRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "Коттедж в стиле Хай-Тек",
    category: "residential",
    image: "https://picsum.photos/id/12/800/600",
    location: "КП 'Барвиха'",
    year: "2023",
    area: "350 м²",
    description: "Строительство двухэтажного дома из монолита с панорамным остеклением и плоской крышей."
  },
  {
    id: 2,
    title: "Логистический комплекс",
    category: "commercial",
    image: "https://picsum.photos/id/164/800/600",
    location: "г. Подольск",
    year: "2022",
    area: "1500 м²",
    description: "Возведение складского помещения класса А с административным блоком."
  },
  {
    id: 3,
    title: "Реставрация фасада",
    category: "renovation",
    image: "https://picsum.photos/id/188/800/600",
    location: "ул. Тверская",
    year: "2023",
    area: "800 м²",
    description: "Комплексная реставрация исторического фасада здания с сохранением архитектурных элементов."
  },
  {
    id: 4,
    title: "Загородный дом 'Скандинавия'",
    category: "residential",
    image: "https://picsum.photos/id/235/800/600",
    location: "Истринский р-н",
    year: "2024",
    area: "180 м²",
    description: "Каркасный энергоэффективный дом с отделкой из натуральной лиственницы."
  },
  {
    id: 5,
    title: "Офисный центр 'Вектор'",
    category: "commercial",
    image: "https://picsum.photos/id/449/800/600",
    location: "Москва-Сити",
    year: "2021",
    area: "4000 м²",
    description: "Внутренняя отделка офисных помещений премиум-класса под ключ."
  },
  {
    id: 6,
    title: "Банный комплекс",
    category: "residential",
    image: "https://picsum.photos/id/511/800/600",
    location: "д. Глухово",
    year: "2023",
    area: "120 м²",
    description: "Строительство бани из клееного бруса с бассейном и зоной барбекю."
  }
];

const PortfolioPage: React.FC = () => {
  const [filter, setFilter] = useState('all');

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  const tabs = [
    { id: 'all', label: 'Все проекты' },
    { id: 'residential', label: 'Жилая недвижимость' },
    { id: 'commercial', label: 'Коммерческие объекты' },
    { id: 'renovation', label: 'Реконструкция' },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-construction-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-wide">
                Наши <span className="text-construction-yellow">Проекты</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Гордимся каждым построенным метром. Посмотрите примеры наших работ, чтобы убедиться в качестве и профессионализме команды СтройМастер.
            </p>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-stone-100 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 overflow-x-auto">
            <div className="flex space-x-2 md:justify-center min-w-max">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setFilter(tab.id)}
                        className={`px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wider transition-all
                            ${filter === tab.id 
                                ? 'bg-construction-yellow text-black shadow-lg' 
                                : 'bg-white text-gray-500 hover:text-black hover:bg-gray-50 border border-gray-200'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map(project => (
                <div key={project.id} className="group bg-white rounded-lg overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="relative h-16 bg-construction-black flex items-center justify-between px-6">
                        <span className="text-sm font-semibold text-white uppercase tracking-wide">
                            Реализованный объект
                        </span>
                        <span className="bg-construction-yellow text-black text-xs font-bold px-3 py-1 rounded">
                            {project.year}
                        </span>
                    </div>
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-construction-yellow transition-colors">
                            {project.title}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                            <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4 text-construction-yellow" />
                                {project.location}
                            </div>
                            <div className="flex items-center gap-1">
                                <Ruler className="w-4 h-4 text-construction-yellow" />
                                {project.area}
                            </div>
                        </div>
                        <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
                            {project.description}
                        </p>
                        <button className="w-full border-2 border-construction-gray text-gray-700 font-bold py-2 rounded hover:border-construction-yellow hover:bg-construction-yellow hover:text-black transition-all flex items-center justify-center gap-2">
                            Подробнее о проекте
                        </button>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
