"use client";

import { useState } from 'react';
import { CheckCircle2, Upload, User, MapPin, DollarSign, Globe, Star, Mic, Music, Users, Volume2 } from 'lucide-react';

// Mock form validation (simplified for demo)
const validateForm = (data) => {
  const errors = {};
  if (!data.name || data.name.length < 2) errors.name = 'Name must be at least 2 characters';
  if (!data.bio || data.bio.length === 0) errors.bio = 'Bio is required';
  if (!data.categories || data.categories.length === 0) errors.categories = 'Select at least one category';
  if (!data.languages || data.languages.length === 0) errors.languages = 'Select at least one language';
  if (!data.feeRange) errors.feeRange = 'Fee range is required';
  if (!data.location || data.location.length < 2) errors.location = 'Location must be at least 2 characters';
  return errors;
};

const categoryIcons = {
  Singer: Mic,
  Dancer: Users,
  DJ: Volume2,
  Speaker: User
};

const CategoryCard = ({ category, selected, onToggle }) => {
  const Icon = categoryIcons[category];
  return (
    <div
      onClick={() => onToggle(category)}
      className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
        selected 
          ? 'border-blue-500 bg-blue-50 shadow-sm' 
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-lg ${selected ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
          <Icon size={20} />
        </div>
        <span className={`font-medium ${selected ? 'text-blue-900' : 'text-gray-700'}`}>
          {category}
        </span>
      </div>
      {selected && (
        <div className="absolute top-2 right-2">
          <CheckCircle2 size={16} className="text-blue-500" />
        </div>
      )}
    </div>
  );
};

const LanguageChip = ({ language, selected, onToggle }) => (
  <div
    onClick={() => onToggle(language)}
    className={`px-4 py-2 rounded-full border cursor-pointer transition-all duration-200 ${
      selected 
        ? 'border-blue-500 bg-blue-500 text-white shadow-sm' 
        : 'border-gray-300 text-gray-700 hover:border-blue-300 hover:bg-blue-50'
    }`}
  >
    {language}
  </div>
);

export default function EnhancedArtistOnboarding() {
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    categories: [],
    languages: [],
    feeRange: '',
    location: '',
    image: null
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleCategoryToggle = (category) => {
    const newCategories = formData.categories.includes(category)
      ? formData.categories.filter(c => c !== category)
      : [...formData.categories, category];
    handleInputChange('categories', newCategories);
  };

  const handleLanguageToggle = (language) => {
    const newLanguages = formData.languages.includes(language)
      ? formData.languages.filter(l => l !== language)
      : [...formData.languages, language];
    handleInputChange('languages', newLanguages);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleInputChange('image', files[0]);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleInputChange('image', file);
    }
  };

  const handleSubmit = async () => {
    const formErrors = validateForm(formData);
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
    }, 2000);

    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="space-y-8">
            {/* Personal Information Section */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                Personal Information
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.location ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="City, State/Country"
                  />
                  {errors.location && <p className="text-red-600 text-sm mt-1">{errors.location}</p>}
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none ${
                    errors.bio ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Tell us about yourself, your experience, and what makes you unique..."
                />
                <div className="flex justify-between items-center mt-2">
                  {errors.bio ? (
                    <p className="text-red-600 text-sm">{errors.bio}</p>
                  ) : (
                    <p className="text-gray-500 text-sm">Share your story and artistic journey</p>
                  )}
                  <span className="text-gray-400 text-sm">{formData.bio.length}/500</span>
                </div>
              </div>
            </div>

            {/* Categories Section */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Music className="w-5 h-5 mr-2 text-blue-600" />
                Artist Categories
              </h3>
              <p className="text-gray-600 mb-4">Select all categories that apply to your artistic skills</p>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {['Singer', 'Dancer', 'DJ', 'Speaker'].map((category) => (
                  <CategoryCard
                    key={category}
                    category={category}
                    selected={formData.categories.includes(category)}
                    onToggle={handleCategoryToggle}
                  />
                ))}
              </div>
              {errors.categories && <p className="text-red-600 text-sm mt-2">{errors.categories}</p>}
            </div>

            {/* Languages Section */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Globe className="w-5 h-5 mr-2 text-blue-600" />
                Languages
              </h3>
              <p className="text-gray-600 mb-4">Which languages can you perform in?</p>
              
              <div className="flex flex-wrap gap-3">
                {['English', 'Spanish', 'French', 'Hindi', 'German', 'Italian', 'Portuguese', 'Japanese'].map((language) => (
                  <LanguageChip
                    key={language}
                    language={language}
                    selected={formData.languages.includes(language)}
                    onToggle={handleLanguageToggle}
                  />
                ))}
              </div>
              {errors.languages && <p className="text-red-600 text-sm mt-2">{errors.languages}</p>}
            </div>

            {/* Fee Range Section */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-blue-600" />
                Performance Fee Range
              </h3>
              
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { value: '₹0-₹20,000', label: 'Starting Out', desc: 'Perfect for building experience' },
                  { value: '₹20,000-₹50,000', label: 'Experienced', desc: 'Established local performer' },
                  { value: '₹50,000+', label: 'Professional', desc: 'Premium artist with proven track record' }
                ].map((option) => (
                  <div
                    key={option.value}
                    onClick={() => handleInputChange('feeRange', option.value)}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                      formData.feeRange === option.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="text-center">
                      <div className={`font-semibold ${formData.feeRange === option.value ? 'text-blue-900' : 'text-gray-900'}`}>
                        {option.value}
                      </div>
                      <div className={`text-sm font-medium mt-1 ${formData.feeRange === option.value ? 'text-blue-700' : 'text-gray-700'}`}>
                        {option.label}
                      </div>
                      <div className={`text-xs mt-1 ${formData.feeRange === option.value ? 'text-blue-600' : 'text-gray-500'}`}>
                        {option.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {errors.feeRange && <p className="text-red-600 text-sm mt-2">{errors.feeRange}</p>}
            </div>

            {/* Image Upload Section */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Upload className="w-5 h-5 mr-2 text-blue-600" />
                Profile Image
              </h3>
              
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                  dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {formData.image ? (
                  <div className="space-y-3">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <p className="font-medium text-gray-900">{formData.image.name}</p>
                    <button
                      type="button"
                      onClick={() => handleInputChange('image', null)}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      Remove file
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                      <Upload className="w-8 h-8 text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Drop your image here, or browse</p>
                      <p className="text-sm text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                    </div>
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="inline-block bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      Browse Files
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 ${
                  isSubmitting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] shadow-lg hover:shadow-xl'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Creating Your Profile...
                  </div>
                ) : (
                  'Submit Application'
                )}
              </button>
              
              <p className="text-center text-sm text-gray-500 mt-4">
                By submitting this form, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}