import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import BottomNavigation from "@/components/BottomNavigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  DollarSign,
  Languages,
  Calendar,
  CheckCircle
} from "lucide-react";

const Therapist = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');

  const therapists = [
    {
      id: '1',
      name: language === 'th' ? 'ดร. สุดา วิทยานันท์' : 'Dr. Suda Wityanan',
      specializations: ['Anxiety', 'Depression', 'Stress Management'],
      languages: ['Thai', 'English'],
      hourlyRate: 1500,
      rating: 4.9,
      reviewCount: 127,
      location: 'Bangkok',
      avatar: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=100',
      isVerified: true,
      nextAvailable: '2024-01-20',
      bio: language === 'th' 
        ? 'ผู้เชี่ยวชาญด้านจิตวิทยาคลินิก มีประสบการณ์ 10 ปี' 
        : 'Clinical psychology specialist with 10 years of experience'
    },
    {
      id: '2',
      name: language === 'th' ? 'อ.ดร. วิชัย สันติภาพ' : 'Dr. Wichai Santipab',
      specializations: ['Mindfulness', 'Relationship', 'PTSD'],
      languages: ['Thai', 'English'],
      hourlyRate: 2000,
      rating: 4.8,
      reviewCount: 89,
      location: 'Chiang Mai',
      avatar: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=100',
      isVerified: true,
      nextAvailable: '2024-01-22',
      bio: language === 'th' 
        ? 'เชี่ยวชาญการบำบัดแบบองค์รวม และการทำสมาธิ' 
        : 'Specialized in holistic therapy and mindfulness practices'
    },
    {
      id: '3',
      name: language === 'th' ? 'ดร. นิรมล ใจดี' : 'Dr. Niramal Jaidee',
      specializations: ['Teen Counseling', 'Family Therapy', 'Addiction'],
      languages: ['Thai'],
      hourlyRate: 1200,
      rating: 4.7,
      reviewCount: 156,
      location: 'Phuket',
      avatar: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=100',
      isVerified: true,
      nextAvailable: '2024-01-21',
      bio: language === 'th' 
        ? 'ปรึกษาจิตวิทยาเด็กและครอบครัว' 
        : 'Child and family psychology counselor'
    }
  ];

  const filteredTherapists = therapists.filter(therapist => {
    const matchesSearch = therapist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         therapist.specializations.some(spec => 
                           spec.toLowerCase().includes(searchQuery.toLowerCase())
                         );
    
    const matchesPrice = priceFilter === 'all' || 
                        (priceFilter === 'low' && therapist.hourlyRate < 1500) ||
                        (priceFilter === 'medium' && therapist.hourlyRate >= 1500 && therapist.hourlyRate < 2000) ||
                        (priceFilter === 'high' && therapist.hourlyRate >= 2000);
    
    return matchesSearch && matchesPrice;
  });

  const getPriceColor = (rate: number) => {
    if (rate < 1500) return 'text-mind-green-500';
    if (rate < 2000) return 'text-mind-blue-500';
    return 'text-orange-500';
  };

  return (
    <div className="min-h-screen bg-mind-blue-50 pb-20">
      {/* Header */}
      <div className="bg-white p-6 border-b border-mind-neutral-200">
        <h1 className={`text-2xl font-bold text-mind-neutral-800 mb-4 ${language === 'th' ? 'thai' : ''}`}>
          {t('therapist.title')}
        </h1>
        
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-mind-neutral-500" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'th' ? 'ค้นหานักจิตวิทยา...' : 'Search therapists...'}
            className={`pl-10 border-mind-neutral-300 rounded-xl ${language === 'th' ? 'thai' : ''}`}
          />
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-mind-neutral-500" />
          <span className={`text-sm text-mind-neutral-600 ${language === 'th' ? 'thai' : ''}`}>
            {t('therapist.filter')}:
          </span>
          
          <div className="flex space-x-2">
            {[
              { key: 'all', label: 'All' },
              { key: 'low', label: '< ฿1,500' },
              { key: 'medium', label: '฿1,500-2,000' },
              { key: 'high', label: '> ฿2,000' }
            ].map((filter) => (
              <Button
                key={filter.key}
                onClick={() => setPriceFilter(filter.key as typeof priceFilter)}
                variant={priceFilter === filter.key ? 'default' : 'outline'}
                size="sm"
                className={`rounded-full text-xs ${priceFilter === filter.key 
                  ? 'bg-mind-green-500 text-white' 
                  : 'border-mind-neutral-300 text-mind-neutral-600'
                }`}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Therapist List */}
      <div className="p-6 space-y-4">
        {filteredTherapists.map((therapist) => (
          <Card key={therapist.id} className="p-6 card-shadow">
            <div className="flex space-x-4">
              <div className="relative">
                <div 
                  className="w-16 h-16 rounded-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${therapist.avatar})` }}
                />
                {therapist.isVerified && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-mind-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className={`text-lg font-semibold text-mind-neutral-800 ${language === 'th' ? 'thai' : ''}`}>
                    {therapist.name}
                  </h3>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${getPriceColor(therapist.hourlyRate)}`}>
                      ฿{therapist.hourlyRate.toLocaleString()}
                    </div>
                    <div className={`text-xs text-mind-neutral-500 ${language === 'th' ? 'thai' : ''}`}>
                      {t('therapist.rate')}
                    </div>
                  </div>
                </div>
                
                <p className={`text-sm text-mind-neutral-600 mb-3 ${language === 'th' ? 'thai' : ''}`}>
                  {therapist.bio}
                </p>
                
                {/* Specializations */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {therapist.specializations.map((spec) => (
                    <Badge key={spec} className="bg-mind-blue-100 text-mind-blue-600">
                      {spec}
                    </Badge>
                  ))}
                </div>
                
                {/* Details */}
                <div className="flex items-center justify-between text-xs text-mind-neutral-500 mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-500" />
                      <span>{therapist.rating} ({therapist.reviewCount})</span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{therapist.location}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Languages className="w-3 h-3" />
                      <span>{therapist.languages.join(', ')}</span>
                    </div>
                  </div>
                </div>
                
                {/* Action */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-mind-green-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      Available {new Date(therapist.nextAvailable).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <Button
                    onClick={() => navigate(`/therapist/${therapist.id}/book`)}
                    size="sm"
                    className={`bg-mind-green-500 hover:bg-mind-green-600 text-white rounded-full ${language === 'th' ? 'thai' : ''}`}
                  >
                    {t('therapist.book')}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
        
        {filteredTherapists.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto bg-mind-neutral-100 rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-mind-neutral-400" />
            </div>
            <h3 className={`text-lg font-semibold text-mind-neutral-600 mb-2 ${language === 'th' ? 'thai' : ''}`}>
              No therapists found
            </h3>
            <p className={`text-mind-neutral-500 ${language === 'th' ? 'thai' : ''}`}>
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Therapist;
